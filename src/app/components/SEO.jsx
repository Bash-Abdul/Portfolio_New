import React from "react";
import { Helmet } from "react-helmet-async";

// const SITE_URL = "https://bashabdul.com";
const SITE_URL = "https://bashabdul.com";
const SITE_NAME = "Bashir Abdulah";

const DEFAULT_TITLE = "Bashir Abdulah, React Frontend Developer";
const DEFAULT_DESC =
  "Portfolio of Bashir Abdulah, React frontend developer building modern, responsive web apps with clean UI, accessibility, and performance.";
const DEFAULT_IMAGE = `${SITE_URL}/og.png`; // put a 1200x630 image in /public/og.png

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  // url = SITE_URL, 
  url = '/',         // can pass "/" or "/about" from pages
  noindex = false,
  twitterHandle = "@bash__abdul",
  sameAs = [
    "https://github.com/Bash-Abdul",
    "https://www.linkedin.com/in/bashir-abdulah-54086333a/",
    "https://x.com/bash__abdul",
    "https://bash-abdul.hashnode.dev/",
    "https://medium.com/@Bash-Abdul",
    // "dgdggdgd"
  ],
}) {
  // const canonical = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const canonical = new URL(url, SITE_URL).toString();

  const ldPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#me`,
    name: "Bashir Abdulah",
    alternateName: "Bash Abdul",
    url: SITE_URL,
    jobTitle: "Frontend Developer",
    description,
    image,
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
      {/* <meta property="og:site_name" content="bashabdul.com" /> */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Preview image for Bashir Abdulah's portfolio"
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
       {/* only render twitter tags if it's a non-empty string */}
       {typeof twitterHandle === "string" && twitterHandle.trim() !== "" ? (
        <>
          <meta name="twitter:site" content={twitterHandle} />
          <meta name="twitter:creator" content={twitterHandle} />
        </>
      ) : null}

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(ldPerson)}
      </script>
    </Helmet>
  );
}