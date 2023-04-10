import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BG from "../../../public/backgroundimgs/combos.jpg";
import AddCartModal from "../../modal/AddCartModal";
import AddCartButton from "../../AddCartButton";

const Pastas = () => {
    const [pastas, setPastas] = useState([]);
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch("/stm/pastas")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setPastas(data.data);
                }
            });
    }, []);
    ////////////////////////////

    const handleClick = (e) => {
        fetch(`/stm/pastas/${e.currentTarget.id}`)
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
                    type="pasta"
                    item={selectedItem}
                    handleModalClick={handleModalClick}
                />
            ) : (
                <PageContainer>
                    {
                        <>
                            <Description>
                                Notre pâte chez Pizzeria Ste Madeleine est
                                préparée avec amour et expertise pour une
                                expérience de repas authentique et savoureuse.
                                Nos pâtes sont préparées avec des ingrédients
                                frais et de qualité supérieure, et sont
                                disponibles dans une variété de sauces
                                délicieuses pour satisfaire tous les goûts. Que
                                vous cherchiez à savourer une assiette de
                                spaghetti classique ou à essayer quelque chose
                                de nouveau comme notre lasagne maison, nos pâtes
                                sont l'option de repas parfaite pour tous les
                                amateurs de pâtes. Commandez en ligne dès
                                maintenant et dégustez l'une de nos délicieuses
                                pâtes pour une expérience de repas italien
                                satisfaisante chez Pizzeria Ste Madeleine.
                            </Description>

                            {pastas ? (
                                pastas.map((pasta) => {
                                    return (
                                        <IndItemBox
                                            key={pasta.name + pasta._id}
                                        >
                                            <ItemTitle>{pasta.name}</ItemTitle>
                                            <ItemDesc>
                                                Ingrédient :{" "}
                                                <Span>{pasta.description}</Span>
                                            </ItemDesc>
                                            <ItemBottomBox>
                                                <ItemPrice>
                                                    À partir de :{" "}
                                                    <span
                                                        style={{
                                                            fontSize: "2.8rem",
                                                        }}
                                                    >
                                                        {pasta.price[`small`]}$
                                                    </span>
                                                </ItemPrice>
                                                <Button
                                                    id={pasta._id}
                                                    handleClick={handleClick}
                                                />
                                            </ItemBottomBox>
                                        </IndItemBox>
                                    );
                                })
                            ) : (
                                <h1>lo</h1>
                            )}
                        </>
                    }
                </PageContainer>
            )}
        </Body>
    );
};

const Span = styled.span`
    color: hsl(28, 53%, 55%);
`;
const Body = styled.div`
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
    background: hsl(28.3, 58.2%, 30%, 0.6);
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
export default Pastas;
