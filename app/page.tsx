'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/client'
import type { Article } from '@/lib/database.types'

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(6)

    if (data) setArticles(data)
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* قسم البطل الرئيسي - Hero */}
<section className="relative overflow-hidden bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70 min-h-screen md:min-h-[540px] flex items-center pb-0">
  {/* صورة الخلفية */}
  <div
    className="absolute inset-0 bg-cover bg-center -z-10"
    style={{
      backgroundImage: "url('/images/hero-bg.jpg')",
    }}
  />

  {/* Pattern overlay for professional look */}
  <div className="absolute inset-0 bg-gradient-to-br from-navy/20 via-transparent to-gold/10 -z-5"></div>

  <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
      {/* النصوص - على اليمين - عرض كامل على الموبايل */}
<div className="col-span-1 md:col-span-7 lg:col-span-7 text-white space-y-3 md:space-y-5 pb-6 md:pb-10 md:order-1 animate-fade-in-up pt-8 md:pt-20">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-light text-white px-5 md:px-7 py-2.5 md:py-3.5 rounded-full text-sm md:text-base font-bold shadow-lg border border-white/20">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          <span>عضو مجلس النواب</span>
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-3 md:mb-5 leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          الأستاذ / <span className="text-gold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">محمود الشامي</span>
        </h1>

        <p className="text-2xl md:text-3xl lg:text-4xl text-gold-light mb-5 md:mb-7 font-bold animate-fade-in-up flex items-center gap-2 md:gap-3" style={{animationDelay: '0.2s'}}>
          <span className="w-1.5 h-7 md:h-9 bg-gold rounded-full"></span>
          نائب دائرة [اسم الدائرة]
        </p>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 md:mb-8 leading-relaxed max-w-2xl animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          ملتزم بتقديم خدمات متميزة للمواطنين وحل مشاكلهم بشفافية وسرعة
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <Link href="/services" className="group relative bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-white font-bold py-5 md:py-6 px-10 md:px-12 rounded-xl text-center text-lg md:text-xl shadow-2xl transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              تقديم شكوى
            </span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </Link>
          <Link href="/track" className="group bg-white/10 hover:bg-white/20 text-white font-bold py-5 md:py-6 px-10 md:px-12 rounded-xl border-2 border-white/30 hover:border-white/50 backdrop-blur-md text-center text-lg md:text-xl transition-all duration-300 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-gold rounded-full group-hover:animate-pulse"></span>
            تتبع شكوى
          </Link>
        </div>
      </div>

      {/* صورة النائب - على الشمال - مخفية على الموبايل */}
      <div className="hidden md:flex md:col-span-5 lg:col-span-5 justify-center md:justify-end items-end md:order-2 animate-fade-in-right relative">
        <div className="relative w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="relative">
            <img
              src="/images/member.png"
              alt="النائب"
              className="h-[540px] lg:h-[620px] w-auto mx-auto md:mx-0 md:ml-auto filter drop-shadow-2xl relative z-10"
              style={{
                objectFit: 'contain',
                objectPosition: 'bottom',
                transformOrigin: 'bottom center'
              }}
            />
            {/* Gradient fade من الأسفل */}
            <div className="absolute bottom-0 left-0 right-0 h-40 lg:h-48 bg-gradient-to-t from-navy via-navy/70 to-transparent z-20 pointer-events-none"></div>
          </div>
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 lg:w-80 h-32 bg-gold/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-20 right-0 w-20 md:w-24 h-20 md:h-24 bg-gold/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-40 left-0 w-12 md:w-16 h-12 md:h-16 bg-white/10 rounded-full blur-xl animate-float-delayed"></div>
        </div>
      </div>
    </div>
  </div>

  {/* CSS للأنيميشن */}
  <style jsx>{`
    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fade-in-right {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    @keyframes pulse-slow {
      0%, 100% {
        opacity: 0.3;
      }
      50% {
        opacity: 0.5;
      }
    }

    .animate-fade-in-up {
      animation: fade-in-up 0.8s ease-out forwards;
    }

    .animate-fade-in-right {
      animation: fade-in-right 1s ease-out forwards;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-float-delayed {
      animation: float 4s ease-in-out infinite;
      animation-delay: 1s;
    }

    .animate-pulse-slow {
      animation: pulse-slow 3s ease-in-out infinite;
    }

    @media (max-width: 768px) {
      .animate-fade-in-up,
      .animate-fade-in-right {
        animation: none;
        opacity: 1;
        transform: none;
      }
    }
  `}</style>
</section>
      {/* الإحصائيات */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 border-r-4 border-gold hover:scale-105 hover:-translate-y-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gold/10 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="text-6xl font-black bg-gradient-to-br from-navy to-navy-light bg-clip-text text-transparent mb-3 relative">١٢٣٤</div>
              </div>
              <div className="text-gray-600 font-bold flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-gold rounded-full"></span>
                <span>شكوى تم حلها</span>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 border-r-4 border-navy hover:scale-105 hover:-translate-y-2" style={{animationDelay: '0.1s'}}>
              <div className="relative">
                <div className="absolute inset-0 bg-navy/10 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="text-6xl font-black bg-gradient-to-br from-gold to-gold-light bg-clip-text text-transparent mb-3 relative">٤٨</div>
              </div>
              <div className="text-gray-600 font-bold flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-navy rounded-full"></span>
                <span>ساعة استجابة</span>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 border-r-4 border-gold hover:scale-105 hover:-translate-y-2" style={{animationDelay: '0.2s'}}>
              <div className="relative">
                <div className="absolute inset-0 bg-gold/10 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="text-6xl font-black bg-gradient-to-br from-navy to-navy-light bg-clip-text text-transparent mb-3 relative">٪٩٥</div>
              </div>
              <div className="text-gray-600 font-bold flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-gold rounded-full"></span>
                <span>معدل الرضا</span>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 border-r-4 border-navy hover:scale-105 hover:-translate-y-2" style={{animationDelay: '0.3s'}}>
              <div className="relative">
                <div className="absolute inset-0 bg-navy/10 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="text-6xl font-black bg-gradient-to-br from-gold to-gold-light bg-clip-text text-transparent mb-3 relative">٢٤/٧</div>
              </div>
              <div className="text-gray-600 font-bold flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-navy rounded-full"></span>
                <span>خدمة مستمرة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* الخدمات */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-12 h-1 bg-gold rounded-full"></span>
              <span className="text-gold font-bold">الخدمات الرئيسية</span>
              <span className="w-12 h-1 bg-gold rounded-full"></span>
            </div>
            <h2 className="text-5xl font-black text-navy mb-6">كيف نخدمك؟</h2>
            <p className="text-xl text-gray-600">اختر الخدمة المناسبة لك</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/services" className="group">
              <div className="relative bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-gold h-full overflow-hidden">
                {/* Icon background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-bl-full"></div>

                {/* Icon */}
                <div className="relative mb-6 w-20 h-20 bg-gradient-to-br from-gold to-gold-light rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <h3 className="text-3xl font-black text-navy mb-4 group-hover:text-gold transition-colors">تقديم شكوى</h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  قدم شكوى عن أي مشكلة تواجهها في الخدمات العامة أو البنية التحتية
                </p>
                <span className="text-gold font-bold text-lg inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  <span>ابدأ الآن</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </div>
            </Link>

            <Link href="/track" className="group">
              <div className="relative bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-navy h-full overflow-hidden">
                {/* Icon background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-navy/10 to-transparent rounded-bl-full"></div>

                {/* Icon */}
                <div className="relative mb-6 w-20 h-20 bg-gradient-to-br from-navy to-navy-light rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <h3 className="text-3xl font-black text-navy mb-4 group-hover:text-navy-light transition-colors">تتبع الشكوى</h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  تابع حالة شكواك المقدمة في الوقت الفعلي باستخدام كود التتبع
                </p>
                <span className="text-navy font-bold text-lg inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  <span>تتبع الآن</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </div>
            </Link>

            <Link href="/about" className="group">
              <div className="relative bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-gold h-full overflow-hidden">
                {/* Icon background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-bl-full"></div>

                {/* Icon */}
                <div className="relative mb-6 w-20 h-20 bg-gradient-to-br from-gold to-gold-light rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h3 className="text-3xl font-black text-navy mb-4 group-hover:text-gold transition-colors">عن النائب</h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  تعرف على رؤية النائب وأولوياته والتزامه تجاه المجتمع
                </p>
                <span className="text-gold font-bold text-lg inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  <span>اعرف المزيد</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* قسم الإنجازات */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy-light to-navy text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-3 h-3 bg-gold rounded-full animate-pulse"></span>
              <span className="text-gold font-bold text-sm tracking-widest uppercase">الإنجازات</span>
              <span className="w-3 h-3 bg-gold rounded-full animate-pulse"></span>
            </div>
            <h2 className="text-5xl font-black mb-4">إنجازات النائب</h2>
            <p className="text-xl text-gray-300">مشاكل تم حلها حسب التصنيف</p>
          </div>

          {/* قائمة الإنجازات */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { svg: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', title: 'مشاكل صحية', count: 85, description: 'تحسين الخدمات الصحية والمستشفيات', color: 'from-red-500 to-red-600' },
              { svg: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', title: 'مشاكل تعليمية', count: 123, description: 'تطوير المدارس والمرافق التعليمية', color: 'from-blue-500 to-blue-600' },
              { svg: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'بنية تحتية', count: 204, description: 'إصلاح الطرق والمرافق العامة', color: 'from-gray-500 to-gray-600' },
              { svg: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', title: 'مشاكل اجتماعية', count: 156, description: 'دعم الأسر والخدمات الاجتماعية', color: 'from-purple-500 to-purple-600' },
              { svg: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'مشاكل اقتصادية', count: 67, description: 'دعم المشاريع الصغيرة وفرص العمل', color: 'from-green-500 to-green-600' },
              { svg: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'خدمات عامة', count: 98, description: 'تحسين الخدمات الحكومية', color: 'from-orange-500 to-orange-600' },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-gold hover:scale-105"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.svg} />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold mb-1 truncate">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>

                  {/* Count */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-4xl font-black bg-gradient-to-br from-gold to-gold-light bg-clip-text text-transparent mb-1">
                      {item.count.toLocaleString('ar-EG')}
                    </div>
                    <div className="text-xs text-gray-400 font-medium">تم حلها</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم المقالات - Carousel متحرك */}
      {articles.length > 0 && (
        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4 mb-12">
            <div className="text-center">
              <h2 className="text-5xl font-black text-navy mb-4">📰 آخر المقالات</h2>
              <p className="text-xl text-gray-600">تابع أحدث الأخبار والمستجدات</p>
            </div>
          </div>

          {/* Carousel متحرك */}
          <div className="relative">
            <div className="flex animate-scroll gap-6" style={{
              animation: 'scroll 30s linear infinite',
              width: 'fit-content'
            }}>
              {[...articles, ...articles].map((article, index) => (
                <Link
                  key={`${article.id}-${index}`}
                  href={`/articles/${article.id}`}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer block"
                  style={{ minWidth: '320px' }}
                >
                  {/* صورة المقال */}
                  <div className="relative h-48 overflow-hidden">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-6xl">
                        📰
                      </div>
                    )}
                    {/* طبقة التعتيم على الصورة */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* العنوان على الصورة */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                  </div>

                  {/* الوصف المختصر */}
                  <div className="p-4">
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {article.brief}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                      <span>{new Date(article.created_at).toLocaleDateString('ar-EG')}</span>
                      <span className="text-gold font-bold group-hover:gap-2 inline-flex items-center transition-all">
                        اقرأ المزيد ←
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CSS للأنيميشن */}
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>
      )}

      <Footer />
    </div>
  )
}