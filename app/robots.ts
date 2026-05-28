import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://nextjs-notes.vercel.app/sitemap.xml',
    host: 'https://nextjs-notes.vercel.app',
  }
}
