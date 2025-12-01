import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import Chatheader from "./Chatheader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatComponent = () => {
  const { isMessageLoading, getMessages, selectedUser } = useChatStore();

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser, getMessages]);

  if (isMessageLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <Chatheader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <Chatheader />
      <p>Messages</p>
      <MessageInput />
    </div>
  );
};

export default ChatComponent;
