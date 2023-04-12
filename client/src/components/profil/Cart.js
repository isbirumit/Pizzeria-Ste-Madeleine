import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useFetcher, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill, RiDeleteBin6Fill } from "react-icons/ri";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { GrMoney, GrDeliver } from "react-icons/gr";
import styled from "styled-components";
import { toast } from "react-toastify";
import FidgetSpinner from "../FidgetSpinner";

const Cart = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [cart, setCart] = useState([]);
    const [beforeTaxTotal, setBeforeTaxTotal] = useState(0);
    const [total, setTotal] = useState();
    const navigate = useNavigate();
    const navigate2 = useNavigate();
    const navigatePayment = useNavigate();
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    const [isDelivery, setIsDelivery] = useState(false);
    const [link, setLink] = useState({});
    const [pageLoaded, setPageLoaded] = useState(false);
    const formInit = {
        userId: currentUser._id,
        _id: "",
        option: "",
        name: currentUser.name,
        phone: currentUser.phone,
        email: currentUser.email,
        address: "",
        city: "",
        zip: "",
        cart: [],
        paid: true,
    };
    const [paymentForm, setPaymentForm] = useState(formInit);
    useEffect(() => {
        fetch(`/stm/cart/${currentUser._id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate("/*");
                } else if (data.status === 200) {
                    setCart(data.data);
                    setCurrentUser({ ...currentUser, cart: data.data });
                    setPaymentForm({ ...paymentForm, cart: data.data });
                    setPageLoaded(true);
                }
            });
    }, [triggerRefresh]);
    useEffect(() => {
        setBeforeTaxTotal(
            currentUser.cart.reduce(
                (result, number) => result + number.price,
                0
            )
        );
    }, [cart]);
    useEffect(() => {
        setTotal(
            (
                beforeTaxTotal +
                beforeTaxTotal * 0.05 +
                beforeTaxTotal * 0.09975
            ).toFixed(2)
        );
    }, [beforeTaxTotal]);
    useEffect(() => {
        setCart(cart);
    }, [triggerRefresh]);

    //handlers
    const handleContinueSopping = () => {
        navigate("/order");
    };
    const handleDelClick = (e) => {
        fetch(`/stm/cart`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: currentUser._id,
                itemId: e.currentTarget.id,
            }),
        })
            .then((result) => result.json())
            .then((data) => {
                if (data.status === 404) {
                    navigate2("/*");
                } else if (data.status === 200) {
                    setCurrentUser({ ...currentUser, cart: data.cartData });
                    setCart(currentUser.cart);
                }
            });
        setTriggerRefresh(!triggerRefresh);
    };
    const handlePayment = (total) => {
        navigatePayment(`/${currentUser.firtName}/cart/payment`, {
            state: { total: total },
        });
    };
    const handleOption = (option) => {
        if (option === 1) {
            setIsDelivery(false);
        } else if (option === 2) {
            setIsDelivery(true);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/create-checkout-session`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentForm),
        })
            .then((result) => result.json())
            .then((data) => {
                if (data.status === 404) {
                    toast.error("Vous pouvez essayer a nouveau");
                } else {
                    window.location = data.link;
                }
            });
    };

    return (
        <>
            {!pageLoaded ? (
                <FidgetSpinner />
            ) : (
                <div style={{ height: "100vh", backgroundColor: "white" }}>
                    <PageContainer>
                        <CartInfo>
                            {cart.map((item) => {
                                return (
                                    <CartItemBox key={item.name + item.price}>
                                        <ItemInfo>
                                            <ItemTitle>{item.name}</ItemTitle>
                                            <P>
                                                <Gray>
                                                    Extras : {item.extras}
                                                </Gray>
                                            </P>
                                        </ItemInfo>
                                        <ItemPriceBox>
                                            <P>
                                                Prix :{" "}
                                                <Span>
                                                    {item.price.toFixed(2)}
                                                </Span>
                                            </P>
                                            <ButtonDel
                                                id={item.item_id}
                                                onClick={handleDelClick}
                                            >
                                                <RiDeleteBin6Fill
                                                    style={{ fontSize: "2rem" }}
                                                />
                                            </ButtonDel>
                                        </ItemPriceBox>
                                    </CartItemBox>
                                );
                            })}
                            <BtnBox>
                                <Button onClick={handleContinueSopping}>
                                    <RiArrowGoBackFill /> Continuer vos achats
                                </Button>
                                <Button onClick={handleContinueSopping}>
                                    Ajouter touts les items aux favoris{" "}
                                    <MdOutlineFavoriteBorder />
                                </Button>
                            </BtnBox>
                            <InfoContainer>
                                <InfoBox>
                                    <Points />
                                    <P style={{ textAlign: "center" }}>
                                        Gagner{" "}
                                        <Span style={{ color: "green" }}>
                                            {(total * 0.5).toFixed(0)}
                                        </Span>{" "}
                                        points
                                    </P>
                                </InfoBox>
                                <InfoBox>
                                    <Delivery />
                                    <P style={{ textAlign: "center" }}>
                                        {" "}
                                        Livraison rapide !
                                    </P>
                                </InfoBox>
                            </InfoContainer>
                        </CartInfo>
                        <Summary>
                            <CheckOutWrappers>
                                <CheckOutLabel>
                                    Nombre d'item dans votre commandes:{" "}
                                </CheckOutLabel>
                                <CheckOutValue>
                                    {currentUser.cart.length}
                                </CheckOutValue>
                            </CheckOutWrappers>

                            <CheckOutWrappers>
                                <CheckOutLabel>Prix avant taxe :</CheckOutLabel>
                                <CheckOutValue>
                                    {beforeTaxTotal.toFixed(2)} $
                                </CheckOutValue>
                            </CheckOutWrappers>

                            <CheckOutWrappers>
                                <CheckOutLabel>TVQ :</CheckOutLabel>
                                <CheckOutValue>
                                    {(beforeTaxTotal * 0.09975).toFixed(2)} $
                                </CheckOutValue>
                            </CheckOutWrappers>

                            <CheckOutWrappers>
                                <CheckOutLabel>TPS :</CheckOutLabel>
                                <CheckOutValue>
                                    {(beforeTaxTotal * 0.05).toFixed(2)} $
                                </CheckOutValue>
                            </CheckOutWrappers>

                            <CheckOutWrappers>
                                <CheckOutLabel>Total : </CheckOutLabel>
                                <CheckOutValue>{total} $</CheckOutValue>
                            </CheckOutWrappers>

                            <div>
                                <ButtonOptionBox>
                                    <ButtonOption
                                        onClick={() => handleOption(1)}
                                    >
                                        Takeout
                                    </ButtonOption>
                                    <ButtonOption
                                        onClick={() => handleOption(2)}
                                    >
                                        Livraison
                                    </ButtonOption>
                                </ButtonOptionBox>

                                {isDelivery ? (
                                    <Form onSubmit={handleSubmit}>
                                        <Label>
                                            Nom Complet
                                            <Input
                                                type="text"
                                                required={true}
                                                value={paymentForm.name}
                                                onChange={(e) =>
                                                    setPaymentForm({
                                                        ...paymentForm,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="nom"
                                            />
                                        </Label>
                                        <Label>
                                            Numéro de téléphone
                                            <Input
                                                type="text"
                                                required={true}
                                                value={paymentForm.phone}
                                                onChange={(e) =>
                                                    setPaymentForm({
                                                        ...paymentForm,
                                                        phone: e.target.value,
                                                    })
                                                }
                                                placeholder="ex : 514-123-1234"
                                            />
                                        </Label>
                                        {currentUser.cart.length === 0 ? (
                                            <h1>
                                                Nothing in cart to check out{" "}
                                            </h1>
                                        ) : (
                                            <ButtonCheckOut>
                                                Commander
                                            </ButtonCheckOut>
                                        )}
                                    </Form>
                                ) : (
                                    <Form onSubmit={handleSubmit}>
                                        <Label>
                                            Nom Complet
                                            <Input
                                                type="text"
                                                required={true}
                                                value={paymentForm.name}
                                                onChange={(e) =>
                                                    setPaymentForm({
                                                        ...paymentForm,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="nom"
                                            />
                                        </Label>
                                        <Label>
                                            Numéro de téléphone
                                            <Input
                                                type="text"
                                                required={true}
                                                value={paymentForm.phone}
                                                onChange={(e) =>
                                                    setPaymentForm({
                                                        ...paymentForm,
                                                        phone: e.target.value,
                                                    })
                                                }
                                                placeholder="ex : 514-123-1234"
                                            />
                                        </Label>
                                        <Label>
                                            Address
                                            <Input
                                                type="text"
                                                required={true}
                                                value={paymentForm.address}
                                                onChange={(e) =>
                                                    setPaymentForm({
                                                        ...paymentForm,
                                                        address: e.target.value,
                                                    })
                                                }
                                                placeholder="ex : 548 rue McGill"
                                            />
                                        </Label>
                                        <Label>
                                            Ville
                                            <Input
                                                type="text"
                                                required={true}
                                                value={paymentForm.city}
                                                onChange={(e) =>
                                                    setPaymentForm({
                                                        ...paymentForm,
                                                        city: e.target.value,
                                                    })
                                                }
                                                placeholder="ex : Ste-Madeleine"
                                            />
                                        </Label>
                                        <Label>
                                            Code postal
                                            <Input
                                                type="text"
                                                required={true}
                                                value={paymentForm.zip}
                                                onChange={(e) =>
                                                    setPaymentForm({
                                                        ...paymentForm,
                                                        zip: e.target.value,
                                                    })
                                                }
                                                placeholder="ex : H1M-3E8"
                                            />
                                        </Label>
                                        {currentUser.cart.length === 0 ? (
                                            <h1>
                                                Nothing in cart to check out{" "}
                                            </h1>
                                        ) : (
                                            <ButtonCheckOut>
                                                Commander
                                            </ButtonCheckOut>
                                        )}
                                    </Form>
                                )}
                            </div>
                        </Summary>
                    </PageContainer>
                </div>
            )}
        </>
    );
};

const ButtonOptionBox = styled.div`
    display: flex;
    justify-content: center;
    width: 30vw;
    margin: auto;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 20px;
`;
const ButtonOption = styled.button`
    width: 50%;
    padding: 10px;
    border: none;
    font-size: 20px;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        border-bottom: 2px solid hsl(28, 58%, 30%);
    }
    &:focus {
        border-bottom: 2px solid hsl(28, 58%, 30%);
    }
`;
const ButtonCheckOut = styled.button`
    background: #3498db;
    background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
    background-image: -moz-linear-gradient(top, #3498db, #2980b9);
    background-image: -ms-linear-gradient(top, #3498db, #2980b9);
    background-image: -o-linear-gradient(top, #3498db, #2980b9);
    background-image: linear-gradient(to bottom, #3498db, #2980b9);
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    font-family: Arial;
    color: #ffffff;
    font-size: 23px;
    padding: 10px 20px 10px 20px;
    text-decoration: none;
    &:hover {
        background: #3cb0fd;
        background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
        background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
        background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
        background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
        background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
        text-decoration: none;
    }
`;
const CheckOutWrappers = styled.div`
    display: flex;
    margin-top: 5px;
    padding: 10px;
    height: 40px;
    justify-content: space-between;
    border-bottom: 2px solid grey;
    color: #3b2410;
    font-family: "Oswald";
`;
const CheckOutLabel = styled.p`
    font-size: 120%;
    font-weight: bold;
`;
const CheckOutValue = styled.p`
    font-size: 140%;
    color: black;
    font-weight: bold;
    font-family: "Oswald";
`;
const Span = styled.span`
    font-size: 24px;
    font-weight: bold;
`;
const Gray = styled.span`
    color: gray;
`;
const PageContainer = styled.div`
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
`;
const Summary = styled.div`
    display: flex;
    flex-direction: column;
    background-color: hsl(0, 0%, 95%);
    width: 900px;
    max-width: 900px;
    box-shadow: -1px 0px 10px -3px hsl(0, 0%, 95%);
    height: 100vh;
    padding-top: 30px;
`;

const BtnBox = styled.div`
    display: flex;
    justify-content: space-between;
`;
const InfoContainer = styled.div`
    display: flex;
    margin-right: 10px;
`;
const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 350px;
    height: 350px;
    margin: 0 60px;
    background-color: hsl(0, 0%, 95%);
`;
const Points = styled(GrMoney)`
    font-size: 100px;
    align-self: center;
    margin: auto;
`;
const Delivery = styled(GrDeliver)`
    font-size: 100px;
    align-self: center;
    margin: auto;
`;
const CartInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px 0;
    padding: 20px 10px;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    max-width: 1000px;
    @media (min-width: 1200px) {
        border-bottom: 0px;
        border-top: 0px;
        padding-right: 20px;
    }
`;
const CartItemBox = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 4px 5px 5px hsl(0, 0%, 95%);
    margin: 5px 0;
    padding: 15px 55px;
`;
const ButtonDel = styled.button`
    top: 10px;
    right: 10px;
    position: absolute;
    text-decoration: none;
    border: none;
    background-color: white;
    &:hover {
        cursor: pointer;
    }
`;
const ItemTitle = styled.h1`
    margin-bottom: 10px;
`;
const P = styled.p`
    margin-bottom: 10px;
    font-weight: bold;
`;
const ItemInfo = styled.div``;
const ItemPriceBox = styled.div`
    display: flex;
    justify-content: space-between;
`;
const ItemQtyBox = styled.div`
    display: flex;
`;
const Button = styled.button`
    background-color: white;
    border: none;
    text-shadow: 4px 4px 4px #666666;
    width: 300px;
    font-family: Courier New;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    text-decoration: none;
    transition: all 250ms ease-in-out;
    &:hover {
        background: #ffffff;
        text-decoration: underline;
        cursor: pointer;
    }
`;
const ButtonCart = styled.button`
    background: #9e9e9e;
    background-image: -webkit-linear-gradient(top, #9e9e9e, #ffffff);
    background-image: -moz-linear-gradient(top, #9e9e9e, #ffffff);
    background-image: -ms-linear-gradient(top, #9e9e9e, #ffffff);
    background-image: -o-linear-gradient(top, #9e9e9e, #ffffff);
    background-image: linear-gradient(to bottom, #9e9e9e, #ffffff);
    -webkit-border-radius: 8;
    -moz-border-radius: 8;
    border-radius: 8px;
    text-shadow: 4px 4px 4px #666666;
    -webkit-box-shadow: 0px 0px 14px #666666;
    -moz-box-shadow: 0px 0px 14px #666666;
    box-shadow: 0px 0px 14px #666666;
    font-family: Courier New;
    color: #000000;
    font-size: 20px;
    font-weight: bold;
    margin: 0 10px;
    align-items: center;
    padding: 0 10px;
    text-decoration: none;
    transition: 250ms ease-in-out;
    &:hover {
        background: #ffffff;
        background-image: -webkit-linear-gradient(top, #ffffff, #9e9e9e);
        background-image: -moz-linear-gradient(top, #ffffff, #9e9e9e);
        background-image: -ms-linear-gradient(top, #ffffff, #9e9e9e);
        background-image: -o-linear-gradient(top, #ffffff, #9e9e9e);
        background-image: linear-gradient(to bottom, #ffffff, #9e9e9e);
        text-decoration: none;
    }
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: auto;
    justify-content: space-between;
`;
const Label = styled.label`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 7px;
    color: #3b2410;
    font-weight: bold;
`;
const Input = styled.input`
    font-size: 1.8rem;
    padding: 0.5em;
    background-color: white;
    border: none;
    outline: none;
    border-radius: 0.25em;
    transition: 150ms;
    &:focus {
        box-shadow: 0 0 10px 2px hsl(200, 100%, 100%, 0.9);
    }
`;
export default Cart;
