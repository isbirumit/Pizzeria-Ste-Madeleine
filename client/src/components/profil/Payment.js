import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
// Not using
const Payment = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    // const formInit = {
    //     userId: currentUser._id,
    //     _id: "",
    //     option: "",
    //     name: currentUser.name,
    //     phone: currentUser.phone,
    //     email: currentUser.email,
    //     address: "",
    //     city: "",
    //     zip: "",
    //     cardName: "",
    //     cardNumber: "",
    //     expMonth: "",
    //     expYear: "",
    //     cvc: "",
    //     cart: currentUser.cart,
    // };

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
        cart: currentUser.cart,
    };
    const [formPayment, setFormPayment] = useState(formInit);
    const location = useLocation();
    const state = location.state;
    const [option, setOption] = useState(0);
    const navigate = useNavigate();
    const handleSubmitToGo = (e) => {
        e.preventDefault();

        fetch(`/stm/order`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formPayment),
        })
            .then((result) => result.json())
            .then((data) => {
                if (data.status === 404) {
                    toast.error("Vous pouvez essayer a nouveau");
                } else if (data.status === 200) {
                    setCurrentUser({ ...currentUser, cart: [] });
                    navigate(`/${currentUser.name}/cart/payment/successfull`, {
                        state: { form: formPayment },
                    });
                }
            });
    };
    const handleSubmitDelivery = (e) => {
        e.preventDefault();
        fetch(`/stm/order`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formPayment),
        })
            .then((result) => result.json())
            .then((data) => {
                if (data.status === 404) {
                    toast.error("Vous pouvez essayer a nouveau");
                } else if (data.status === 200) {
                    navigate("/payment");
                }
            });
    };
    const handleClick = (e) => {
        if (e.target.id == "2") {
            setOption(2);
        } else {
            setOption(1);
        }
    };
    switch (option) {
        case 0:
            return (
                <Page>
                    <OptionsBox>
                        <Options id="1" onClick={handleClick}>
                            Emporter
                        </Options>
                        <Options id="2" onClick={handleClick}>
                            Livrer
                        </Options>
                    </OptionsBox>
                </Page>
            );
        case 1:
            return (
                <>
                    <ToGoPage onSubmit={handleSubmitToGo}>
                        {/* <Label>
                            Nom sur la carte
                            <Input
                                type="text"
                                required={true}
                                value={formPayment.name}
                                onChange={(e) =>
                                    setFormPayment({
                                        ...formPayment,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="nom complet"
                            />
                        </Label>
                        <Label>
                            Numero de cart
                            <Input
                                type="text"
                                required={true}
                                value={formPayment.cardNumber}
                                onChange={(e) =>
                                    setFormPayment({
                                        ...formPayment,
                                        cardNumber: e.target.value,
                                    })
                                }
                                placeholder="Card number"
                            />
                        </Label>
                        <Label>
                            Mois d'EXP
                            <Input
                                type="text"
                                required={true}
                                value={formPayment.expMonth}
                                onChange={(e) =>
                                    setFormPayment({
                                        ...formPayment,
                                        expMonth: e.target.value,
                                    })
                                }
                                placeholder="MM"
                            />
                        </Label>
                        <Label>
                            Année d'EXP
                            <Input
                                type="text"
                                required={true}
                                value={formPayment.expYear}
                                onChange={(e) =>
                                    setFormPayment({
                                        ...formPayment,
                                        expYear: e.target.value,
                                    })
                                }
                                placeholder="YY"
                            />
                        </Label>
                        <Label>
                            CVC
                            <Input
                                type="text"
                                required={true}
                                value={formPayment.cvc}
                                onChange={(e) =>
                                    setFormPayment({
                                        ...formPayment,
                                        cvc: e.target.value,
                                    })
                                }
                                placeholder="CVC"
                            />
                        </Label> */}
                        <Label>Total : {state.total}</Label>
                        <ButtonSubmit type="submit">Pay</ButtonSubmit>
                    </ToGoPage>
                    ;
                </>
            );
        case 2:
            return (
                <DeliveryPage onSubmit={handleSubmitDelivery}>
                    <Label>
                        Addresse de livraison
                        <Input
                            type="text"
                            required={true}
                            value={formPayment.address}
                            onChange={(e) =>
                                setFormPayment({
                                    ...formPayment,
                                    address: e.target.value,
                                })
                            }
                            placeholder="ex : 1234 maisonneuve"
                        />
                    </Label>
                    <Label>
                        Ville
                        <Input
                            type="text"
                            required={true}
                            value={formPayment.city}
                            onChange={(e) =>
                                setFormPayment({
                                    ...formPayment,
                                    city: e.target.value,
                                })
                            }
                            placeholder="ex : montreal"
                        />
                    </Label>
                    <Label>
                        Code postal
                        <Input
                            type="text"
                            required={true}
                            value={formPayment.name}
                            onChange={(e) =>
                                setFormPayment({
                                    ...formPayment,
                                    zip: e.target.value,
                                })
                            }
                            placeholder="ex : A1B 2C3"
                        />
                    </Label>

                    {/* <Label>
                        Nom sur la carte
                        <Input
                            type="text"
                            required={true}
                            value={formPayment.name}
                            onChange={(e) =>
                                setFormPayment({
                                    ...formPayment,
                                    name: e.target.value,
                                })
                            }
                            placeholder="nom complet"
                        />
                    </Label>
                    <Label>
                        Numero de cart
                        <Input
                            type="text"
                            required={true}
                            value={formPayment.cardNumber}
                            onChange={(e) =>
                                setFormPayment({
                                    ...formPayment,
                                    cardNumber: e.target.value,
                                })
                            }
                            placeholder="Card number"
                        />
                    </Label>
                    <Label>
                        Mois d'EXP
                        <Input
                            type="text"
                            required={true}
                            value={formPayment.expMonth}
                            onChange={(e) =>
                                setFormPayment({
                                    ...formPayment,
                                    expMonth: e.target.value,
                                })
                            }
                            placeholder="MM"
                        />
                    </Label>
                    <Label>
                        Année d'EXP
                        <Input
                            type="text"
                            required={true}
                            value={formPayment.expYear}
                            onChange={(e) =>
                                setFormPayment({
                                    ...formPayment,
                                    expYear: e.target.value,
                                })
                            }
                            placeholder="YY"
                        />
                    </Label>
                    <Label>
                        CVC
                        <Input
                            type="text"
                            required={true}
                            value={formPayment.cvc}
                            onChange={(e) =>
                                setFormPayment({
                                    ...formPayment,
                                    cvc: e.target.value,
                                })
                            }
                            placeholder="CVC"
                        />
                    </Label> */}
                    <Label>Total : {state.total}</Label>
                    <ButtonSubmit type="submit">Pay</ButtonSubmit>
                </DeliveryPage>
            );
        default:
            break;
    }
};
const Page = styled.div`
    display: flex;
    background-color: black;
    height: 100vh;
`;
const OptionsBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 40vw;
    margin: auto;
`;
const Options = styled.button`
    -webkit-border-radius: 15;
    -moz-border-radius: 15;
    border-radius: 15px;
    text-shadow: 4px 4px 4px #000000;
    -webkit-box-shadow: 0px 0px 20px #ff9900;
    -moz-box-shadow: 0px 0px 20px #ff9900;
    box-shadow: 0px 0px 20px #ff9900;
    font-family: Courier New;
    color: #ffffff;
    font-size: 26px;
    background: #573700;
    padding: 20px 40px 20px 40px;
    text-decoration: none;
    width: 250px;
    font-weight: bold;
    margin-left: 20px;
    transition: 1250ms;
    &:hover {
        background: #a16600;
        text-decoration: none;
    }
`;

const ToGoPage = styled.form`
    color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 60%;
    padding: 20px;
    max-width: 500px;
    margin: auto;
`;
const DeliveryPage = styled.form`
    color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 60%;
    padding: 20px;
    max-width: 500px;
    margin: auto;
`;
const Label = styled.label`
    color: black;
    font-weight: bold;
`;
const Input = styled.input`
    padding: 10px;
`;

const ButtonSubmit = styled.button`
    color: black;
    font-weight: bold;
    font-size: 2rem;
    &:hover {
        color: Green;
    }
`;

export default Payment;
