import { UserContext } from "../context/UserContext"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";





const Profil = () => {
    const {currentUser,setCurrentUser} = useContext(UserContext);
    console.log(currentUser)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!currentUser){
            navigate('/login')
        }
    }, [])
    return (
        <>
            {
                currentUser 
                ? <h1>ProfilPage</h1>
                : null
            }
        </>

    )
}

export default Profil