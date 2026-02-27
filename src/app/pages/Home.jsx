import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Skills } from "../components/Skills";
import { Contact } from "../components/Contact";
import SEO from "../components/SEO";


export default function Home() {
  return (
    <div className="size-full bg-white dark:bg-neutral-900">
        <SEO
        title="Bashir Abdulah | React Frontend Developer - Modern Web and App Interfaces"
        // description="About Bashir Abdulah, also known as Bash Abdul, a React frontend developer creating fast, accessible, user-friendly web experiences."
        description="Welcome to the portfolio of Bashir Abdulah, a React frontend developer crafting modern, responsive websites and mobile apps with clean UI/UX design and scalable performance."
        url="/"
      />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}