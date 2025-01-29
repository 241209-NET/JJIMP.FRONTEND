/// <reference types="vite/client" />

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  projects?: Project[];
  createdIssues?: Issue[];
  assignedIssues?: Issue[];
  comments?: IssueComment[];
  managedProjects?: Project[];
  last_activity?: string | Date;
  created_at?: string | Date;
  updated_at?: string | Date;
}
interface Project {
  id: number;
  name: string;
  description: string;
  projectManager?: User;
  projectManagerId: number | undefined | null;
  users?: User[];
  issues?: Issue[];
  created_at?: string | Date;
  updated_at?: string | Date;
}

interface ProjectForm {
  name: string;
  description: string;
  projectManagerId: number | undefined | null;
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
  assignee: User;
  deadline?: string | Date;
  projectId: number;
  comments: number[];
  created_by: User;
  created_at?: string | Date;
  updated_at?: string | Date;
  commentObjs?: IssueComment[];
}
interface IssueComment {
  id: number;
  content: string;
  issue_id: number;
  posted_by: number;
  created_at?: string | Date;
  updated_at?: string | Date;
}
