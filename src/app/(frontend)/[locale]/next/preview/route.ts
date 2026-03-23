// /app/api/preview/route.ts
import { getPayload, type PayloadRequest } from 'payload'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import configPromise from '@payload-config'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (!path || !previewSecret) {
    return new Response('Insufficient search params', { status: 404 })
  }

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const payload = await getPayload({ config: configPromise })
  let user

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
  } catch (err) {
    return new Response('Nie jesteś zalogowany', { status: 403 })
  }

  if (!user) {
    return new Response('Nie jesteś zalogowany', { status: 403 })
  }

  // Włącz tryb draft dla Next.js
  const draft = await draftMode()
  draft.enable()

  redirect(path)
}