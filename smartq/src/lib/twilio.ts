// Twilio SMS and messaging utilities
// Based on the twilio_send_message integration

import { env } from '@/lib/env'

// Types for Twilio messaging
export interface TwilioMessage {
  to: string
  body: string
  from?: string
}

export interface TwilioMessageResponse {
  sid: string
  status: string
  error?: string
}

// Send SMS message using Twilio (server-side only)
export async function sendSMSMessage({ to, body, from }: TwilioMessage): Promise<TwilioMessageResponse> {
  // This function should only be called on the server side
  if (typeof window !== 'undefined') {
    throw new Error('sendSMSMessage can only be called on the server side')
  }
  
  // Validate required environment variables
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_PHONE_NUMBER) {
    throw new Error('Twilio credentials are not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER environment variables.')
  }
  
  try {
    const twilio = require('twilio')
    const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)
    
    const message = await client.messages.create({
      body,
      from: from || env.TWILIO_PHONE_NUMBER,
      to,
    })
    
    console.log(`SMS sent with SID: ${message.sid}`)
    
    return {
      sid: message.sid,
      status: message.status,
    }
  } catch (error) {
    console.error('Error sending SMS:', error)
    
    return {
      sid: '',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Send OTP via SMS
export async function sendOTPMessage(phoneNumber: string, otp: string): Promise<TwilioMessageResponse> {
  const message = `Your SmartQ verification code is: ${otp}. This code will expire in 5 minutes.`
  
  return sendSMSMessage({
    to: phoneNumber,
    body: message,
  })
}

// Send queue status update via SMS
export async function sendQueueUpdateMessage(
  phoneNumber: string,
  salonName: string,
  status: string,
  estimatedWaitTime?: number
): Promise<TwilioMessageResponse> {
  let message = `SmartQ Update: Your status at ${salonName} is now "${status}".`
  
  if (estimatedWaitTime && status === 'waiting') {
    message += ` Estimated wait time: ${estimatedWaitTime} minutes.`
  }
  
  return sendSMSMessage({
    to: phoneNumber,
    body: message,
  })
}

// Format phone number for Twilio (E.164 format)
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '')
  
  // Add +1 for US numbers if not present
  if (digitsOnly.length === 10 && !phoneNumber.startsWith('+')) {
    return `+1${digitsOnly}`
  }
  
  // Add + if not present
  if (!phoneNumber.startsWith('+')) {
    return `+${digitsOnly}`
  }
  
  return phoneNumber
}

// Validate phone number format
export function isValidPhoneNumber(phoneNumber: string): boolean {
  const formatted = formatPhoneNumber(phoneNumber)
  // Basic E.164 validation: starts with +, followed by 7-15 digits
  return /^\+[1-9]\d{6,14}$/.test(formatted)
}