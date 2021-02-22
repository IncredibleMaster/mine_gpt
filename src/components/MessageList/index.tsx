import React, { useEffect, useRef, useState } from "react";
import Compose from "../Compose";
import Message from "../Message";
import moment from "moment";

import "./MessageList.css";
import Toolbar from "../Toolbar";
import GPTService from "../../services/gpt";
import MessageBuilderService from "../../services/message-builder";
import TypingIndicator from "../TypingIndicator";

const MY_USER_ID = "Human";

export interface Message {
  author: string;
  message: string;
  timestamp: number;
}
export default function MessageList() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      author: "AI",
      message:
        "Hi! I'm a chatbot built with GPT-3. What would you like to talk about?",
      timestamp: new Date().getTime(),
    },
  ] as Message[]);

  // Stays scrolled to bottom.
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef) {
      (messagesEndRef.current as any)?.scrollIntoView({ behavior: "smooth" })
    }
  });
  const addMyMessage = async (value: string) => {
    const newMessage = {
      author: MY_USER_ID,
      message: value,
      timestamp: new Date().getTime(),
    };
    
    setMessages((previous) => [...previous, newMessage]);
    setLoading(true);
    const withMine = [...messages, newMessage];
    const response = await GPTService.getAIResponse(withMine);
    const responseMessage = {
      author: "AI",
      message: response,
      timestamp: new Date().getTime(),
    };
    setMessages((previous) => [...previous, responseMessage]);
    setLoading(false);
  };

  return (
    <div className="message-list">
      <Toolbar title="Chat with GPT3" />

      <div className="message-list-container">{MessageBuilderService.getMessages(messages, MY_USER_ID)}
      {loading && <TypingIndicator />}
      <div ref={messagesEndRef} />
      </div>
      

      <Compose addMessage={addMyMessage} />
    </div>
  );
}
