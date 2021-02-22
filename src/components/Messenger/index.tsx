import React from 'react';
import MessageList from '../MessageList';
import './Messenger.css';

export default function Messenger() {
    return (
      <div className="messenger">
        <div className="scrollable content">
          <MessageList />
        </div>
      </div>
    );
}