'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import type { Article } from '@/lib/database.types'

export default function ArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const articleId = params.id as string

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticle()
  }, [articleId])

  const fetchArticle = async () => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .eq('published', true)
      .single()

    if (error || !data) {
      console.error('خطأ في جلب المقال:', error)
      router.push('/')
    } else {
      setArticle(data)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" lang="ar">
      <Header />

      <main className="flex-1 bg-gray-50">
        {/* Hero Section with Image */}
        {article.image_url && (
          <div className="relative h-96 overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {article.title}
                </h1>
                <p className="text-xl text-gray-200">
                  {new Date(article.created_at).toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {!article.image_url && (
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
                    {article.title}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {new Date(article.created_at).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}

              {/* Brief */}
              <div className="bg-blue-50 border-r-4 border-gold p-6 rounded-lg mb-8">
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  {article.brief}
                </p>
              </div>

              {/* Content */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div
                  className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {article.content}
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-medium py-3 px-8 rounded-lg transition"
                >
                  ← العودة للصفحة الرئيسية
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
