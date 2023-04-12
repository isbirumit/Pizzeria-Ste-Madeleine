import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BG from "../../../public/backgroundimgs/loginBGIMG.jpg";
import AddCartButton from "../../AddCartButton";
import AddCartModal from "../../modal/AddCartModal";
import Pastas from "./Pastas";

const Snacks = () => {
    const [snacks, setSnacks] = useState([]);
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch("/stm/snacks")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setSnacks(data.data);
                }
            });
    }, []);

    const handleClick = (e) => {
        fetch(`/stm/snacks/${e.currentTarget.id}`)
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
                    type="snack"
                    item={selectedItem}
                    handleModalClick={handleModalClick}
                />
            ) : (
                <PageContainer>
                    <Description>
                        Chez Pizzeria Ste Madeleine, nos collations sont une
                        option parfaite pour combler vos petits creux. Nous
                        proposons une variété de délicieuses collations,
                        notamment des ailes de poulet, des frites et bien plus
                        encore. Nos collations sont préparées avec des
                        ingrédients de qualité et sont parfaites pour partager
                        avec des amis ou en famille. Que vous cherchiez quelque
                        chose pour accompagner votre pizza ou simplement pour
                        grignoter, nos collations sont l'option parfaite.
                        Commandez en ligne dès maintenant et profitez de l'un de
                        nos délicieux snacks pour une expérience de repas encore
                        plus satisfaisante chez Pizzeria Ste Madeleine.
                    </Description>
                    {snacks ? (
                        snacks.map((snack) => {
                            return (
                                <IndItemBox>
                                    <ItemTitle>{snack.name}</ItemTitle>
                                    <ItemBottomBox>
                                        <ItemPrice>
                                            À partir de :{" "}
                                            <span
                                                style={{ fontSize: "2.8rem" }}
                                            >
                                                {snack.price[`small`]}$
                                            </span>
                                        </ItemPrice>
                                        <Button
                                            id={snack._id}
                                            handleClick={handleClick}
                                        />
                                    </ItemBottomBox>
                                </IndItemBox>
                            );
                        })
                    ) : (
                        <h1>Loading...</h1>
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

export default Snacks;
