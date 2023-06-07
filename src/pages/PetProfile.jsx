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

    const [selectedReminder, setSelectedReminder] = useState(null);

    const handleEditReminder = (reminder) => {
        setSelectedReminder(reminder);
    };

    const handleCancelEdit = () => {
        setSelectedReminder(null);
    };

    // const calculateAge = () => {
    //     const birthDate = new Date(dob)
    //     const currentDate = new Date()
    //     const ageInMilliseconds = currentDate - birthDate
    //     const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365))
    //     return ageInYears
    // };
    
    // const age = calculateAge(pet.dob)
    // console.log(pet.dob)

    // const getSexIcon = (pet) => {
    //     if (sex === 'male') {
    //       return '♂︎'
    //     }
    //     if (sex === 'female') {
    //       return '♀︎'
    //     }
    //     return null
    // }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.toLocaleDateString(undefined, { day: '2-digit' });
        const month = date.toLocaleDateString(undefined, { month: 'short' });
        return `${day}-${month}`;
    }
    
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
    
    return (
        <div className="pet-profile">
            {fetchError && (<p>{fetchError}</p>)}
            {pet && (
                <div className="pet-profile">
                <div className="profile-picture">
                    <p>{pet.name}</p>
                   
                    <img src={pet.photo_url} alt={pet.photo_url} />
                </div>
                <h3>{pet.sex} {pet.dob} </h3>
                <p>Breed: {pet.breed}</p>
                <p>Birthday: {formatDate(pet.dob)}</p>
                <p>Dessexed: {pet.desexed ? 'Yes' : 'No'}</p>
                <Weight 
                key={pet.id} 
                pet={pet}
                />
                </div>
                
            )}
            <br />
            {pet && (
            <div className="weight-history-container">
                <WeightHistory 
                pet={pet}
                refreshWeightHistory={refreshWeightHistory}
                onWeightAdded={handleWeightAdded}
                />
            </div>
            )}
            <br />
            {pet && (
            <div className="vet-visits-container">
                <VetVisits 
                pet={pet}
                />
            </div>
            )}
            <br />
            {pet && (
            <div className="reminders-container">
            
            <div className="add-reminder">
                <AddReminder 
                pet={pet}
                />
            </div>
            <div>
            {selectedReminder ? (
              <UpdateReminder
                reminder={selectedReminder}
                onCancel={handleCancelEdit}
              />
            ) : (
              <Reminders 
              pet={pet}
              onEdit={handleEditReminder} />
            )}
          </div>

            </div>
            )}

        </div>
    )
}

export default PetProfile