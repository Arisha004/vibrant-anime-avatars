import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type?: 'website' | 'application' | 'article';
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const StructuredData = ({ 
  type = 'website',
  title = 'AnimeAvatars - Create Vibrant Anime Avatars',
  description = 'Create stunning anime avatars with our advanced editor. Join thousands in real-time chat, share creations, and express yourself.',
  image = '/lovable-uploads/d9883366-3da4-468a-8b20-63ecd0106eea.png',
  url = 'https://anime-avatars.netlify.app'
}: StructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'website' ? "WebApplication" : "Article",
    "name": title,
    "description": description,
    "url": url,
    "image": image,
    "applicationCategory": "Entertainment",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1247"
    },
    "creator": {
      "@type": "Organization",
      "name": "AnimeAvatars",
      "url": url
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;