import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib'
import rehypeHighlight from 'rehype-highlight/lib'
import rehypeSlug from 'rehype-slug'
import Video from '@/app/components/Video'
import CustomImage from '@/app/components/CustomImage'

type Filetree = {
    "tree": [
        {"path": string}
    ]
}


/* getPostByName() recieves REFs (filenames) from getPostsMeta() and fetches files from Github raw-API, and returns BlogPost-objs containing meta-objs

-  


*/

export async function getPostByName(fileName: string): Promise<BlogPost | undefined> {

    const res = await fetch(`https://raw.githubusercontent.com/nkped/mdx-blogpost/main/${fileName}`, { headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
    } })

    if (!res.ok) return undefined

    const rawMDX = await res.text()

    if (rawMDX === '404: Not Found') return undefined

    const { frontmatter, content } = await compileMDX<{
        id: string, title: string, date: string, tags: string[],
    }>({source: rawMDX, 
        components: {
            Video,
            CustomImage,
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    rehypeHighlight, 
                    rehypeSlug,
                    [rehypeAutolinkHeadings, 
                    {behavior: 'wrap'}]
                ]
            }
        }
    })

    const id = fileName.replace(/\.mdx$/, '')

    const blogPostObj: BlogPost = { meta: { id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags }, content }

    return blogPostObj
}


/*
getPostsMeta() - fetch's file-paths from repos-API, use theese to call function that ultimately returns meta-data, and finally return date-sorted (blog)posts-array of meta-obj's

Steps:
- fetch REF's (paths) for blogpost-files from github-repo
- filter mdx-files
- use REF's to call getPostByname()
- recieve Blogpost-array from getPostByName
- destructure meta-obj from Blogposts (posts)
- return (blog)posts-array of meta-obj's sorted by date
*/

export async function getPostsMeta(): Promise<Meta[] | undefined > {
    const res = await fetch('https://api.github.com/repos/nkped/mdx-blogpost/git/trees/main?recursive=1', { headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
    }})

    if (!res.ok) return undefined

    const repoFiletree: Filetree = await res.json()

    const fileArray = repoFiletree.tree.map((obj) => obj.path).filter((path) => path.endsWith('.mdx'))

    const posts: Meta[] = []

    for (const file of fileArray) {
        const post = await getPostByName(file)
        if (post) {
            const { meta } = post
            posts.push(meta)
        }
    }

    return posts.sort((a, b) => a.date < b.date ? 1 : -1 )
    
}