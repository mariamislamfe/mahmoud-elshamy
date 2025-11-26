import {
  ComplaintStatus,
  ComplaintStatusArabic,
  ComplaintStatusColors,
  ComplaintStatusIcons
} from './database.types'

/**
 * الحصول على اسم الحالة بالعربية
 */
export function getStatusText(status: ComplaintStatus): string {
  return ComplaintStatusArabic[status] || status
}

/**
 * الحصول على لون الحالة
 */
export function getStatusColor(status: ComplaintStatus): string {
  return ComplaintStatusColors[status] || 'bg-gray-100 text-gray-800'
}

/**
 * الحصول على أيقونة الحالة
 */
export function getStatusIcon(status: ComplaintStatus): string {
  return ComplaintStatusIcons[status] || ''
}

/**
 * تحويل التاريخ لصيغة عربية
 */
export function formatArabicDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date

  return d.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * تحويل الأرقام للأرقام العربية (الهندية)
 */
export function toArabicNumbers(num: number | string): string {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  return String(num).replace(/\d/g, (digit) => arabicNumbers[parseInt(digit)])
}

/**
 * حساب الوقت المنقضي بالعربي
 */
export function getTimeAgo(date: string | Date): string {
  const now = new Date()
  const then = typeof date === 'string' ? new Date(date) : date
  const diffMs = now.getTime() - then.getTime()

  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'الآن'
  if (diffMins < 60) return `منذ ${toArabicNumbers(diffMins)} دقيقة`
  if (diffHours < 24) return `منذ ${toArabicNumbers(diffHours)} ساعة`
  if (diffDays < 7) return `منذ ${toArabicNumbers(diffDays)} يوم`

  return formatArabicDate(date)
}

/**
 * تنسيق رقم الهاتف
 */
export function formatPhoneNumber(phone: string): string {
  // إزالة كل شيء ما عدا الأرقام
  const cleaned = phone.replace(/\D/g, '')

  // تنسيق رقم مصري
  if (cleaned.startsWith('20')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }

  return phone
}

/**
 * اختصار النص الطويل
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * التحقق من صلاحية رقم الهاتف المصري
 */
export function isValidEgyptianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')

  // يجب أن يبدأ بـ 20 ويكون 12 رقم
  // أو يبدأ بـ 01 ويكون 11 رقم
  return (
    (cleaned.startsWith('20') && cleaned.length === 12) ||
    (cleaned.startsWith('01') && cleaned.length === 11)
  )
}

/**
 * الحصول على أيقونة التصنيف
 */
export function getCategoryIcon(category: string): string {
  return '' // تم إزالة الإيموجي لمظهر أكثر احترافية
}

/**
 * الحصول على اسم التصنيف المختصر
 */
export function getCategoryShortName(category: string): string {
  const categoryLower = category.toLowerCase()

  if (categoryLower.includes('صح') || categoryLower.includes('health')) return 'صحية'
  if (categoryLower.includes('تعلي') || categoryLower.includes('educat')) return 'تعليمية'
  if (categoryLower.includes('بنية') || categoryLower.includes('infrastruct')) return 'بنية تحتية'
  if (categoryLower.includes('اجتماع') || categoryLower.includes('social') || categoryLower.includes('legal')) return 'اجتماعية'
  if (categoryLower.includes('اقتصاد') || categoryLower.includes('economic')) return 'اقتصادية'

  return 'خدمات عامة'
}
