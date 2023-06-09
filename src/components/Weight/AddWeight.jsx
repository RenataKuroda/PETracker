import { useState } from 'react';
import supabase from '../../config/supabaseClient';
import { useAuth } from '../../context/AuthProvider';

import './AddWeight.css'

export const AddWeight = ({ pet_id, fetchWeightHistory, addWeight }) => {
  const [weight, setWeight] = useState('');

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleAddWeight = async () => {
    if (!weight || parseFloat(weight) <= 0) {
      return;
    }
    try {
      const currentDate = new Date().toISOString();

      await addWeight({ 
          pet_id, 
          weight: parseFloat(weight), 
          date: currentDate 
        },
);

      fetchWeightHistory && fetchWeightHistory()
      setWeight('');
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='add-weight-container'>
      <input
        type="number"
        value={weight}
        onChange={handleWeightChange}
        placeholder="Enter weight"
      />
      <button onClick={handleAddWeight}>Add Weight</button>
    </div>
  );
};

const ConnectedAddWeight = ({ pet, fetchWeightHistory }) => {
    

    const addWeight = async (weight) => {
      const { error } = await supabase.from('weight_history').insert([weight]);

      if (error) {
        throw new Error(error.message)
      }
    }

    return <AddWeight pet_id={pet.id} fetchWeightHistory={fetchWeightHistory} addWeight={addWeight} />
}

export default ConnectedAddWeight
