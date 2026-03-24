import { revalidateTag } from 'next/cache'

import { locales } from '@/i18n/config'

import type { Post } from '@/payload-types'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      for (const locale of locales) {
        const cacheTag = `post-${locale}-${doc.slug}`
        const blogPageTag = `blog-${locale}`

        try {
          payload.logger.info(`Attempting revalidation of cache tag: ${cacheTag}`)
          revalidateTag(cacheTag,'max')
          revalidateTag(blogPageTag,'max')
          payload.logger.info(`Successfully revalidated cache tags: ${cacheTag}, ${blogPageTag}`)
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : String(error)
          payload.logger.error(
            `Error attempting to revalidate cache tag: ${cacheTag}. Error: ${errorMsg}`,
          )
        }
      }

      revalidateTag('posts-sitemap','max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      // Revalidate all locale versions of the old post and blog pages
      for (const locale of locales) {
        const oldCacheTag = `post-${locale}-${previousDoc.slug}`
        const blogPageTag = `blog-${locale}`
        payload.logger.info(`Revalidating old post cache tag: ${oldCacheTag}`)
        revalidateTag(oldCacheTag,'max')
        revalidateTag(blogPageTag,'max')
      }

      revalidateTag('posts-sitemap','max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    // Revalidate all locale versions of the deleted post and blog pages
    for (const locale of locales) {
      const cacheTag = `post-${locale}-${doc?.slug}`
      const blogPageTag = `blog-${locale}`
      revalidateTag(cacheTag,'max')
      revalidateTag(blogPageTag,'max')
    }

    revalidateTag('posts-sitemap','max')
  }

  return doc
}
