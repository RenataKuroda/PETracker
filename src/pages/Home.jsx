import { Link } from 'react-router-dom';

import Pets from '../components/Pets'
import Reminders from '../components/Reminder/Reminders'
import { useAuth } from '../context/AuthProvider'

import './Home.css'

const Home = () => {
    const { user, logout } = useAuth()
    return (
        <div>
            <div className="button-container">
                <Link to="/createpet" className="button-link">Add Pet</Link>
            </div>
            <div className="home-container">
                <div className="pets-container">
                    <Pets />
                </div>
                <Reminders className="reminders-container"/>
            </div>
        </div>
    )
}

export default Home