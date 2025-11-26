'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const trackingCode = searchParams.get('code')

  if (!trackingCode) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No tracking code found</p>
            <button onClick={() => router.push('/services')} className="btn-primary">
              Back to Services
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="card text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Success Message */}
              <h1 className="text-3xl font-bold text-navy mb-3">
                تم تقديم الشكوى بنجاح!
              </h1>
              <p className="text-gray-600 mb-8">
                تم استلام شكواك وسيتم مراجعتها من قبل فريقنا.
              </p>

              {/* Tracking Code */}
              <div className="bg-gradient-to-br from-navy to-navy-light rounded-lg p-8 mb-8">
                <p className="text-white text-sm mb-3">كود التتبع الخاص بك</p>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-4">
                  <p className="text-gold text-4xl font-bold tracking-wider" dir="ltr">
                    {trackingCode}
                  </p>
                </div>
                <p className="text-red-200 text-sm font-bold">
                  ⚠️ يرجى حفظ الكود في مكان آمن لتتبع الطلب من خلاله
                </p>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8" dir="rtl">
                <h3 className="font-bold text-navy mb-3">ماذا بعد؟</h3>
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center text-xs font-bold ml-3">
                      1
                    </span>
                    <div>
                      <strong>المراجعة (24-48 ساعة):</strong> سيقوم فريقنا بمراجعة شكواك وإحالتها إلى القسم المختص.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center text-xs font-bold ml-3">
                      2
                    </span>
                    <div>
                      <strong>التحقيق:</strong> سيتم التحقيق في الشكوى وقد نتصل بك للحصول على معلومات إضافية.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center text-xs font-bold ml-3">
                      3
                    </span>
                    <div>
                      <strong>الحل:</strong> بمجرد حل المشكلة، سيتم تحديث الحالة وسيتم إخطارك.
                    </div>
                  </li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4" dir="rtl">
                <Link href={`/track?code=${trackingCode}`} className="btn-primary flex-1 text-center">
                  تتبع هذه الشكوى
                </Link>
                <Link href="/services" className="btn-secondary flex-1 text-center">
                  تقديم شكوى أخرى
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t text-sm text-gray-600" dir="rtl">
                <p>
                  يمكنك تتبع شكواك في أي وقت باستخدام كود التتبع أعلاه أو الرقم القومي الخاص بك.
                  تأكد من حفظه للرجوع إليه مستقبلاً.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
