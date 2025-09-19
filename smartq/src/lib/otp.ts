// Secure OTP utilities for SmartQ
// Server-side only functions for OTP generation and verification

import crypto from 'crypto'
import { createServiceRoleClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

// Generate a secure 6-digit OTP
export function generateOTP(): string {
  // Generate cryptographically secure random 6-digit number
  const buffer = crypto.randomBytes(4)
  const randomNumber = buffer.readUInt32BE(0)
  const otp = (randomNumber % 900000 + 100000).toString() // Ensures 6 digits
  return otp
}

// Hash OTP with SHA-256 for secure storage
export function hashOTP(otp: string, context: string): string {
  const data = `${otp}:${context}:${process.env.SESSION_SECRET || 'fallback'}`
  return crypto.createHash('sha256').update(data).digest('hex')
}

// Verify OTP hash
export function verifyOTPHash(otp: string, hash: string, context: string): boolean {
  const computedHash = hashOTP(otp, context)
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(computedHash))
}

// Store OTP securely (server-side only)
export async function storeOTP(
  userId: string,
  email: string | null,
  phone: string | null,
  verificationType: 'email' | 'phone'
): Promise<{ otp: string; success: boolean; error?: string }> {
  if (typeof window !== 'undefined') {
    throw new Error('storeOTP can only be called on the server side')
  }

  const supabase = createServiceRoleClient() as any
  const otp = generateOTP()
  const context = `${userId}:${verificationType}`
  const otpHash = hashOTP(otp, context)

  try {
    // First, invalidate any existing active OTPs for this user/type
    await supabase
      .from('otp_verifications')
      .update({ verified: true })
      .eq('user_id', userId)
      .eq('verification_type', verificationType)
      .eq('verified', false)

    // Create new OTP entry
    const { error } = await supabase
      .from('otp_verifications')
      .insert({
        user_id: userId,
        email,
        phone,
        otp_hash: otpHash,
        verification_type: verificationType,
        expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes
      })

    if (error) {
      console.error('Error storing OTP:', error)
      return { otp: '', success: false, error: error.message }
    }

    return { otp, success: true }
  } catch (error) {
    console.error('Error storing OTP:', error)
    return { 
      otp: '', 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Verify OTP (server-side only)
export async function verifyOTP(
  userId: string,
  otp: string,
  verificationType: 'email' | 'phone'
): Promise<{ success: boolean; error?: string }> {
  if (typeof window !== 'undefined') {
    throw new Error('verifyOTP can only be called on the server side')
  }

  const supabase = createServiceRoleClient() as any
  const context = `${userId}:${verificationType}`

  try {
    // Get the latest unverified OTP for this user/type
    const { data: otpRecord, error: fetchError } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('user_id', userId)
      .eq('verification_type', verificationType)
      .eq('verified', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !otpRecord) {
      return { success: false, error: 'No valid OTP found or OTP has expired' }
    }

    // Verify the OTP hash
    if (!verifyOTPHash(otp, otpRecord.otp_hash, context)) {
      return { success: false, error: 'Invalid OTP' }
    }

    // Mark OTP as verified
    const { error: updateError } = await supabase
      .from('otp_verifications')
      .update({ verified: true })
      .eq('id', otpRecord.id)

    if (updateError) {
      console.error('Error updating OTP verification:', updateError)
      return { success: false, error: 'Verification failed' }
    }

    // Update user verification status
    const updateField = verificationType === 'email' ? 'email_verified' : 'phone_verified'
    await supabase
      .from('users')
      .update({ [updateField]: true })
      .eq('id', userId)

    return { success: true }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Verification failed' 
    }
  }
}

// Clean up expired OTPs (can be run periodically)
export async function cleanupExpiredOTPs(): Promise<void> {
  if (typeof window !== 'undefined') {
    throw new Error('cleanupExpiredOTPs can only be called on the server side')
  }

  const supabase = createServiceRoleClient() as any
  
  await supabase
    .from('otp_verifications')
    .delete()
    .lt('expires_at', new Date().toISOString())
}