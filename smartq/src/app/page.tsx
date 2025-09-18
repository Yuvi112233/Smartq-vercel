export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to SmartQ
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your modern salon queue management system
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="card text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">For Customers</h3>
            <p className="text-gray-600">
              Join queues, track your position, and get real-time updates
            </p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✂️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">For Salon Owners</h3>
            <p className="text-gray-600">
              Manage your salon, services, and customer queues efficiently
            </p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Mobile-First</h3>
            <p className="text-gray-600">
              Optimized for mobile devices with a responsive design
            </p>
          </div>
        </div>
        <div className="mt-8 space-x-4">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </div>
  )
}