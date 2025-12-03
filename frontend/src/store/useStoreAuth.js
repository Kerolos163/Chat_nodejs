import { create } from "zustand";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { axiosInstance } from "../utils/axios";

const Base_URL = "http://localhost:3000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check-auth");
      set({ authUser: res.data.user });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth👉 " + error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    console.log(data);
    try {
      set({ isSigningUp: true });
      const body = {
        fName: data.firstName,
        lName: data.lastName,
        email: data.email,
        password: data.password,
      };

      const res = await axiosInstance.post("auth/signup", body);
      console.log(res.data);
      toast.success(res.data.message);
      set({ authUser: res.data.user });
      get().connectSocket();
    } catch (error) {
      console.log(error.response.data.errors[0].message);
      toast.error(error.response.data.errors[0].message);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("auth/logout");
      toast.success(res.data.message);
      set({ authUser: null });
      get().disConnectSocket();
    } catch (error) {
      console.log(error);
      toast.error("Oops! Something went wrong. Please try again.");
    }
  },

  login: async (data) => {
    console.log(data);
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("auth/login", data);
      toast.success(res.data.message);
      set({ authUser: res.data.user });
      get().connectSocket();
    } catch (error) {
      console.log(error.response.data.errors[0].message);
      toast.error(error.response.data.errors[0].message);
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("auth/update-profile", data);
      console.log(res.data);
      toast.success(res.data.message);
      set({ authUser: res.data.user });
    } catch (error) {
      console.log(error.response.data.errors[0].message);
      toast.error(error.response.data.errors[0].message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(Base_URL, {
      query: { userId: authUser.id },
    });
    socket.connect();

    set({ socket });

    socket.on("onLineUsers", (userIds) => {
      console.log(userIds);
      set({ onlineUsers: userIds });
    });
  },

  disConnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
