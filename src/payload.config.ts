import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, LocalizationConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { en } from './languages/en'
import { pl } from './languages/pl'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { s3Storage } from '@payloadcms/storage-s3'
import localization from './i18n/localization'
import { Testimonials } from './collections/Testimonials'
import { Articles } from './collections/Articles'
import { ArticleCategories } from './collections/ArticleCategories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isBuild = process.env.BUILD === 'true'

export default buildConfig({
  admin: {
    components: {
      Nav: '@/components/AdminNav#AdminNav',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
      url: ({ collectionConfig, data, locale }) =>
        `/${locale}/${collectionConfig?.slug === 'pages' ? (data.slug !== 'home' ? data.slug : '') : ''}`,
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url:
      isBuild || process.env.NODE_ENV === 'development'
        ? process.env.BUILD_DATABASE || ''
        : process.env.DATABASE_URI || '',
  }),
  collections:
  [
   Pages,
   Posts,
   Media,
   Categories,
   Users,
   Testimonials,
   Articles,
   ArticleCategories
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    Header,
    Footer
  ],
  localization: localization as LocalizationConfig,
  i18n: {
    supportedLanguages: { en, pl },
    fallbackLanguage: 'en',
    translations: { en, pl },
  },
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.AWS_S3_BUCKET_NAME || '',
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.AWS_DEFAULT_REGION,
        forcePathStyle: true,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
