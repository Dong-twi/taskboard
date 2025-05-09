'use client';

import TaskList from "@/components/TaskList";
import Link from "next/link";
import { useState, useEffect } from "react";

/**
 * Home 元件 - 任務管理系統的主要介面
 * 
 * 功能說明：
 * 1. 提供任務輸入界面，允許用戶輸入新的任務
 * 2. 管理任務的新增操作
 * 3. 顯示所有已新增的任務列表
 * 
 * 狀態管理：
 * - tasks: 儲存所有任務的陣列，每個元素為一個任務字串
 * - newTask: 儲存用戶正在輸入的新任務文字
 * 
 * 使用的技術：
 * - React Hooks (useState) 用於狀態管理
 * - Next.js 的 'use client' 指令表明這是客戶端元件
 */
export default function Home() {
  // tasks 陣列用於儲存所有已新增的任務
  // 初始值為空陣列，透過 setTasks 函數更新
  const [tasks, setTasks] = useState([]);

  // newTask 用於追蹤輸入框中的當前值
  // 當用戶輸入時會即時更新，提交後會被清空
  const [newTask, setNewTask] = useState("");

  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id), 0);
    setNextId(maxId + 1);
  },[]);

  /**
   * 新增任務的處理函數
   * 
   * 執行步驟：
   * 1. 記錄當前任務列表狀態（用於調試）
   * 2. 記錄新任務內容（用於調試）
   * 3. 建立新的任務陣列，包含所有現有任務和新任務
   * 4. 更新 tasks 狀態
   * 5. 記錄更新後的任務列表（用於調試）
   * 6. 清空輸入框
   * 
   * 注意：使用展開運算符 (...) 來確保不直接修改原始陣列
   */
  const addTask = () => {
    console.log("Before" , tasks);
    console.log("New Task:" + newTask);

    const newTaskObj = {
      id: nextId,
      title: newTask,
      description: "",
    };
    const updatedTasks = [...tasks, newTaskObj];
    setTasks(updatedTasks);
    console.log("After" , updatedTasks);
    setNewTask("");

    setNextId(nextId + 1);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      {/* 頁面標題 */}
      {/* 使用 Tailwind CSS 的樣式來設置字體大小和粗細 */}
      {/* text-2xl: 字體大小為 2xl
          font-bold: 粗體字 */}
      {/* 這裡的 h1 標籤是頁面的主要標題 */}
      <h1 className="text-2x1 font-bold">Task Board</h1>
      
      {/* 任務輸入區塊
          包含：
          1. 文字輸入框 - 用於輸入新任務的內容
          2. 新增按鈕 - 點擊時觸發 addTask 函數 */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Enter a task"
          value={newTask}
          /* onChange 事件處理函數說明：
           * - e: 代表事件對象 (event object)
           * - e.target: 代表觸發事件的 DOM 元素（在這裡是 input 輸入框）
           * - e.target.value: 獲取輸入框的當前值
           * 
           * 當用戶在輸入框中輸入內容時：
           * 1. onChange 事件被觸發
           * 2. e.target.value 包含了輸入框的最新值
           * 3. setNewTask 將這個新值更新到 newTask 狀態中
           */
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-while p-4" 
          onClick={addTask}
        >
          Add
        </button>
      </div>
      
      {/* TaskList 元件
          傳入 tasks 陣列作為 props
          負責渲染所有已新增的任務 */}
      <TaskList tasks={tasks}  onDelete={handleDelete}/>
    </main>
  );
}
