import getSortedPostsData from '@/lib/posts'

import React from 'react'

export default function Post() {
    const posts = getSortedPostsData()
  return (
    <section>
        <h2>Blog</h2>
        <ul>
            {posts.map((post) => (
                JSON.stringify(post)
            ))}
        </ul>
    </section>
  )
}
