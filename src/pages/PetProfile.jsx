import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"
import WeightHistory from '../components/WeightHistory'
import { useAuth } from '../context/AuthProvider'
import Weight from "../components/PetWeight"

const PetProfile = () => {
    const { id } = useParams()
    const { user } = useAuth()

    const [fetchError, setFetchError] = useState(null)
    const [pet, setPet] = useState(null)
    const [refreshWeightHistory, setRefreshWeightHistory] = useState(false);

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
        <div>
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
            {pet && (
            <div className="weight-history-container">
                <WeightHistory 
                pet={pet}
                refreshWeightHistory={refreshWeightHistory}
                onWeightAdded={handleWeightAdded}
                />
            </div>
            )}
        </div>
    )
}

export default PetProfile