import React from 'react'
import { getPostsMeta } from '@/lib/posts'
import ListItem from './ListItem'

export default async function Posts() {
    const posts = await getPostsMeta()

    if (!posts) return <p>Sorry, no posts available.</p>

  return (
    <section>
        <h2>Blog</h2>
        <ul>
            {posts.map((post) => (
                <ListItem key={post.id} post={post} />
            ))}
        </ul>
    </section>
  )
}
