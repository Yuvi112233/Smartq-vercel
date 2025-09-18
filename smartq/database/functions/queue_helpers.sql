-- Queue management helper functions

-- Function to calculate estimated wait time
CREATE OR REPLACE FUNCTION calculate_estimated_wait_time(
    queue_id UUID
)
RETURNS INTEGER AS $$
DECLARE
    current_position INTEGER;
    salon_queue_id UUID;
    avg_service_duration INTEGER;
    estimated_time INTEGER;
BEGIN
    -- Get the queue position and salon_id
    SELECT position, salon_id INTO current_position, salon_queue_id
    FROM queues 
    WHERE id = queue_id AND status = 'waiting';
    
    IF current_position IS NULL THEN
        RETURN 0;
    END IF;
    
    -- Calculate average service duration for services in this queue entry
    SELECT COALESCE(AVG(s.duration), 30) INTO avg_service_duration
    FROM queues q
    CROSS JOIN LATERAL unnest(q.service_ids) AS service_id
    JOIN services s ON s.id = service_id::UUID
    WHERE q.id = queue_id;
    
    -- Estimate time based on position and average service duration
    estimated_time := (current_position - 1) * avg_service_duration;
    
    RETURN GREATEST(estimated_time, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to get next queue entry for processing
CREATE OR REPLACE FUNCTION get_next_queue_entry(salon_queue_id UUID)
RETURNS UUID AS $$
DECLARE
    next_entry_id UUID;
BEGIN
    SELECT id INTO next_entry_id
    FROM queues 
    WHERE salon_id = salon_queue_id 
    AND status = 'waiting'
    ORDER BY position ASC
    LIMIT 1;
    
    RETURN next_entry_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update queue status (notifications handled by server)
CREATE OR REPLACE FUNCTION update_queue_status(
    queue_entry_id UUID,
    new_status VARCHAR(20)
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Update the queue status
    UPDATE queues 
    SET 
        status = new_status,
        started_at = CASE WHEN new_status = 'in-progress' THEN NOW() ELSE started_at END,
        completed_at = CASE WHEN new_status = 'completed' THEN NOW() ELSE completed_at END,
        no_show_at = CASE WHEN new_status = 'no-show' THEN NOW() ELSE no_show_at END
    WHERE id = queue_entry_id;
    
    -- Return success (notifications handled by server-side code)
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to get queue status change data for notifications (server use)
CREATE OR REPLACE FUNCTION get_queue_status_data(queue_entry_id UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'queue_id', q.id,
        'customer_id', q.customer_id,
        'salon_id', q.salon_id,
        'salon_name', s.name,
        'status', q.status,
        'position', q.position,
        'estimated_wait_time', q.estimated_wait_time
    ) INTO result
    FROM queues q
    JOIN salons s ON s.id = q.salon_id
    WHERE q.id = queue_entry_id;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;