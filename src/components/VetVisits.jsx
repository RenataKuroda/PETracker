import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import AddPetVisit from './AddVetVisit';
// import AddWeight from './AddWeight';


const VetVisits = ({ pet }) => {
  const [fetchError, setFetchError] = useState(null);
  const [vetVisitData, setVetVisitData] = useState([]);
  const [orderBy, setOrderBy] = useState('date')

  
  useEffect(() => {
    const fetchVetVisits = async () => {
      try {
        const { data, error } = await supabase
          .from('vet_visits')
          .select('date, vet_name, reason, notes')
          .eq('pet_id', pet.id)
          .order(orderBy, { ascending: false });

        if (error) {
          setFetchError('Could not fetch vet visit history');
          console.log(error);
          setVetVisitData([]);
        }
        if (data) {
          setVetVisitData(data);
          setFetchError(null);
          console.log(data)
        }
      } catch (error) {
        setFetchError('Could not fetch vet visit history');
        console.log(error);
        setVetVisitData([]);
      }
    };

    fetchVetVisits();
  }, []);


  return (
    <div>
      {fetchError && <p>Error: {fetchError}</p>}
      <AddPetVisit pet={pet} />
      {vetVisitData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Vet</th>
              <th>Reason</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {vetVisitData.map((entry) => (
              <tr key={entry.date}>
                <td>{entry.date}</td>
                <td>{entry.vet_name}</td>
                <td>{entry.reason}</td>
                <td>{entry.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vet visit data available</p>
      )}
    </div>
  );
};

export default VetVisits;
