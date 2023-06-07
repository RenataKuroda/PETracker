import supabase from '../../config/supabaseClient'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthProvider'

const Weight = ({ pet }) => {
    const { user } = useAuth()

    const [fetchError, setFetchError] = useState(null)
    const [weight, setWeight] = useState(null)
    const [orderBy, setOrderBy] = useState('date')

    useEffect(() => {
        const fetchWeight = async () => {
            const { data, error } = await supabase
                .from('weight_history')
                .select()
                .eq('pet_id', pet.id)
                .order(orderBy, {ascending:false})
                .limit(1)
                console.log(pet.id)
                console.log(data[0])

                if(error) {
                    setFetchError("could not fetch weigth")
                    console.log(error)
                    setWeight(null)
                }
                if (data && data.length > 0) {
                    setWeight(data[0].weight);
                    setFetchError(null);
                } else {
                    setWeight(null); 
                }
        }
        fetchWeight()
    }, [])

    return (
        <div className="pet-weight">
        {weight && (
            <p><strong>Weight:</strong> {weight} kg</p>
        )}
        </div>
    )
}

export default Weight