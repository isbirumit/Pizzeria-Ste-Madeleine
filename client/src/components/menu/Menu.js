import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import twoForOne from "../../public/MenuBG/2pour1.jpg"
import onePizz from "../../public/MenuBG/1pizza.jpg"
import submarine from "../../public/MenuBG/submarine.jpg"
import combos from "../../public/MenuBG/combos.jpg"
import platters from "../../public/MenuBG/platters.jpg"
import poutines from "../../public/MenuBG/poutine.jpg"
import salade from "../../public/MenuBG/salade.jpg"
import snacks from "../../public/MenuBG/snacks.jpg"
import pastas from "../../public/MenuBG/pastas.jpg"


const init = [
    {
        img : twoForOne,
        title : "Pizza 2 pour 1",
        orderDesc : "Choisir une pizza",
        path: '/menu/2pizzas'
    },
    {
        img:onePizz,
        title : "Pizze Seule",
        orderDesc : "Choisir une pizza",
        path: '/menu/pizza'
    },
    {
        img : submarine,
        title : "Sous-Marin",
        orderDesc : "Choisir un sous-marin",
        path: '/menu/submarines'
    },
    {
        img : pastas,
        title : "Pates",
        orderDesc : "Choisir une pates",
        path: '/menu/pastas'
    },
    {
        img: combos,
        title : "Spéciaux",
        orderDesc : "Choisir un combo",
        path: '/menu/combos'
    },
    {
        img: platters,
        title : 'Assiettes',
        orderDesc : "Choisir une assiette",
        path: '/menu/platters'
    },
    {
        img: poutines,
        title : 'Poutines',
        orderDesc : "Choisir une poutine",
        path: '/menu/poutines'
    },
    {
        img: salade,
        title : 'Salades',
        orderDesc : "Choisir une salade",
        path: '/menu/salads'
    },
    {
        img: snacks,
        title : 'Casse-Croute',
        orderDesc : "Choisir une casse-croute",
        path: '/menu/snacks'
    },
]
const Menu = () => {
    const [categories,setCategories] = useState(init)
    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
    return (
        <>
            <MenuWrapper>
                <div>
                    <MenuTitle>Menu</MenuTitle>
                    <MenuDesc>Lorsque vous passez une commande chez Pizzeria Ste Madeleine, nous vous encourageons à choisir la catégorie de menu qui correspond à vos goûts et à vos envies. Nous offrons une variété de plats délicieux dans chaque catégorie, y compris des pizzas classiques et créatives, des pâtes savoureuses, des salades fraîches et des sandwichs délicieux. En choisissant la catégorie de menu qui vous intéresse le plus, vous pouvez facilement trouver le plat que vous cherchez et personnaliser votre commande avec vos ingrédients préférés. Que vous soyez à la recherche d'un repas copieux ou d'une collation légère, nous avons quelque chose pour tous les goûts. Faites votre choix et profitez d'un délicieux repas chez Pizzeria Ste Madeleine.</MenuDesc>
                </div>
                <CategoriesBox>
                    {
                        categories.map(categorie => {
                            return (
                                <LinkCategorie to={categorie.path}>
                                    <CategorieBox>
                                        <CategorieTitle>{categorie.title}</CategorieTitle>
                                        <CategorieOrder>{categorie.orderDesc}</CategorieOrder>
                                        <CategorieImg src={categorie.img} />
                                    </CategorieBox>
                                </LinkCategorie>
                            )
                        })
                    }
                </CategoriesBox>
            </MenuWrapper>
            
        </>
    )
}

const MenuWrapper = styled.div`
    width: 80vw;
    margin:auto;
    text-align: center;
    max-width: 1200px;
    border-left: 2px solid white;
    border-right: 2px solid white;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: hsl(0,0%,93%);
`
const MenuTitle = styled.h1`
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: hsl(28,58%,30%);
`
const MenuDesc = styled.p`
    font-size: 2.2rem;
`
const CategoriesBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 50px;
`

const LinkCategorie = styled(Link)`
    text-decoration:none;
    width: 80%;
    margin:20px;

`
const CategorieBox = styled.div`
    display: flex;
    justify-content:center;
    position:relative;
    border: 2px solid hsl(28,53%,55%);
    box-shadow: 0px 0px 12px 1px hsl(28,53%,55%);
    
`
const CategorieImg = styled.img`
    margin-top: 30px;
    margin-bottom: 30px;
    width: 80%;
    height: 380px;
    object-fit: cover;
    transition: 250ms;
    border-radius: 2rem;
    filter: blur(0);
   
   
`
const CategorieTitle = styled.h2`
    position:absolute; 
    top: -22px;
    left: 20px;
    padding:5px;
    background-color: hsl(0,0%,93%);
    color:  hsl(28,53%,55%);
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
`
const CategorieOrder = styled.h3`
    padding:140px 100px;
    position:absolute;
    z-index:10;
    align-self: center;
    font-size:200%;
    transition:400ms;
    color: black;
    opacity:0;
    &:hover ~ ${CategorieImg}{
        width: 90%;
        filter: blur(10px);
        
    }
    &:hover {
        opacity: 1;
    }
`

export default Menu