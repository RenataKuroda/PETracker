const PetCard = ({ pet }) => {

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const currentDate = new Date();
        const ageInMilliseconds = currentDate - birthDate;
        const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
        return ageInYears;
      };
    
      const age = calculateAge(pet.dob);

      const getSexIcon = (sex) => {
        if (sex === 'male') {
          return '♂︎';
        }
        if (sex === 'female') {
          return '♀︎';
        }
        return null;
      };

    return (
        <div className="pet-card">
            <h3>{pet.name} {getSexIcon(pet.sex)} </h3>
            <p>{pet.breed}</p>
            <p>{age} years old</p>
            <p>Dessexed: {pet.desexed ? 'Yes' : 'No'}</p>
        </div>
    )
}

export default PetCard