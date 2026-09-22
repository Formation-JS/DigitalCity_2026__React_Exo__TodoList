import { useActionState, useId } from 'react';
import style from './Task.module.css';
import z from 'zod';
import type { TaskData, TaskSelectOption } from '../../@types/task';

const taskSchema: z.ZodType<TaskData> = z.object({
    name: z.string().min(3),
    desc: z.string().min(3).nullable(),
    priority: z.literal(['LOW', 'NORMAL', 'URGENT'])
});

const taskPriorityOptions: TaskSelectOption = [
    { label: 'Basse', value: 'LOW' },
    { label: 'Normal', value: 'NORMAL' },
    { label: 'Urgent', value: 'URGENT' }
];

type TaskState = {
    formData: FormData | null;
    errors: {
        name?: string[];
        desc?: string[];
        priority?: string[];
    } | null;
};


type TaskFormProps = {
    onTaskSubmit: (task: TaskData) => void;
};

export default function TaskForm({ onTaskSubmit }: TaskFormProps) {

    // ↓ L'action est défini dans le composant, elle a donc acces au element de celui-ci (props)
    async function taskSubmitAction(state: TaskState, formData: FormData): Promise<TaskState> {
        const { success, data, error } = await taskSchema.safeParseAsync(Object.fromEntries(formData));
        if (!success) {
            return {
                formData,
                errors: z.flattenError(error).fieldErrors,
            };
        }

        // Traitement...
        onTaskSubmit(data);

        return {
            formData: null,
            errors: null,
        };
    }

    const inputId = useId();
    const [state, handleSubmit] = useActionState(taskSubmitAction, { formData: null, errors: null });

    return (
        <form className={style['task-form']} action={handleSubmit}>
            <div>
                <label htmlFor={inputId + '-name'}>Nom</label>
                <input name='name' id={inputId + '-name'} type="text"
                    defaultValue={state.formData?.get('name')?.toString()} />
            </div>
            <div>
                <label htmlFor={inputId + '-desc'}>Description</label>
                <textarea name='desc' id={inputId + '-desc'}
                    defaultValue={state.formData?.get('desc')?.toString()} />
            </div>
            <div>
                <label htmlFor={inputId + '-prio'}>Priorité</label>
                <select name='priority' id={inputId + '-prio'}
                    defaultValue={state.formData?.get('priority')?.toString()}
                    key={'priority-' + state.formData?.get('priority')?.toString()}>
                    {taskPriorityOptions.map(elem => (
                        <option key={elem.value} value={elem.value}>{elem.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <button type="submit">Valider</button>
                {state.errors && <span>Une erreur est survenue</span>}
            </div>
        </form>
    );
}