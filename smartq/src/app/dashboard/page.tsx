'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/Navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Clock, MapPin, Star, Calendar, Users, Scissors } from 'lucide-react'

// Mock data
const mockUser = {
  name: 'John Doe',
  role: 'customer' as const,
  loyaltyPoints: 150
}

const mockBookings = [
  {
    id: '1',
    salon: 'Elite Hair Studio',
    service: 'Haircut & Styling',
    date: '2024-01-20',
    time: '2:00 PM',
    status: 'confirmed',
    position: 2,
    estimatedWait: 25
  },
  {
    id: '2',
    salon: 'Glamour Salon',
    service: 'Hair Color',
    date: '2024-01-18',
    time: '10:00 AM',
    status: 'completed',
    rating: 5
  }
]

const mockNearbySlons = [
  {
    id: '1',
    name: 'Elite Hair Studio',
    rating: 4.8,
    distance: '0.5 km',
    waitTime: '15 min',
    image: '✂️',
    services: ['Haircut', 'Styling', 'Beard Trim']
  },
  {
    id: '2',
    name: 'Glamour Salon',
    rating: 4.6,
    distance: '1.2 km',
    waitTime: '30 min',
    image: '💇‍♀️',
    services: ['Hair Color', 'Highlights', 'Treatment']
  },
  {
    id: '3',
    name: 'Modern Cuts',
    rating: 4.7,
    distance: '0.8 km',
    waitTime: '20 min',
    image: '✂️',
    services: ['Haircut', 'Shave', 'Styling']
  }
]

export default function CustomerDashboard() {
  const [activeBookings, setActiveBookings] = useState(mockBookings.filter(b => b.status !== 'completed'))
  const [recentBookings, setRecentBookings] = useState(mockBookings.filter(b => b.status === 'completed'))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {mockUser.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your bookings and discover new salons</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{activeBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Loyalty Points</p>
                  <p className="text-2xl font-bold text-gray-900">{mockUser.loyaltyPoints}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Scissors className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Visits</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Bookings */}
          <div>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Active Bookings</h2>
              </CardHeader>
              <CardContent>
                {activeBookings.length > 0 ? (
                  <div className="space-y-4">
                    {activeBookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{booking.salon}</h3>
                            <p className="text-sm text-gray-600">{booking.service}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {booking.date} at {booking.time}
                          </div>
                          {booking.position && (
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              Position: {booking.position}
                            </div>
                          )}
                          {booking.estimatedWait && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              ~{booking.estimatedWait} min
                            </div>
                          )}
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" variant="ghost">Cancel</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No active bookings</p>
                    <Button className="mt-4">Book Now</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Nearby Salons */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Nearby Salons</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNearbySlons.map((salon) => (
                    <div key={salon.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{salon.image}</span>
                          <div>
                            <h3 className="font-medium text-gray-900">{salon.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              {salon.rating}
                              <MapPin className="w-4 h-4 ml-2 mr-1" />
                              {salon.distance}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {salon.waitTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {salon.services.map((service) => (
                          <span key={service} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                      <Button size="sm" className="w-full">Book Now</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Bookings */}
        {recentBookings.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Recent Visits</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex justify-between items-center border border-gray-200 rounded-lg p-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{booking.salon}</h3>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {booking.rating && (
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        <Button size="sm" variant="outline">Book Again</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
