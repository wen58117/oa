
// 定义应用中的可用视图
export type View = 'dashboard' | 'todos' | 'announcements' | 'ai_assistant';

// 定义待办事项的数据结构
export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

// 定义公告的数据结构
export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
}

// 定义聊天消息的数据结构
export interface Message {
  sender: 'user' | 'model';
  text: string;
}
