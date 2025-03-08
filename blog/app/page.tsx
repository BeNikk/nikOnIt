"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllPosts, getAllTags, getPostsByTag } from "@/lib/posts"
import type { Post } from "@/lib/posts"
import { formatDate } from "@/lib/utils"

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const allPosts = await getAllPosts()
        const allTags = await getAllTags()

        setPosts(allPosts)
        setFilteredPosts(allPosts)
        setTags(allTags)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTagClick = async (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null)
      setFilteredPosts(posts)
    } else {
      setActiveTag(tag)
      const taggedPosts = await getPostsByTag(tag)
      setFilteredPosts(taggedPosts)
    }
  }

  if (isLoading) {
    return (
      <main className="prose">
        <p className="text-center">Loading...</p>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
    <h1 className="sr-only">Personal Blog</h1>

    {posts.length === 0 ? (
      <div className="text-center py-20">
        <h2 className="text-xl font-medium mb-2">No posts yet</h2>
        <p className="text-gray-600">Check back soon for new content!</p>
      </div>
    ) : (
      <ul className="space-y-10">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-gray-100 pb-10">
            <article>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">{formatDate(post.date)}</div>
                <h2 className="text-xl font-medium">
                  <Link href={`/posts/${post.slug}`} className="hover:text-gray-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="mt-4">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    )}
  </main>
  )
}

