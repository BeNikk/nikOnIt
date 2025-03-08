import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export default async function ArchivePage() {
  const posts = await getAllPosts()

  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    },
    {} as Record<number, typeof posts>,
  )

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <main className="prose">
      <h1>Archives</h1>

      <div className="space-y-10">
        {years.map((year) => (
          <section key={year}>
            <h3>{year}</h3>
            <ul className="space-y-3">
              {postsByYear[year].map((post) => (
                <li key={post.slug} className="flex flex-col sm:flex-row sm:items-baseline">
                  <span className="text-sm text-neutral-500 sm:w-24 sm:flex-shrink-0 mb-1 sm:mb-0">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <Link href={`/posts/${post.slug}`} className="hover:text-neutral-600 transition-colors">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}

