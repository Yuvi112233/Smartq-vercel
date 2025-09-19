'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Users, Clock, Phone, MessageSquare, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react'

// Mock data
const mockUser = {
  name: 'Sarah Johnson',
  role: 'salon_owner' as const
}

const mockQueue = [
  {
    id: '1',
    customerName: 'Alice Smith',
    customerPhone: '+1 (555) 123-4567',
    services: ['Haircut & Styling', 'Hair Wash'],
    totalPrice: 90,
    estimatedTime: 45,
    joinedAt: '2:30 PM',
    status: 'in-progress',
    position: 1,
    notes: 'Prefers shorter layers'
  },
  {
    id: '2',
    customerName: 'Bob Wilson',
    customerPhone: '+1 (555) 234-5678',
    services: ['Beard Trim'],
    totalPrice: 20,
    estimatedTime: 20,
    joinedAt: '2:45 PM',
    status: 'waiting',
    position: 2,
    notes: ''
  },
  {
    id: '3',
    customerName: 'Carol Davis',
    customerPhone: '+1 (555) 345-6789',
    services: ['Hair Color', 'Cut & Style'],
    totalPrice: 185,
    estimatedTime: 120,
    joinedAt: '3:00 PM',
    status: 'waiting',
    position: 3,
    notes: 'First time customer'
  },
  {
    id: '4',
    customerName: 'David Brown',
    customerPhone: '+1 (555) 456-7890',
    services: ['Haircut'],
    totalPrice: 35,
    estimatedTime: 30,
    joinedAt: '3:15 PM',
    status: 'waiting',
    position: 4,
    notes: ''
  },
  {
    id: '5',
    customerName: 'Emma Wilson',
    customerPhone: '+1 (555) 567-8901',
    services: ['Highlights', 'Styling'],
    totalPrice: 150,
    estimatedTime: 90,
    joinedAt: '3:30 PM',
    status: 'waiting',
    position: 5,
    notes: 'Regular customer'
  }
]

const mockCompletedToday = [
  {
    id: 'c1',
    customerName: 'John Doe',
    services: ['Haircut'],
    totalPrice: 35,
    completedAt: '1:30 PM',
    rating: 5
  },
  {
    id: 'c2',
    customerName: 'Jane Smith',
    services: ['Hair Color', 'Cut'],
    totalPrice: 120,
    completedAt: '12:45 PM',
    rating: 4
  }
]

export default function QueueManagementPage() {
  const [queue, setQueue] = useState(mockQueue)
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    services: '',
    notes: ''
  })

  const handleStatusUpdate = (customerId: string, newStatus: string) => {
    setQueue(prev => prev.map(customer => 
      customer.id === customerId 
        ? { ...customer, status: newStatus }
        : customer
    ))
    
    // TODO: Send SMS notification to customer
    console.log(`Customer ${customerId} status updated to ${newStatus}`)
  }

  const handleRemoveFromQueue = (customerId: string) => {
    setQueue(prev => prev.filter(customer => customer.id !== customerId))
  }

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.services) {
      alert('Please fill in required fields')
      return
    }

    const customer = {
      id: Date.now().toString(),
      customerName: newCustomer.name,
      customerPhone: newCustomer.phone,
      services: newCustomer.services.split(',').map(s => s.trim()),
      totalPrice: 50, // TODO: Calculate based on services
      estimatedTime: 45, // TODO: Calculate based on services
      joinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'waiting',
      position: queue.length + 1,
      notes: newCustomer.notes
    }

    setQueue(prev => [...prev, customer])
    setNewCustomer({ name: '', phone: '', services: '', notes: '' })
    setShowAddCustomer(false)
  }

  const sendMessage = (customerId: string, phone: string) => {
    // TODO: Implement SMS sending
    console.log(`Sending message to ${phone}`)
    alert(`Message sent to ${phone}`)
  }

  const avgWaitTime = queue.length > 0 
    ? Math.round(queue.reduce((sum, customer) => sum + customer.estimatedTime, 0) / queue.length)
    : 0

  const totalRevenue = [...queue, ...mockCompletedToday].reduce((sum, customer) => sum + customer.totalPrice, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Queue Management</h1>
            <p className="text-gray-600 mt-2">Manage your customer queue and service flow</p>
          </div>
          <Button onClick={() => setShowAddCustomer(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Queue</p>
                  <p className="text-2xl font-bold text-gray-900">{queue.length}</p>
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
                  <p className="text-sm font-medium text-gray-600">Avg Wait</p>
                  <p className="text-2xl font-bold text-gray-900">{avgWaitTime}m</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Today</p>
                  <p className="text-2xl font-bold text-gray-900">{mockCompletedToday.length}</p>
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
                  <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
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
                <h2 className="text-xl font-semibold text-gray-900">Current Queue</h2>
              </CardHeader>
              <CardContent>
                {queue.length > 0 ? (
                  <div className="space-y-4">
                    {queue.map((customer, index) => (
                      <div 
                        key={customer.id} 
                        className={`border rounded-lg p-4 ${
                          customer.status === 'in-progress' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-bold text-lg text-gray-900">#{index + 1}</span>
                              <h3 className="font-medium text-gray-900">{customer.customerName}</h3>
                              {customer.status === 'in-progress' && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  In Progress
                                </span>
                              )}
                            </div>
                            
                            <div className="space-y-1 text-sm text-gray-600">
                              <p><strong>Services:</strong> {customer.services.join(', ')}</p>
                              <p><strong>Phone:</strong> {customer.customerPhone}</p>
                              <p><strong>Joined:</strong> {customer.joinedAt}</p>
                              {customer.notes && (
                                <p><strong>Notes:</strong> {customer.notes}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right ml-4">
                            <p className="text-lg font-bold text-gray-900">${customer.totalPrice}</p>
                            <p className="text-sm text-gray-600">{customer.estimatedTime} min</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {customer.status === 'waiting' && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => handleStatusUpdate(customer.id, 'in-progress')}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Start Service
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleStatusUpdate(customer.id, 'no-show')}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
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
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Complete
                            </Button>
                          )}
                          
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => sendMessage(customer.id, customer.customerPhone)}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            SMS
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="ghost"
                          >
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleRemoveFromQueue(customer.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No customers in queue</h3>
                    <p className="text-gray-600 mb-4">Add customers manually or they can join online</p>
                    <Button onClick={() => setShowAddCustomer(true)}>
                      Add First Customer
                    </Button>
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
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Broadcast Update
                </Button>
                <Button className="w-full" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Update Wait Times
                </Button>
                <Button className="w-full" variant="outline">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Pause Queue
                </Button>
              </CardContent>
            </Card>

            {/* Completed Today */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Completed Today</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCompletedToday.map((customer) => (
                    <div key={customer.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{customer.customerName}</p>
                        <p className="text-xs text-gray-600">{customer.services.join(', ')}</p>
                        <p className="text-xs text-gray-500">{customer.completedAt}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${customer.totalPrice}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xs ${
                                i < customer.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Customer Modal */}
        {showAddCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Add Customer to Queue</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    label="Customer Name *"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter customer name"
                  />
                  
                  <Input
                    label="Phone Number"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                  
                  <Input
                    label="Services *"
                    value={newCustomer.services}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, services: e.target.value }))}
                    placeholder="Haircut, Styling (comma separated)"
                  />
                  
                  <Input
                    label="Notes"
                    value={newCustomer.notes}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special requests or notes"
                  />

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setShowAddCustomer(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={handleAddCustomer}
                    >
                      Add to Queue
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
