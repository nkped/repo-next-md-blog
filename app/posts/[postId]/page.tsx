import React from 'react'
import Link from 'next/link'
import {getPostsMeta,  getPostByName } from '@/lib/posts'
import getFormattedDate from '@/lib/getFormattedDate'
import {notFound} from 'next/navigation'
//NB Find below styles in nodemodules-folder->higlight->styles ''
import 'highlight.js/styles/github-dark.css'


//act as ssr for dev purposes
export const revalidate = 86400

type Props = {
    params: {
        postId: string
    }
}

/* 
- While running: export const revalidate = 0, it is impossible to also run: generateStaticParams(), and so must be commented out during dev-mode.
- generateStaticParams() only runs at build time to create statically generated (SSG) post-pages.
- when uncommenting generateStaticParams() {, also consider changing 'export const revalidate = 0 above'..
*/

export async function generateStaticParams() {
    const posts = await getPostsMeta()
    
    if (!posts) return []
    
    return posts.map((post) => ({
        postId: post.id
    }))
}

export async function generateMetadata({ params: { postId } }: Props) {

    const post = await getPostByName(`${postId}.mdx`) //deduped!

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.meta.title,
    }
}


export default async function Post({params: { postId }}: Props) {
    const post = await getPostByName(`${postId}.mdx`)
    
    if (!post) notFound()
    
    const { meta, content } = post

    const pubDate = getFormattedDate(meta.date)

    const tags = meta.tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag}`} >{tag}</Link>
    ))

  return (
    <>
        <h2>{meta.title}</h2>
        <p>
            {pubDate}
        </p>
        <article>
            {content}
        </article>
        <section>
            <h3>Related:</h3>
            <div>
                {tags}
            </div>
        </section>
        <p>
            <Link href="/">← Back to home</Link>
        </p>
    </>
  )
}