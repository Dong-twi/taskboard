'use client';
import { useReducer } from "nexr/navigation";
import { useEffect, useState }  from "react";

export default function TastDetaill({ params }) {
    const router = useRouter();
    const { id } = params;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = () => {
        const savedTask = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.map((task) =>
            task.id === Number(id) ? { ...task, title, description } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        router.push("/");
    };

    useEffect(() => {
        const savedTask = JSON.parse(localStorage.getItem("tasks")) || [];
        const task = savedTask.find((task) => task.id === Number(id));
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [id]);
    return (
        <main className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Task Detail</h1>
            <input
                className="border p-2 w-full mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                className="border p-2 w-full mb-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={4}
            />
            <button
                className="bg-blue-500 text-white p-2"
                onClick={handleSave}
            >
                Save
            </button>
        </main>
    )
}