import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

const UpdatePet = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [sex, setSex] = useState('')
    const [desexed, setDesexed] = useState('')
    const [photo, setPhoto] = useState('')
    const [dob, setDOB] = useState('')
    const [specie, setSpecie] = useState('')
    const [formError, setFormError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase 
            .from('pets')
            .update({ name, breed, sex, desexed, photo, dob, specie })
            .eq('id' , id)
            .select()
        
        if(error){
            console.log(error)
            setFormError('Could not update pet')
        }

        if(data){
            setFormError(null)
            console.log(data)
            navigate('/')
        }

    }

    useEffect(() => {
        const fetchPet = async () => {
            const { data, error } = await supabase
                .from('pets')
                .select()
                .eq('id', id)
                .single()
            
            if(error){
                navigate('/', { replace: true })
            }
            if(data){
                setName(data.name)
                setBreed(data.breed)
                setSex(data.sex)
                setDesexed(data.desexed)
                setPhoto(data.photo)
                setDOB(data.dob)
                setSpecie(data.specie)
                console.log(data)
            }
        }
        fetchPet()
    }, [id, navigate])

    return (
        <div className="pet-update">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="specie">Specie</label>
                <select
                    id="specie"
                    value={specie}
                    onChange={(e) => setSpecie(e.target.value)}
                    required
                >
                    <option value="">Select:</option>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="breed">Breed:</label>
                <input 
                    type="text"
                    id="breed"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />

                <label htmlFor="sex">Sex:</label>
                <select
                    id="sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    required
                >
                    <option value="">Select Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label htmlFor="desexed">Desexed?</label>
                <select
                    id="desexed"
                    value={desexed}
                    onChange={(e) => setDesexed(e.target.value === "true")}
                    required
                >
                    <option value="">Select Desexed</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <label htmlFor="photo">Photo:</label>
                <input 
                    type="img"
                    id="photo"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                />

                <label htmlFor="dob">Date of Birth:</label>
                <input 
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                />

                <button>Update Pet</button>

                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}

export default UpdatePet