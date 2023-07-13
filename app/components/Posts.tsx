import React from 'react'
import getSortedPostsData from '@/lib/posts'
import ListItem from './ListItem'

export default function Post() {
    const posts = getSortedPostsData()
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
