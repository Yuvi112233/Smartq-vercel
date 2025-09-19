'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { MapPin, Star, Clock, Users, Phone, Calendar, DollarSign, ArrowLeft } from 'lucide-react'

// Mock data
const mockUser = {
  name: 'John Doe',
  role: 'customer' as const
}

const mockSalon = {
  id: '1',
  name: 'Elite Hair Studio',
  rating: 4.8,
  reviewCount: 124,
  distance: '0.5 km',
  address: '123 Main Street, Downtown',
  phone: '+1 (555) 123-4567',
  waitTime: '15 min',
  image: '✂️',
  type: 'unisex',
  priceRange: '$$',
  description: 'A modern hair studio offering premium styling services for men and women. Our experienced stylists use the latest techniques and high-quality products to ensure you leave looking and feeling your best.',
  openUntil: '8:00 PM',
  currentQueue: 3,
  photos: ['🏪', '💺', '✂️', '🪞', '🧴', '💇‍♀️'],
  hours: {
    'Monday': '9:00 AM - 8:00 PM',
    'Tuesday': '9:00 AM - 8:00 PM',
    'Wednesday': '9:00 AM - 8:00 PM',
    'Thursday': '9:00 AM - 9:00 PM',
    'Friday': '9:00 AM - 9:00 PM',
    'Saturday': '8:00 AM - 6:00 PM',
    'Sunday': '10:00 AM - 5:00 PM'
  },
  services: [
    { id: '1', name: 'Men\'s Haircut', price: 35, duration: 30, description: 'Classic and modern cuts' },
    { id: '2', name: 'Women\'s Cut & Style', price: 65, duration: 60, description: 'Cut, wash, and styling' },
    { id: '3', name: 'Beard Trim', price: 20, duration: 20, description: 'Professional beard grooming' },
    { id: '4', name: 'Hair Wash & Blow Dry', price: 25, duration: 30, description: 'Wash and professional styling' },
    { id: '5', name: 'Color Touch-up', price: 85, duration: 90, description: 'Root touch-up and color refresh' },
    { id: '6', name: 'Full Color', price: 120, duration: 120, description: 'Complete hair coloring service' }
  ],
  reviews: [
    {
      id: '1',
      customerName: 'Sarah M.',
      rating: 5,
      comment: 'Amazing service! The stylist really understood what I wanted.',
      date: '2 days ago',
      service: 'Women\'s Cut & Style'
    },
    {
      id: '2',
      customerName: 'Mike R.',
      rating: 5,
      comment: 'Best haircut I\'ve had in years. Very professional.',
      date: '1 week ago',
      service: 'Men\'s Haircut'
    },
    {
      id: '3',
      customerName: 'Emma L.',
      rating: 4,
      comment: 'Great atmosphere and skilled stylists. Will come back!',
      date: '2 weeks ago',
      service: 'Color Touch-up'
    }
  ]
}

export default function SalonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [showBookingForm, setShowBookingForm] = useState(false)

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const selectedServiceDetails = mockSalon.services.filter(service => 
    selectedServices.includes(service.id)
  )

  const totalPrice = selectedServiceDetails.reduce((sum, service) => sum + service.price, 0)
  const totalDuration = selectedServiceDetails.reduce((sum, service) => sum + service.duration, 0)

  const handleBooking = () => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service')
      return
    }
    setShowBookingForm(true)
  }

  const confirmBooking = () => {
    // TODO: Implement booking logic
    console.log('Booking confirmed:', { services: selectedServices, salon: mockSalon.id })
    alert('Booking confirmed! You will receive a confirmation SMS shortly.')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Salons
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Salon Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <span className="text-4xl">{mockSalon.image}</span>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">{mockSalon.name}</h1>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-medium text-gray-900 ml-1">{mockSalon.rating}</span>
                        <span className="text-gray-600 ml-1">({mockSalon.reviewCount} reviews)</span>
                      </div>
                      <span className="text-gray-600">{mockSalon.priceRange}</span>
                      <span className="text-gray-600 capitalize">{mockSalon.type}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {mockSalon.address} • {mockSalon.distance}
                    </div>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Phone className="w-4 h-4 mr-1" />
                      {mockSalon.phone}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600 mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="font-medium">{mockSalon.waitTime}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {mockSalon.currentQueue} in queue
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{mockSalon.description}</p>

                {/* Photos */}
                <div className="grid grid-cols-6 gap-2">
                  {mockSalon.photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {photo}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Services</h2>
                <p className="text-gray-600">Select the services you'd like to book</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSalon.services.map((service) => (
                    <div 
                      key={service.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedServices.includes(service.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedServices.includes(service.id)}
                              onChange={() => handleServiceToggle(service.id)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <h3 className="font-medium text-gray-900">{service.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 ml-6">{service.description}</p>
                          <div className="flex items-center space-x-4 mt-2 ml-6 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {service.duration} min
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              ${service.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSalon.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{review.customerName}</h4>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">{review.service}</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card className="sticky top-8">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Booking Summary</h3>
              </CardHeader>
              <CardContent>
                {selectedServices.length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {selectedServiceDetails.map((service) => (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">{service.name}</span>
                          <span className="text-gray-900">${service.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Total Duration:</span>
                        <span>{totalDuration} minutes</span>
                      </div>
                      <div className="flex justify-between font-medium text-gray-900 mt-1">
                        <span>Total Price:</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handleBooking}
                    >
                      Join Queue
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">Select services to book</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hours */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Hours</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(mockSalon.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-gray-700">{day}</span>
                      <span className="text-gray-900">{hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Salon
                </Button>
                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" className="w-full">
                  ❤️ Add to Favorites
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking Confirmation Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Booking</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Selected Services:</h4>
                    <div className="space-y-1">
                      {selectedServiceDetails.map((service) => (
                        <div key={service.id} className="text-sm text-gray-700">
                          {service.name} - ${service.price}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Duration:</span>
                      <span>{totalDuration} minutes</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Price:</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <p className="text-sm text-blue-800">
                      You'll be added to the queue and receive SMS updates about your position and estimated wait time.
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setShowBookingForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={confirmBooking}
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
