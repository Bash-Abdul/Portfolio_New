import { motion } from 'motion/react'
import { Navigation } from '../components/Navigation'
import { Contact } from '../components/Contact'
import { useParams, Link } from 'react-router'
import { ArrowLeft, Calendar, Clock, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useBlogPost } from '../../hooks/useBlogs'

export default function BlogPost() {
  const { slug } = useParams()
  const { data, isLoading, isError } = useBlogPost(slug)

  const post = data?.data ?? null

  if (isLoading) {
    return (
      <div className="size-full bg-white dark:bg-neutral-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
        </div>
      </div>
    )
  }

  if (isError || !post) {
    return (
      <div className="size-full bg-white dark:bg-neutral-900">
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <p className="text-neutral-500">Post not found.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="size-full bg-white dark:bg-neutral-900">
      <Navigation />

      <article className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-black dark:hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <div className="mb-8">
              {post.category && (
                <span className="text-sm text-neutral-500 uppercase tracking-wider">
                  {post.category}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl mt-4 mb-6 leading-tight dark:text-white">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-neutral-600 dark:text-neutral-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
                {post.read_time && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.read_time} min read
                  </span>
                )}
              </div>
            </div>

            {/* Cover image */}
            {post.image && (
              <div className="mb-10">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Footer link to Hashnode */}
            {post.url && (
              <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  Originally published on Hashnode →
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </article>

      <Contact />
    </div>
  )
}