import { useState } from 'react';
import supabase from '../../config/supabaseClient';
import { useAuth } from "../../context/AuthProvider"

import './AddReminder.css'

const AddReminder = ({ pet, fetchReminders }) => {
    const { user } = useAuth()
    const user_id = user.id
    const [dueDate, setDueDate] = useState('');
    const [task, setTask] = useState('');

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const handlePetIdChange = (e) => {
        setPetId(e.target.value);
    };

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleAddReminder = async () => {
        if (!dueDate || !task) {
        return;
        }

        try {
        const { data, error } = await supabase.from('reminders').insert([
            {
            due_date: dueDate,
            pet_id: pet.id,
            task: task,
            user_id: user.id,
            },
        ]);

        if (error) {
            console.log(error);
            return;
        }
        else {
            fetchReminders()
        }

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

export default AddReminder;