import { useState } from 'react';
import supabase from '../config/supabaseClient';

const UpdateReminder = ({ reminder }) => {
  const [dueDate, setDueDate] = useState(reminder.due_date);
  const [task, setTask] = useState(reminder.task);
  const [completed, setCompleted] = useState(reminder.completed);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleCompletedChange = (e) => {
    setCompleted(e.target.checked);
  };

  const handleUpdateReminder = async () => {
    try {
      setIsUpdating(true);

      const { error } = await supabase
        .from('reminders')
        .update({ due_date: dueDate, task: task, completed: completed })
        .eq('id', reminder.id);

      if (error) {
        setUpdateError('Could not update the reminder');
        console.log(error);
      } else {
        setUpdateError(null);
      }

      setIsUpdating(false);
    } catch (error) {
      setUpdateError('Could not update the reminder');
      console.log(error);
      setIsUpdating(false);
    }
  };

  return (
    <div className='update-reminder-container'>
      <h3>Update Reminder</h3>
      <div>
        <label htmlFor='dueDate'>Due Date:</label>
        <input type='date' id='dueDate' value={dueDate} onChange={handleDueDateChange} />
      </div>
      <div>
        <label htmlFor='task'>Task:</label>
        <input type='text' id='task' value={task} onChange={handleTaskChange} />
      </div>
      <div>
        <label htmlFor='completed'>Completed:</label>
        <input type='checkbox' id='completed' checked={completed} onChange={handleCompletedChange} />
      </div>
      <button onClick={handleUpdateReminder} disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update'}
      </button>
      {updateError && <p>Error: {updateError}</p>}
    </div>
  );
};

export default UpdateReminder;
