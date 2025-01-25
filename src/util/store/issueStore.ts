import { create } from "zustand";

type issueStoreState = {
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
  addIssue: (issue: Issue) => void;
  updateIssue: (id: number, updatedFields: Partial<Issue>) => void;
  deleteIssue: (id: number) => void;
};

export const useIssueStore = create<issueStoreState>((set) => ({
  issues: [],
  setIssues: (issues) => set({ issues }),
  addIssue: (issue) => set((state) => ({ issues: [...state.issues, issue] })),
  updateIssue: (id, updatedFields) =>
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === id ? ({ ...issue, ...updatedFields } as Issue) : issue
      ),
    })),
  deleteIssue: (id) =>
    set((state) => ({
      issues: state.issues.filter((issue) => issue.id !== id),
    })),
}));
