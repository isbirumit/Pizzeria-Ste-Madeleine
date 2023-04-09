import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import BG from "../../../public/backgroundimgs/TwoPizzaBG.jpg"
import AddCartButton from "../../AddCartButton"

const TwoPizza = () => {
    const [pizzas,setPizzas] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        fetch('/stm/pizzas')
        .then((res) => res.json())
        .then((data) => {
            if(data.status === 404){
                navigate('/*')
            }else if(data.status === 200){
                console.log(data.data)
                setPizzas(data.data)
            }
        })
    },[]);

    return (
        <Body style={{backgroundImage: `url(${BG})`}}>
            <PageContainer>
                <Description>Bienvenue chez Pizzeria Ste Madeleine, où nous sommes fiers de servir les meilleures pizzas de la ville. Nos pizzas sont préparées avec les meilleurs ingrédients frais et cuits dans un four pour une saveur authentique. Que vous aimiez la pizza classique Nature ou les créations uniques de notre chef, nous avons quelque chose pour tous les goûts. Commandez et découvrez pourquoi nos pizzas sont les meilleures de la ville.</Description>
                {
                    pizzas 
                    ?
                    pizzas.map(pizza => {
                        return (
                            <IndItemBox>
                                <ItemTitle>{pizza.name}</ItemTitle>
                                <ItemDesc>Ingrédient : <Span>{pizza.description}</Span></ItemDesc>
                                <ItemBottomBox>
                                    <ItemPrice>À partir de : <span style={{fontSize:"2.8rem"}}>{pizza.price[`10"`]}$</span></ItemPrice>
                                    <Button item={pizza}/>
                                </ItemBottomBox>
                                {/* {
                                    Object.entries(pizza.price).map(([key,value]) => {
                                        return <p>Taille: {key} Prix : ${value}</p>
                                    })
                                } */}
                            </IndItemBox>
                        )
                    })
                    :
                    <h1>Loading</h1>
                }
            </PageContainer>
         </Body>
    );
};
const Span = styled.span`
    color:  hsl(28,53%,55%);
`
const Body = styled.body`
    background-repeat: no-repeat;
    background-size:cover;
    background-position:center;   
`;
const Description = styled.p`
    width: 70%;
    text-align:center;
    margin: auto;
    margin-top:40px;
    font-size:2rem;
    color: white;
`
const PageContainer = styled.div`
    width: 95%;
    position:relative;
    display:flex;
    flex-direction: column;
    flex-wrap:wrap;
    margin: auto;
    -webkit-box-shadow: 0px 23px 30px -32px rgba(191,0,0,1);
    -moz-box-shadow: 0px 23px 30px -32px rgba(191,0,0,1);
    box-shadow: 0px 23px 30px -32px rgba(191,0,0,1);
    /* background-color:hsl(0,0%,93%); */
    max-width: 800px;
`;
const IndItemBox = styled.div`
    background-color:hsl(0,0%,93%);
    margin-top:30px;
    position:relative;
    padding :50px 20px 10px 5px;
    border: 2px solid hsl(28,53%,55%);
    box-shadow: 0px 0px 12px 1px hsl(28,53%,55%);
`;
const ItemTitle = styled.h2`

    color: white;
    position:absolute; 
    top: -2px;
    left: 20px;
    padding:5px;
    border: 2px solid hsl(28,53%,55%);
    background-image: linear-gradient(to right,hsl(28,58%,30%),hsl(16,96%,52%));
    transition: all 2s;
    &:hover{
        background-image: linear-gradient(to left,hsl(28,58%,30%),hsl(16,96%,52%));
    };
`;
const ItemDesc = styled.p`
    font-size: 1.3rem;
    font-weight: bold;
    color: hsl(28,58%,30%);
`
const ItemBottomBox = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
    align-items:end;

`
const ItemPrice = styled.p`
    font-size: 1.5rem;
    font-weight:bold;     
    color: hsl(28,58%,30%);   
`
const Button = styled(AddCartButton)`
    
`
export default TwoPizza