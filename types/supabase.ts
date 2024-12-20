export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      albums: {
        Row: {
          cover_image_id: string | null
          created_at: string
          description: string
          id: string
          slug: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cover_image_id?: string | null
          created_at?: string
          description: string
          id?: string
          slug?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cover_image_id?: string | null
          created_at?: string
          description?: string
          id?: string
          slug?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "albums_cover_image_id_fkey"
            columns: ["cover_image_id"]
            isOneToOne: false
            referencedRelation: "processed_images"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          created_at: string | null
          id: string
          job_data: Json
          last_error: string | null
          retries: number | null
          session_id: string
          status: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_data: Json
          last_error?: string | null
          retries?: number | null
          session_id: string
          status?: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          job_data?: Json
          last_error?: string | null
          retries?: number | null
          session_id?: string
          status?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      processed_images: {
        Row: {
          album_id: string | null
          gphotos_created_at: string
          gphotos_id: string | null
          height: number | null
          id: string
          image_path: string
          image_thumbnail_path: string
          imported_at: string
          order: number | null
          raw_metadata: Json | null
          user_id: string
          visible: boolean | null
          width: number | null
        }
        Insert: {
          album_id?: string | null
          gphotos_created_at: string
          gphotos_id?: string | null
          height?: number | null
          id?: string
          image_path: string
          image_thumbnail_path: string
          imported_at?: string
          order?: number | null
          raw_metadata?: Json | null
          user_id: string
          visible?: boolean | null
          width?: number | null
        }
        Update: {
          album_id?: string | null
          gphotos_created_at?: string
          gphotos_id?: string | null
          height?: number | null
          id?: string
          image_path?: string
          image_thumbnail_path?: string
          imported_at?: string
          order?: number | null
          raw_metadata?: Json | null
          user_id?: string
          visible?: boolean | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_album"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      site_visits: {
        Row: {
          id: number
          site_id: string | null
          username: string
          visit_count: number
          visit_date: string
        }
        Insert: {
          id?: never
          site_id?: string | null
          username: string
          visit_count?: number
          visit_date: string
        }
        Update: {
          id?: never
          site_id?: string | null
          username?: string
          visit_count?: number
          visit_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_visits_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          created_at: string | null
          id: string
          layout_config: Json
          premium_overrides: Json | null
          premium_plan: string
          status: string
          updated_at: string | null
          user_id: string
          username: string
          visits: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          layout_config: Json
          premium_overrides?: Json | null
          premium_plan?: string
          status?: string
          updated_at?: string | null
          user_id: string
          username: string
          visits?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          layout_config?: Json
          premium_overrides?: Json | null
          premium_plan?: string
          status?: string
          updated_at?: string | null
          user_id?: string
          username?: string
          visits?: number
        }
        Relationships: []
      }
      upload_session_status: {
        Row: {
          session_id: string
          status: string
          total_completed: number
          total_failed: number
          total_images: number
          user_id: string
        }
        Insert: {
          session_id: string
          status: string
          total_completed: number
          total_failed: number
          total_images: number
          user_id: string
        }
        Update: {
          session_id?: string
          status?: string
          total_completed?: number
          total_failed?: number
          total_images?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_top_user_sites: {
        Args: {
          date_filter: string
          limit_count: number
        }
        Returns: {
          username: string
          site_id: number
          site_visits: number
          image_count: number
        }[]
      }
      increment_daily_site_visits:
        | {
            Args: {
              p_site_id: number
            }
            Returns: undefined
          }
        | {
            Args: {
              p_site_id: string
            }
            Returns: undefined
          }
      increment_site_visits:
        | {
            Args: {
              p_site_id: number
            }
            Returns: undefined
          }
        | {
            Args: {
              p_site_id: string
            }
            Returns: undefined
          }
      increment_total_completed:
        | {
            Args: {
              p_session_id: string
            }
            Returns: undefined
          }
        | {
            Args: {
              p_session_id: string
              p_increment: number
            }
            Returns: undefined
          }
      increment_total_failed:
        | {
            Args: {
              p_session_id: string
            }
            Returns: undefined
          }
        | {
            Args: {
              p_session_id: string
              p_increment: number
            }
            Returns: undefined
          }
      increment_total_images:
        | {
            Args: {
              p_session_id: string
            }
            Returns: undefined
          }
        | {
            Args: {
              p_session_id: string
              p_increment: number
            }
            Returns: undefined
          }
      slugify: {
        Args: {
          text: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
