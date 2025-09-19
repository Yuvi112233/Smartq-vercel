'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { MapPin, Star, Clock, Filter, Search, Users } from 'lucide-react'

// Mock data
const mockUser = {
  name: 'John Doe',
  role: 'customer' as const
}

const mockSalons = [
  {
    id: '1',
    name: 'Elite Hair Studio',
    rating: 4.8,
    reviewCount: 124,
    distance: '0.5 km',
    address: '123 Main Street, Downtown',
    waitTime: '15 min',
    image: '✂️',
    type: 'unisex',
    priceRange: '$$',
    services: ['Haircut', 'Styling', 'Beard Trim', 'Hair Wash'],
    openUntil: '8:00 PM',
    currentQueue: 3,
    photos: ['🏪', '💺', '✂️']
  },
  {
    id: '2',
    name: 'Glamour Salon',
    rating: 4.6,
    reviewCount: 89,
    distance: '1.2 km',
    address: '456 Oak Avenue, Midtown',
    waitTime: '30 min',
    image: '💇‍♀️',
    type: 'women',
    priceRange: '$$$',
    services: ['Hair Color', 'Highlights', 'Treatment', 'Styling'],
    openUntil: '7:00 PM',
    currentQueue: 5,
    photos: ['🏪', '💺', '🎨']
  },
  {
    id: '3',
    name: 'Modern Cuts',
    rating: 4.7,
    reviewCount: 156,
    distance: '0.8 km',
    address: '789 Pine Street, Uptown',
    waitTime: '20 min',
    image: '✂️',
    type: 'men',
    priceRange: '$',
    services: ['Haircut', 'Shave', 'Beard Styling', 'Hair Wash'],
    openUntil: '9:00 PM',
    currentQueue: 2,
    photos: ['🏪', '🪑', '✂️']
  },
  {
    id: '4',
    name: 'Luxury Spa & Salon',
    rating: 4.9,
    reviewCount: 203,
    distance: '2.1 km',
    address: '321 Elm Street, Westside',
    waitTime: '45 min',
    image: '💆‍♀️',
    type: 'unisex',
    priceRange: '$$$$',
    services: ['Full Service', 'Spa Treatment', 'Massage', 'Facial'],
    openUntil: '6:00 PM',
    currentQueue: 8,
    photos: ['🏨', '💆‍♀️', '🌸']
  }
]

export default function SalonsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('distance')

  const filteredSalons = mockSalons.filter(salon => {
    const matchesSearch = salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salon.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'all' || salon.type === selectedType
    const matchesPrice = selectedPriceRange === 'all' || salon.priceRange === selectedPriceRange
    
    return matchesSearch && matchesType && matchesPrice
  })

  const sortedSalons = [...filteredSalons].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance)
      case 'waitTime':
        return parseInt(a.waitTime) - parseInt(b.waitTime)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Salons Near You</h1>
          <p className="text-gray-600 mt-2">Discover and book appointments at the best salons in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search salons or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="men">Men's Salon</option>
                <option value="women">Women's Salon</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="$">$ - Budget</option>
                <option value="$$">$$ - Moderate</option>
                <option value="$$$">$$$ - Premium</option>
                <option value="$$$$">$$$$ - Luxury</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
                <option value="waitTime">Wait Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedSalons.map((salon) => (
            <Card key={salon.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">{salon.image}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{salon.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900 ml-1">{salon.rating}</span>
                          <span className="text-sm text-gray-600 ml-1">({salon.reviewCount})</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{salon.priceRange}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600 capitalize">{salon.type}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {salon.address} • {salon.distance}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-green-600 mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {salon.waitTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {salon.currentQueue} in queue
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {salon.services.slice(0, 4).map((service) => (
                      <span key={service} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                        {service}
                      </span>
                    ))}
                    {salon.services.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                        +{salon.services.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Photos */}
                <div className="flex space-x-2 mb-4">
                  {salon.photos.map((photo, index) => (
                    <div key={index} className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {photo}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Link href={`/salons/${salon.id}`} className="flex-1">
                    <Button className="w-full">Book Now</Button>
                  </Link>
                  <Button variant="outline" className="flex-1">View Details</Button>
                  <Button variant="ghost" size="sm">
                    ❤️
                  </Button>
                </div>

                {/* Hours */}
                <div className="mt-3 text-sm text-gray-600">
                  Open until {salon.openUntil} today
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedSalons.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No salons found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
