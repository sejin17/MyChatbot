import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!inputText.trim()) return; 

    const userMessage = { text: inputText, isBot: false };
    const body = {
      chatHistory: [...messages, userMessage],
      question: inputText,
    }    

    // Add a new empty bot message to the UI
    const botMessage = { text: '', isBot: true };
    setMessages([...messages, userMessage, botMessage]);
    setInputText('');

    // Send the user's message to the server and wait for a response.
    // This response will be streamed to this component.
    const response = await fetch('http://localhost:5000/handle-query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.body) return;

    // Set up the infrastructure to stream the response data
    let decoder = new TextDecoderStream();
    const reader = response.body.pipeThrough(decoder).getReader()    
    let accumulatedAnswer = ""

    while (true) {
      var { value, done } = await reader.read();
      if (done) break;
      accumulatedAnswer += value;
      setMessages(currentHistory => {
        const updatedHistory = [...currentHistory]
        const lastChatIndex = updatedHistory.length - 1
        updatedHistory[lastChatIndex] = {
          ...updatedHistory[lastChatIndex],
          text: accumulatedAnswer
        }
        return updatedHistory
      })
    }
  };


}

export default ChatInterface;