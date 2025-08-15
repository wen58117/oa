import React, { useState, useEffect } from 'react';
import type { Announcement } from '../types';
import { getAnnouncements } from '../services/apiService';

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        setError('加载公告失败，请稍后重试。');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">通知公告</h2>
        <p className="text-gray-500 mt-2">在这里查看最新的公司动态和重要信息。</p>
      </header>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {isLoading ? (
        <p className="text-gray-500">正在加载公告...</p>
      ) : (
        <div className="space-y-6">
          {announcements.map(announcement => (
            <div key={announcement.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-800">{announcement.title}</h3>
              <div className="text-sm text-gray-500 mt-2 mb-4">
                <span>发布部门：{announcement.author}</span>
                <span className="mx-2">|</span>
                <span>发布日期：{announcement.date}</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {announcement.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;