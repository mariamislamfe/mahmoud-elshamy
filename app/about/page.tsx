import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* رأس الصفحة */}
        <section className="bg-gradient-to-br from-navy to-navy-light text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-2">الأستاذ / محمود الشامي</h1>
              <p className="text-xl text-gold-light mb-4">نائب دائرة [اسم الدائرة]</p>
              <p className="text-gray-300 max-w-2xl mx-auto">
                ملتزم بخدمة المجتمع بنزاهة وشفافية والعمل على تحسين جودة الحياة لجميع المواطنين
              </p>
            </div>
          </div>
        </section>

        {/* السيرة الذاتية */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-black text-navy mb-8 text-center">السيرة الذاتية</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  يخدم الأستاذ [اسم النائب] كعضو في مجلس النواب عن دائرة [اسم الدائرة] منذ عام [السنة].
                  بخلفية في [المجال/المهنة]، يجلب خبرة واسعة في الخدمة العامة وتنمية المجتمع.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  خلال فترة عمله، قاد مبادرات في إصلاح التعليم، الوصول إلى الرعاية الصحية، تطوير البنية
                  التحتية، والتمكين الاقتصادي. التزامه بالحوكمة الشفافة أدى إلى إنشاء هذه المنصة الرقمية
                  لخدمات المواطنين.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  يحمل الأستاذ [اسم النائب] درجة [الدرجة العلمية] من [الجامعة] وقد خدم سابقاً في مناصب
                  مختلفة منها [المناصب السابقة]. متزوج وله [عدد] من الأبناء ويشارك بنشاط في المنظمات المجتمعية.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* الرؤية والرسالة */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">الرؤية</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    بناء مجتمع مزدهر وشامل حيث يحصل كل مواطن على خدمات عالية الجودة وفرص
                    اقتصادية ويشارك بفعالية في الحوكمة الديمقراطية.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">الرسالة</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    تمثيل المواطنين بنزاهة، الدفاع عن السياسات التقدمية، ضمان تقديم الخدمات بشفافية،
                    وسد الفجوة بين الحكومة والمواطنين من خلال الابتكار الرقمي.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* الأولويات الرئيسية */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-black text-navy mb-4 text-center">الأولويات الرئيسية</h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                مجالات التركيز لتنمية المجتمع ورفاهية المواطنين
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-r-4 border-red-500 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">الرعاية الصحية</h3>
                  <p className="text-gray-600">
                    تحسين المرافق الصحية، تقليل أوقات الانتظار، وضمان الخدمات الطبية المتاحة لجميع المواطنين.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-r-4 border-blue-500 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">التعليم</h3>
                  <p className="text-gray-600">
                    تعزيز البنية التحتية التعليمية، تدريب المعلمين، وبرامج دعم الطلاب.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-r-4 border-gray-500 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">البنية التحتية</h3>
                  <p className="text-gray-600">
                    تطوير الطرق والمرافق العامة لتحسين جودة الحياة.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-r-4 border-indigo-500 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">التوظيف</h3>
                  <p className="text-gray-600">
                    خلق فرص عمل، دعم المشاريع الصغيرة، وبرامج التدريب المهني.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-r-4 border-green-500 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">البيئة</h3>
                  <p className="text-gray-600">
                    تعزيز الممارسات المستدامة، المساحات الخضراء، ومبادرات الطاقة النظيفة.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-r-4 border-amber-500 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">العدالة الاجتماعية</h3>
                  <p className="text-gray-600">
                    ضمان المساواة في الحقوق، حماية الفئات الضعيفة، وتعزيز السياسات الشاملة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* الإنجازات */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-black text-navy mb-12 text-center">أهم الإنجازات</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4 hover:shadow-2xl transition">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    ١
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy mb-2">
                      إطلاق منصة الخدمات الرقمية للمواطنين
                    </h3>
                    <p className="text-gray-600">
                      تنفيذ هذه البوابة الإلكترونية التي تتيح الوصول إلى الخدمات على مدار الساعة وتتبع الشكاوى،
                      مما يحسن الشفافية وأوقات الاستجابة.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4 hover:shadow-2xl transition">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    ٢
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy mb-2">
                      تأمين تمويل لمركز صحي مجتمعي
                    </h3>
                    <p className="text-gray-600">
                      نجح في الحصول على تمويل لبناء منشأة رعاية صحية جديدة تخدم آلاف السكان.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4 hover:shadow-2xl transition">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    ٣
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy mb-2">
                      مشاريع تطوير البنية التحتية
                    </h3>
                    <p className="text-gray-600">
                      أشرف على إنجاز العديد من مشاريع تحسين الطرق وترقية المرافق العامة في جميع أنحاء الدائرة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
