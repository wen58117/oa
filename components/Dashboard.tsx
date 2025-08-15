import React from 'react';
import { TodoIcon, AnnouncementIcon, AIIcon } from '../constants';
import type { View } from '../types';
import type { IconProps } from '../constants';

interface DashboardProps {
  setActiveView: (view: View) => void;
}

// 卡片组件
const InfoCard: React.FC<{
  icon: React.ReactElement<IconProps>;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}> = ({ icon, title, description, color, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-start cursor-pointer transform hover:-translate-y-1"
  >
    <div className={`p-3 rounded-full ${color}`}>
      {React.cloneElement(icon, { className: "h-6 w-6 text-white" })}
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-500 mt-1">{description}</p>
    </div>
  </div>
);


const Dashboard: React.FC<DashboardProps> = ({ setActiveView }) => {
  const userName = "管理员"; // 示例用户名

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">欢迎回来, {userName}！</h2>
        <p className="text-gray-500 mt-2">这是您的工作仪表盘，祝您今天工作愉快。</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard 
          icon={<TodoIcon />}
          title="待办事项"
          description="查看和管理您的任务列表，保持工作条理清晰。"
          color="bg-blue-500"
          onClick={() => setActiveView('todos')}
        />
        <InfoCard 
          icon={<AnnouncementIcon />}
          title="通知公告"
          description="及时获取最新的公司新闻和重要通知。"
          color="bg-green-500"
          onClick={() => setActiveView('announcements')}
        />
        <InfoCard 
          icon={<AIIcon />}
          title="AI 助手"
          description="您的智能伙伴，随时准备帮您起草文案或回答问题。"
          color="bg-purple-500"
          onClick={() => setActiveView('ai_assistant')}
        />
      </div>

      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">快速开始</h3>
        <p className="text-gray-600">
          您可以从左侧的导航栏选择一个模块开始工作。例如，点击“待办事项”来添加您今天的第一个任务，或者向“AI 助手”打个招呼，看看它能为您做些什么。
        </p>
      </div>
    </div>
  );
};

export default Dashboard;