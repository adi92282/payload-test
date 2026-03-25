'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useConfig } from '@payloadcms/ui'
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  FolderKanban,
  Settings,
  Database,
  ArrowRightLeft,
  FileImageIcon,
  UsersRound,
  TagIcon,
  Newspaper,
  MessagesSquare,
  Tag,
  ClipboardList,
  Inbox,
  Search,
  LogOut,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'

const collectionIcons: Record<string, LucideIcon> = {
  pages: FileText,
  posts: BookOpen,
  redirects: ArrowRightLeft,
  media: FileImageIcon,
  projects: FolderKanban,
  categories: TagIcon,
  users: UsersRound,
  testimonials: MessagesSquare,
  articles: Newspaper,
  categoriesArticle: Tag,
  forms: ClipboardList,
  'form-submissions': Inbox,
  search: Search,
}

const globalIcons: Record<string, LucideIcon> = {
  settings: Settings,
  header: LayoutDashboard,
  footer: LayoutDashboard,
}

const hiddenCollections: string[] = [
  'payload-preferences',
  'payload-migrations',
  'payload-kv',
  'payload-jobs',
  'payload-folders',
  'payload-locked-documents',
]

const hiddenGlobals: string[] = []

const getLabel = (label: unknown, locale = 'pl'): string => {
  if (!label) return ''
  if (typeof label === 'string') return label
  if (typeof label === 'object') {
    const localeMap = label as Record<string, string>
    return localeMap[locale] ?? localeMap['en'] ?? Object.values(localeMap)[0] ?? ''
  }
  return ''
}

export const AdminNav: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { config } = useConfig()
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)

  const collections =
    config.collections?.filter((c) => !hiddenCollections.includes(c.slug)) ?? []

  const globals =
    config.globals?.filter((g) => !hiddenGlobals.includes(g.slug)) ?? []

  const linkStyle = (href: string, exact = false): React.CSSProperties => {
    const isActive = exact ? pathname === href : pathname.startsWith(href)
    const isHovered = hoveredHref === href

    return {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.4rem 0.75rem',
      borderRadius: '0.375rem',
      fontSize: '1.2rem',
      textDecoration: 'none',
      color: isActive || isHovered ? 'var(--theme-text)' : 'var(--theme-text-500)',
      backgroundColor: isActive
        ? 'var(--theme-elevation-100)'
        : isHovered
        ? 'var(--theme-elevation-50)'
        : 'transparent',
      transition: 'all 0.15s',
    }
  }

  const hoverProps = (href: string) => ({
    onMouseEnter: () => setHoveredHref(href),
    onMouseLeave: () => setHoveredHref(null),
  })

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--theme-text-500)',
    padding: '0.75rem 0.75rem 0.25rem',
    margin: 0,
  }

  // 🔥 LOGOUT
  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })

      router.push('/admin/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <nav
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.125rem',
        height: '100%',
      }}
    >
      {/* Dashboard */}
      <Link href="/admin" style={linkStyle('/admin', true)} {...hoverProps('/admin')}>
        <LayoutDashboard size={16} />
        Panel kontrolny
      </Link>

      {/* Collections */}
      {collections.length > 0 && (
        <>
          <p style={sectionLabelStyle}>Collections</p>
          {collections.map((collection) => {
            const href = `/admin/collections/${collection.slug}`
            const Icon = collectionIcons[collection.slug] ?? Database
            const label = getLabel(collection.labels?.plural) || collection.slug

            return (
              <Link key={collection.slug} href={href} style={linkStyle(href)} {...hoverProps(href)}>
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </>
      )}

      {/* Globals */}
      {globals.length > 0 && (
        <>
          <p style={sectionLabelStyle}>Globals</p>
          {globals.map((global) => {
            const href = `/admin/globals/${global.slug}`
            const Icon = globalIcons[global.slug] ?? Settings
            const label = getLabel(global.label) || global.slug

            return (
              <Link key={global.slug} href={href} style={linkStyle(href)} {...hoverProps(href)}>
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </>
      )}

      {/* 🔥 LOGOUT NA DOLE */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
        <hr style={{ margin: '0.5rem 0', borderColor: 'var(--theme-elevation-100)' }} />

        <button
          onClick={handleLogout}
          style={{
            ...linkStyle('/logout'),
            width: '100%',
            border: 'none',
            cursor: 'pointer',
            background: 'transparent',
            textAlign: 'left',
          }}
          {...hoverProps('/logout')}
        >
          <LogOut size={16} />
          Wyloguj
        </button>
      </div>
    </nav>
  )
}

export default AdminNav

