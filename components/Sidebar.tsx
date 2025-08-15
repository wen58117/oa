
import React from 'react';
import type { View } from '../types';
import { DashboardIcon, TodoIcon, AnnouncementIcon, AIIcon } from '../constants';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

// 导航项的基础样式
const navItemBaseClasses = "flex items-center px-4 py-3 text-gray-700 rounded-lg cursor-pointer transition-colors duration-200";
// 激活状态的导航项样式
const navItemActiveClasses = "bg-blue-600 text-white shadow-md";
// 普通状态的导航项样式
const navItemInactiveClasses = "hover:bg-blue-100 hover:text-blue-700";

// 单个导航项组件
const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li onClick={onClick} className={`${navItemBaseClasses} ${isActive ? navItemActiveClasses : navItemInactiveClasses}`}>
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </li>
);

// 侧边栏组件
const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-64 h-screen bg-white shadow-xl flex flex-col fixed top-0 left-0">
      <div className="flex items-center justify-center p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">智能OA系统</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-3">
          <NavItem
            icon={<DashboardIcon />}
            label="主控面板"
            isActive={activeView === 'dashboard'}
            onClick={() => setActiveView('dashboard')}
          />
          <NavItem
            icon={<TodoIcon />}
            label="待办事项"
            isActive={activeView === 'todos'}
            onClick={() => setActiveView('todos')}
          />
          <NavItem
            icon={<AnnouncementIcon />}
            label="通知公告"
            isActive={activeView === 'announcements'}
            onClick={() => setActiveView('announcements')}
          />
          <NavItem
            icon={<AIIcon />}
            label="AI 助手"
            isActive={activeView === 'ai_assistant'}
            onClick={() => setActiveView('ai_assistant')}
          />
        </ul>
      </nav>
      <div className="p-4 mt-auto text-center text-xs text-gray-500 border-t">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
