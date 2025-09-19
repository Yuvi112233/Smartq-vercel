'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Calendar, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button'

interface NavigationProps {
  user?: {
    name: string
    role: 'customer' | 'salon_owner' | 'admin'
  } | null
}

export default function Navigation({ user }: NavigationProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const customerLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: User },
    { href: '/salons', label: 'Find Salons', icon: Calendar },
    { href: '/bookings', label: 'My Bookings', icon: Calendar },
  ]

  const salonOwnerLinks = [
    { href: '/salon/dashboard', label: 'Dashboard', icon: User },
    { href: '/salon/queue', label: 'Queue Management', icon: Calendar },
    { href: '/salon/services', label: 'Services', icon: Settings },
    { href: '/salon/settings', label: 'Settings', icon: Settings },
  ]

  const links = user?.role === 'salon_owner' ? salonOwnerLinks : customerLinks

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">✂️</span>
              <span className="text-xl font-bold text-gray-900">SmartQ</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                {links.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
                
                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Hi, {user.name}</span>
                  <Button variant="ghost" size="sm">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {user ? (
              <div className="space-y-2">
                {links.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === link.href
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="px-3 py-2 text-sm text-gray-700">Hi, {user.name}</div>
                  <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/auth/login" className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link href="/auth/signup" className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
