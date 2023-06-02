import { useState } from "react"
import { useNavigate } from "react-router"
import supabase from "../config/supabaseClient"

const Create = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [sex, setSex] = useState('')
    const [desexed, setDesexed] = useState('')
    const [photo, setPhoto] = useState('')
    const [dob, setDOB] = useState('')
    const [formError, setFormError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { data, error} = await supabase
            .from('pets')
            .insert([{ name, breed, sex, desexed, photo, dob }])
            .select()

        if (error) {
            console.log(error)
            setFormError("Failed to add pet")
        }
        if (data) {
            console.log(data)
            setFormError(null)
            navigate('/')
        }
    }

    return(
        <div className="create-pet">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

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

                <button>Add Pet</button>

                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}

export default Create