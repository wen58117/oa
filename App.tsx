import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TodoList from './components/TodoList';
import Announcements from './components/Announcements';
import AIAssistant from './components/AIAssistant';
import type { View } from './types';

const App: React.FC = () => {
  // 使用 useState 来管理当前显示的视图
  const [activeView, setActiveView] = useState<View>('dashboard');

  // 根据 activeView 的值来决定渲染哪个组件
  const renderContent = () => {
    switch (activeView) {
      case 'todos':
        return <TodoList />;
      case 'announcements':
        return <Announcements />;
      case 'ai_assistant':
        return <AIAssistant />;
      case 'dashboard':
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* 侧边栏导航 */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      {/* 主内容区域 */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;