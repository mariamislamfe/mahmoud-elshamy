'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { complaintCategories } from '@/lib/complaintCategories'
import { createClient } from '@/lib/supabase/client'

function ComplaintFormContent() {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('category')
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<any>({
    fullName: '',
    nationalId: '',
    phone: '',
    subcategory: '',
    description: '',
    location: ''
  })

  const category = complaintCategories.find((cat) => cat.id === categoryId)

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Category not found</p>
            <button
              onClick={() => router.push('/services')}
              className="btn-primary"
            >
              Back to Services
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      const complaintData = {
        full_name: formData.fullName || '',
        national_id: formData.nationalId || '',
        category: category.name,
        subcategory: formData.subcategory || '',
        description: formData.description || '',
        location: formData.location || '',
        phone: formData.phone || '',
        status: 'not_reviewed',
      }

      const { data, error: insertError } = await supabase
        .from('complaints')
        .insert([complaintData])
        .select()
        .single()

      if (insertError) throw insertError

      router.push(`/complaints/success?code=${data.tracking_code}`)
    } catch (err: any) {
      console.error('Submission error:', err)
      setError(err.message || 'Failed to submit complaint. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-navy to-navy-light text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => router.back()}
                className="text-white hover:text-gold mb-4 inline-flex items-center text-sm"
              >
                ← Back to Categories
              </button>
              <div className="flex items-center space-x-4">
                <div className="text-5xl">{category.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                  <p className="text-gray-200">{category.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Complaint Form */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="card space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-navy mb-2">Submit Your Complaint</h2>
                  <p className="text-gray-600 text-sm">
                    Please provide accurate information for faster resolution
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="أدخل اسمك الكامل"
                    className="input-field"
                  />
                </div>

                {/* National ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الرقم القومي <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nationalId || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, nationalId: e.target.value })
                    }
                    placeholder="أدخل الرقم القومي (14 رقم)"
                    maxLength={14}
                    pattern="[0-9]{14}"
                    className="input-field"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    الرقم القومي المكون من 14 رقم - سيستخدم لتتبع الشكوى
                  </p>
                </div>

                {/* Subcategory Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complaint Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.subcategory || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, subcategory: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="">Select complaint type</option>
                    {category.subcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.description || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Please provide complete details about your complaint. Include dates, times, and any relevant information..."
                    className="input-field resize-none"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Minimum 50 characters. Be specific and clear.
                  </p>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location/Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g., Main Street, District Center, or specific facility name"
                    className="input-field"
                  />
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+20XXXXXXXXXX"
                    className="input-field"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    We may contact you for additional information
                  </p>
                </div>

                {/* Additional Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-navy mb-2">What happens next?</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Your complaint will be reviewed within 48 hours</li>
                    <li>• You will receive a tracking code</li>
                    <li>• Status updates will be available on your dashboard</li>
                    <li>• We may contact you if additional information is needed</li>
                  </ul>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Complaint'}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function ComplaintFormPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navy mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    }>
      <ComplaintFormContent />
    </Suspense>
  )
}
