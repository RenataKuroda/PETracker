import { useEffect, useState } from 'react';
import supabase from '../../config/supabaseClient';
// import EditIcon from '@material-ui/icons/Edit';
import EditIcon from '@mui/icons-material/Edit';
import UpdateReminder from './UpdateReminder';
import './Reminders.css'
import { useAuth } from '../../context/AuthProvider';

const Reminders = ({ pet }) => {
  const { user } = useAuth()
  const [fetchError, setFetchError] = useState(null);
  const [reminderData, setReminderData] = useState([]);
  const [selectedReminder, setSelectedReminder] = useState(null);


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


  useEffect(() => {
    fetchReminders();
  }, []);

    const handleEditReminder = (reminder) => {
        setSelectedReminder(reminder);
    };

    const handleCancelEdit = () => {
        setSelectedReminder(null);
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.toLocaleDateString(undefined, { day: '2-digit' });
      const month = date.toLocaleDateString(undefined, { month: '2-digit' });
      const year = date.toLocaleDateString(undefined, { year: 'numeric' });
      return `${day}/${month}/${year}`;
    };

    return (
        <div className='reminders-container'>
        <h3 className="reminders-title">Reminders</h3>
        {fetchError && <p>Error: {fetchError}</p>}
        {reminderData.length > 0 ? (
            
            <table>
            <thead>
                <tr>
                <th>Due Date</th>
                <th>Task</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
            {reminderData.map((reminder) => (
              <tr key={reminder.id}>
                <td>{formatDate(reminder.due_date)}</td>
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
          fetchReminders={fetchReminders}
        />
      )}
    </div>
    );
};

export default Reminders;