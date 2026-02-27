import React from "react";
import { Helmet } from "react-helmet-async";

// const SITE_URL = "https://bashabdul.com";
const SITE_URL = "https://bashabdul.vercel.app";
const DEFAULT_TITLE = "Bashir Abdulah, React Frontend Developer";
const DEFAULT_DESC =
  "Portfolio of Bashir Abdulah, React frontend developer building modern, responsive web apps with clean UI, accessibility, and performance.";
const DEFAULT_IMAGE = `${SITE_URL}/og.png`; // put a 1200x630 image in /public/og.png

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  url = SITE_URL,          // can pass "/" or "/about" from pages
  noindex = false,
  sameAs = [
    "https://github.com/Bash-Abdul",
    "https://www.linkedin.com/in/bashir-abdulah-54086333a/",
    "https://x.com/bash__abdul",
    "https://bash-abdul.hashnode.dev/",
    "https://medium.com/@Bash-Abdul",
    // "dgdggdgd"
  ],
}) {
  const canonical = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const ldPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bashir Abdulah",
    alternateName: "Bash Abdul",
    url: SITE_URL,
    jobTitle: "Frontend Developer",
    sameAs,
  };

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="bashabdul.vercel.app" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(ldPerson)}
      </script>
    </Helmet>
  );
}