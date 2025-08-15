import type { TodoItem, Announcement } from '../types';

// 模拟后端的API基础URL
const API_BASE_URL = '/api'; // 在实际应用中，替换为您的Java后端地址

// --- 模拟数据 ---
// 这部分数据用于在没有后端的情况下提供默认值
const mockTodos: TodoItem[] = [
  { id: 1, text: '完成项目报告', completed: false },
  { id: 2, text: '准备周会PPT', completed: true },
  { id: 3, text: '回复客户邮件', completed: false },
];

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: '关于2024年国庆节放假安排的通知',
    content: '根据国家法定节假日规定，结合公司实际情况，现将2024年国庆节放假安排通知如下：10月1日至7日放假调休，共7天。请各部门提前安排好工作，确保节后工作顺利进行。',
    date: '2024-09-15',
    author: '行政部',
  },
  {
    id: 2,
    title: '第三季度优秀员工评选结果公示',
    content: '经过各部门推荐及公司评审委员会的综合评定，第三季度优秀员工已经评选产生。获奖名单已在公司内部公告栏公示，请大家前往查看并向他们表示祝贺。',
    date: '2024-09-12',
    author: '人力资源部',
  },
];
// --- 模拟数据结束 ---


// 模拟网络延迟
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 从后端获取待办事项列表
 * @returns Promise<TodoItem[]>
 */
export const getTodos = async (): Promise<TodoItem[]> => {
  console.log('Fetching todos from backend...');
  await sleep(500); // 模拟网络延迟

  // 真实场景下的代码:
  /*
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error('获取待办事项失败');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return mockTodos; // 降级处理，返回默认数据
  }
  */

  // 当前为模拟代码:
  return Promise.resolve(mockTodos);
};

/**
 * 向后端添加一个新的待办事项
 * @param text - 任务内容
 * @returns Promise<TodoItem>
 */
export const addTodo = async (text: string): Promise<TodoItem> => {
    console.log(`Adding todo: ${text}`);
    await sleep(300);

    const newTodo: TodoItem = {
        id: Date.now(), // 在真实后端中，ID由数据库生成
        text,
        completed: false,
    };

    // 真实场景下的代码:
    /*
    try {
        const response = await fetch(`${API_BASE_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        if (!response.ok) {
            throw new Error('添加待办事项失败');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error; // 让调用处处理错误
    }
    */

    // 当前为模拟代码:
    return Promise.resolve(newTodo);
};

/**
 * 更新后端的一个待办事项
 * @param id - 任务ID
 * @param updates - 更新的内容
 * @returns Promise<TodoItem>
 */
export const updateTodo = async (id: number, updates: Partial<TodoItem>): Promise<TodoItem> => {
    console.log(`Updating todo ${id} with`, updates);
    await sleep(200);

    // 模拟更新
    const todoToUpdate = mockTodos.find(t => t.id === id);
    if (!todoToUpdate) throw new Error("Todo not found");
    const updatedTodo = { ...todoToUpdate, ...updates };

    // 真实场景下的代码:
    /*
    try {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
            method: 'PATCH', // 或 'PUT'
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        if (!response.ok) {
            throw new Error('更新待办事项失败');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
    */
    
    return Promise.resolve(updatedTodo);
};

/**
 * 从后端删除一个待办事项
 * @param id - 任务ID
 * @returns Promise<void>
 */
export const deleteTodo = async (id: number): Promise<void> => {
    console.log(`Deleting todo ${id}`);
    await sleep(200);

    // 真实场景下的代码:
    /*
    try {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('删除待办事项失败');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
    */

    return Promise.resolve();
};


/**
 * 从后端获取公告列表
 * @returns Promise<Announcement[]>
 */
export const getAnnouncements = async (): Promise<Announcement[]> => {
  console.log('Fetching announcements from backend...');
  await sleep(500);

  // 真实场景下的代码:
  /*
  try {
    const response = await fetch(`${API_BASE_URL}/announcements`);
    if (!response.ok) {
      throw new Error('获取公告失败');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return mockAnnouncements; // 降级处理
  }
  */

  // 当前为模拟代码:
  return Promise.resolve(mockAnnouncements);
};


/**
 * 将聊天消息发送到后端，由后端调用AI服务
 * @param message - 用户发送的消息
 * @returns Promise<string> AI的回复
 */
export const postChatMessage = async (message: string): Promise<string> => {
    console.log(`Sending message to backend AI service: ${message}`);
    await sleep(1000);

    // 真实场景下的代码:
    /*
    try {
        const response = await fetch(`${API_BASE_URL}/ai/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        if (!response.ok) {
            throw new Error('AI服务调用失败');
        }
        const data = await response.json();
        return data.reply; // 假设后端返回 { "reply": "..." }
    } catch (error) {
        console.error(error);
        return "抱歉，与AI助手通讯时发生错误。";
    }
    */

    // 当前为模拟代码:
    return Promise.resolve(`这是对您消息“${message}”的模拟回复。后端服务已收到请求。`);
};