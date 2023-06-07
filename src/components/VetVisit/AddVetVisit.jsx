import { useNavigate } from 'react-router';
import { useState } from 'react';
import supabase from '../../config/supabaseClient';

const AddPetVisit = ({ pet, fetchVetVisits }) => {
  const navigate = useNavigate()
  const [vetName, setVetName] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const handleVetNameChange = (e) => {
    setVetName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from('vet_visits').insert([
        {
          pet_id: pet.id,
          vet_name: vetName,
          date,
          reason,
          notes,
        },
      ]);

      if (error) {
        console.log(error);
        return;
      }
      else {
        fetchVetVisits()
      }
      // Clear form fields after successful submission
      setVetName('');
      setDate('');
      setReason('');
      setNotes('');
    } catch (error) {
      console.log(error);
    }
   
  };

  return (
    <div>
      <h2>Add Vet Visit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vet Name:</label>
          <input type="text" value={vetName} onChange={handleVetNameChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={handleDateChange} />
        </div>
        <div>
          <label>Reason:</label>
          <input type="text" value={reason} onChange={handleReasonChange} />
        </div>
        <div>
          <label>Notes:</label>
          <textarea value={notes} onChange={handleNotesChange} />
        </div>
        <button type="submit">Add Visit</button>
      </form>
    </div>
  );
};

export default AddPetVisit;
