import { useEffect, useState } from 'react';
import supabase from '../../config/supabaseClient';
import AddVetVisit from './AddVetVisit';
import './VetVisits.css'


const VetVisits = ({ pet }) => {
    const [fetchError, setFetchError] = useState(null);
    const [vetVisitData, setVetVisitData] = useState([]);
    const [orderBy, setOrderBy] = useState('date')

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
    useEffect(() => {

      fetchVetVisits();
    }, []);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.toLocaleDateString(undefined, { day: '2-digit' });
      const month = date.toLocaleDateString(undefined, { month: '2-digit' });
      const year = date.toLocaleDateString(undefined, { year: 'numeric' });
      return `${day}/${month}/${year}`;
    };

    return (
      <div>
        {fetchError && <p>Error: {fetchError}</p>}
        <AddVetVisit pet={pet} fetchVetVisits={fetchVetVisits}/>
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
                  <td>{formatDate(entry.date)}</td>
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
