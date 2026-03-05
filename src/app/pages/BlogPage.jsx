import { motion } from "motion/react";
import { Navigation } from "../components/Navigation";
import { Contact } from "../components/Contact";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, Clock, Loader2 } from "lucide-react";
import SEO from "../components/SEO";
import { useBlogPosts } from "../../hooks/useBlogs";

export default function BlogPage() {
  const { data, isLoading, isError } = useBlogPosts({ limit: 50 })
  const posts = data?.data ?? []
  const featuredPost = posts[0] ?? null
  const restPosts = posts.slice(1)

  return (
    <div className="size-full bg-white dark:bg-neutral-900">
      <SEO title="Blogs | Bashir Abdulah" url="/blog" />
      <Navigation />

      <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-neutral-500 font-mono mb-8 block">— BLOG</span>
            <h1 className="text-5xl md:text-7xl lg:text-[10vw] leading-[1.1] tracking-tight mb-8">
              Thoughts on code, design & tech
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl">
              I write about web development, best practices, and lessons learned from building products.
            </p>
          </motion.div>
        </div>
      </section>

      {isLoading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
        </div>
      ) : isError ? (
        <div className="py-32 text-center text-neutral-500">Failed to load posts.</div>
      ) : posts.length === 0 ? (
        <div className="py-32 text-center text-neutral-500">No posts yet.</div>
      ) : (
        <>
          {/* Featured Post — most recent */}
          {featuredPost && (
            <section className="px-6 pb-24">
              <div className="max-w-[1400px] mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Link to={`/blog/${featuredPost.slug}`} className="group block">
                    <div className="grid lg:grid-cols-2 gap-12 items-center bg-neutral-50 overflow-hidden">
                      <div className="aspect-[16/10] relative overflow-hidden bg-neutral-900">
                        {featuredPost.image ? (
                          <ImageWithFallback
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-800" />
                        )}
                      </div>
                      <div className="p-8 lg:p-12">
                        <span className="text-sm text-neutral-500 font-mono mb-4 block">LATEST</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 group-hover:opacity-70 transition-opacity">
                          {featuredPost.title}
                        </h2>
                        <p className="text-xl text-neutral-600 mb-6 leading-relaxed">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-neutral-500">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                          {featuredPost.read_time && (
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {featuredPost.read_time} min read
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </section>
          )}

          {/* All other posts */}
          {restPosts.length > 0 && (
            <section className="px-6 py-24 bg-neutral-50">
              <div className="max-w-[1400px] mx-auto">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl mb-12"
                >
                  All Posts
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {restPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link to={`/blog/${post.slug}`} className="group block">
                        <div className="bg-white border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                          <div className="aspect-[16/10] relative overflow-hidden bg-neutral-900">
                            {post.image ? (
                              <ImageWithFallback
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full bg-neutral-800" />
                            )}
                          </div>
                          <div className="p-6">
                            {post.category && (
                              <span className="text-xs text-neutral-500 uppercase tracking-wider mb-2 block">
                                {post.category}
                              </span>
                            )}
                            <h3 className="text-2xl mb-3 group-hover:opacity-70 transition-opacity">
                              {post.title}
                            </h3>
                            <p className="text-neutral-600 mb-4 leading-relaxed">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-sm text-neutral-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                              {post.read_time && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {post.read_time} min read
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <Contact />
    </div>
  )
}