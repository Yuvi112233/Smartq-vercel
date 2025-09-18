# SmartQ Database Setup

This directory contains the database schema and utilities for the SmartQ salon queue management system.

## Files Overview

- `schema.sql` - Complete database schema with tables, indexes, triggers, and RLS policies
- `functions/distance_helpers.sql` - Geographic distance calculations for salon discovery  
- `functions/queue_helpers.sql` - Queue management and status update functions
- `sample_data.sql` - Sample data for development and testing

## Supabase Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

### 2. Run Database Schema
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the contents of `schema.sql`
4. Run the contents of `functions/distance_helpers.sql`
5. Run the contents of `functions/queue_helpers.sql`
6. Optionally run `sample_data.sql` for development data

### 3. Configure Environment Variables
Copy the values from your Supabase project settings:

```bash
# From Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# From Project Settings > API (Service Role - keep secret!)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Enable Extensions
The schema automatically enables required extensions:
- `uuid-ossp` for UUID generation
- `postgis` for geographic/location features

### 5. Row Level Security (RLS)
The schema includes comprehensive RLS policies:
- Users can only access their own data
- Salon owners can manage their own salons
- Public read access for salon discovery
- Proper isolation between different user roles

## Key Features

### Geographic Features
- PostGIS integration for location-based queries
- Distance calculations for salon discovery
- Radius-based salon filtering

### Queue Management
- Automatic position calculation
- Real-time status updates
- Estimated wait time calculations

### Security
- Row Level Security (RLS) on all tables
- User role-based access control
- Secure authentication integration

### Performance
- Optimized indexes for common queries
- Efficient geographic queries
- Automatic triggers for data consistency

## Development Notes

- The schema supports both development and production environments
- Sample data is provided for easier development
- All triggers and functions are production-ready
- Geographic queries use proper spatial indexes for performance