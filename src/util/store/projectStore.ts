import { create } from "zustand";

interface ProjectStoreState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: number, updatedFields: Partial<Project>) => void;
  deleteProject: (id: number) => void;
}

export const useProjectStore = create<ProjectStoreState>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (id, updatedFields) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? ({ ...project, ...updatedFields } as Project)
          : project
      ),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),
}));
