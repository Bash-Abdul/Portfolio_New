import { motion } from "motion/react";
import { Navigation } from "../components/Navigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Contact } from "../components/Contact";
// import {SEO} from '../components/SEO'
import SEO from "../components/SEO";

const timeline = [
  {
    year: "2026",
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    description: "Leading development of enterprise-scale applications, mentoring junior developers, and architecting cloud solutions.",
  },
  {
    year: "2024",
    title: "Full Stack Developer",
    company: "Digital Solutions Co.",
    description: "Built and maintained multiple client projects, implemented CI/CD pipelines, and improved application performance by 40%.",
  },
  {
    year: "2022",
    title: "Frontend Developer",
    company: "Creative Studio",
    description: "Developed responsive web applications using React and modern frontend technologies. Collaborated with designers to create pixel-perfect UIs.",
  },
  {
    year: "2021",
    title: "Junior Developer",
    company: "StartUp Ventures",
    description: "Started my professional journey building web applications and learning best practices in software development.",
  },
];

const values = [
  {
    title: "Clean Code",
    description: "I believe in writing code that is maintainable, scalable, and easy to understand. Every line matters.",
  },
  {
    title: "User-Centric",
    description: "Design and development decisions are always made with the end user in mind. Experience is everything.",
  },
  {
    title: "Continuous Learning",
    description: "Technology evolves rapidly. I'm committed to staying current and constantly improving my skills.",
  },
  {
    title: "Collaboration",
    description: "Great products are built by great teams. I value open communication and knowledge sharing.",
  },
];

export default function AboutPage() {
  return (
    <div className="size-full bg-white dark:bg-neutral-900">
      {/* <SEO
        title="Bashir Abdulah | React Frontend Developer - Modern Web and App Interfaces"
        // description="About Bashir Abdulah, also known as Bash Abdul, a React frontend developer creating fast, accessible, user-friendly web experiences."
        description="Welcome to the portfolio of Bashir Abdulah, a React frontend developer crafting modern, responsive websites and mobile apps with clean UI/UX design and scalable performance."
        url="/"
      /> */}
      <SEO title="About | Bashir Abdulah" url="/about"  />
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
              — ABOUT ME
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[10vw] leading-[1.1] tracking-tight mb-8">
              Building digital experiences with purpose
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl mb-8">My Journey</h2>
              <p className="text-xl text-neutral-600 leading-relaxed dark:text-neutral-400">
                I'm Bashir, a passionate developer who believes that great software is more than just code—it's about solving real problems and creating meaningful experiences.
              </p>
              <p className="text-xl text-neutral-600 leading-relaxed dark:text-neutral-400">
                My journey in tech started with curiosity and has evolved into a career dedicated to building elegant, performant applications. I specialize in full-stack development, with a particular love for creating seamless user interfaces and robust backend systems.
              </p>
              <p className="text-xl text-neutral-600 leading-relaxed dark:text-neutral-400">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community through writing and mentoring.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-neutral-900">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcxOTg1MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4">Experience</h2>
            <p className="text-xl text-neutral-600">My professional journey so far</p>
          </motion.div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-l-2 border-neutral-300 pl-8 pb-12 relative"
              >
                <div className="absolute left-0 top-0 w-4 h-4 bg-black rounded-full -translate-x-[9px]" />
                <span className="text-sm text-neutral-500 font-mono">{item.year}</span>
                <h3 className="text-2xl md:text-3xl mt-2 mb-1">{item.title}</h3>
                <p className="text-lg text-neutral-600 mb-3">{item.company}</p>
                <p className="text-neutral-600 max-w-2xl">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4">What I Value</h2>
            <p className="text-xl text-neutral-600">Principles that guide my work</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 border border-neutral-200 dark:bg-neutral-700 dark:border-neutral-600"
              >
                <h3 className="text-2xl mb-4">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed dark:text-neutral-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}