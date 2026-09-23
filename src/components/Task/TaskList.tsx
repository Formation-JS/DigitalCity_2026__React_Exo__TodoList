import { useMemo } from "react";
import type { Task } from "../../@types/task";

type TaskListProps = {
    tasks: Task[];
    onFinishTask?: (taskid: string) => void,
    onDeleteTask?: (taskid: string) => void;
};
export default function TaskList({ tasks, onFinishTask = () => { }, onDeleteTask = () => { } }: TaskListProps) {

    return (
        <section>
            {tasks.map(task => (
                <TaskListItem {...task} key={task.id}
                    onFinish={onFinishTask}
                    onDelete={onDeleteTask} />
            ))}
        </section>
    );
}

type TaskListItemProps = Task & {
    onFinish: (taskid: string) => void,
    onDelete: (taskid: string) => void;
};
function TaskListItem({ id, name, desc, priority, isDone, onFinish, onDelete }: TaskListItemProps) {
    
    const status = useMemo(() => isDone ? 'Terminé' : 'En cours', [isDone]);
    
    return (
        <article>
            <div>
                <p>{name} - {priority}</p>
                {desc && <p>{desc}</p>}
                <p>Status: {status}</p>
            </div>
            <div>
                <button onClick={() => onFinish(id)} disabled={isDone}>Terminer</button>
                <button onClick={() => onDelete(id)}>Supprimer</button>
            </div>
        </article>
    );
}