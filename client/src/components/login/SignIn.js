import styled from "styled-components"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const formInit = {
    email: "",
    password: ""
}
const SignIn = ({setHasAccount}) => {
    const {setCurrentUser} = useContext(UserContext)
    const [message,setMessage] = useState("")
    const [formInput, setFormInput] = useState(formInit)
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/stm/users/${encodeURIComponent(formInput.email)}/${encodeURIComponent(formInput.password)}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.status === 404){
                setMessage("Votre address email ou votre mot de passe est incorrect")
            }else{
                localStorage.setItem("user",JSON.stringify(data.data))
                setCurrentUser(data.data)
            }
        })
    }
    return (
        <>
            <FormBox onSubmit={handleSubmit}>
                <Label onChange={(e) => setFormInput({...formInput, email : e.target.value})}>Email
                    <Input type="email" required={true} />
                </Label>
                <Label onChange={(e) => setFormInput({...formInput,password: e.target.value})}>Mot de passe
                    <Input type="password" required={true}/>
                </Label>
                <LogInBtn>Se connecter</LogInBtn>
                <MessageBox>
                    {
                        message.length > 0 ? <h3>- {message}</h3> : null
                    }
                </MessageBox>
            </FormBox>
            <SignUpBox>
                <p>Vous n'avez pas de compte ?</p>
                <SignUpBtn onClick={() => setHasAccount(false)}>Créer un compte</SignUpBtn>
                <Link>Mot de passe oublié</Link>
            </SignUpBox>
            
        </>
    )
}
const FormBox = styled.form`
    color: white;
    display:flex;
    flex-direction:column;
    width:100%;
    height: 60%;
    padding: 20px;
    gap: 30px;
`
const Label = styled.label`
    display:flex;
    flex-direction:column;
    text-align:center;
    gap: 7px;
    font-weight:lighter;
`
const Input = styled.input`
    font-size:1.8rem;
    padding: .5em;
    background-color: hsl(200,100%,91%,.2);
    border:none;
    outline: none;
    border-radius: 0.25em;
    color: white;
    transition:150ms;
    &:focus{
        box-shadow: 0 0 10px 2px hsl(200,100%,100%,.9);
    }
`
const MessageBox = styled.div`
    color: red;
    height: 40px;
`
const LogInBtn = styled.button`
    padding: 1em;
    font-weight: bold;
    color:white;
    background-color: hsl(200,100%,50%,.1);
    border: 2px solid black;
    border-radius:.25em;
    outline: none;
    cursor: pointer;
    transition:250ms;
    &:hover,:focus{
        background-color: hsl(200,100%,50%,.4);
    }
    &:active{
        background-color: hsl(200,100%,50%,.2)
    }
`
const SignUpBox = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    gap:20px;
    color: white;
`
const SignUpBtn = styled.button`

    padding: 1em;
    font-weight: bold;
    color:white;
    background-color: hsl(200,100%,50%,.1);
    border: 2px solid black;
    border-radius:.25em;
    outline: none;
    cursor: pointer;
    transition:250ms;
    &:hover,:focus{
        background-color: hsl(200,100%,50%,.4);
    }
    &:active{
        background-color: hsl(200,100%,50%,.2)
    }
`
export default SignIn