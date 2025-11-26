'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { complaintCategories } from '@/lib/complaintCategories'
import { createClient } from '@/lib/supabase/client'

export default function ServicesPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1 = اختيار الفئة، 2 = تعبئة البيانات
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')

  // بيانات الفورم
  const [fullName, setFullName] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleCategorySelect = (categoryId: string, categoryNameAr: string) => {
    setSelectedCategory(categoryId)
    setCategoryName(categoryNameAr)
    setStep(2)
  }

  const uploadImage = async () => {
    if (!imageFile) return null

    const supabase = createClient()
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `complaint-${Date.now()}-${Math.floor(Math.random() * 10000)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('complaint-images')
      .upload(fileName, imageFile)

    if (uploadError) {
      console.error('خطأ في رفع الصورة:', uploadError)
      return null
    }

    const { data } = supabase.storage.from('complaint-images').getPublicUrl(fileName)
    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const supabase = createClient()

      // رفع الصورة إن وجدت
      let imageUrl = null
      if (imageFile) {
        console.log('🖼️ جاري رفع الصورة...')
        imageUrl = await uploadImage()
        if (imageUrl) {
          console.log('✅ تم رفع الصورة:', imageUrl)
        } else {
          console.warn('⚠️ فشل رفع الصورة')
        }
      }

      // توليد tracking code يدوياً
      const trackingCode = 'C' + Math.floor(100000 + Math.random() * 900000).toString()
      console.log('🎫 كود التتبع:', trackingCode)

      const complaintData: any = {
        full_name: fullName,
        phone,
        category: selectedCategory,
        subcategory: selectedCategory,
        description,
        location,
        image_url: imageUrl,
        attachments: [],
        status: 'not_reviewed' as const,
        tracking_code: trackingCode
      }

      // إضافة national_id فقط لو موجود
      if (nationalId) {
        complaintData.national_id = nationalId
      }

      console.log('📝 جاري إضافة الشكوى:', complaintData)

      // إضافة الشكوى بدون user_id (مباشرة بدون تسجيل دخول)
      const { data, error } = await supabase
        .from('complaints')
        .insert([complaintData])
        .select()

      // طباعة التفاصيل الكاملة
      console.log('📊 Response:', { data, error })

      if (error) {
        console.error('❌ خطأ تفصيلي:', error)
        console.error('البيانات المرسلة:', complaintData)

        // رسالة خطأ واضحة للمستخدم
        const errorMsg = error.message || 'خطأ غير معروف'
        const errorCode = error.code || 'لا يوجد كود'
        alert(`❌ خطأ في إرسال الشكوى:\n\nالرسالة: ${errorMsg}\nالكود: ${errorCode}\n\nالتفاصيل: ${JSON.stringify(error)}\n\nيرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني.`)
        setSubmitting(false)
        return
      }

      if (data && data.length > 0 && data[0]) {
        console.log('✅ تم إضافة الشكوى بنجاح!', data[0])
        // التوجيه لصفحة النجاح مع كود التتبع
        const code = data[0].tracking_code || trackingCode
        console.log('🎉 التوجيه لصفحة النجاح مع الكود:', code)
        router.push(`/complaints/success?code=${code}`)
      } else {
        console.error('❌ لم يتم إرجاع بيانات الشكوى')
        alert('❌ حدث خطأ: تم إرسال الشكوى لكن لم نتمكن من الحصول على كود التتبع.\n\nيرجى التواصل مع الدعم الفني.')
        setSubmitting(false)
      }
    } catch (err: any) {
      console.error('💥 خطأ استثنائي:', err)
      console.error('الرسالة:', err?.message)
      console.error('Stack:', err?.stack)

      const errorMessage = err?.message || 'خطأ غير معروف'
      alert(`💥 حدث خطأ غير متوقع:\n\n${errorMessage}\n\nيرجى المحاولة مرة أخرى.`)
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" lang="ar">
      <Header />

      <main className="flex-1 bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-navy to-navy-light text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">تقديم شكوى</h1>
              <p className="text-xl text-gray-200">
                {step === 1 ? 'اختر نوع الشكوى' : `${categoryName} - تفاصيل الشكوى`}
              </p>
            </div>
          </div>
        </section>

        {/* الخطوة 1: اختيار الفئة */}
        {step === 1 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {complaintCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id, category.name)}
                      className="card hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-gold text-right"
                    >
                      <div className="flex items-start space-x-4 space-x-reverse">
                        <div className="text-5xl group-hover:scale-110 transition-transform">
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-gold transition">
                            {category.name}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            {category.description}
                          </p>
                          <div className="text-gold font-medium text-sm inline-flex items-center group-hover:translate-x-2 transition-transform">
                            تقديم شكوى ←
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* معلومات إضافية */}
                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-navy mb-3">معلومات هامة</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-gold ml-2">✓</span>
                      <span>يتم مراجعة جميع الشكاوى خلال 48 ساعة</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold ml-2">✓</span>
                      <span>ستحصل على كود تتبع لمتابعة حالة شكواك</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold ml-2">✓</span>
                      <span>يرجى تقديم معلومات دقيقة لحل أسرع</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold ml-2">✓</span>
                      <span>يمكنك إرفاق صورة توضيحية (اختياري)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* الخطوة 2: تعبئة البيانات */}
        {step === 2 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                {/* زر الرجوع */}
                <button
                  onClick={() => setStep(1)}
                  className="mb-6 text-navy hover:text-gold transition inline-flex items-center gap-2"
                >
                  → الرجوع لاختيار فئة أخرى
                </button>

                {/* الفورم */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-navy mb-6 text-center">
                    تفاصيل الشكوى
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* الاسم الكامل */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>

                    {/* الرقم القومي */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        الرقم القومي *
                      </label>
                      <input
                        type="text"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        required
                        maxLength={14}
                        pattern="[0-9]{14}"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="أدخل الرقم القومي (14 رقم)"
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        الرقم القومي المكون من 14 رقم - سيستخدم لتتبع الشكوى
                      </p>
                    </div>

                    {/* رقم الهاتف */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="مثال: 01234567890"
                      />
                    </div>

                    {/* الموقع/العنوان */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        الموقع/العنوان *
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="أدخل الموقع أو العنوان"
                      />
                    </div>

                    {/* وصف المشكلة */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        وصف المشكلة *
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                        placeholder="اشرح المشكلة بالتفصيل..."
                      />
                    </div>

                    {/* رفع صورة */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        📷 صورة توضيحية (اختياري)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      />
                      {imageFile && (
                        <p className="mt-2 text-sm text-green-600">
                          ✓ تم اختيار: {imageFile.name}
                        </p>
                      )}
                    </div>

                    {/* زر الإرسال */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'جاري الإرسال...' : 'إرسال الشكوى'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
