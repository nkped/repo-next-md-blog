import { getPostsMeta } from "@/lib/posts";
import ListItem from "@/app/components/ListItem";
import Link from "next/link";


export const revalidate = 0

type Props = {
    params: {
        tag: string
    }
}

/* 
export async function generateStaticParams() {
    const posts = await getPostsMeta()

    if (!posts) return []

    const tags = new Set(posts.map((post) => post.tags).flat())

    return Array.from(tags).map((tag) => ({tag}))
}
*/


export function generateMetadata({params: { tag }}: Props) {
    return { title: `Posts about ${tag}`}
}




export async function TagPostList({params: { tag }}: Props) {
    const posts = await getPostsMeta()

    if (!posts) return <p>Sorry, no posts available..</p>

    const tagPosts = posts.filter(post => post.tags.includes(tag))

    if (!tagPosts.length) {
        return (
            <div>
                <p>Sorry, no posts for  that keyword..</p>
                <Link href='/' >Back home</Link>
            </div>
        )
    }

    return (
        <>
            <h2>Results for: #{tag}</h2>
            <section>
                <ul>
                    {tagPosts.map(post => (
                        <ListItem key={post.id} post={post} />
                    ))}
                </ul>
            </section>
        </>
    )
}
















