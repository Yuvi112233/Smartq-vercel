-- Sample data for SmartQ development and testing
-- DO NOT RUN THIS IN PRODUCTION

-- Sample users (customers and salon owners)
INSERT INTO users (id, name, email, phone, role, email_verified, phone_verified) VALUES
-- Salon owners
('550e8400-e29b-41d4-a716-446655440000', 'John Smith', 'john@cutandstylesalon.com', '+1234567890', 'salon_owner', true, true),
('550e8400-e29b-41d4-a716-446655440001', 'Sarah Johnson', 'sarah@glamoursalon.com', '+1234567891', 'salon_owner', true, true),
('550e8400-e29b-41d4-a716-446655440002', 'Mike Chen', 'mike@mensgrooming.com', '+1234567892', 'salon_owner', true, true),

-- Customers
('550e8400-e29b-41d4-a716-446655440010', 'Alice Williams', 'alice@example.com', '+1234567893', 'customer', true, true),
('550e8400-e29b-41d4-a716-446655440011', 'Bob Davis', 'bob@example.com', '+1234567894', 'customer', true, false),
('550e8400-e29b-41d4-a716-446655440012', 'Emma Brown', 'emma@example.com', '+1234567895', 'customer', true, true),
('550e8400-e29b-41d4-a716-446655440013', 'David Wilson', 'david@example.com', '+1234567896', 'customer', false, false);

-- Sample salons
INSERT INTO salons (id, owner_id, name, description, address, latitude, longitude, operating_hours, salon_type) VALUES
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440000', 'Cut & Style Salon', 'Premium hair salon offering cutting-edge styles and treatments', '123 Main St, New York, NY 10001', 40.7589, -73.9851, '{"monday": [{"open": "09:00", "close": "18:00"}], "tuesday": [{"open": "09:00", "close": "18:00"}], "wednesday": [{"open": "09:00", "close": "18:00"}], "thursday": [{"open": "09:00", "close": "20:00"}], "friday": [{"open": "09:00", "close": "20:00"}], "saturday": [{"open": "08:00", "close": "17:00"}], "sunday": [{"open": "10:00", "close": "16:00"}]}', 'unisex'),

('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440001', 'Glamour Salon & Spa', 'Luxurious salon and spa experience for women', '456 Fashion Ave, New York, NY 10018', 40.7505, -73.9857, '{"monday": [{"open": "08:00", "close": "19:00"}], "tuesday": [{"open": "08:00", "close": "19:00"}], "wednesday": [{"open": "08:00", "close": "19:00"}], "thursday": [{"open": "08:00", "close": "21:00"}], "friday": [{"open": "08:00", "close": "21:00"}], "saturday": [{"open": "07:00", "close": "18:00"}], "sunday": [{"open": "09:00", "close": "17:00"}]}', 'women'),

('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440002', 'Mens Grooming Lounge', 'Modern barbershop and grooming services for men', '789 Business Blvd, New York, NY 10022', 40.7614, -73.9776, '{"monday": [{"open": "07:00", "close": "20:00"}], "tuesday": [{"open": "07:00", "close": "20:00"}], "wednesday": [{"open": "07:00", "close": "20:00"}], "thursday": [{"open": "07:00", "close": "20:00"}], "friday": [{"open": "07:00", "close": "20:00"}], "saturday": [{"open": "08:00", "close": "18:00"}], "sunday": [{"open": "10:00", "close": "16:00"}]}', 'men');

-- Sample services
INSERT INTO services (id, salon_id, name, description, price, duration, category) VALUES
-- Cut & Style Salon services
('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440100', 'Haircut & Style', 'Professional haircut with styling', 45.00, 60, 'Hair'),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440100', 'Hair Coloring', 'Full hair coloring service', 120.00, 120, 'Hair'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440100', 'Blowout', 'Professional hair blowout', 35.00, 45, 'Hair'),

-- Glamour Salon & Spa services
('660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440101', 'Premium Cut & Color', 'Luxury haircut and color service', 150.00, 180, 'Hair'),
('660e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440101', 'Facial Treatment', 'Rejuvenating facial treatment', 80.00, 90, 'Skincare'),
('660e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440101', 'Manicure & Pedicure', 'Full nail service', 65.00, 75, 'Nails'),

-- Mens Grooming Lounge services
('660e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440102', 'Classic Haircut', 'Traditional mens haircut', 30.00, 30, 'Hair'),
('660e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440102', 'Beard Trim', 'Professional beard trimming', 20.00, 20, 'Hair'),
('660e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440102', 'Hot Towel Shave', 'Traditional hot towel shave', 40.00, 45, 'Hair');

-- Sample queue entries
INSERT INTO queues (id, customer_id, salon_id, service_ids, status, position) VALUES
('770e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440100', ARRAY['660e8400-e29b-41d4-a716-446655440000'], 'waiting', 1),
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440100', ARRAY['660e8400-e29b-41d4-a716-446655440001'], 'waiting', 2),
('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440101', ARRAY['660e8400-e29b-41d4-a716-446655440010'], 'in-progress', NULL);

-- Sample reviews
INSERT INTO reviews (id, salon_id, customer_id, rating, comment) VALUES
('880e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440010', 5, 'Excellent service and friendly staff!'),
('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440012', 4, 'Great experience, will come back!'),
('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440011', 5, 'Best barbershop in the city!');

-- Sample offers
INSERT INTO offers (id, salon_id, title, description, discount_type, discount_amount, valid_from, valid_to) VALUES
('990e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440100', 'New Customer Discount', '20% off first visit', 'percentage', 20.00, NOW() - INTERVAL '1 day', NOW() + INTERVAL '30 days'),
('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440101', 'Spa Package Deal', '$50 off spa packages over $200', 'flat', 50.00, NOW() - INTERVAL '1 day', NOW() + INTERVAL '14 days'),
('990e8400-e29b-41d4-a716-446655440002', NULL, 'Holiday Special', '15% off all services', 'percentage', 15.00, NOW() - INTERVAL '1 day', NOW() + INTERVAL '7 days');

-- Sample favorites
INSERT INTO favorites (user_id, salon_id) VALUES
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440100'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440102'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440101'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440100');