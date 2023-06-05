import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import supabase from '../config/supabaseClient';
import Weight from './PetWeight';

const WeightHistory = ({ pet }) => {
  const [fetchError, setFetchError] = useState(null);
  const [weightData, setWeightData] = useState([]);
  const [orderBy, setOrderBy] = useState('date')

  
  useEffect(() => {
    const fetchWeightHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('weight_history')
          .select('date, weight')
          .eq('pet_id', pet.id)
          .order(orderBy, { ascending: true });

        if (error) {
          setFetchError('Could not fetch weight history');
          console.log(error);
          setWeightData([]);
        }
        if (data) {
          setWeightData(data);
          setFetchError(null);
          console.log(data)
        }
      } catch (error) {
        setFetchError('Could not fetch weight history');
        console.log(error);
        setWeightData([]);
      }
    };

    fetchWeightHistory();
  }, []);

  return (
    <div>
      {fetchError && <p>Error: {fetchError}</p>}
      {weightData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {weightData.map((entry) => (
              <tr key={entry.date}>
                <td>{entry.date}</td>
                <td>{entry.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No weight data available</p>
      )}
    </div>
  );
};

export default WeightHistory;
