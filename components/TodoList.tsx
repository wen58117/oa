import React, { useState, useEffect } from 'react';
import type { TodoItem } from '../types';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/apiService';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 组件加载时从后端获取数据
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
      } catch (err) {
        setError('加载待办事项失败，请稍后重试。');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // 处理添加新待办事项
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    try {
      const addedTodo = await addTodo(newTodo);
      setTodos([addedTodo, ...todos]);
      setNewTodo('');
    } catch (err) {
      setError('添加任务失败，请检查网络连接。');
      console.error(err);
    }
  };

  // 切换待办事项的完成状态
  const handleToggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const updated = await updateTodo(id, { completed: !todo.completed });
      setTodos(
        todos.map(t => (t.id === id ? updated : t))
      );
    } catch (err) {
      setError('更新任务状态失败。');
      console.error(err);
    }
  };

  // 删除待办事项
  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('删除任务失败。');
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">我的待办事项</h2>
      
      <form onSubmit={handleAddTodo} className="flex gap-4 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="添加一个新的任务..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow hover:shadow-md">
          添加
        </button>
      </form>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {isLoading ? (
        <p className="text-gray-500">正在加载...</p>
      ) : (
        <ul className="space-y-3">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className={`ml-4 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 font-bold transition-colors"
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;