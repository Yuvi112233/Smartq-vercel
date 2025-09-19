'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Plus, Edit, Trash2, Clock, DollarSign, Tag } from 'lucide-react'

// Mock data
const mockUser = {
  name: 'Sarah Johnson',
  role: 'salon_owner' as const
}

const mockServices = [
  {
    id: '1',
    name: 'Men\'s Haircut',
    description: 'Classic and modern cuts for men',
    price: 35,
    duration: 30,
    category: 'Haircut',
    active: true
  },
  {
    id: '2',
    name: 'Women\'s Cut & Style',
    description: 'Cut, wash, and professional styling',
    price: 65,
    duration: 60,
    category: 'Haircut',
    active: true
  },
  {
    id: '3',
    name: 'Beard Trim',
    description: 'Professional beard grooming and shaping',
    price: 20,
    duration: 20,
    category: 'Grooming',
    active: true
  },
  {
    id: '4',
    name: 'Hair Wash & Blow Dry',
    description: 'Wash and professional styling',
    price: 25,
    duration: 30,
    category: 'Styling',
    active: true
  },
  {
    id: '5',
    name: 'Color Touch-up',
    description: 'Root touch-up and color refresh',
    price: 85,
    duration: 90,
    category: 'Color',
    active: true
  },
  {
    id: '6',
    name: 'Full Color',
    description: 'Complete hair coloring service',
    price: 120,
    duration: 120,
    category: 'Color',
    active: true
  },
  {
    id: '7',
    name: 'Highlights',
    description: 'Partial or full highlights',
    price: 150,
    duration: 150,
    category: 'Color',
    active: true
  },
  {
    id: '8',
    name: 'Deep Conditioning',
    description: 'Intensive hair treatment',
    price: 45,
    duration: 45,
    category: 'Treatment',
    active: false
  }
]

const categories = ['All', 'Haircut', 'Color', 'Styling', 'Grooming', 'Treatment']

export default function ServicesPage() {
  const [services, setServices] = useState(mockServices)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAddService, setShowAddService] = useState(false)
  const [editingService, setEditingService] = useState<string | null>(null)
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'Haircut'
  })

  const filteredServices = services.filter(service => 
    selectedCategory === 'All' || service.category === selectedCategory
  )

  const handleAddService = () => {
    if (!newService.name || !newService.price || !newService.duration) {
      alert('Please fill in all required fields')
      return
    }

    const service = {
      id: Date.now().toString(),
      name: newService.name,
      description: newService.description,
      price: parseInt(newService.price),
      duration: parseInt(newService.duration),
      category: newService.category,
      active: true
    }

    setServices(prev => [...prev, service])
    setNewService({ name: '', description: '', price: '', duration: '', category: 'Haircut' })
    setShowAddService(false)
  }

  const handleEditService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId)
    if (service) {
      setNewService({
        name: service.name,
        description: service.description,
        price: service.price.toString(),
        duration: service.duration.toString(),
        category: service.category
      })
      setEditingService(serviceId)
      setShowAddService(true)
    }
  }

  const handleUpdateService = () => {
    if (!newService.name || !newService.price || !newService.duration) {
      alert('Please fill in all required fields')
      return
    }

    setServices(prev => prev.map(service => 
      service.id === editingService
        ? {
            ...service,
            name: newService.name,
            description: newService.description,
            price: parseInt(newService.price),
            duration: parseInt(newService.duration),
            category: newService.category
          }
        : service
    ))
    
    setNewService({ name: '', description: '', price: '', duration: '', category: 'Haircut' })
    setEditingService(null)
    setShowAddService(false)
  }

  const handleDeleteService = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(service => service.id !== serviceId))
    }
  }

  const handleToggleActive = (serviceId: string) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId
        ? { ...service, active: !service.active }
        : service
    ))
  }

  const activeServices = services.filter(s => s.active)
  const totalRevenue = activeServices.reduce((sum, service) => sum + service.price, 0)
  const avgDuration = activeServices.length > 0 
    ? Math.round(activeServices.reduce((sum, service) => sum + service.duration, 0) / activeServices.length)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
            <p className="text-gray-600 mt-2">Manage your salon services, pricing, and availability</p>
          </div>
          <Button onClick={() => setShowAddService(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Tag className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Services</p>
                  <p className="text-2xl font-bold text-gray-900">{services.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Tag className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Services</p>
                  <p className="text-2xl font-bold text-gray-900">{activeServices.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Price</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${activeServices.length > 0 ? Math.round(totalRevenue / activeServices.length) : 0}
                  </p>
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
                  <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                  <p className="text-2xl font-bold text-gray-900">{avgDuration}m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-2 text-xs">
                    ({services.filter(s => s.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className={`${!service.active ? 'opacity-60' : ''}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {service.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleActive(service.id)}
                      className={`w-8 h-4 rounded-full transition-colors ${
                        service.active ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                        service.active ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="text-lg font-semibold text-gray-900">${service.price}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{service.duration} min</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditService(service.id)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory === 'All' 
                ? "You haven't added any services yet" 
                : `No services found in ${selectedCategory} category`}
            </p>
            <Button onClick={() => setShowAddService(true)}>
              Add Your First Service
            </Button>
          </div>
        )}

        {/* Add/Edit Service Modal */}
        {showAddService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    label="Service Name *"
                    value={newService.name}
                    onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Men's Haircut"
                  />
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={newService.description}
                      onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the service"
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Price ($) *"
                      type="number"
                      value={newService.price}
                      onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="35"
                    />
                    
                    <Input
                      label="Duration (min) *"
                      type="number"
                      value={newService.duration}
                      onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="30"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      value={newService.category}
                      onChange={(e) => setNewService(prev => ({ ...prev, category: e.target.value }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      {categories.filter(cat => cat !== 'All').map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setShowAddService(false)
                        setEditingService(null)
                        setNewService({ name: '', description: '', price: '', duration: '', category: 'Haircut' })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={editingService ? handleUpdateService : handleAddService}
                    >
                      {editingService ? 'Update Service' : 'Add Service'}
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
