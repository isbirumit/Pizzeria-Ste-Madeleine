import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AddCartModal from "../modal/AddCartModal";

const OrderNow = () => {
    const [combos, setCombos] = useState([]);
    const [pastas, setPastas] = useState([]);
    const [platters, setPlatters] = useState([]);
    const [poutines, setPoutines] = useState([]);
    const [pizzas, setPizzas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [selectedItemType, setSelectedItemType] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    //Useeffect fetch
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
        fetch("/stm/poutines")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    console.log(data.data);
                    setPoutines(data.data);
                }
            });
        fetch("/stm/platters")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    console.log(data.data);
                    setPlatters(data.data);
                }
            });
        fetch("/stm/pastas")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setPastas(data.data);
                }
            });
        fetch("/stm/pizzas")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    console.log(data.data);
                    setPizzas(data.data);
                }
            });

        window.scrollTo(0, 0);
    }, []);

    //useeffetcs
    useEffect(() => {
        for (let i = 0; i < combos.length; i++) {
            if (
                !categories.find((category) => category === combos[i].category)
            ) {
                categories.push(combos[i].category);
            }
        }
    }, [combos]);

    //Handlers
    const handleClickPoutines = (e) => {
        fetch(`/stm/poutines/${e.currentTarget.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setSelectedItem(data.data);
                    setSelectedItemType(`pasta`);
                    setIsOpen(true);
                }
            });
    };
    const handleClickPizzas = (e) => {
        fetch(`/stm/pizzas/${e.currentTarget.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setSelectedItem(data.data);
                    setSelectedItemType(`pizza`);
                    setIsOpen(true);
                }
            });
    };
    const handleClickCombo = (e) => {
        fetch(`/stm/combos/${e.currentTarget.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setSelectedItem(data.data);
                    setSelectedItemType("combos");
                    setIsOpen(true);
                }
            });
    };

    const handleClickPasta = (e) => {
        fetch(`/stm/pastas/${e.currentTarget.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setSelectedItem(data.data);
                    setSelectedItemType("pasta");
                    setIsOpen(true);
                }
            });
    };
    const handleClickPlatters = (e) => {
        fetch(`/stm/platters/${e.currentTarget.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setSelectedItem(data.data);
                    setSelectedItemType(`platter`);
                    setIsOpen(true);
                }
            });
    };

    const handleModalClick = () => {
        setIsOpen(false);
    };
    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Commandez en ligne !</PageTitle>
                <PageDesc>
                    Bienvenue ! Avec notre programme de fidélité, vous pouvez
                    maintenant gagner des points à chaque commande passée.
                    Chaque point vous rapproche un peu plus de récompenses
                    exclusives, alors commencez dès aujourd'hui à accumuler des
                    points pour des offres spéciales, des cadeaux et plus encore
                    !
                </PageDesc>
            </PageHeader>
            {isOpen ? (
                <AddCartModal
                    type={selectedItemType}
                    item={selectedItem}
                    handleModalClick={handleModalClick}
                />
            ) : (
                <PageBody>
                    <Category>
                        <div>
                            <CatName>Nos Pizzas 2 pour 1</CatName>
                            <ButtonBox>
                                {pizzas.map((pizza) => {
                                    return (
                                        <CatBtn
                                            id={pizza._id}
                                            onClick={handleClickPizzas}
                                            key={pizza.name + pizza._id}
                                        >
                                            <ItemName>{pizza.name}</ItemName>
                                            <ItemDesc>
                                                {pizza.description}
                                            </ItemDesc>
                                            <ItemPrice>
                                                À partir de :{" "}
                                                <span
                                                    style={{
                                                        fontSize: "2.8rem",
                                                    }}
                                                >
                                                    {pizza.price[`10"`]}$
                                                </span>
                                            </ItemPrice>
                                        </CatBtn>
                                    );
                                })}
                            </ButtonBox>
                        </div>
                    </Category>
                    <Category>
                        <div>
                            <CatName>Nos Pâtes</CatName>
                            <ButtonBox>
                                {pastas.map((pasta) => {
                                    return (
                                        <CatBtn
                                            id={pasta._id}
                                            onClick={handleClickPasta}
                                            key={pasta.name + pasta._id}
                                        >
                                            <ItemName>{pasta.name}</ItemName>
                                            <ItemDesc>
                                                {pasta.description}
                                            </ItemDesc>
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
                                        </CatBtn>
                                    );
                                })}
                            </ButtonBox>
                        </div>
                    </Category>
                    <Category>
                        <div>
                            <CatName>Nos Assièttes</CatName>
                            <ButtonBox>
                                {platters.map((platter) => {
                                    return (
                                        <CatBtn
                                            id={platter._id}
                                            onClick={handleClickPlatters}
                                            key={platter.name + platter._id}
                                        >
                                            <ItemName>{platter.name}</ItemName>
                                            <ItemDesc>
                                                {platter.description}
                                            </ItemDesc>
                                            <ItemPrice>
                                                À partir de :{" "}
                                                <span
                                                    style={{
                                                        fontSize: "2.8rem",
                                                    }}
                                                >
                                                    {platter.price[`ind`]}$
                                                </span>
                                            </ItemPrice>
                                        </CatBtn>
                                    );
                                })}
                            </ButtonBox>
                        </div>
                    </Category>
                    <Category>
                        <div>
                            <CatName>Nos Spéciaux</CatName>
                            <ButtonBox>
                                {combos.map((combo) => {
                                    return (
                                        <CatBtn
                                            id={combo._id}
                                            onClick={handleClickCombo}
                                            key={combo.name + combo._id}
                                        >
                                            <ItemName>{combo.name}</ItemName>
                                            <ItemDesc>
                                                {combo.description}
                                            </ItemDesc>
                                            <ItemPrice>
                                                À partir de :{" "}
                                                <span
                                                    style={{
                                                        fontSize: "2.8rem",
                                                    }}
                                                >
                                                    {combo.price}$
                                                </span>
                                            </ItemPrice>
                                        </CatBtn>
                                    );
                                })}
                            </ButtonBox>
                        </div>
                    </Category>
                    <Category>
                        <div>
                            <CatName>Nos Poutines</CatName>
                            <ButtonBox>
                                {poutines.map((poutine) => {
                                    return (
                                        <CatBtn
                                            id={poutine._id}
                                            onClick={handleClickPoutines}
                                            key={poutine.name + poutine._id}
                                        >
                                            <ItemName>{poutine.name}</ItemName>
                                            <ItemDesc>
                                                {poutine.description}
                                            </ItemDesc>
                                            <ItemPrice>
                                                À partir de :{" "}
                                                <span
                                                    style={{
                                                        fontSize: "2.8rem",
                                                    }}
                                                >
                                                    {poutine.price[`small`]}$
                                                </span>
                                            </ItemPrice>
                                        </CatBtn>
                                    );
                                })}
                            </ButtonBox>
                        </div>
                    </Category>
                </PageBody>
            )}
        </PageContainer>
    );
};

const PageContainer = styled.div``;
const PageHeader = styled.div`
    width: 90%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 50px;
`;
const PageTitle = styled.h1``;
const PageDesc = styled.div``;
const PageBody = styled.div`
    width: 80%;
    margin: auto;
    max-width: 1300px;
`;
const Category = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 15px;
    border: 1px solid black;
    position: relative;
    width: 100%;
    margin: auto;
    margin-bottom: 40px;
`;
const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
const CatName = styled.h2`
    position: absolute;
    top: -20px;
    background-color: #eee;
`;
const CatBtn = styled.button`
    padding: 15px;
    margin: 5px;
    width: 100%;
    max-width: 400px;
    background-image: linear-gradient(
        to right,
        hsl(28, 58%, 30%),
        hsl(16, 96%, 52%)
    );
    transition: all 2s ease-in-out;
    &:hover {
        background-image: linear-gradient(
            to left,
            hsl(28, 58%, 30%),
            hsl(16, 96%, 52%)
        );
    }
`;
const ItemName = styled.h3`
    color: white;
`;
const ItemDesc = styled.p`
    color: white;
`;
const ItemPrice = styled.p`
    color: white; ;
`;

export default OrderNow;
