import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "./useStoreAuth";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async (authUserId) => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("message/users");
      set({ users: res.data.users.filter((user) => user._id !== authUserId) });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response.data.errors[0].message);
      toast.error(error.response.data.errors[0].message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get("message/" + userId);
      set({ messages: res.data.messsages });
    } catch (error) {
      console.log(error.response.data.errors[0].message);
      toast.error(error.response.data.errors[0].message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        "message/send/" + selectedUser._id,
        messageData
      );
      set({ messages: [...messages, res.data.newMessage] });
    } catch (error) {
      console.log(error.response.data.errors[0].message);
      toast.error(error.response.data.errors[0].message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.on("message", (newMessage) => {
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },

  unSubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("message");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
