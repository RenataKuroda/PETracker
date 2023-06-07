import { Link } from 'react-router-dom';

import Pets from '../components/Pets'
import Reminders from '../components/Reminder/Reminders'
import { useAuth } from '../context/AuthProvider'

const Home = () => {
    const { user, logout } = useAuth()
    return (
        <div>
            <Link to="/createpet">Add Pet</Link>
            <Pets />
            <Reminders />
        </div>
    )
}

export default Home