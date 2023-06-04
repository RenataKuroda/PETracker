import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import "./PetCard.css"

const PetCard = ({ pet, onDelete }) => {
    const calculateAge = (dob) => {
        const birthDate = new Date(dob)
        const currentDate = new Date()
        const ageInMilliseconds = currentDate - birthDate
        const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365))
        return ageInYears
    };
    
    const age = calculateAge(pet.dob)

    const getSexIcon = (sex) => {
        if (sex === 'male') {
          return '♂︎'
        }
        if (sex === 'female') {
          return '♀︎'
        }
        return null
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.toLocaleDateString(undefined, { day: '2-digit' });
        const month = date.toLocaleDateString(undefined, { month: 'short' });
        return `${day}-${month}`;
    }
    
    const handleDelete = async () => {
        const { error } = await supabase
            .from('pets')
            .delete()
            .eq('id', pet.id)

        if(error){
            console.log(error)
            return
        }
        onDelete(pet.id)
    }

    return (
        <div className="pet-card">
            <div className="profile-picture">
                <img src={pet.photo} alt={pet.photo} />
            </div>
            <h3>{pet.name} {getSexIcon(pet.sex)} {age} years old</h3>
            <p>Breed: {pet.breed}</p>
            <p>Birthday: {formatDate(pet.dob)}</p>
            <p>Dessexed: {pet.desexed ? 'Yes' : 'No'}</p>
            <div className="buttons">
                <Link to={'/' + pet.id}>
                    <EditIcon />
                </Link>
                <DeleteIcon onClick={handleDelete} />
            </div>
        </div>
    )
}

export default PetCard