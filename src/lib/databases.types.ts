export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Conversations: {
        Row: {
          conversationTypeId: number | null
          created_at: string
          id: number
          messages: string[] | null
          userId: string | null
        }
        Insert: {
          conversationTypeId?: number | null
          created_at?: string
          id?: number
          messages?: string[] | null
          userId?: string | null
        }
        Update: {
          conversationTypeId?: number | null
          created_at?: string
          id?: number
          messages?: string[] | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Conversations_conversationTypeId_fkey"
            columns: ["conversationTypeId"]
            isOneToOne: false
            referencedRelation: "ConversationTypes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Conversations_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      ConversationTypes: {
        Row: {
          created_at: string
          id: number
          prompt: string
          template: string
        }
        Insert: {
          created_at?: string
          id?: number
          prompt: string
          template: string
        }
        Update: {
          created_at?: string
          id?: number
          prompt?: string
          template?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          voice_id: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          voice_id?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          voice_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      append_array: {
        Args: {
          new_element: string
          id: number
        }
        Returns: undefined
      }
      remove_array: {
        Args: {
          new_element: string
          id: number
        }
        Returns: undefined
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
