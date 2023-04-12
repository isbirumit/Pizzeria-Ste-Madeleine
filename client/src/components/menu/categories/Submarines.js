import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AddCartButton from "../../AddCartButton";
import BG from "../../../public/backgroundimgs/loginBGIMG.jpg";
import AddCartModal from "../../modal/AddCartModal";

const Submarines = () => {
    const [submarines, setSubmarines] = useState([]);
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch("/stm/submarines")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setSubmarines(data.data);
                }
            });
    }, []);

    const handleClick = (e) => {
        fetch(`/stm/submarines/${e.currentTarget.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setSelectedItem(data.data);
                    setIsOpen(true);
                }
            });
    };
    const handleModalClick = () => {
        setIsOpen(false);
    };
    return (
        <Body style={{ backgroundImage: `url(${BG})` }}>
            {isOpen ? (
                <AddCartModal
                    type="submarine"
                    item={selectedItem}
                    handleModalClick={handleModalClick}
                />
            ) : (
                <PageContainer>
                    <Description>
                        Nos sandwichs sous-marins chez Pizzeria Ste Madeleine
                        sont une option de repas délicieuse et satisfaisante.
                        Fabriqués avec du pain frais, des ingrédients de qualité
                        et une variété de garnitures savoureuses, nos sandwichs
                        sous-marins sont l'option de repas parfaite pour ceux
                        qui recherchent quelque chose de rapide, pratique et
                        délicieux. Avec des options pour tous les goûts, y
                        compris des sandwichs végétariens, au poulet grillé et à
                        la viande fumée, vous êtes sûr de trouver quelque chose
                        que vous allez adorer. Commandez en ligne dès maintenant
                        et dégustez l'un de nos sandwichs sous-marins chauds et
                        frais pour une expérience de repas savoureuse et
                        satisfaisante.
                    </Description>
                    {submarines ? (
                        submarines.map((submarine) => {
                            return (
                                <IndItemBox
                                    key={submarine.name + submarine._id}
                                >
                                    <ItemTitle>{submarine.name}</ItemTitle>
                                    <ItemDesc>
                                        Ingrédient :{" "}
                                        <Span>{submarine.description}</Span>
                                    </ItemDesc>
                                    <ItemBottomBox>
                                        <ItemPrice>
                                            Prix : {submarine.price}
                                        </ItemPrice>
                                        <Button
                                            id={submarine._id}
                                            handleClick={handleClick}
                                        />
                                    </ItemBottomBox>
                                </IndItemBox>
                            );
                        })
                    ) : (
                        <h1>Loading</h1>
                    )}
                </PageContainer>
            )}
        </Body>
    );
};

const Span = styled.span`
    color: hsl(28, 53%, 55%);
`;
const Body = styled.body`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;
const Description = styled.p`
    padding: 10px;
    border-radius: 10px;
    width: 70%;
    text-align: center;
    margin: auto;
    margin-top: 40px;
    font-size: 2rem;
    color: white;
    display: inline-block;
    background: hsl(28.3, 58.2%, 30%, 0.4);
`;
const PageContainer = styled.div`
    width: 95%;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: auto;
    -webkit-box-shadow: 0px 23px 30px -32px rgba(191, 0, 0, 1);
    -moz-box-shadow: 0px 23px 30px -32px rgba(191, 0, 0, 1);
    box-shadow: 0px 23px 30px -32px rgba(191, 0, 0, 1);
    /* background-color:hsl(0,0%,93%); */
    max-width: 800px;
`;
const IndItemBox = styled.div`
    background-color: hsl(0, 0%, 93%);
    margin-top: 30px;
    position: relative;
    padding: 50px 20px 10px 5px;
    border: 2px solid hsl(28, 53%, 55%);
    box-shadow: 0px 0px 12px 1px hsl(28, 53%, 55%);
`;
const ItemTitle = styled.h2`
    color: white;
    position: absolute;
    top: -2px;
    left: 20px;
    padding: 5px;
    border: 2px solid hsl(28, 53%, 55%);
    background-image: linear-gradient(
        to right,
        hsl(28, 58%, 30%),
        hsl(16, 96%, 52%)
    );
    transition: all 2s;
    &:hover {
        background-image: linear-gradient(
            to left,
            hsl(28, 58%, 30%),
            hsl(16, 96%, 52%)
        );
    }
`;
const ItemDesc = styled.p`
    font-size: 1.3rem;
    font-weight: bold;
    color: hsl(28, 58%, 30%);
`;
const ItemBottomBox = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
    align-items: end;
`;
const ItemPrice = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    color: hsl(28, 58%, 30%);
`;
const Button = styled(AddCartButton)``;
export default Submarines;
