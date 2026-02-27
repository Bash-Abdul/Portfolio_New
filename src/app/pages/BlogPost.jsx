import { motion } from "motion/react";
import { Navigation } from "../components/Navigation";
import { Contact } from "../components/Contact";
import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();

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
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-black mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="mb-8">
              <span className="text-sm text-neutral-500 uppercase tracking-wider">React</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mt-4 mb-6 leading-tight">
                Building Scalable React Applications
              </h1>
              <div className="flex items-center gap-6 text-neutral-600">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  February 20, 2026
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  8 min read
                </span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Building scalable React applications requires careful planning, architectural decisions, and adherence to best practices. In this article, we'll explore patterns and techniques that will help you create maintainable applications that grow with your needs.
              </p>

              <h2>Component Architecture</h2>
              <p>
                The foundation of any scalable React application is a well-thought-out component architecture. Start by identifying your core components and establish clear boundaries between them. This separation of concerns will make your codebase more maintainable and easier to test.
              </p>

              <h2>State Management</h2>
              <p>
                As your application grows, managing state becomes increasingly complex. Choose a state management solution that fits your needs—whether that's Context API for simpler applications, or Redux/Zustand for more complex state requirements. The key is consistency across your codebase.
              </p>

              <h2>Code Organization</h2>
              <p>
                Organize your code by feature rather than by file type. This approach makes it easier to locate related code and understand the structure of your application. Each feature should be self-contained with its own components, hooks, and utilities.
              </p>

              <h2>Performance Optimization</h2>
              <p>
                Performance should be a consideration from day one. Use React.memo for expensive components, implement code splitting with React.lazy, and leverage useMemo and useCallback hooks appropriately. Monitor your bundle size and optimize it regularly.
              </p>

              <h2>Testing Strategy</h2>
              <p>
                A comprehensive testing strategy is crucial for scalability. Write unit tests for your utilities and hooks, integration tests for component interactions, and end-to-end tests for critical user flows. This will give you confidence when making changes.
              </p>

              <h2>Conclusion</h2>
              <p>
                Building scalable React applications is an ongoing process that requires attention to architecture, performance, and code quality. By following these principles and continuously refactoring as your application grows, you'll create a codebase that's a joy to work with.
              </p>
            </div>
          </motion.div>
        </div>
      </article>

      <Contact />
    </div>
  );
}