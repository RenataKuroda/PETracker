import { useState } from 'react';
import supabase from '../../config/supabaseClient';

import './AddWeight.css'

const AddWeight = ({ pet, fetchWeightHistory }) => {
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

      const { error } = await supabase.from('weight_history')
      .insert([
        { 
          pet_id: pet.id, 
          weight: parseFloat(weight), 
          date: currentDate 
        },
      ]);

      if (error) {
        console.log(error);
        return;
      }
      else {
        fetchWeightHistory()
      }

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

export default AddWeight;

