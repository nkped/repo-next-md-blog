import React from 'react'
import Link from 'next/link'
import getSortedPostsData, { getPostData } from '@/lib/posts'
import getFormattedDate from '@/lib/getFormattedDate'
import {notFound} from 'next/navigation'

type Props = {
    params: {
        postId: string
    }
}

export function generateStaticParams() {
    const posts = getSortedPostsData()

    return posts.map((post) => ({
        postId: post.id
    }))
}


export default async function Post({params: { postId }}: Props) {
    const posts = getSortedPostsData()
    
    if (!posts.find((post) => post.id === postId)) {
    return notFound()
    }

    const { title, date, contentHtml } = await getPostData(postId)

    const pubDate = getFormattedDate(date)

  return (
    <main>
        <h1>{title}</h1>
        <p>{pubDate}</p>
        <article>
            <section dangerouslySetInnerHTML={{ __html:contentHtml }} />
            <p>
                <Link href='/'>Back to home</Link>
            </p>
        </article>
    </main>

  )
}