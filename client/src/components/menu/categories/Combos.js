import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AddCartModal from "../../modal/AddCartModal";
import AddCartButton from "../../AddCartButton";
import BG from "../../../public/backgroundimgs/loginBGIMG.jpg";

const Combos = () => {
    const [combos, setCombos] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState();
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        fetch("/stm/combos")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setCombos(data.data);
                }
            });
    }, []);

    useEffect(() => {
        for (let i = 0; i < combos.length; i++) {
            if (
                !categories.find((category) => category === combos[i].category)
            ) {
                categories.push(combos[i].category);
            }
        }
    }, [combos]);

    const handleClick = (e) => {
        fetch(`/stm/combos/${e.currentTarget.id}`)
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
                    type="combos"
                    item={selectedItem}
                    handleModalClick={handleModalClick}
                />
            ) : (
                <PageContainer>
                    <Description>
                        Notre menu spécial chez Pizzeria Ste Madeleine est une
                        expérience culinaire unique que vous ne voulez pas
                        manquer. Chaque plat a été soigneusement conçu et
                        préparé avec des ingrédients de qualité supérieure pour
                        une expérience de repas inoubliable. Que vous cherchiez
                        à essayer notre pizza spéciale, nos pâtes faites maison,
                        chaque option sur notre menu spécial est garantie pour
                        satisfaire votre palais et vous laisser vouloir plus.
                        Commandez en ligne dès maintenant et offrez-vous une
                        expérience de repas inoubliable avec notre menu spécial
                        chez Pizzeria Ste Madeleine.
                    </Description>
                    {combos ? (
                        categories.map((category) => {
                            return (
                                <div>
                                    <CategoryTitle>{category}</CategoryTitle>
                                    {combos.map((combo) => {
                                        if (combo.category === category) {
                                            return (
                                                <IndItemBox
                                                    key={combo.name + combo._id}
                                                >
                                                    <ItemTitle>
                                                        {combo.name}
                                                    </ItemTitle>
                                                    <ItemDesc>
                                                        {combo.description}
                                                    </ItemDesc>
                                                    <ItemBottomBox>
                                                        <ItemPrice>
                                                            À partir de :{" "}
                                                            <span
                                                                style={{
                                                                    fontSize:
                                                                        "2.8rem",
                                                                }}
                                                            >
                                                                {combo.price}$
                                                            </span>
                                                        </ItemPrice>
                                                        <Button
                                                            id={combo._id}
                                                            handleClick={
                                                                handleClick
                                                            }
                                                        />
                                                    </ItemBottomBox>
                                                </IndItemBox>
                                            );
                                        }
                                    })}
                                </div>
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
    font-size: 1.8rem;
    font-weight: bold;
    color: hsl(28, 53%, 55%);
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
const CategoryTitle = styled.h1`
    text-align: center;
    margin-top: 50px;
    border-top: 1px black solid;
`;

export default Combos;
