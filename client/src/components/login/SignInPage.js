import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import backgroundImage from "../../public/backgroundimgs/loginBGIMG.jpg"
import SignIn from "./SignIn"

const SignInPage = () => {
    const [hasAccount, setHasAccount] = useState(true)
    
    return(
        <Page style={{backgroundImage : `url(${backgroundImage})`}}>
            <LogInWrapper>
                <LoginTitle>Bienvenue !</LoginTitle>
                {
                    hasAccount 
                    ? <SignIn setHasAccount = {setHasAccount} />
                    : <h1>Compte</h1>
                }
            </LogInWrapper>
        </Page>
    )
}

const Page = styled.div`
    background-repeat: no-repeat;
    background-size:cover;
    background-position:center;    
    display:flex;
    justify-content:center;
    align-items:center;
    height: 85vh;
`
const LoginTitle = styled.h1`
    color: white;
    text-align:center;
`
const LogInWrapper = styled.div`
    background-color: hsl( 200, 100%, 6%, .7);
    box-shadow: 0 0 20px 0 hsl( 200, 100%, 6%, .7);
    padding: 80px 30px;
    width: 80%;
    max-width: 600px;
    border-radius: 20px;

`


export default SignInPage