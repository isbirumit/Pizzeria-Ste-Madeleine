import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./context/UserContext";

const AddCartButton = ({id,handleClick}) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [itemAdded, setItemAdded] = useState(false);
    const [message, setMessage] = useState("");

 
    return (
        <>
            <Button id={id} onClick={handleClick}>
                Ajouter au panier
            </Button>
        </>
    );
};

const Button = styled.button`
    margin-top: 30px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: bold;
    color: #FFFFFF !important;
    font-size: 14px;
    text-shadow: 1px 1px 0px #3B2410;
    box-shadow: 1px 1px 1px #FA4F11;
    padding: 5px 25px;
    border-radius: 23px;
    border: 1px solid #3B2410;
    background: #FA4F11;
    background: linear-gradient(to top, #FA4F11, #794A20);
    transition: all 250ms ease-in-out;
    max-width: 200px;
    cursor: pointer;
    &:hover{
        color: #000000 !important;
        background: #794A20;
        background: linear-gradient(to top, #794A20, #FA4F11);
    }
`
export default AddCartButton