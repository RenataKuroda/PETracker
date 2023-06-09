import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

import './UpdatePet.css'

const UpdatePet = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [sex, setSex] = useState('')
    const [desexed, setDesexed] = useState('')
    const [photo_url, setPhoto_Url] = useState('')
    const [dob, setDOB] = useState('')
    const [specie, setSpecie] = useState('')
    const [formError, setFormError] = useState('')
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        const fetchBreeds = async () => {
          let apiURL;
          if (specie === "dog") {
            apiURL = "https://dog.ceo/api/breeds/list/all";
          } else if (specie === "cat") {
            apiURL = "https://api.thecatapi.com/v1/breeds";
          } else {
            return;
          }
    
          const response = await fetch(apiURL);
          const data = await response.json();
          let breeds = [];
    
          if (specie === "dog") {
            breeds = Object.keys(data.message);
          } else if (specie === "cat") {
            breeds = data.map((breed) => breed.name);
          }
    
          setBreeds(breeds);
        };
    
        fetchBreeds();
      }, [specie]);

    const [profileImage, setProfileImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const petData = {
          name,
          breed,
          sex,
          desexed,
          dob,
          specie,
        };
      
        if (profileImage) {
          try {
            const image = new FormData();
            image.append("file", profileImage);
            image.append("cloud_name", "dtpduetp4");
            image.append("upload_preset", upload_preset);
      
            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dtpduetp4/image/upload",
              {
                method: "post",
                body: image,
              }
            );
            const imgData = await response.json();
            petData.photo_url = imgData.url.toString();
          } catch (error) {
            console.log(error);
            setFormError("Could not update pet");
            return;
          }
        }
      
        const { data, error } = await supabase
          .from("pets")
          .update(petData)
          .eq("id", id)
          .select();
      
        if (error) {
          console.log(error);
          setFormError("Could not update pet");
        }
      
        if (data) {
          setFormError(null);
          console.log(data);
          navigate("/");
        }
      };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setProfileImage(null);
            setImagePreview(photo_url);
        }

      };
    
      const uploadImage = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
          let imageURL;
          if (profileImage) {
            const image = new FormData();
            image.append("file", profileImage);
            image.append("cloud_name", "dtpduetp4");
            image.append("upload_preset", upload_preset);
    
            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dtpduetp4/image/upload",
              {
                method: "post",
                body: image,
              }
            );
            const imgData = await response.json();
            imageURL = imgData.url.toString();
            setImagePreview(null);
          }
    
          setPhoto_Url(imageURL);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };

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
                setImagePreview(data.photo_url)
                setDOB(data.dob)
                setSpecie(data.specie)
                console.log(data)
            }
        }
        fetchPet()
    }, [id, navigate])

    return (
        <div className="pet-update">
            <div className="profile-picture">
                <form onSubmit={uploadImage}>
                <p>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <h6>If you wanna change the photo, select another file</h6>
                </p>
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        
                    />
                 )}
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <button type="submit">Upload Photo</button>
                )}
                </form>
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
                <select
                    id="breed"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                >
                <option value="">Select Breed</option>
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>
                        {breed.charAt(0).toUpperCase() + breed.slice(1)}
                        </option>
                    ))}
                </select>

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

                <button>Update Pet</button>

                {formError && <p className="error">{formError}</p>}
                <button onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdatePet