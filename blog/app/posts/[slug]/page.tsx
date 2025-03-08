import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params:any}) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | nikOnIt`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: { params: any }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="prose">
      <article>
        <div className="text-center text-sm text-neutral-500 mb-4">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="text-center mb-12">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/?tag=${tag}`} className="tag mx-1">
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-16 text-center">
          <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors">
            ← Back to all posts
          </Link>
        </div>
      </article>
    </main>
  )
}

