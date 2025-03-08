"use server"
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { cache } from "react"

export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
}

const postsDirectory = path.join(process.cwd(), "content/posts")

export const getAllPosts = cache(async (): Promise<Post[]> => {
  try {
    const fileNames = await fs.readdir(postsDirectory)

    const allPostsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx?$/, "")
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = await fs.readFile(fullPath, "utf8")

          const { data, content } = matter(fileContents)

          const processedContent = await remark().use(html).process(content)
          const contentHtml = processedContent.toString()

          return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt || "",
            content: contentHtml,
            tags: data.tags || [],
          }
        }),
    )

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error("Error getting posts:", error)
    return []
  }
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  try {
    let fullPath = path.join(postsDirectory, `${slug}.mdx`)

    try {
      await fs.access(fullPath)
    } catch {
      fullPath = path.join(postsDirectory, `${slug}.md`)
    }

    const fileContents = await fs.readFile(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || "",
      content: contentHtml,
      tags: data.tags || [],
    }
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error)
    return null
  }
})

export const getAllTags = cache(async (): Promise<string[]> => {
  const posts = await getAllPosts()

  const tags = posts.reduce((allTags: string[], post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag)
        }
      })
    }
    return allTags
  }, [])

  return tags.sort()
})

export const getPostsByTag = cache(async (tag: string): Promise<Post[]> => {
  const posts = await getAllPosts()

  return posts.filter((post) => post.tags && Array.isArray(post.tags) && post.tags.includes(tag))
})

