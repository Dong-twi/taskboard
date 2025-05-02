/**
 * TaskList 元件 - 任務列表的展示組件
 * 
 * 功能說明：
 * 1. 接收任務陣列並將其轉換為視覺化的列表
 * 2. 使用 map 函數將每個任務轉換為列表項目
 * 3. 為每個任務項目提供統一的樣式
 * 
 * Props 說明：
 * @param {Object} props - 組件接收的屬性
 * @param {Array} props.tasks - 包含所有任務的陣列
 *                             每個元素都是一個字串，代表一個任務
 * 
 * 樣式說明：
 * - space-y-2: 列表項目之間的垂直間距為 0.5rem
 * - border: 為每個任務項目添加邊框
 * - p-2: 任務項目內部填充為 0.5rem
 * - rounded: 為任務項目添加圓角
 * 
 * 注意事項：
 * - 使用 index 作為 key 是因為任務列表是唯讀的，不支持刪除或重排序
 * - 如果將來需要支持這些操作，應該使用唯一的任務 ID 作為 key
 */
export default function TaskList({ tasks }) {
    return (
        // 使用無序列表包裹所有任務項目
        <ul className="space-y-2">
            {/* 將每個任務轉換為列表項目
                tasks.map 會遍歷陣列中的每個任務
                index 參數用於提供 key 屬性 */}
            {tasks.map((task, index) => (
                <li key={index} className="border p-2 rounded">
                    {task}
                </li>
            ))}
        </ul>
    )
}