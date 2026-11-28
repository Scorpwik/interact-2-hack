export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "17.1"
  }
  public: {
    Tables: {
      disponibilidades: {
        Row: {
          desde: string
          dia: string
          hasta: string
          id: string
          perfil: string
        }
        Insert: {
          desde: string
          dia: string
          hasta: string
          id?: string
          perfil: string
        }
        Update: {
          desde?: string
          dia?: string
          hasta?: string
          id?: string
          perfil?: string
        }
        Relationships: [
          {
            foreignKeyName: "disponibilidades_perfil_fkey"
            columns: ["perfil"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      observaciones: {
        Row: {
          autor: string | null
          autor_nombre: string
          creada_en: string
          id: string
          tarea: string
          texto: string
        }
        Insert: {
          autor?: string | null
          autor_nombre: string
          creada_en?: string
          id?: string
          tarea: string
          texto: string
        }
        Update: {
          autor?: string | null
          autor_nombre?: string
          creada_en?: string
          id?: string
          tarea?: string
          texto?: string
        }
        Relationships: [
          {
            foreignKeyName: "observaciones_autor_fkey"
            columns: ["autor"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "observaciones_tarea_fkey"
            columns: ["tarea"]
            isOneToOne: false
            referencedRelation: "tareas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "observaciones_tarea_fkey"
            columns: ["tarea"]
            isOneToOne: false
            referencedRelation: "tareas_vista"
            referencedColumns: ["id"]
          },
        ]
      }
      pasos: {
        Row: {
          id: string
          marcado_en: string | null
          marcado_por: string | null
          marcado_por_nombre: string | null
          orden: number
          tarea: string
          texto: string
        }
        Insert: {
          id?: string
          marcado_en?: string | null
          marcado_por?: string | null
          marcado_por_nombre?: string | null
          orden: number
          tarea: string
          texto: string
        }
        Update: {
          id?: string
          marcado_en?: string | null
          marcado_por?: string | null
          marcado_por_nombre?: string | null
          orden?: number
          tarea?: string
          texto?: string
        }
        Relationships: [
          {
            foreignKeyName: "pasos_marcado_por_fkey"
            columns: ["marcado_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pasos_tarea_fkey"
            columns: ["tarea"]
            isOneToOne: false
            referencedRelation: "tareas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pasos_tarea_fkey"
            columns: ["tarea"]
            isOneToOne: false
            referencedRelation: "tareas_vista"
            referencedColumns: ["id"]
          },
        ]
      }
      perfiles: {
        Row: {
          correo: string
          es_super_admin: boolean
          id: string
          nombre: string
          rol: string
          telefono: string
        }
        Insert: {
          correo: string
          es_super_admin?: boolean
          id: string
          nombre: string
          rol: string
          telefono?: string
        }
        Update: {
          correo?: string
          es_super_admin?: boolean
          id?: string
          nombre?: string
          rol?: string
          telefono?: string
        }
        Relationships: []
      }
      responsables: {
        Row: {
          perfil: string
          tarea: string
        }
        Insert: {
          perfil: string
          tarea: string
        }
        Update: {
          perfil?: string
          tarea?: string
        }
        Relationships: [
          {
            foreignKeyName: "responsables_perfil_fkey"
            columns: ["perfil"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responsables_tarea_fkey"
            columns: ["tarea"]
            isOneToOne: false
            referencedRelation: "tareas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responsables_tarea_fkey"
            columns: ["tarea"]
            isOneToOne: false
            referencedRelation: "tareas_vista"
            referencedColumns: ["id"]
          },
        ]
      }
      tareas: {
        Row: {
          completada_en: string | null
          completada_por: string | null
          completada_por_nombre: string | null
          creada_por: string | null
          descripcion: string | null
          editando_desde: string | null
          editando_por: string | null
          fuera_de_hora: boolean
          id: string
          iniciada_en: string | null
          iniciada_por: string | null
          iniciada_por_nombre: string | null
          lugar: string
          nombre: string
          urgente: boolean
          vence_en: string
        }
        Insert: {
          completada_en?: string | null
          completada_por?: string | null
          completada_por_nombre?: string | null
          creada_por?: string | null
          descripcion?: string | null
          editando_desde?: string | null
          editando_por?: string | null
          fuera_de_hora?: boolean
          id?: string
          iniciada_en?: string | null
          iniciada_por?: string | null
          iniciada_por_nombre?: string | null
          lugar: string
          nombre: string
          urgente?: boolean
          vence_en: string
        }
        Update: {
          completada_en?: string | null
          completada_por?: string | null
          completada_por_nombre?: string | null
          creada_por?: string | null
          descripcion?: string | null
          editando_desde?: string | null
          editando_por?: string | null
          fuera_de_hora?: boolean
          id?: string
          iniciada_en?: string | null
          iniciada_por?: string | null
          iniciada_por_nombre?: string | null
          lugar?: string
          nombre?: string
          urgente?: boolean
          vence_en?: string
        }
        Relationships: [
          {
            foreignKeyName: "tareas_completada_por_fkey"
            columns: ["completada_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tareas_creada_por_fkey"
            columns: ["creada_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tareas_editando_por_fkey"
            columns: ["editando_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tareas_iniciada_por_fkey"
            columns: ["iniciada_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      tareas_vista: {
        Row: {
          completada_en: string | null
          completada_por: string | null
          completada_por_nombre: string | null
          creada_por: string | null
          descripcion: string | null
          editando_desde: string | null
          editando_por: string | null
          estado: string | null
          fuera_de_hora: boolean | null
          id: string | null
          iniciada_en: string | null
          iniciada_por: string | null
          iniciada_por_nombre: string | null
          lugar: string | null
          nombre: string | null
          pasos_marcados: number | null
          pasos_total: number | null
          por_vencer: boolean | null
          responsables_total: number | null
          urgente: boolean | null
          vence_en: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tareas_completada_por_fkey"
            columns: ["completada_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tareas_creada_por_fkey"
            columns: ["creada_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tareas_editando_por_fkey"
            columns: ["editando_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tareas_iniciada_por_fkey"
            columns: ["iniciada_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
