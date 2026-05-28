import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import ProgressBar from '@/components/ProgressBar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const SITE_URL = 'https://nextjs-notes-hazel.vercel.app'
const SITE_NAME = 'NextJS Notes'
const TITLE = 'NextJS Notes — Learn Next.js Visually'
const DESCRIPTION =
  'Free interactive Next.js tutorial with visual diagrams. Learn SSR, CSR, App Router, Hydration, CSS Modules and more — no textbook walls, just clear visuals.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    'Next.js tutorial',
    'learn Next.js',
    'Next.js notes',
    'Next.js for beginners',
    'Next.js App Router',
    'Next.js SSR',
    'Next.js CSR',
    'Next.js hydration',
    'Next.js routing',
    'React framework tutorial',
    'server side rendering explained',
    'Next.js visual guide',
    'Next.js cheatsheet',
  ],
  authors: [{ name: 'NextJS Notes' }],
  creator: 'NextJS Notes',
  publisher: 'NextJS Notes',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NextJS Notes — Learn Next.js Visually',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: 'en-IN',
    },
    {
      '@type': 'EducationalCourse',
      '@id': `${SITE_URL}/#course`,
      name: 'Learn Next.js Visually',
      description: DESCRIPTION,
      url: SITE_URL,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      educationalLevel: 'Beginner',
      about: [
        { '@type': 'Thing', name: 'Next.js' },
        { '@type': 'Thing', name: 'React' },
        { '@type': 'Thing', name: 'Web Development' },
      ],
      teaches: [
        'Web Evolution Timeline',
        'Next.js Core Concepts',
        'Server-Side Rendering',
        'Client-Side Rendering',
        'Next.js App Router',
        'Hydration',
        'CSS Modules',
      ],
      isAccessibleForFree: true,
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="google-site-verification" content="EnOkm6nczwsrOwiK_CSyEFvwzeZG3q_ZgRN-N_zrlB0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Background orbs */}
        <div className="bg-orbs" aria-hidden="true">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
        </div>

        <ProgressBar />
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
