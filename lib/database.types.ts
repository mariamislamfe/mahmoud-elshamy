// حالات الشكوى المحدثة
export type ComplaintStatus = 'not_reviewed' | 'reviewed' | 'in_progress' | 'completed'

// الترجمة العربية للحالات
export const ComplaintStatusArabic: Record<ComplaintStatus, string> = {
  not_reviewed: 'لم تتراجع',
  reviewed: 'اتراجعت',
  in_progress: 'بتتنفذ',
  completed: 'تمت'
}

// الألوان لكل حالة
export const ComplaintStatusColors: Record<ComplaintStatus, string> = {
  not_reviewed: 'bg-gray-100 text-gray-800 border-gray-200',
  reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  completed: 'bg-green-100 text-green-800 border-green-200'
}

// الأيقونات لكل حالة
export const ComplaintStatusIcons: Record<ComplaintStatus, string> = {
  not_reviewed: '',
  reviewed: '',
  in_progress: '',
  completed: ''
}

export interface Complaint {
  id: string
  user_id?: string  // اختياري الآن
  full_name: string  // الاسم مباشرة
  national_id: string  // الرقم القومي
  category: string
  subcategory: string
  description: string
  location: string
  phone: string
  image_url?: string  // صورة واحدة اختيارية
  attachments: string[]
  status: ComplaintStatus
  tracking_code: string
  admin_notes?: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  phone: string
  full_name?: string
  national_id?: string
  created_at: string
}

// إحصائيات الإنجازات حسب التصنيف
export interface AchievementStats {
  health: number          // مشاكل صحية
  education: number       // مشاكل تعليمية
  infrastructure: number  // مشاكل بنية تحتية
  social: number         // مشاكل اجتماعية
  economic: number       // مشاكل اقتصادية
  services: number       // خدمات عامة
}

// الأرقام الافتراضية للإنجازات (يمكن تحديثها من قاعدة البيانات)
export const defaultAchievements: AchievementStats = {
  health: 85,
  education: 123,
  infrastructure: 204,
  social: 156,
  economic: 67,
  services: 98
}

// المقالات
export interface Article {
  id: string
  title: string
  brief: string
  content: string
  image_url?: string
  published: boolean
  created_at: string
  updated_at: string
}
