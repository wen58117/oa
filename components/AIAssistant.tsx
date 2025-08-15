import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { postChatMessage } from '../services/apiService'; // 更改导入
import { AIIcon } from '../constants';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'model', text: '您好！我是您的AI办公助手，有什么可以帮助您的吗？' }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息处理
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // 调用新的后端服务接口
      const aiResponse = await postChatMessage(currentInput);
      const modelMessage: Message = { sender: 'model', text: aiResponse };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'model', text: '抱歉，处理您的请求时发生错误。' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg animate-fade-in">
      <header className="p-4 border-b flex items-center">
        <AIIcon />
        <h2 className="text-xl font-bold text-gray-800 ml-2">AI 助手</h2>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-lg p-3 rounded-lg shadow-sm ${
                  msg.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg shadow-sm">
                <span className="animate-pulse">正在输入...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t bg-gray-50">
        <form onSubmit={handleSendMessage} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请在此输入您的问题..."
            disabled={isLoading}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow hover:shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? '发送中...' : '发送'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;