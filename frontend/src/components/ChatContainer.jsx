import { useEffect, useMemo, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    messages,
    getMessagesByUserId,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser) {
      getMessagesByUserId(selectedUser._id);
      subscribeToMessages();
    }

    // Cleanup on unmount or when selectedUser changes
    return () => {
      unsubscribeToMessages();
    };
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);

  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🗂️ Group messages by date
  //using useMemo to reduce the re-render when the messages are not changed
  /*
  Imagine you have 1,000 messages and you're grouping them by date.

  Without useMemo
  Every render → Group all 1,000 messages again → wasted CPU cycles.

  With useMemo

  First render → Group 1,000 messages.

  Later renders → Reuses cached grouped data as long as messages is unchanged.

  This makes your chat faster and smoother, especially on slower devices.
  */
  const groupedMessages = useMemo(() => {
    const groups = {};

    messages.forEach((msg) => {
      const dateKey = new Date(msg.createdAt).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(msg);
    });

    return groups;
  }, [messages]);

  // 🗓️ Helper function to format date header
  const formatDateHeader = (dateString) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const messageDate = new Date(dateString);

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return messageDate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {Object.keys(groupedMessages).map((date) => (
              <div key={date}>
                {/* 🗓️ Date separator */}
                <div className="flex justify-center my-4">
                  <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm">
                    {formatDateHeader(date)}
                  </span>
                </div>

                {/* 💬 Messages for this date */}
                {groupedMessages[date].map((msg) => (
                  <div
                    key={msg._id}
                    className={`chat ${
                      msg.senderId === authUser._id ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div
                      className={`chat-bubble relative ${
                        msg.senderId === authUser._id
                          ? "bg-cyan-600 text-white"
                          : "bg-slate-800 text-slate-200"
                      }`}
                    >
                      {/* If message contains an image */}
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Shared"
                          className="rounded-lg h-48 object-cover"
                        />
                      )}

                      {/* Message text */}
                      {msg.text && <p className="mt-2">{msg.text}</p>}

                      {/* Message timestamp */}
                      <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true, // or false for 24-hour format
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceHolder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
}

export default ChatContainer;
