import { motion } from "motion/react";
import { Navigation } from "../components/Navigation";
import { Contact } from "../components/Contact";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, Clock } from "lucide-react";
import SEO from "../components/SEO";

const blogPosts = [
  {
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications",
    excerpt: "Best practices and patterns for creating maintainable React applications that scale with your team and user base.",
    date: "2026-02-20",
    readTime: "8 min read",
    category: "React",
    image: "https://images.unsplash.com/photo-1758873268877-3cd8ed329ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3QlMjBzY3JlZW58ZW58MXx8fHwxNzcxOTg3MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "typescript-tips-for-better-code",
    title: "TypeScript Tips for Better Code",
    excerpt: "Advanced TypeScript techniques that will help you write more type-safe and maintainable code.",
    date: "2026-02-15",
    readTime: "6 min read",
    category: "TypeScript",
    image: "https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcxOTg1MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques You Should Know",
    excerpt: "Exploring the latest CSS features like container queries, cascade layers, and modern layout techniques.",
    date: "2026-02-10",
    readTime: "10 min read",
    category: "CSS",
    image: "https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrJTIwZGV2ZWxvcGVyfGVufDF8fHx8MTc3MjAzNTcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "nodejs-microservices-architecture",
    title: "Building Microservices with Node.js",
    excerpt: "A comprehensive guide to designing and implementing microservices architecture using Node.js and Docker.",
    date: "2026-02-05",
    readTime: "12 min read",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBzY3JlZW58ZW58MXx8fHwxNzcyMDA3NjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "optimizing-web-performance",
    title: "Optimizing Web Performance in 2026",
    excerpt: "Performance optimization strategies for modern web applications, from code splitting to caching strategies.",
    date: "2026-01-28",
    readTime: "9 min read",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1661246626039-5429b8f7488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzcyMDMzMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "design-systems-guide",
    title: "Creating Design Systems That Last",
    excerpt: "How to build and maintain design systems that scale across teams and products.",
    date: "2026-01-20",
    readTime: "11 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc3MTk3MDI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export default function BlogPage() {
  return (
    <div className="size-full bg-white dark:bg-neutral-900">
      <SEO title="Blogs | Bashir Abdulah" url="/blog"   />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-neutral-500 font-mono mb-8 block">
              — BLOG
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[10vw] leading-[1.1] tracking-tight mb-8">
              Thoughts on code, design & tech
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl">
              I write about web development, best practices, and lessons learned from building products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-6 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link to={`/blog/${blogPosts[0].slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-12 items-center bg-neutral-50 overflow-hidden">
                <div className="aspect-[16/10] relative overflow-hidden bg-neutral-900">
                  <ImageWithFallback
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 lg:p-12">
                  <span className="text-sm text-neutral-500 font-mono mb-4 block">FEATURED</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 group-hover:opacity-70 transition-opacity">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-xl text-neutral-600 mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-neutral-500">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(blogPosts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* All Posts */}
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
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="bg-white border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-[16/10] relative overflow-hidden bg-neutral-900">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-neutral-500 uppercase tracking-wider mb-2 block">
                        {post.category}
                      </span>
                      <h3 className="text-2xl mb-3 group-hover:opacity-70 transition-opacity">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}