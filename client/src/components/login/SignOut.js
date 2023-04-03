import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const { useEffect, useContext } = require("react")
const SignOut = () => {
    const navigate = useNavigate()
    const {setCurrentUser} = useContext(UserContext)

    useEffect(() => {
        setCurrentUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    },[])
}


export default SignOut