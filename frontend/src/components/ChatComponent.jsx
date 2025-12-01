import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import Chatheader from "./Chatheader";

const ChatComponent = () => {
  const { isMessageLoading, getMessages, selectedUser } = useChatStore();

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser, getMessages]);

  if (isMessageLoading) return <div>Loading...</div>;

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <Chatheader />
    </div>
  );
};

export default ChatComponent;
