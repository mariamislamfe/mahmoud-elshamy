'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Article } from '@/lib/database.types'
import Link from 'next/link'

export default function ArticlesAdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [brief, setBrief] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(true)

  useEffect(() => {
    checkAdminStatus()
  }, [])

  useEffect(() => {
    if (isAdmin === true) {
      fetchArticles()
    }
  }, [isAdmin])

  const checkAdminStatus = async () => {
    const supabase = createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      setIsAdmin(false)
      router.push('/admin/login')
      return
    }

    // Check if user is in admins table
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('*')
      .eq('email', user.email)
      .single()

    if (adminError || !adminData) {
      setIsAdmin(false)
      router.push('/admin/login')
    } else {
      setIsAdmin(true)
    }
  }

  const fetchArticles = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error:', error)
    } else {
      setArticles(data || [])
    }
    setLoading(false)
  }

  const handleOpenModal = (article?: Article) => {
    if (article) {
      setEditingArticle(article)
      setTitle(article.title)
      setBrief(article.brief)
      setContent(article.content)
      setPublished(article.published)
    } else {
      setEditingArticle(null)
      setTitle('')
      setBrief('')
      setContent('')
      setPublished(true)
    }
    setImageFile(null)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingArticle(null)
    setImageFile(null)
  }

  const uploadImage = async () => {
    if (!imageFile) return null

    const supabase = createClient()
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(filePath, imageFile)

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return null
    }

    const { data } = supabase.storage.from('article-images').getPublicUrl(filePath)
    return data.publicUrl
  }

  const handleSave = async () => {
    if (!title.trim() || !brief.trim() || !content.trim()) {
      alert('الرجاء ملء جميع الحقول المطلوبة')
      return
    }

    setUploading(true)
    const supabase = createClient()

    let imageUrl = editingArticle?.image_url || null
    if (imageFile) {
      const uploadedUrl = await uploadImage()
      if (uploadedUrl) imageUrl = uploadedUrl
    }

    const articleData = {
      title,
      brief,
      content,
      image_url: imageUrl,
      published,
    }

    if (editingArticle) {
      // Update
      const { error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', editingArticle.id)

      if (error) {
        alert('حدث خطأ في التحديث')
        console.error(error)
      } else {
        alert('تم التحديث بنجاح')
        handleCloseModal()
        fetchArticles()
      }
    } else {
      // Insert
      const { error } = await supabase.from('articles').insert([articleData])

      if (error) {
        alert('حدث خطأ في الإضافة')
        console.error(error)
      } else {
        alert('تم الإضافة بنجاح')
        handleCloseModal()
        fetchArticles()
      }
    }

    setUploading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return

    const supabase = createClient()
    const { error } = await supabase.from('articles').delete().eq('id', id)

    if (error) {
      alert('حدث خطأ في الحذف')
      console.error(error)
    } else {
      alert('تم الحذف بنجاح')
      fetchArticles()
    }
  }

  const handleTogglePublish = async (article: Article) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('articles')
      .update({ published: !article.published })
      .eq('id', article.id)

    if (error) {
      alert('حدث خطأ')
      console.error(error)
    } else {
      fetchArticles()
    }
  }

  // Loading State
  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg mx-auto mb-6 animate-pulse">
            <span className="text-navy text-4xl font-black">ن</span>
          </div>
          <p className="text-white text-lg font-bold">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    )
  }

  // Access Denied - Redirecting
  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg mx-auto mb-6 animate-pulse">
            <span className="text-navy text-4xl font-black">ن</span>
          </div>
          <p className="text-white text-lg font-bold">جاري التوجيه...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-navy hover:text-gold transition">
                ← العودة للوحة التحكم
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-gold text-2xl font-black">ن</span>
                </div>
                <div>
                  <div className="text-navy font-black text-xl">إدارة المقالات</div>
                  <div className="text-gray-500 text-xs font-medium">إضافة وتعديل المقالات</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenModal()}
              className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
            >
              ➕ مقال جديد
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* إحصائيات */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition border-r-4 border-navy">
            <div className="text-4xl font-black text-navy mb-2">{articles.length}</div>
            <div className="text-gray-600 font-bold text-sm">إجمالي المقالات</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition border-r-4 border-green-400">
            <div className="text-4xl font-black text-green-600 mb-2">
              {articles.filter((a) => a.published).length}
            </div>
            <div className="text-gray-600 font-bold text-sm">منشور</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition border-r-4 border-gray-400">
            <div className="text-4xl font-black text-gray-600 mb-2">
              {articles.filter((a) => !a.published).length}
            </div>
            <div className="text-gray-600 font-bold text-sm">مسودة</div>
          </div>
        </div>

        {/* جدول المقالات */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-500 font-bold">جاري التحميل...</div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📰</div>
              <div className="text-gray-500 font-bold">لا توجد مقالات</div>
              <button
                onClick={() => handleOpenModal()}
                className="mt-4 bg-gold hover:bg-gold-dark text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
              >
                أضف أول مقال
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="px-6 py-4 text-right font-bold">الصورة</th>
                    <th className="px-6 py-4 text-right font-bold">العنوان</th>
                    <th className="px-6 py-4 text-right font-bold">الوصف</th>
                    <th className="px-6 py-4 text-right font-bold">الحالة</th>
                    <th className="px-6 py-4 text-right font-bold">التاريخ</th>
                    <th className="px-6 py-4 text-right font-bold">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        {article.image_url ? (
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                            📰
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold max-w-xs">
                        <div className="line-clamp-2">{article.title}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                        <div className="line-clamp-2">{article.brief}</div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(article)}
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            article.published
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          } transition`}
                        >
                          {article.published ? '✓ منشور' : '○ مسودة'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(article.created_at).toLocaleDateString('ar-EG')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenModal(article)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition"
                          >
                            ✏️ تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition"
                          >
                            🗑️ حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
            <div className="sticky top-0 bg-navy text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-black">
                {editingArticle ? 'تعديل المقال' : 'مقال جديد'}
              </h2>
            </div>

            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* العنوان */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  عنوان المقال *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none"
                  placeholder="أدخل عنوان المقال"
                />
              </div>

              {/* الوصف المختصر */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  الوصف المختصر * (يظهر في البطاقة)
                </label>
                <textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none resize-none"
                  rows={3}
                  placeholder="وصف مختصر للمقال"
                />
              </div>

              {/* المحتوى الكامل */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  المحتوى الكامل *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none resize-none"
                  rows={10}
                  placeholder="اكتب محتوى المقال الكامل هنا..."
                />
              </div>

              {/* الصورة */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">صورة المقال</label>
                {editingArticle?.image_url && !imageFile && (
                  <div className="mb-3">
                    <img
                      src={editingArticle.image_url}
                      alt="Current"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none"
                />
                {imageFile && (
                  <div className="mt-2 text-sm text-gray-600">
                    تم اختيار: {imageFile.name}
                  </div>
                )}
              </div>

              {/* حالة النشر */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-5 h-5 text-gold border-gray-300 rounded focus:ring-gold"
                />
                <label htmlFor="published" className="text-sm font-bold text-gray-700">
                  نشر المقال (سيظهر في الصفحة الرئيسية)
                </label>
              </div>

              {/* أزرار الحفظ والإلغاء */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={uploading}
                  className="flex-1 bg-gold hover:bg-gold-dark text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50"
                >
                  {uploading ? 'جاري الحفظ...' : editingArticle ? 'حفظ التغييرات' : 'إضافة المقال'}
                </button>
                <button
                  onClick={handleCloseModal}
                  disabled={uploading}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
