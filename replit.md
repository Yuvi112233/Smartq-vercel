# SmartQ - Salon Queue Management System

## Overview

SmartQ is a comprehensive salon queue management system built with modern web technologies. The application provides a mobile-first experience for both customers and salon owners, enabling real-time queue management, service booking, and customer communication. The system supports different types of salons (men's, women's, unisex) with role-based access control and comprehensive business analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15.5.3 with App Router for server-side rendering and static generation
- **Language**: TypeScript for type safety and developer experience
- **Styling**: Tailwind CSS with mobile-first responsive design approach
- **UI Components**: Custom component system with theme support for different salon types (men's/women's/unisex)
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for client-side form validation

### Backend Architecture
- **Database**: Supabase PostgreSQL with PostGIS extension for geographic features
- **Authentication**: Supabase Auth with multi-factor authentication (email OTP, SMS OTP)
- **Real-time Updates**: Supabase Realtime for live queue status updates
- **Server Actions**: Next.js Server Actions for form submissions and mutations
- **Validation**: Zod schemas for both client and server-side validation
- **File Storage**: Supabase Storage for salon photos and profile pictures

### Data Architecture
- **Users**: Multi-role system (customer, salon_owner, admin) with profile management
- **Salons**: Geographic location support with operating hours and service offerings
- **Services**: Categorized services with pricing and duration
- **Queues**: Real-time queue management with status tracking and position calculation
- **Reviews**: Customer feedback system with ratings and comments
- **Analytics**: Business intelligence for salon owners with metrics tracking

### Security & Authentication
- **Row Level Security (RLS)**: Comprehensive policies for data isolation
- **Multi-factor Authentication**: Email and SMS OTP verification
- **Role-based Access Control**: Different permission levels for customers and salon owners
- **Secure OTP Storage**: Hashed OTP storage with time-based expiration
- **Environment Validation**: Runtime validation of required environment variables

### Mobile-First Design
- **Responsive Layout**: Tailwind CSS with mobile-first breakpoints
- **Touch Optimization**: Mobile-friendly interactions and button sizing
- **Performance**: Optimized for mobile networks with efficient data loading
- **PWA Ready**: Configured for progressive web app capabilities

## External Dependencies

### Core Services
- **Supabase**: Primary backend service providing PostgreSQL database, authentication, real-time subscriptions, and file storage
- **Vercel**: Deployment platform optimized for Next.js applications

### Communication Services  
- **Twilio**: SMS messaging service for OTP verification and customer notifications
- **WhatsApp Business API**: Planned integration for salon-customer communication

### Maps & Location
- **Google Maps API**: Geographic services for salon discovery and location display
- **PostGIS**: PostgreSQL extension for geographic data types and distance calculations

### Development & Monitoring
- **React Query**: Server state management with caching and synchronization
- **Lucide React**: Icon library for consistent UI components
- **TypeScript**: Type system for enhanced development experience

### Required Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
```