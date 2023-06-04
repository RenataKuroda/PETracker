import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import PetCard from './PetCard'

const Pets = () => {
    const { user } = useAuth()

    const [fetchError, setFetchError] = useState(null)
    const [pets, setPets] = useState(null)
    const [orderBy, setOrderBy] = useState('name')

    const handleDelete = (id) => {
        setPets(prevPets => {
            return prevPets.filter(pet => pet.id !== id)
        })
    }

    useEffect(() => {
        const fetchPets = async () => {
            const { data, error } = await supabase
                .from('pets')
                .select()
                .eq('user_id', user.id)
                .order(orderBy, {ascending: true})
                console.log(data)

                if(error) {
                    setFetchError("could not fetch pets")
                    console.log(error)
                    setPets(null)
                }
                if(data) {
                    setPets(data)
                    setFetchError(null)
                }
        }
        fetchPets()
    }, [])

    return (
        <div>
            {fetchError && (<p>{fetchError}</p>)}
            {pets && (
                <div className='pets'>
                    <div className='pet-grid'>
                        {pets.map(pet => (
                            <PetCard 
                            key={pet.id} 
                            pet={pet}
                            onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Pets