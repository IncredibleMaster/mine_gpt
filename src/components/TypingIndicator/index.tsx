import React from "react";
import moment from "moment";
import "./TypingIndicator.css";
import "../Message/Message.css";

export default function TypingIndicator() {
  return (
    <div className="message end">
      <div className="bubble-container">
        <div className="bubble">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
