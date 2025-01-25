/// <reference types="vite/client" />

interface User {
  id: number;
  name: string;
  email: string;
  last_activity?: string | Date;
  created_at?: string | Date;
  updated_at?: string | Date;
}
interface Project {
  id: number;
  name: string;
  description: string;
  project_manager: number;
  user_id: number[];
  created_at?: string | Date;
  updated_at?: string | Date;
}
enum IssueStatus {
  Inactive = "Inactive",
  Active = "Active",
  Review = "Review",
  Complete = "Complete",
}
interface Issue {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  assignee: number[];
  deadline?: string | Date;
  project_id: number;
  comments: number[];
  created_by: number;
  created_at?: string | Date;
  updated_at?: string | Date;
}
interface Comment {
  id: number;
  content: string;
  issue_id: number;
  posted_by: number;
  created_at?: string | Date;
  updated_at?: string | Date;
}
