'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Clock, MapPin, Star, Calendar, Users, Phone, MessageSquare, X } from 'lucide-react'

interface Booking {
  id: string;
  salon: {
    name: string;
    address: string;
    phone: string;
    image: string;
  };
  services: string[];
  totalPrice: number;
  estimatedTime: number;
  bookedAt: string;
  status: 'waiting' | 'confirmed' | 'completed' | 'cancelled';
  position: number | null;
  estimatedWait: number | null;
  queueId: string;
  completedAt?: string;
  rating?: number;
}

// Mock data
const mockUser = {
  name: 'John Doe',
  role: 'customer' as const
}

const mockBookings: Booking[] = [
  {
    id: '1',
    salon: {
      name: 'Elite Hair Studio',
      address: '123 Main Street, Downtown',
      phone: '+1 (555) 123-4567',
      image: '✂️'
    },
    services: ['Haircut & Styling', 'Hair Wash'],
    totalPrice: 90,
    estimatedTime: 45,
    bookedAt: '2024-01-20T14:30:00',
    status: 'waiting',
    position: 2,
    estimatedWait: 25,
    queueId: 'q1'
  },
  {
    id: '2',
    salon: {
      name: 'Glamour Salon',
      address: '456 Oak Avenue, Midtown',
      phone: '+1 (555) 234-5678',
      image: '💇‍♀️'
    },
    services: ['Hair Color'],
    totalPrice: 120,
    estimatedTime: 90,
    bookedAt: '2024-01-22T10:00:00',
    status: 'confirmed',
    position: null,
    estimatedWait: null,
    queueId: 'q2'
  },
  {
    id: '3',
    salon: {
      name: 'Modern Cuts',
      address: '789 Pine Street, Uptown',
      phone: '+1 (555) 345-6789',
      image: '✂️'
    },
    services: ['Haircut', 'Beard Trim'],
    totalPrice: 55,
    estimatedTime: 50,
    bookedAt: '2024-01-18T16:00:00',
    status: 'completed',
    position: null,
    estimatedWait: null,
    queueId: 'q3',
    completedAt: '2024-01-18T17:30:00',
    rating: 5
  },
  {
    id: '4',
    salon: {
      name: 'Luxury Spa & Salon',
      address: '321 Elm Street, Westside',
      phone: '+1 (555) 456-7890',
      image: '💆‍♀️'
    },
    services: ['Full Service'],
    totalPrice: 200,
    estimatedTime: 120,
    bookedAt: '2024-01-15T11:00:00',
    status: 'cancelled',
    position: null,
    estimatedWait: null,
    queueId: 'q4'
  }
]

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [filter, setFilter] = useState('all')

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    return booking.status === filter
  })

  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      ))
    }
  }

  const handleRateBooking = (bookingId: string, rating: number) => {
    setBookings(prev => prev.map(booking => {
      if (booking.id === bookingId) {
        const updatedBooking: Booking = {
          ...booking,
          rating,
          position: null,
          estimatedWait: null,
          completedAt: new Date().toISOString(),
          status: 'completed'
        };
        return updatedBooking;
      }
      return booking;
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const activeBookings = bookings.filter(b => ['waiting', 'confirmed'].includes(b.status))
  const pastBookings = bookings.filter(b => ['completed', 'cancelled'].includes(b.status))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">Track your salon appointments and queue positions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{activeBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Queue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bookings.filter(b => b.status === 'waiting').length}
                  </p>
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
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bookings.filter(b => b.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Visits</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bookings.filter(b => b.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All Bookings', count: bookings.length },
                { key: 'waiting', label: 'In Queue', count: bookings.filter(b => b.status === 'waiting').length },
                { key: 'confirmed', label: 'Upcoming', count: bookings.filter(b => b.status === 'confirmed').length },
                { key: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Active Bookings */}
        {activeBookings.length > 0 && (filter === 'all' || ['waiting', 'confirmed'].includes(filter)) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Bookings</h2>
            <div className="space-y-4">
              {activeBookings
                .filter(booking => filter === 'all' || booking.status === filter)
                .map((booking) => (
                <Card key={booking.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start space-x-4">
                        <span className="text-3xl">{booking.salon.image}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{booking.salon.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {booking.salon.address}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(booking.bookedAt)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status === 'waiting' ? 'In Queue' : 'Confirmed'}
                        </span>
                        {booking.position && (
                          <div className="mt-2 text-sm text-gray-600">
                            Position: #{booking.position}
                          </div>
                        )}
                        {booking.estimatedWait && (
                          <div className="text-sm text-gray-600">
                            ~{booking.estimatedWait} min wait
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.services.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-lg font-semibold text-gray-900">
                        Total: ${booking.totalPrice}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Past Bookings */}
        {pastBookings.length > 0 && (filter === 'all' || ['completed', 'cancelled'].includes(filter)) && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Bookings</h2>
            <div className="space-y-4">
              {pastBookings
                .filter(booking => filter === 'all' || booking.status === filter)
                .map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start space-x-4">
                        <span className="text-3xl opacity-60">{booking.salon.image}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{booking.salon.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {booking.salon.address}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(booking.bookedAt)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        {booking.completedAt && (
                          <div className="mt-2 text-sm text-gray-600">
                            Completed: {formatDate(booking.completedAt)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.services.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-lg font-semibold text-gray-900">
                        Total: ${booking.totalPrice}
                      </div>
                      <div className="flex items-center space-x-4">
                        {booking.status === 'completed' && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Rate:</span>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => handleRateBooking(booking.id, star)}
                                  className={`text-lg ${
                                    booking.rating && star <= booking.rating
                                      ? 'text-yellow-400'
                                      : 'text-gray-300 hover:text-yellow-400'
                                  }`}
                                >
                                  ★
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        <Button variant="outline" size="sm">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all' 
                ? "You haven't made any bookings yet" 
                : `No ${filter} bookings found`}
            </p>
            <Button>Find Salons</Button>
          </div>
        )}
      </div>
    </div>
  )
}
