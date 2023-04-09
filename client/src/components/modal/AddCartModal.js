import { useEffect, useState } from "react"
import AddCartButton from "../AddCartButton"
import styled from "styled-components"
import "./AddCartModal.css"
import { useNavigate } from "react-router-dom"


const AddCartModal = ({type,item,handleModalClick}) => {
    const initForm = {
        name:"",
        size: "small",
        price: item.price["small"],
    }
    const [cartForm,setCartForm] = useState(initForm)
    const [fastFoodExtras, setFastFoodExtras] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/stm/extras/fastfood')
        .then((res) => res.json())
        .then((data) => {
            if(data.status === 404){
                console.log(data)
            }else if(data.status === 200){
                // setSelectedItem(data.data)
                console.log(data)
            }
        })

    },[])
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleOptionChange = (e) => {
        setCartForm({...cartForm,size: e.target.value, price: item.price[e.target.value]})
    }
    switch (type) {
        case "pasta":
            return (
                <div class="ModalContainer">
                    <form onSubmit={handleSubmit} class="Modalbox">
                        <button onClick={handleModalClick}>Close</button>
                        <ItemTitle>{item.name}</ItemTitle>
                        <RadioBox>
                            <Titles>Taille :</Titles>
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
                        <ExtraBox>
                            <Titles>Extras : </Titles>
                        </ExtraBox>
                        <ItemPrice> Prix : {cartForm.price}</ItemPrice>
                        <button>Ajouter au panier</button>
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
const RadioBox = styled.div`

`
const Titles = styled.h3`

`
const Radio = styled.div`

`
const ItemPrice = styled.p`

`
const ExtraBox = styled.div`

`
export default AddCartModal