import { useState } from 'react';
import supabase from '../../config/supabaseClient';
import { useAuth } from "../../context/AuthProvider"

import './AddReminder.css'

export const AddReminder = ({ pet_id, user_id, fetchReminders, addReminder }) => {
    const [dueDate, setDueDate] = useState('');
    const [task, setTask] = useState('');
    console.log(addReminder)

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleAddReminder = async () => {
        if (!dueDate || !task) {
            return;
        }
        try {
            await addReminder({
                user_id,
                pet_id,
                due_date: dueDate,
                task: task,
            })
            fetchReminders && fetchReminders()
            setDueDate('');
            setTask('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='add-reminder-container'>
            <input
                type="date"
                value={dueDate}
                onChange={handleDueDateChange}
                placeholder="Due Date"
            />
            <input
                type="text"
                value={task}
                onChange={handleTaskChange}
                placeholder="Task"
            />
            <button onClick={handleAddReminder}>Add Reminder</button>
        </div>
    );
};

const ConnectedAddReminder = ({ pet, fetchReminders }) => {
    const { user } = useAuth()

    console.log(pet,  'pet')
    console.log(user)

    const addReminder = async (reminder) => {
        const { error } = await supabase.from('reminders').insert([reminder]);
        console.log(reminder)
        if (error) {
            throw new Error(error.message);
        }
    };

    return <AddReminder pet_id={pet.id} user_id={user.id} fetchReminders={fetchReminders} addReminder={addReminder} />
    }

export default ConnectedAddReminder;