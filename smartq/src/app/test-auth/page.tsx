'use client'

import { useAuth } from '@/hooks/useAuth'
import { authClient } from '@/lib/auth'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

export default function TestAuthPage() {
  const { user, isAuthenticated, loading } = useAuth()

  const testSignUp = async () => {
    const result = await authClient.signUp({
      email: 'test@example.com',
      password: 'testpassword123',
      name: 'Test User',
      phone: '+1234567890',
      role: 'customer'
    })
    console.log('Sign up result:', result)
  }

  const testSignIn = async () => {
    const result = await authClient.signIn({
      email: 'test@example.com',
      password: 'testpassword123'
    })
    console.log('Sign in result:', result)
  }

  const testSignOut = async () => {
    const result = await authClient.signOut()
    console.log('Sign out result:', result)
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Test</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold">Current Auth State</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
            {user && (
              <>
                <p><strong>User ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Name:</strong> {user.user_metadata?.name}</p>
                <p><strong>Role:</strong> {user.user_metadata?.role}</p>
                <p><strong>Phone:</strong> {user.user_metadata?.phone}</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Test Actions</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={testSignUp} variant="outline">
              Test Sign Up
            </Button>
            <Button onClick={testSignIn} variant="outline">
              Test Sign In
            </Button>
            <Button onClick={testSignOut} variant="outline">
              Test Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}