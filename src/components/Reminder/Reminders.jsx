import { useEffect, useState } from 'react';
import supabase from '../../config/supabaseClient';
import EditIcon from '@material-ui/icons/Edit';
import UpdateReminder from './UpdateReminder';

const Reminders = ({ pet }) => {
  const [fetchError, setFetchError] = useState(null);
  const [reminderData, setReminderData] = useState([]);
  const [selectedReminder, setSelectedReminder] = useState(null);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        let query = supabase
          .from('reminders')
          .select('id, due_date, pet_id, task')
          .eq('completed', false)
          .order('due_date', { ascending: true })
          .limit(6);

        if (pet) {
            query = query.eq('pet_id', pet.id);
        }
  
        const { data, error } = await query;

        if (error) {
          setFetchError('Could not fetch reminders');
          console.log(error);
          setReminderData([]);
        }
        if (data) {
          setReminderData(data);
          setFetchError(null);
        }
      } catch (error) {
        setFetchError('Could not fetch reminders');
        console.log(error);
        setReminderData([]);
      }
    };

    fetchReminders();
  }, []);

    const handleEditReminder = (reminder) => {
        setSelectedReminder(reminder);
    };

    const handleCancelEdit = () => {
        setSelectedReminder(null);
    };

    return (
        <div className='reminders-container'>
        {fetchError && <p>Error: {fetchError}</p>}
        {reminderData.length > 0 ? (
            <table>
            <thead>
                <tr>
                <th>Due Date</th>
                <th>Pet</th>
                <th>Task</th>
                </tr>
            </thead>
            <tbody>
            {reminderData.map((reminder) => (
              <tr key={reminder.id}>
                <td>{reminder.due_date}</td>
                <td>{reminder.task}</td>
                <td>
                  <EditIcon onClick={() => handleEditReminder(reminder)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reminders available</p>
      )}
      {selectedReminder && (
        <UpdateReminder
          reminder={selectedReminder}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
    );
};

export default Reminders;
