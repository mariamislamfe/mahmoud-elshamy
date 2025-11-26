'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'عن النائب' },
    { href: '/services', label: 'الخدمات' },
    { href: '/track', label: 'تتبع شكوى' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-gold/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-gold text-2xl font-black">ن</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-navy font-black text-xl">بوابة النائب</div>
              <div className="text-gray-500 text-xs font-medium">خدمات المواطنين</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-bold transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-gray-700 hover:text-navy hover:scale-105'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 font-medium">مرحباً</span>
                <button
                  onClick={handleSignOut}
                  className="text-navy hover:text-gold font-bold transition-all duration-200 px-4 py-2 rounded-lg hover:bg-gold/10"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-gold hover:bg-gold-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-navy hover:text-gold transition-colors"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t-2 border-gray-100 animate-fadeIn">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-bold transition-all duration-200 py-2 px-4 rounded-lg ${
                    pathname === link.href
                      ? 'text-gold bg-gold/10'
                      : 'text-gray-700 hover:text-navy hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t-2 border-gray-100">
                {user ? (
                  <button
                    onClick={() => {
                      handleSignOut()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full text-navy hover:text-gold font-bold transition-all duration-200 py-3 px-4 rounded-lg hover:bg-gold/10 text-right"
                  >
                    تسجيل الخروج
                  </button>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block bg-gold hover:bg-gold-dark text-white font-bold py-3 px-6 rounded-lg text-center transition-all duration-200 shadow-lg"
                  >
                    تسجيل الدخول
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
