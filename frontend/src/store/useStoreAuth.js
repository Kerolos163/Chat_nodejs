import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check-auth");
      set({ authUser: res.data.user });
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
}));
