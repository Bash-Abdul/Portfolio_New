import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const contacts = [
  { label: "Email", value: "bashirtaiwo59@gmail.com", href: "mailto:bashirtaiwo59@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/bashir", href: "https://www.linkedin.com/in/bashir-abdulah-54086333a/" },
  { label: "GitHub", value: "github.com/bashir", href: "https://github.com/Bash-Abdul" },
  { label: "Twitter", value: "@bash-abdul", href: "https://x.com/bash__abdul" },
  { label: "Hashnode", value: "@bash-abdul", href: "https://bash-abdul.hashnode.dev/" },
  { label: "Medium", value: "@Bash-Abdul", href: "https://medium.com/@Bash-Abdul" }
];

export function Contact() {
  return (
    <section id="contact" className="bg-white dark:bg-neutral-900 py-32 md:py-48">
      <div className="max-w-350 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-sm text-neutral-500 font-mono mb-8 block">
            — GET IN TOUCH
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-[12vw] leading-[1.1] tracking-tight max-w-6xl dark:text-white">
            Let's create something amazing together
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              I'm always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say hi,
              feel free to reach out.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {contacts.map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-center justify-between border-b border-neutral-200 pb-4 hover:border-black transition-colors duration-300"
              >
                <div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">{contact.label}</div>
                  <div className="text-xl md:text-2xl dark:text-white">{contact.value}</div>
                </div>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-neutral-200"
        >
          <div className="text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Bashir. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm text-neutral-600 dark:text-neutral-400">
            <a href="/about" className="hover:text-black dark:hover:text-white transition-colors">
              About
            </a>
            <a href="/projects" className="hover:text-black dark:hover:text-white transition-colors">
              Work
            </a>
            <a href="/blog" className="hover:text-black dark:hover:text-white transition-colors">
              Blog
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}