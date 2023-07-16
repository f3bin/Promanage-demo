import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userlist: [],
  projects: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserList: (state, action) => {
      state.userlist = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addTask: (state, action) => {
      const { projectID, task } = action.payload;
      const projectIndex = state.projects.findIndex(
        (project) => project.projectID === projectID
      );
      if (projectIndex !== -1) {
        state.projects[projectIndex].tasks.push(task);
      }
    },
  },
});

export const {
  setUser,
  setUserList,
  setProjects,
  addTask,
} = appSlice.actions;

export default appSlice.reducer;
