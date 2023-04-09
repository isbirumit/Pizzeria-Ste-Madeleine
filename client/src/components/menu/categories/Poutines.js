import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import BG from "../../../public/backgroundimgs/poutine.jpg"
import AddCartButton from "../../AddCartButton"

const Poutines = () => {
    const [poutines,setPoutines] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/stm/poutines')
        .then((res) => res.json())
        .then((data) => {
            if(data.status === 404){
                navigate('/*')
            }else if(data.status === 200){
                console.log(data.data)
                setPoutines(data.data)
            }
        })
    },[]);

    return (
        <Body style={{backgroundImage: `url(${BG})`}}>
            <PageContainer>
                <Description>Notre poutine chez Pizzeria Ste Madeleine est un plat québécois classique que vous ne voudrez pas manquer. Avec des frites dorées, du fromage en grains frais et une délicieuse sauce, notre poutine est la définition même de la comfort food. Que vous cherchiez à vous réchauffer un soir d'hiver ou simplement à vous régaler avec un plat délicieux, notre poutine est l'option parfaite. Nous proposons également une variété d'options pour personnaliser votre poutine, y compris des garnitures comme du bacon, du poulet grillé et plus encore. Commandez en ligne dès maintenant et dégustez l'un de nos délicieux poutines pour une expérience de repas québécoise classique chez Pizzeria Ste Madeleine.</Description>
                {
                    poutines
                    ?
                    poutines.map(poutine => {
                        return(
                            <IndItemBox>
                                <ItemTitle>{poutine.name}</ItemTitle>
                                    <ItemBottomBox>
                                        <ItemPrice>À partir de : <span style={{fontSize:"2.8rem"}}>{poutine.price[`small`]}$</span></ItemPrice>
                                        <Button item={poutine}/>
                                    </ItemBottomBox>
                            </IndItemBox>
                        )
                    })
                    :
                    <h1>Loading</h1>
                }

            </PageContainer>

        </Body>
    )
}
const Span = styled.span`
    color:  hsl(28,53%,55%);
`
const Body = styled.body`
    background-repeat: no-repeat;
    background-size:cover;
    background-position:center;   
`;
const Description = styled.p`
    padding: 10px;
    border-radius: 10px;
    width: 70%;
    text-align:center;
    margin: auto;
    margin-top:40px;
    font-size:2rem;
    color: white;
    display: inline-block;
    background:hsl(28.3,58.2%,30%,.6);
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

export default Poutines