-- SmartQ Database Schema (Final - Security Hardened)
-- Comprehensive salon queue management system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS extension for location features
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users table (linked to auth.users)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'salon_owner', 'admin')),
    loyalty_points INTEGER DEFAULT 0,
    profile_picture_url TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Salons table
CREATE TABLE salons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    location GEOGRAPHY(POINT, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography) STORED,
    operating_hours JSONB NOT NULL DEFAULT '{}',
    salon_type VARCHAR(20) NOT NULL CHECK (salon_type IN ('men', 'women', 'unisex')),
    rating_avg DECIMAL(3, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration INTEGER NOT NULL, -- duration in minutes
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Queue entries table
CREATE TABLE queues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    service_ids UUID[] NOT NULL, -- array of service IDs
    status VARCHAR(20) NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'in-progress', 'completed', 'no-show')),
    position INTEGER,
    estimated_wait_time INTEGER, -- in minutes
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    no_show_at TIMESTAMP WITH TIME ZONE
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(salon_id, customer_id) -- One review per customer per salon
);

-- Salon photos table
CREATE TABLE salon_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Offers/Promotions table
CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    salon_id UUID REFERENCES salons(id) ON DELETE CASCADE, -- NULL for global offers
    title VARCHAR(255) NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'flat')),
    discount_amount DECIMAL(10, 2) NOT NULL,
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
    valid_to TIMESTAMP WITH TIME ZONE NOT NULL,
    terms TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites table (user's favorite salons)
CREATE TABLE favorites (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, salon_id)
);

-- OTP verification table (for email and phone verification) - SECURE VERSION
CREATE TABLE otp_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255),
    phone VARCHAR(20),
    otp_hash VARCHAR(255) NOT NULL, -- SHA-256 hash of OTP
    verification_type VARCHAR(20) NOT NULL CHECK (verification_type IN ('email', 'phone')),
    verified BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '5 minutes'), -- 5 minute expiry
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Ensure only one active OTP per user/type
    UNIQUE(user_id, verification_type, verified) DEFERRABLE INITIALLY DEFERRED
);

-- Notifications table (for storing notification history)
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'queue_update', 'offer', 'review_request', etc.
    data JSONB DEFAULT '{}',
    read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table (for salon performance metrics)
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    total_customers INTEGER DEFAULT 0,
    completed_services INTEGER DEFAULT 0,
    no_shows INTEGER DEFAULT 0,
    average_wait_time INTEGER DEFAULT 0, -- in minutes
    revenue DECIMAL(10, 2) DEFAULT 0,
    rating_avg DECIMAL(3, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(salon_id, date)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);

CREATE INDEX idx_salons_owner_id ON salons(owner_id);
CREATE INDEX idx_salons_salon_type ON salons(salon_type);
CREATE INDEX idx_salons_location ON salons USING GIST(location);

CREATE INDEX idx_services_salon_id ON services(salon_id);
CREATE INDEX idx_services_category ON services(category);

CREATE INDEX idx_queues_customer_id ON queues(customer_id);
CREATE INDEX idx_queues_salon_id ON queues(salon_id);
CREATE INDEX idx_queues_status ON queues(status);
CREATE INDEX idx_queues_joined_at ON queues(joined_at);

CREATE INDEX idx_reviews_salon_id ON reviews(salon_id);
CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

CREATE INDEX idx_salon_photos_salon_id ON salon_photos(salon_id);

CREATE INDEX idx_offers_salon_id ON offers(salon_id);
CREATE INDEX idx_offers_valid_period ON offers(valid_from, valid_to);
CREATE INDEX idx_offers_active ON offers(active);

CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_salon_id ON favorites(salon_id);

CREATE INDEX idx_otp_user_verification ON otp_verifications(user_id, verification_type);
CREATE INDEX idx_otp_expires_at ON otp_verifications(expires_at);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_type ON notifications(type);

CREATE INDEX idx_analytics_salon_id ON analytics(salon_id);
CREATE INDEX idx_analytics_date ON analytics(date);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_salons_updated_at BEFORE UPDATE ON salons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON offers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle user creation (sync with auth.users)
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS trigger 
LANGUAGE plpgsql 
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (id, name, email)
    VALUES (new.id, COALESCE(new.raw_user_meta_data->>'name', 'New User'), new.email);
    RETURN new;
END;
$$;

-- Trigger to create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Function to calculate queue positions (updated)
CREATE OR REPLACE FUNCTION update_queue_positions()
RETURNS TRIGGER AS $$
BEGIN
    -- Update positions for waiting entries in the same salon
    WITH positioned_queues AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY joined_at) as new_position
        FROM queues 
        WHERE salon_id = COALESCE(NEW.salon_id, OLD.salon_id) 
        AND status = 'waiting'
    )
    UPDATE queues 
    SET position = positioned_queues.new_position
    FROM positioned_queues
    WHERE queues.id = positioned_queues.id;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Trigger to maintain queue positions
CREATE TRIGGER update_queue_positions_trigger
    AFTER INSERT OR UPDATE OR DELETE ON queues
    FOR EACH ROW EXECUTE FUNCTION update_queue_positions();

-- Function to update salon rating average
CREATE OR REPLACE FUNCTION update_salon_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE salons 
    SET rating_avg = (
        SELECT AVG(rating)::DECIMAL(3,2) 
        FROM reviews 
        WHERE salon_id = COALESCE(NEW.salon_id, OLD.salon_id)
    )
    WHERE id = COALESCE(NEW.salon_id, OLD.salon_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Trigger to maintain salon rating average
CREATE TRIGGER update_salon_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_salon_rating();

-- Row Level Security (RLS) Policies - SECURE & ROLE-GATED VERSION
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE queues ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE salon_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Note: INSERT/DELETE for users handled by auth system and triggers

-- Salons policies - WITH ROLE GATING
CREATE POLICY "Public can view salons" ON salons
    FOR SELECT USING (true);

CREATE POLICY "Salon owners can create salons" ON salons
    FOR INSERT WITH CHECK (
        auth.uid() = owner_id AND 
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role IN ('salon_owner', 'admin')
        )
    );

CREATE POLICY "Salon owners can update own salons" ON salons
    FOR UPDATE USING (auth.uid() = owner_id) 
    WITH CHECK (
        auth.uid() = owner_id AND 
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role IN ('salon_owner', 'admin')
        )
    );

CREATE POLICY "Salon owners can delete own salons" ON salons
    FOR DELETE USING (auth.uid() = owner_id);

-- Services policies
CREATE POLICY "Public can view services" ON services
    FOR SELECT USING (true);

CREATE POLICY "Salon owners can create services" ON services
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

CREATE POLICY "Salon owners can update services" ON services
    FOR UPDATE USING (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    ) WITH CHECK (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

CREATE POLICY "Salon owners can delete services" ON services
    FOR DELETE USING (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

-- Queue policies
CREATE POLICY "Customers can view own queues" ON queues
    FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Salon owners can view salon queues" ON queues
    FOR SELECT USING (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

CREATE POLICY "Customers can create queues" ON queues
    FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update own queues" ON queues
    FOR UPDATE USING (auth.uid() = customer_id) WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Salon owners can update salon queues" ON queues
    FOR UPDATE USING (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    ) WITH CHECK (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

CREATE POLICY "Customers can cancel own queues" ON queues
    FOR DELETE USING (auth.uid() = customer_id);

-- Review policies
CREATE POLICY "Public can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Customers can create reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = customer_id) WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can delete own reviews" ON reviews
    FOR DELETE USING (auth.uid() = customer_id);

-- Salon photos policies
CREATE POLICY "Public can view salon photos" ON salon_photos
    FOR SELECT USING (true);

CREATE POLICY "Salon owners can create salon photos" ON salon_photos
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

CREATE POLICY "Salon owners can update salon photos" ON salon_photos
    FOR UPDATE USING (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    ) WITH CHECK (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

CREATE POLICY "Salon owners can delete salon photos" ON salon_photos
    FOR DELETE USING (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

-- Offers policies - WITH ADMIN GATING FOR GLOBAL OFFERS
CREATE POLICY "Public can view active offers" ON offers
    FOR SELECT USING (active = true AND valid_from <= NOW() AND valid_to >= NOW());

CREATE POLICY "Salon owners can create salon offers" ON offers
    FOR INSERT WITH CHECK (
        salon_id IS NOT NULL AND auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

CREATE POLICY "Admins can create global offers" ON offers
    FOR INSERT WITH CHECK (
        salon_id IS NULL AND EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Salon owners can update salon offers" ON offers
    FOR UPDATE USING (
        salon_id IS NOT NULL AND auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    ) WITH CHECK (
        salon_id IS NOT NULL AND auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

CREATE POLICY "Admins can update global offers" ON offers
    FOR UPDATE USING (
        salon_id IS NULL AND EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    ) WITH CHECK (
        salon_id IS NULL AND EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Salon owners can delete salon offers" ON offers
    FOR DELETE USING (
        salon_id IS NOT NULL AND auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

CREATE POLICY "Admins can delete global offers" ON offers
    FOR DELETE USING (
        salon_id IS NULL AND EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Favorites policies
CREATE POLICY "Users can view own favorites" ON favorites
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create favorites" ON favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete favorites" ON favorites
    FOR DELETE USING (auth.uid() = user_id);

-- OTP policies - SECURE (service-role only access)
CREATE POLICY "Service role can manage OTP" ON otp_verifications
    FOR ALL USING (auth.role() = 'service_role');

-- Notification policies
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Service role can create notifications (no DB trigger interference)
CREATE POLICY "Service role can create notifications" ON notifications
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Analytics policies
CREATE POLICY "Salon owners can view salon analytics" ON analytics
    FOR SELECT USING (
        auth.uid() IN (
            SELECT owner_id FROM salons WHERE id = salon_id
        )
    );

-- Service role can manage analytics
CREATE POLICY "Service role can manage analytics" ON analytics
    FOR ALL USING (auth.role() = 'service_role');