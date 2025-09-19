'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Users, Clock, DollarSign, TrendingUp, Calendar, Star, AlertCircle } from 'lucide-react'

// Mock data
const mockUser = {
  name: 'Sarah Johnson',
  role: 'salon_owner' as const
}

const mockStats = {
  todayCustomers: 24,
  avgWaitTime: 18,
  todayRevenue: 1250,
  monthlyGrowth: 12.5,
  currentQueue: 6,
  rating: 4.8
}

const mockQueue = [
  {
    id: '1',
    customerName: 'Alice Smith',
    service: 'Haircut & Styling',
    estimatedTime: 45,
    joinedAt: '2:30 PM',
    status: 'in-progress'
  },
  {
    id: '2',
    customerName: 'Bob Wilson',
    service: 'Beard Trim',
    estimatedTime: 20,
    joinedAt: '2:45 PM',
    status: 'waiting'
  },
  {
    id: '3',
    customerName: 'Carol Davis',
    service: 'Hair Color',
    estimatedTime: 90,
    joinedAt: '3:00 PM',
    status: 'waiting'
  },
  {
    id: '4',
    customerName: 'David Brown',
    service: 'Haircut',
    estimatedTime: 30,
    joinedAt: '3:15 PM',
    status: 'waiting'
  }
]

const mockRecentBookings = [
  {
    id: '1',
    customerName: 'Emma Wilson',
    service: 'Hair Treatment',
    time: '1:00 PM',
    status: 'completed',
    amount: 85
  },
  {
    id: '2',
    customerName: 'Mike Johnson',
    service: 'Haircut',
    time: '12:30 PM',
    status: 'completed',
    amount: 35
  },
  {
    id: '3',
    customerName: 'Lisa Chen',
    service: 'Highlights',
    time: '11:45 AM',
    status: 'no-show',
    amount: 120
  }
]

export default function SalonDashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  const handleStatusUpdate = (customerId: string, newStatus: string) => {
    console.log(`Updating customer ${customerId} to ${newStatus}`)
    // TODO: Implement status update logic
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Salon Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your salon operations and customer queue</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.todayCustomers}</p>
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
                  <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.avgWaitTime}m</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${mockStats.todayRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                  <p className="text-2xl font-bold text-gray-900">+{mockStats.monthlyGrowth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Queue */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Current Queue ({mockStats.currentQueue})</h2>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Refresh</Button>
                    <Button size="sm">Add Customer</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {mockQueue.length > 0 ? (
                  <div className="space-y-4">
                    {mockQueue.map((customer, index) => (
                      <div 
                        key={customer.id} 
                        className={`border rounded-lg p-4 ${
                          customer.status === 'in-progress' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">#{index + 1}</span>
                              <h3 className="font-medium text-gray-900">{customer.customerName}</h3>
                              {customer.status === 'in-progress' && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  In Progress
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{customer.service}</p>
                            <p className="text-sm text-gray-500">Joined at {customer.joinedAt}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{customer.estimatedTime} min</p>
                            <p className="text-xs text-gray-500">Estimated</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {customer.status === 'waiting' && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => handleStatusUpdate(customer.id, 'in-progress')}
                              >
                                Start Service
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleStatusUpdate(customer.id, 'no-show')}
                              >
                                No Show
                              </Button>
                            </>
                          )}
                          {customer.status === 'in-progress' && (
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => handleStatusUpdate(customer.id, 'completed')}
                            >
                              Complete Service
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            Contact
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No customers in queue</p>
                    <Button className="mt-4">Add Customer</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Schedule
                </Button>
                <Button className="w-full" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Services
                </Button>
                <Button className="w-full" variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  View Reviews
                </Button>
                <Button className="w-full" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRecentBookings.map((booking) => (
                    <div key={booking.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{booking.customerName}</p>
                        <p className="text-xs text-gray-600">{booking.service} • {booking.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${booking.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          booking.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Alerts</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Long wait time</p>
                      <p className="text-xs text-gray-600">Current wait time exceeds 20 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">New review</p>
                      <p className="text-xs text-gray-600">5-star review from Emma Wilson</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
