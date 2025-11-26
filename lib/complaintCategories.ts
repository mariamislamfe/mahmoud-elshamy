export interface ComplaintCategory {
  id: string
  name: string
  icon: string
  description: string
  subcategories: string[]
  fields: ComplaintField[]
}

export interface ComplaintField {
  name: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'tel' | 'file'
  required: boolean
  options?: string[]
  placeholder?: string
}

export const complaintCategories: ComplaintCategory[] = [
  {
    id: 'health',
    name: 'مشاكل صحية',
    icon: '🏥',
    description: 'مشاكل المستشفيات والمراكز الصحية والخدمات الطبية',
    subcategories: [
      'فترات انتظار طويلة',
      'نقص المعدات الطبية',
      'نقص الكادر الطبي',
      'مشاكل النظافة',
      'نقص الأدوية',
      'خدمات الطوارئ',
      'أخرى'
    ],
    fields: [
      {
        name: 'subcategory',
        label: 'نوع المشكلة',
        type: 'select',
        required: true,
        options: [],
      },
      {
        name: 'hospital_name',
        label: 'اسم المستشفى/العيادة',
        type: 'text',
        required: true,
        placeholder: 'اسم المنشأة الصحية',
      },
      {
        name: 'description',
        label: 'وصف تفصيلي',
        type: 'textarea',
        required: true,
        placeholder: 'صف المشكلة التي واجهتها...',
      },
      {
        name: 'location',
        label: 'الموقع/العنوان',
        type: 'text',
        required: true,
        placeholder: 'عنوان المستشفى أو الموقع',
      },
      {
        name: 'phone',
        label: 'رقم الهاتف للتواصل',
        type: 'tel',
        required: true,
        placeholder: '+20XXXXXXXXXX',
      },
    ],
  },
  {
    id: 'education',
    name: 'مشاكل تعليمية',
    icon: '📚',
    description: 'مشاكل المدارس والجامعات والمرافق التعليمية',
    subcategories: [
      'مشاكل البنية التحتية',
      'نقص المعلمين',
      'مشاكل المناهج',
      'سلامة المدرسة',
      'النقل المدرسي',
      'المرافق',
      'أخرى'
    ],
    fields: [
      {
        name: 'subcategory',
        label: 'نوع المشكلة',
        type: 'select',
        required: true,
        options: [],
      },
      {
        name: 'school_name',
        label: 'اسم المدرسة/المؤسسة',
        type: 'text',
        required: true,
        placeholder: 'اسم المؤسسة التعليمية',
      },
      {
        name: 'description',
        label: 'وصف تفصيلي',
        type: 'textarea',
        required: true,
        placeholder: 'اشرح المشكلة بالتفصيل...',
      },
      {
        name: 'location',
        label: 'عنوان المدرسة',
        type: 'text',
        required: true,
        placeholder: 'العنوان الكامل',
      },
      {
        name: 'phone',
        label: 'رقم الهاتف للتواصل',
        type: 'tel',
        required: true,
        placeholder: '+20XXXXXXXXXX',
      },
    ],
  },
  {
    id: 'infrastructure',
    name: 'مشاكل بنية تحتية',
    icon: '🏗️',
    description: 'الطرق والمرافق والمشاريع العامة',
    subcategories: [
      'تلف الطرق',
      'إنارة الشوارع',
      'إمدادات المياه',
      'مشاكل الصرف الصحي',
      'الكهرباء',
      'مشاكل البناء',
      'أخرى'
    ],
    fields: [
      {
        name: 'subcategory',
        label: 'نوع المشكلة',
        type: 'select',
        required: true,
        options: [],
      },
      {
        name: 'description',
        label: 'وصف تفصيلي',
        type: 'textarea',
        required: true,
        placeholder: 'صف مشكلة البنية التحتية...',
      },
      {
        name: 'location',
        label: 'الموقع الدقيق',
        type: 'text',
        required: true,
        placeholder: 'اسم الشارع، المنطقة، معالم',
      },
      {
        name: 'phone',
        label: 'رقم الهاتف للتواصل',
        type: 'tel',
        required: true,
        placeholder: '+20XXXXXXXXXX',
      },
    ],
  },
  {
    id: 'social',
    name: 'مشاكل اجتماعية',
    icon: '⚖️',
    description: 'المساعدة القانونية والرعاية الاجتماعية وخدمات الدعم المجتمعي',
    subcategories: [
      'مساعدة قانونية',
      'دعم اجتماعي',
      'مشاكل الإسكان',
      'خدمات الأسرة',
      'انتهاك الحقوق',
      'الأوراق الثبوتية',
      'أخرى'
    ],
    fields: [
      {
        name: 'subcategory',
        label: 'نوع المشكلة',
        type: 'select',
        required: true,
        options: [],
      },
      {
        name: 'description',
        label: 'وصف تفصيلي',
        type: 'textarea',
        required: true,
        placeholder: 'صف حالتك...',
      },
      {
        name: 'location',
        label: 'الموقع/الاختصاص',
        type: 'text',
        required: true,
        placeholder: 'الموقع ذو الصلة أو الاختصاص',
      },
      {
        name: 'phone',
        label: 'رقم الهاتف للتواصل',
        type: 'tel',
        required: true,
        placeholder: '+20XXXXXXXXXX',
      },
    ],
  },
  {
    id: 'economic',
    name: 'مشاكل اقتصادية',
    icon: '💼',
    description: 'فرص العمل ودعم الأعمال والمساعدة المالية',
    subcategories: [
      'فرص عمل',
      'تراخيص الأعمال',
      'مساعدة مالية',
      'برامج تدريبية',
      'مشاكل الأسواق',
      'التصاريح',
      'أخرى'
    ],
    fields: [
      {
        name: 'subcategory',
        label: 'نوع المشكلة',
        type: 'select',
        required: true,
        options: [],
      },
      {
        name: 'description',
        label: 'وصف تفصيلي',
        type: 'textarea',
        required: true,
        placeholder: 'اشرح طلبك أو مشكلتك...',
      },
      {
        name: 'location',
        label: 'اسم العمل/الموقع',
        type: 'text',
        required: true,
        placeholder: 'اسم العمل أو الموقع إن أمكن',
      },
      {
        name: 'phone',
        label: 'رقم الهاتف للتواصل',
        type: 'tel',
        required: true,
        placeholder: '+20XXXXXXXXXX',
      },
    ],
  },
  {
    id: 'services',
    name: 'خدمات عامة',
    icon: '🏛️',
    description: 'مشاكل الخدمات الحكومية والإدارية',
    subcategories: [
      'تأخر الخدمة',
      'سوء جودة الخدمة',
      'مشاكل الوثائق',
      'سلوك الموظفين',
      'الوصول للمعلومات',
      'أخرى'
    ],
    fields: [
      {
        name: 'subcategory',
        label: 'نوع الشكوى',
        type: 'select',
        required: true,
        options: [],
      },
      {
        name: 'description',
        label: 'وصف تفصيلي',
        type: 'textarea',
        required: true,
        placeholder: 'يرجى تقديم تفاصيل كاملة عن شكواك...',
      },
      {
        name: 'location',
        label: 'موقع الخدمة/القسم',
        type: 'text',
        required: true,
        placeholder: 'مثال: المبنى الحكومي الرئيسي، الطابق الثاني',
      },
      {
        name: 'phone',
        label: 'رقم الهاتف للتواصل',
        type: 'tel',
        required: true,
        placeholder: '+20XXXXXXXXXX',
      },
    ],
  },
]

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
  user_id: string
  category: string
  subcategory: string
  description: string
  location: string
  phone: string
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