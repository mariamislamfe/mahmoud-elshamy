'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/client'
import type { Complaint, ComplaintStatus } from '@/lib/database.types'
import { getStatusColor, getStatusText, getStatusIcon } from '@/lib/helpers'

function TrackingContent() {
  const searchParams = useSearchParams()
  const codeFromUrl = searchParams.get('code') || ''

  const [trackingCode, setTrackingCode] = useState(codeFromUrl)
  const [complaint, setComplaint] = useState<Complaint | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (codeFromUrl) {
      handleTrack(codeFromUrl)
    }
  }, [codeFromUrl])

  const handleTrack = async (code?: string) => {
    const searchCode = code || trackingCode
    if (!searchCode.trim()) {
      setError('يرجى إدخال كود التتبع')
      return
    }

    setLoading(true)
    setError('')
    setComplaint(null)

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('tracking_code', searchCode.toUpperCase())
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('الشكوى غير موجودة. يرجى التحقق من كود التتبع.')
        }
        throw error
      }

      setComplaint(data)
    } catch (err: any) {
      setError(err.message || 'فشل في تتبع الشكوى')
    } finally {
      setLoading(false)
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
              <h1 className="text-4xl font-bold mb-4">تتبع شكواك</h1>
              <p className="text-xl text-gray-200">
                أدخل كود التتبع للاطلاع على حالة الشكوى
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Tracking Form */}
              <div className="card mb-8">
                <h2 className="text-xl font-bold text-navy mb-4">أدخل كود التتبع</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleTrack()
                  }}
                  className="flex gap-4"
                >
                  <input
                    type="text"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                    placeholder="مثال: C123456"
                    className="input-field flex-1"
                    maxLength={10}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'جاري البحث...' : 'تتبع'}
                  </button>
                </form>

                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </div>

              {/* Complaint Details */}
              {complaint && (
                <div className="card mb-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-navy mb-2">
                        تفاصيل الشكوى
                      </h2>
                      <p className="text-gray-600">كود التتبع: {complaint.tracking_code}</p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {getStatusIcon(complaint.status)} {getStatusText(complaint.status)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">الاسم</label>
                        <p className="text-gray-900">{complaint.full_name || 'غير متوفر'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">الفئة</label>
                        <p className="text-gray-900">{complaint.category}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">وصف المشكلة</label>
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {complaint.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">الموقع</label>
                        <p className="text-gray-900">{complaint.location}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          رقم التواصل
                        </label>
                        <p className="text-gray-900">{complaint.phone}</p>
                      </div>
                    </div>

                    {complaint.image_url && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">الصورة المرفقة</label>
                        <img
                          src={complaint.image_url}
                          alt="صورة الشكوى"
                          className="mt-2 rounded-lg max-w-md border border-gray-200"
                        />
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          تاريخ التقديم
                        </label>
                        <p className="text-gray-900">
                          {new Date(complaint.created_at).toLocaleDateString('ar-EG', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          آخر تحديث
                        </label>
                        <p className="text-gray-900">
                          {new Date(complaint.updated_at).toLocaleDateString('ar-EG', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>

                    {complaint.admin_notes && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <label className="text-sm font-medium text-navy">
                          رد الإدارة
                        </label>
                        <p className="text-gray-700 mt-2 whitespace-pre-wrap">
                          {complaint.admin_notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Status Timeline */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-bold text-navy mb-4">المراحل</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold ml-4">
                          ✓
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">تم تقديم الشكوى</p>
                          <p className="text-sm text-gray-500">
                            {new Date(complaint.created_at).toLocaleDateString('ar-EG')}
                          </p>
                        </div>
                      </div>

                      {complaint.status !== 'not_reviewed' && (
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold ml-4">
                            ✓
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">تم المراجعة</p>
                            <p className="text-sm text-gray-500">
                              تم تحويلها للقسم المختص
                            </p>
                          </div>
                        </div>
                      )}

                      {(complaint.status === 'in_progress' || complaint.status === 'completed') && (
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold ml-4">
                            ✓
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">جاري التنفيذ</p>
                            <p className="text-sm text-gray-500">الشكوى قيد التنفيذ</p>
                          </div>
                        </div>
                      )}

                      {complaint.status === 'completed' && (
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold ml-4">
                            ✓
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">تم الإنجاز</p>
                            <p className="text-sm text-gray-500">
                              تم حل الشكوى بنجاح
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <TrackingContent />
    </Suspense>
  )
}
