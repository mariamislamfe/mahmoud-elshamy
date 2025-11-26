import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-navy via-navy-light to-navy text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* عن البوابة */}
          <div>
            <h3 className="text-xl font-black mb-4 text-gold">بوابة النائب</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              البوابة الرسمية لخدمات المواطنين توفر حكومة شفافة وخدمات فعالة
              للمجتمع.
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-gold text-sm transition-colors duration-200">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-gold text-sm transition-colors duration-200">
                  عن النائب
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-gold text-sm transition-colors duration-200">
                  خدمات المواطنين
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-gray-300 hover:text-gold text-sm transition-colors duration-200">
                  تتبع الشكوى
                </Link>
              </li>
            </ul>
          </div>

          {/* تصنيفات الخدمات */}
          <div>
            <h3 className="text-lg font-bold mb-4">تصنيفات الخدمات</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-gold">🏥</span> مشاكل صحية
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">📚</span> مشاكل تعليمية
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">🏗️</span> بنية تحتية
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">⚖️</span> مشاكل اجتماعية
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">💼</span> مشاكل اقتصادية
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">🏛️</span> خدمات عامة
              </li>
            </ul>
          </div>

          {/* معلومات الاتصال */}
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-gold">📍</span>
                <span>[عنوان مكتب الدائرة الانتخابية]</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">📞</span>
                <span dir="ltr">+20 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✉️</span>
                <span>info@parliament.gov.eg</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">🕐</span>
                <span>الأحد - الخميس: ٩ ص - ٥ م</span>
              </li>
            </ul>
          </div>
        </div>

        {/* الحقوق */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p className="font-medium">© {new Date().getFullYear()} بوابة النائب البرلماني. جميع الحقوق محفوظة.</p>
          <p className="mt-2">ملتزمون بالشفافية والمساءلة ورعاية المواطنين.</p>
          {/* إضافة اسم المطور */}
          <p className="mt-2 text-gold/80">
            Developed by <span className="font-bold">Websity</span>
          </p>
        </div>
      </div>
    </footer>
  )
}