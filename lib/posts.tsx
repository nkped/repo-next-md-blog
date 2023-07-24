



type Filetree = {
    "tree": [
        {"path": string}
    ]
}


export async function getPostsByName(fileName: string): Promise<BlogPost | undefined> {
    const res = await fetch(`https://raw.githubusercontent.com/nkped/repo-md-blogposts/main/${fileName}`, { headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
    } })

    if (!res.ok) return undefined

    const rawMDX = await res.text()

    if (rawMDX === '404: Not Found') return undefined

     


}










export async function getPostsMeta(): Promise<Meta[] | undefined > {
    const res = await fetch('https://github.com/repos/nkped/repo-md-blogposts/git/trees/main?recursive=1', { headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
    }})

    if (!res.ok) return undefined

    const repoFiletree: Filetree = await res.json()

    const fileArray = repoFiletree.tree.map((obj) => obj.path).filter((path) => path.endsWith('.mdx'))

    const posts: Meta[] = []

    for (const file of fileArray) {
        const post = await getPostsByName(file)
        if (post) {
            const { meta } = post
            posts.push(meta)
        }
    }

    return posts.sort((a, b) => a.date < b.date ? 1 : -1 )
    
}