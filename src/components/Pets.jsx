import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

import PetCard from './PetCard'

const Pets = () => {
    console.log(supabase)
    const [fetchError, setFetchError] = useState(null)
    const [pets, setPets] = useState(null)

    useEffect(() => {
        const fetchPets = async () => {
            const { data, error } = await supabase
                .from('pets')
                .select()

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
                            <PetCard key={pet.id} pet={pet}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Pets