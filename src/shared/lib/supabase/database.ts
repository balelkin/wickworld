export type ProjectVisibility = "private" | "public";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          created_at?: string;
        };
        Update: {
          display_name?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          storage_path: string;
          visibility: ProjectVisibility;
          remix_of: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          storage_path: string;
          visibility?: ProjectVisibility;
          remix_of?: string | null;
        };
        Update: {
          title?: string;
          storage_path?: string;
          visibility?: ProjectVisibility;
          remix_of?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
