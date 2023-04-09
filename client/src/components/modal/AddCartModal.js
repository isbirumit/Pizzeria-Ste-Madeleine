import { useContext, useEffect, useState } from "react"
import AddCartButton from "../AddCartButton"
import styled from "styled-components"
import "./AddCartModal.css"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../context/UserContext"


const AddCartModal = ({type,item,handleModalClick}) => {
    const initForm = {
        item_id: "",
        name:"",
        size: "small",
        price: item.price["small"],
        extras: [],
        quantity: 0,
        note:""
        
    }
    const [cartForm,setCartForm] = useState(initForm)
    const [fastFoodExtras, setFastFoodExtras] = useState([])
    const navigate = useNavigate()
    const [btnExtras, setBtnExtras] = useState([]);
    const {currentUser,setCurrentUser} = useContext(UserContext)
//
    
  
    //Handlers
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleOptionChange = (e) => {
        setCartForm({...cartForm,size: e.target.value, price: item.price[e.target.value]})
    }
    const handleExtraClilck = (e,prc) => {
        if(btnExtras.length <4 ){
            btnExtras.push(e.currentTarget.id)
            setCartForm({...cartForm, price: cartForm.price + prc})
        }else{
            toast.error("Vous avez depasser la limite")
        }
    }
    const handleAddCartBtn = () => {
        if(!currentUser){
            navigate('/login')
            toast.error('Vous devez etre connecter pour ajouter aux paniers')
        }
    }
    const deleteItem = (e) => {
        setCartForm({...cartForm, price: cartForm.price - fastFoodExtras.filter(extra => extra.name == e.currentTarget.id)[0].price})
        setBtnExtras(btnExtras.filter(extra => extra !== e.currentTarget.id))
    }
    //
    useEffect(() =>{

    },[btnExtras])

    useEffect(() => {
        fetch('/stm/extras/fastfood')
        .then((res) => res.json())
        .then((data) => {
            if(data.status === 404){
                console.log(data)
            }else if(data.status === 200){
                setFastFoodExtras(data.data)
            }
        })

    },[])

    switch (type) {
        case "pasta":
            return (
                <div class="ModalContainer">
                    <form onSubmit={handleSubmit} class="Modalbox">
                        <button onClick={handleModalClick}>Close</button>
                        <ItemTitle>{item.name}</ItemTitle>
                        <SizeBox>
                            <Titles>Taille :</Titles>
                            <RadioBox>
                                <Radio>
                                    <label>
                                        <input type="radio" onChange={handleOptionChange} value={"small"} checked={cartForm.size === "small"} required={true}/>
                                        Moyenne
                                    </label>
                                </Radio>
                                <Radio>
                                    <label>
                                        <input type="radio" onChange={handleOptionChange}  value={"large"} checked={cartForm.size === "large"} required={true} />
                                        Grande
                                    </label>
                                </Radio>
                            </RadioBox>
                        </SizeBox>
                        <ExtraBox>
                            <Titles>Extras *max 4 : </Titles>
                            <ExtraContainer>
                                {fastFoodExtras.map(each => {
                                    return (
                                        <>  
                                            <ExtraBtn id={each.name} onClick={(e) => handleExtraClilck(e,each.price)}>
                                                <ExtraName>{each.name}</ExtraName>
                                                <ExtraPrice>{each.price}</ExtraPrice>
                                            </ExtraBtn>
                                        </>
                                    )
                                })}
                            </ExtraContainer>
                        </ExtraBox>
                        <ItemInformationBox>
                            {btnExtras.map(extra => {
                                return <AddedExtraBtn id={extra} onClick={deleteItem}>{extra}</AddedExtraBtn>
                            })}
                        </ItemInformationBox>
                        <EndBox>
                            <CartButton onClick={handleAddCartBtn}>Ajouter au panier</CartButton>
                            <ItemPrice> Prix : {(cartForm.price).toFixed(2)}</ItemPrice>
                        </EndBox>
                    </form>
                 </div>
            )
    
        default:
            break;
    }
    
}

const ItemTitle = styled.h1`
    text-align:center;
    border-bottom: 1px solid black;
`
const SizeBox = styled.div`
    display:flex;
`
const RadioBox = styled.div`
    display:flex;
    flex-direction:row;
    align-self: center;
`
const Titles = styled.h3`
    color:hsl(28,58%,30%);
    margin: 10px 5px;
`
const Radio = styled.div`
    margin-left:50px;
`
const ItemPrice = styled.p`

`
const ExtraBox = styled.div`

`
const ExtraName = styled.h3`
    
`
const ExtraPrice = styled.h3`

`
const ExtraBtn = styled.button`
    display:flex;
    justify-content: space-between;
    padding: 5px 20px;

`
const ExtraContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const ItemInformationBox = styled.div`
    height: 260px;
`
const EndBox = styled.div`
    height:20px;
    display:flex;
    justify-content:space-evenly;
    align-items: center;
`
const CartButton = styled.button`
    margin-top: 30px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: bold;
    color: #FFFFFF !important;
    font-size: 18px;
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
const AddedExtraBtn = styled.button`
    padding: 10px;
    border-radius: 50px;
    margin-top: 10px;
    margin-left:5px;
    background-color: gray;
`
export default AddCartModal