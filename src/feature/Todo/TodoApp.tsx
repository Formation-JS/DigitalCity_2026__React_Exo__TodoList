import { useState } from "react";
import type { Task, TaskData } from "../../@types/task";
import TaskForm from "../../components/Task/TaskForm-v2";
import TaskList from "../../components/Task/TaskList";
import { nanoid } from "nanoid";

export default function TodoApp() {

    const [tasks, setTasks] = useState<Task[]>([]);

    const handleNewTask = (task: TaskData) => {
        const taskToAdd: Task = { ...task, id: nanoid(), isDone: false };
        setTasks(prevTasks => [...prevTasks, taskToAdd]);
    };

    const handleDeleteTask = (taskId: string) => {

        // setTasks(prevTasks => {
        //     const copy = structuredClone(prevTasks);
        //
        //     const index = copy.findIndex(elem => elem.id === taskId);
        //     copy.splice(index, 1);
        //
        //     return copy;
        // })

        setTasks(prevTasks => prevTasks.filter(elem => elem.id !== taskId));
    };

    const handleFinishTask = (taskId: string) => {

        // setTasks(prevTasks => {
        //     const copy = structuredClone(prevTasks);
        //
        //     const index = copy.findIndex(elem => elem.id === taskId);
        //     copy[index].isDone = true;
        //
        //     return copy;
        // })

        setTasks(prevTasks => prevTasks.map(elem => (elem.id !== taskId) ? elem : { ...elem, isDone: true }));
    };

    return (
        <div>
            <h2>Ajouter une nouvelle tache</h2>
            <TaskForm onTaskSubmit={handleNewTask} />

            <h2>Liste des tâches</h2>
            <TaskList />
        </div>
    );
}