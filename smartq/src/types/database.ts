export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Database schema types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          role: 'customer' | 'salon_owner' | 'admin'
          loyalty_points: number
          profile_picture_url: string | null
          email_verified: boolean
          phone_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          role?: 'customer' | 'salon_owner' | 'admin'
          loyalty_points?: number
          profile_picture_url?: string | null
          email_verified?: boolean
          phone_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          role?: 'customer' | 'salon_owner' | 'admin'
          loyalty_points?: number
          profile_picture_url?: string | null
          email_verified?: boolean
          phone_verified?: boolean
          updated_at?: string
        }
      }
      salons: {
        Row: {
          id: string
          owner_id: string
          name: string
          description: string | null
          address: string
          latitude: number
          longitude: number
          operating_hours: Json
          salon_type: 'men' | 'women' | 'unisex'
          rating_avg: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          description?: string | null
          address: string
          latitude: number
          longitude: number
          operating_hours: Json
          salon_type: 'men' | 'women' | 'unisex'
          rating_avg?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          description?: string | null
          address?: string
          latitude?: number
          longitude?: number
          operating_hours?: Json
          salon_type?: 'men' | 'women' | 'unisex'
          rating_avg?: number | null
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          salon_id: string
          name: string
          description: string | null
          price: number
          duration: number
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          salon_id: string
          name: string
          description?: string | null
          price: number
          duration: number
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          salon_id?: string
          name?: string
          description?: string | null
          price?: number
          duration?: number
          category?: string
          updated_at?: string
        }
      }
      queues: {
        Row: {
          id: string
          customer_id: string
          salon_id: string
          service_ids: string[]
          status: 'waiting' | 'in-progress' | 'completed' | 'no-show'
          position: number | null
          estimated_wait_time: number | null
          joined_at: string
          started_at: string | null
          completed_at: string | null
          no_show_at: string | null
        }
        Insert: {
          id?: string
          customer_id: string
          salon_id: string
          service_ids: string[]
          status?: 'waiting' | 'in-progress' | 'completed' | 'no-show'
          position?: number | null
          estimated_wait_time?: number | null
          joined_at?: string
          started_at?: string | null
          completed_at?: string | null
          no_show_at?: string | null
        }
        Update: {
          id?: string
          customer_id?: string
          salon_id?: string
          service_ids?: string[]
          status?: 'waiting' | 'in-progress' | 'completed' | 'no-show'
          position?: number | null
          estimated_wait_time?: number | null
          started_at?: string | null
          completed_at?: string | null
          no_show_at?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          salon_id: string
          customer_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          salon_id: string
          customer_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          salon_id?: string
          customer_id?: string
          rating?: number
          comment?: string | null
          updated_at?: string
        }
      }
      salon_photos: {
        Row: {
          id: string
          salon_id: string
          url: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          salon_id: string
          url: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          salon_id?: string
          url?: string
          metadata?: Json | null
        }
      }
      offers: {
        Row: {
          id: string
          salon_id: string | null
          title: string
          description: string | null
          discount_type: 'percentage' | 'flat'
          discount_amount: number
          valid_from: string
          valid_to: string
          terms: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          salon_id?: string | null
          title: string
          description?: string | null
          discount_type: 'percentage' | 'flat'
          discount_amount: number
          valid_from: string
          valid_to: string
          terms?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          salon_id?: string | null
          title?: string
          description?: string | null
          discount_type?: 'percentage' | 'flat'
          discount_amount?: number
          valid_from?: string
          valid_to?: string
          terms?: string | null
          active?: boolean
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          user_id: string
          salon_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          salon_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          salon_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types
export type User = Database['public']['Tables']['users']['Row']
export type Salon = Database['public']['Tables']['salons']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type Queue = Database['public']['Tables']['queues']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type SalonPhoto = Database['public']['Tables']['salon_photos']['Row']
export type Offer = Database['public']['Tables']['offers']['Row']
export type Favorite = Database['public']['Tables']['favorites']['Row']