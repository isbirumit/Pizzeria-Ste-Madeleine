import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

const formInit = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
    province: "",
    country: "",
};

const SignUp = ({ setHasAccount }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formInput, setFormInput] = useState(formInit);
    const [nextStep, setNextStep] = useState(false);
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/stm/user", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formInput),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    setMessage(data.error);
                } else {
                    localStorage.setItem("user", JSON.stringify(data.data));
                    setCurrentUser(data.data);
                    navigate("/");
                }
            });
    };

    return (
        <>
            <FormBox onSubmit={handleSubmit}>
                <Label
                    onChange={(e) =>
                        setFormInput({
                            ...formInput,
                            firstName: e.target.value,
                        })
                    }
                >
                    Prenom*
                    <Input type="text" required={true} />
                </Label>
                <Label
                    onChange={(e) =>
                        setFormInput({ ...formInput, lastName: e.target.value })
                    }
                >
                    Nom de famille*
                    <Input type="text" required={true} />
                </Label>
                <Label
                    onChange={(e) =>
                        setFormInput({ ...formInput, email: e.target.value })
                    }
                >
                    Email*
                    <Input type="email" required={true} />
                </Label>
                <Label
                    onChange={(e) =>
                        setFormInput({ ...formInput, phone: e.target.value })
                    }
                >
                    Numero de telephone*
                    <Input type="phone" required={true} />
                </Label>
                <Label
                    onChange={(e) =>
                        setFormInput({ ...formInput, password: e.target.value })
                    }
                >
                    Mot de passe*
                    <Input type="password" required={true} />
                </Label>
                <Label
                    onChange={(e) =>
                        setFormInput({
                            ...formInput,
                            confirmPassword: e.target.value,
                        })
                    }
                >
                    Confirmer Mot de passe*
                    <Input type="password" required={true} />
                </Label>
                <NextStepBtn>S'enregistrer</NextStepBtn>
            </FormBox>
            <SignUpBox>
                <p>Vous avez deja un compte ?</p>
                <SignUpBtn onClick={() => setHasAccount(true)}>
                    Se connecter
                </SignUpBtn>
            </SignUpBox>
            <MessageBox>
                {message.map((e) => {
                    return <h3>- {e}</h3>;
                })}
            </MessageBox>
        </>
    );
};

const FormBox = styled.form`
    color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 60%;
    padding: 20px;
    gap: 20px;
`;
const Label = styled.label`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 7px;
    font-weight: lighter;
`;
const Input = styled.input`
    font-size: 1.3rem;
    padding: 0.5em;
    background-color: hsl(200, 100%, 91%, 0.2);
    border: none;
    outline: none;
    border-radius: 0.25em;
    color: white;
    transition: 150ms;
    &:focus {
        box-shadow: 0 0 10px 2px hsl(200, 100%, 100%, 0.9);
    }
`;
const MessageBox = styled.div`
    color: red;
    height: 40px;
`;
const NextStepBtn = styled.button`
    padding: 1em;
    font-weight: bold;
    color: white;
    background-color: hsl(200, 100%, 50%, 0.1);
    border: 2px solid black;
    border-radius: 0.25em;
    outline: none;
    cursor: pointer;
    transition: 250ms;
    &:hover,
    :focus {
        background-color: hsl(200, 100%, 50%, 0.4);
    }
    &:active {
        background-color: hsl(200, 100%, 50%, 0.2);
    }
`;
const SignUpBox = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: white;
`;
const SignUpBtn = styled.button`
    padding: 1em;
    font-weight: bold;
    color: white;
    background-color: hsl(200, 100%, 50%, 0.1);
    border: 2px solid black;
    border-radius: 0.25em;
    outline: none;
    cursor: pointer;
    transition: 250ms;
    &:hover,
    :focus {
        background-color: hsl(200, 100%, 50%, 0.4);
    }
    &:active {
        background-color: hsl(200, 100%, 50%, 0.2);
    }
`;

export default SignUp;
