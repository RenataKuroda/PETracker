import { useState } from "react"
import { useNavigate } from "react-router"
import supabase from "../config/supabaseClient"
import { useAuth } from "../context/AuthProvider"

import './CreateUpdatePet.css'

const Create = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const user_id = user.id
    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [sex, setSex] = useState('')
    const [desexed, setDesexed] = useState('')
    const [photo_url, setPhoto_Url] = useState('')
    const [dob, setDOB] = useState('')
    const [specie, setSpecie] = useState('')
    const [formError, setFormError] = useState('')

    const [profileImage, setProfileImage] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))

    }

    const uploadImage = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try{
            let imageURL
            if(profileImage) {
                const image = new FormData()
                image.append("file", profileImage)
                image.append("cloud_name", "dtpduetp4")
                image.append("upload_preset", upload_preset)

                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dtpduetp4/image/upload",
                    {
                        method: "post",
                        body: image
                    }
                )
                const imgData = await response.json()
                setImageURL(imgData.url.toString())
                setImagePreview(null)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(isLoading){
            return
        }

        const { data, error} = await supabase
            .from('pets')
            .insert([{ name, breed, sex, desexed, photo_url: imageURL, user_id, dob, specie }])
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
            <div className="uploadimage">
                <form onSubmit={uploadImage}>
                    <p>
                        <label>Photo:</label>
                        <input type="file" name="image" onChange={handleImageChange}/>
                        
                    </p>

                    <p>
                        {
                        isLoading ? ("Uploading...") : (
                            <button type="submit">
                                Upload Image
                            </button>
                        )}
                    </p>
                </form>
                <div className="profile-picture">
                    {imagePreview && (
                        <img src={imagePreview && imagePreview} alt="pet photo"/>
                    )}

                </div>
            
            </div>
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