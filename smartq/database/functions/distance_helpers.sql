-- Distance calculation functions for salon discovery

-- Function to get salons within a radius (FIXED - using geography)
CREATE OR REPLACE FUNCTION get_salons_within_radius(
    center_lat DECIMAL(10, 8),
    center_lng DECIMAL(11, 8),
    radius_km INTEGER DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    salon_type VARCHAR(20),
    rating_avg DECIMAL(3, 2),
    distance_km DECIMAL(10, 2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.name,
        s.address,
        s.latitude,
        s.longitude,
        s.salon_type,
        s.rating_avg,
        (ST_Distance(
            s.location,
            ST_SetSRID(ST_MakePoint(center_lng, center_lat), 4326)::geography
        ) / 1000)::DECIMAL(10, 2) as distance_km
    FROM salons s
    WHERE ST_DWithin(
        s.location,
        ST_SetSRID(ST_MakePoint(center_lng, center_lat), 4326)::geography,
        radius_km * 1000
    )
    ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql;