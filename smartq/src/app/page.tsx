'use client'

import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import Button from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={null} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to SmartQ
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Your modern salon queue management system. Skip the wait, book your spot, and get real-time updates.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Customers</h3>
              <p className="text-gray-600 mb-4">
                Join queues, track your position, and get real-time updates via SMS
              </p>
              <Link href="/auth/signup">
                <Button variant="outline" size="sm">Join as Customer</Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✂️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Salon Owners</h3>
              <p className="text-gray-600 mb-4">
                Manage your salon, services, and customer queues efficiently
              </p>
              <Link href="/auth/signup">
                <Button variant="outline" size="sm">Start Your Salon</Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Mobile-First</h3>
              <p className="text-gray-600 mb-4">
                Optimized for mobile devices with responsive design
              </p>
              <Button variant="ghost" size="sm">Learn More</Button>
            </div>
          </div>
          
          <div className="space-x-4">
            <Link href="/salons">
              <Button size="lg">Find Salons</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg">Sign In</Button>
            </Link>
          </div>
          
          {/* Features Section */}
          <div className="mt-20 text-left max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose SmartQ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600">⏰</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Real-time Updates</h3>
                  <p className="text-gray-600">Get SMS notifications about your queue position and estimated wait time.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location-based</h3>
                  <p className="text-gray-600">Find salons near you with accurate wait times and availability.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600">⭐</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Reviews & Ratings</h3>
                  <p className="text-gray-600">Read reviews and see ratings to choose the best salon for you.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-600">💳</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Easy Booking</h3>
                  <p className="text-gray-600">Book multiple services at once and pay seamlessly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}