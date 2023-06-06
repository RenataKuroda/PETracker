import Pets from '../components/Pets'
import Reminders from '../components/Reminders'
import { useAuth } from '../context/AuthProvider'

const Home = () => {
    const { user, logout } = useAuth()
    return (
        <div>
            <Pets />
            <Reminders />
        </div>
    )
}

export default Home