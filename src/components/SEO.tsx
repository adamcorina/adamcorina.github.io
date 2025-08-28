import type { QuizModule } from "../types/Question";
import type { Route } from "../lib/router";

const SITE = {
  url: "https://adamcorina.github.io",
  name: "Right Tool Finder",
  ogImage: "https://adamcorina.github.io/og.png",
  twitterCard: "summary_large_image",
};

export function HomeHeadTags() {
  const title = "Right Tool Finder — Tech Quizzes";
  const description =
    "Answer a few questions to choose the right frontend tools: rendering modes, styling strategies, and more.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE.url}/`} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${SITE.url}/`} />
      <meta property="og:image" content={SITE.ogImage} />
      <meta name="twitter:card" content={SITE.twitterCard} />
    </>
  );
}

function renderKeywords(keywords?: string[]) {
  if (!keywords || keywords.length === 0) return null;
  return <meta name="keywords" content={keywords.join(", ")} />;
}

const toKeywords = (arr?: string[]) => (arr && arr.length ? arr.join(", ") : undefined);


export function HeadTags({
  route,
  quiz,
  optionKey,
}: {
  route: Route;
  quiz: QuizModule<readonly string[]>;
  optionKey?: string;
}) {
  // For hash routing, keep canonical at root
  const canonical = `${SITE.url}/`;

  if (route.page === "home" || route.page === "quiz") {
    const title = `${quiz.header.title} - ${SITE.name}`;
    const description = quiz.header.intro.replace(/\.$/, "");
    const baseKeywords = quiz.header.keywords;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: SITE.name,
      applicationCategory: "DeveloperApplication",
      url: SITE.url,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      inLanguage: "en",
      isAccessibleForFree: true,
      keywords: toKeywords(baseKeywords),
    };

    return (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        {renderKeywords(baseKeywords)}
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta name="twitter:card" content={SITE.twitterCard} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </>
    );
  }

  // learn
  const info = quiz.approachInfo[optionKey!];
  const title = `${info.label} — ${SITE.name}`;
  const description = `${info.label}: when to use it, tech requirements it satisfies, common use cases, and popular frameworks.`;
  
  const learnKeywords = quiz.header.keywords;
    
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: info.label,
    about: optionKey,
    description,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: SITE.name },
    inLanguage: "en",
    isAccessibleForFree: true,
    keywords: toKeywords(learnKeywords),
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {renderKeywords(learnKeywords)}
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={SITE.ogImage} />
      <meta name="twitter:card" content={SITE.twitterCard} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}
