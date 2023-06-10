import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"
import WeightHistory from '../components/Weight/WeightHistory'
import { useAuth } from '../context/AuthProvider'
import Weight from "../components/Weight/PetWeight"
import VetVisits from "../components/VetVisit/VetVisits"
import AddReminder from "../components/Reminder/AddReminder"
import Reminders from "../components/Reminder/Reminders"

import './PetProfile.css'

const PetProfile = () => {
    const { id } = useParams()
    const { user } = useAuth()

    const [fetchError, setFetchError] = useState(null)
    const [pet, setPet] = useState(null)
    const [refreshWeightHistory, setRefreshWeightHistory] = useState(false);
    const [showAddReminderForm, setShowAddReminderForm] = useState(false);

    const [selectedReminder, setSelectedReminder] = useState(null);


    const handleEditReminder = (reminder) => {
        setSelectedReminder(reminder);
    };

    const handleCancelEdit = () => {
        setSelectedReminder(null);
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.toLocaleDateString(undefined, { day: '2-digit' });
        const month = date.toLocaleDateString(undefined, { month: 'short' });
        return `${day}-${month}`;
    }

    const calculateAge = () => {
        const birthDate = new Date(pet.dob);
        const currentDate = new Date();
        const ageInMilliseconds = currentDate - birthDate;
        const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
        return ageInYears;
      };
    
    useEffect(() => {
        const fetchPet = async () => {
            const { data, error } = await supabase
                .from('pets')
                .select()
                .eq('id', id)
                console.log(data)
                
                if(error) {
                    setFetchError("could not fetch pets")
                    console.log(error)
                    setPet(null)
                }
                if(data) {
                    const petData = data[0]
                    setPet(petData)
                    setFetchError(null)
                }
        }
        fetchPet()
    }, [])

    
    const handleWeightAdded = () => {
        setRefreshWeightHistory(prevState => !prevState);
    }

    useEffect(() => {
        if (refreshWeightHistory) {
            setRefreshWeightHistory(false);
        }
    }, [refreshWeightHistory]);
    
    const toggleAddReminderForm = () => {
        setShowAddReminderForm(!showAddReminderForm);
      };



    return (
     <div className="pet-profile">
      {fetchError && <p>{fetchError}</p>}
      {pet && (
        <div className="content-container">
          <div className="content-section">
            <div className="info-section">
              <div className="profile-picture">
                <h3>{pet.name}</h3>
                <img src={pet.photo_url} alt={pet.photo_url} />
              </div>
              <div className="profile-info">
                <p>{pet.name} is a {pet.sex === 'male' ? 'boy' : 'girl'}</p>
                <p>And is {calculateAge()} years old</p>
                <p><strong>Birthday:</strong> {formatDate(pet.dob)}</p>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <Weight
                  key={pet.id}
                  pet={pet}
                />
                <p>Is {pet.name} desexed?   {pet.desexed ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
          <div>
            <WeightHistory
              pet={pet}
              refreshWeightHistory={refreshWeightHistory}
              onWeightAdded={handleWeightAdded}
            />
          </div>
        </div>
      )}
      {pet && (
        <div className="content-container">
          <div className="content-section">
            <VetVisits
              pet={pet}
            />
          </div>
          <div className="content-section">
            <button className="add-reminder-toggle" onClick={toggleAddReminderForm}>
              {showAddReminderForm ? 'Hide Form' : 'Add Reminder'}
            </button>
            {/* {showAddReminderForm && <AddReminder pet={pet}/>} */}
            <Reminders pet={pet} showAddReminderForm={showAddReminderForm} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PetProfile