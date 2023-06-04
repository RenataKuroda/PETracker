import Pets from '../components/Pets'
import { useAuth } from '../context/AuthProvider'

const Home = () => {
    const { user, logout } = useAuth()
    return (
        <div>
            <Pets />
        </div>
    )
}

export default Home