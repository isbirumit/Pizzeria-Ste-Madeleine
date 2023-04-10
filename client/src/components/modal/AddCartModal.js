import { useContext, useEffect, useState } from "react";
import AddCartButton from "../AddCartButton";
import styled from "styled-components";
import "./AddCartModal.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";

const AddCartModal = ({ type, item, handleModalClick }) => {
    const initForm = {
        item_id: "",
        name: "",
        size: type === "platter" ? "ind" : "small",
        price: type === "platter" ? item.price["ind"] : item.price["small"],
        extras: [],
        quantity: 1,
    };

    const [cartForm, setCartForm] = useState(initForm);
    const [fastFoodExtras, setFastFoodExtras] = useState([]);
    const navigate = useNavigate();
    const [btnExtras, setBtnExtras] = useState([]);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [quantity, setQuantity] = useState(1);
    const [itemIndPrice, setItemIndPrice] = useState(0);
    const [loadedCategory, setLoadedCategory] = useState(false);
    //
    console.log(item);
    //Handlers

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleOptionChange = (e) => {
        if (type == "platter") {
        }
        setCartForm({
            ...cartForm,
            size: e.target.value,
            price: item.price[e.target.value],
        });
        setItemIndPrice(cartForm.price);
    };
    console.log("item ind price : ", itemIndPrice);
    const handleExtraClilck = (e, prc) => {
        if (btnExtras.length < 4) {
            btnExtras.push(e.currentTarget.id);
            setCartForm({
                ...cartForm,
                price: cartForm.price + prc,
                extras: btnExtras,
            });
            setItemIndPrice(cartForm.price);
        } else {
            toast.error("Vous avez depasser la limite");
        }
    };

    const handleAddCartBtn = () => {
        if (!currentUser) {
            navigate("/login");
            toast.error("Vous devez etre connecter pour ajouter aux paniers");
        } else {
        }
    };

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));

        setCartForm({
            ...cartForm,
            price: itemIndPrice * parseInt(e.target.value),
            quantity: parseInt(e.target.value),
        });
    };

    const deleteItem = (e) => {
        setCartForm({
            ...cartForm,
            price:
                cartForm.price -
                fastFoodExtras.filter(
                    (extra) => extra.name == e.currentTarget.id
                )[0].price,
        });
        setBtnExtras(btnExtras.filter((extra) => extra !== e.currentTarget.id));
    };

    //
    useEffect(() => {}, [btnExtras]);

    useEffect(() => {
        fetch("/stm/extras/fastfood")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404) {
                    console.log(data);
                } else if (data.status === 200) {
                    setFastFoodExtras(data.data);
                }
            });
        if (type == "combos") {
            setCartForm({
                ...cartForm,
                price: item.price,
                size: "COMBO",
                name: item.name,
                item_id: item._id,
            });
            setLoadedCategory(true);
        } else {
            setCartForm({ ...cartForm, name: item.name, item_id: item._id });
        }
        setItemIndPrice(cartForm.price);
    }, []);
    console.log("Object keys : ", Object.keys(item.price).length);

    console.log(cartForm);
    switch (type) {
        case "pasta":
            return (
                <div className="ModalContainer">
                    <form onSubmit={handleSubmit} className="Modalbox">
                        <ButtonClose onClick={handleModalClick}>X</ButtonClose>
                        <ItemTitle>{item.name}</ItemTitle>
                        <SizeBox>
                            <Titles>Taille :</Titles>
                            <RadioBox>
                                <Radio>
                                    <Label>
                                        <input
                                            type="radio"
                                            onChange={handleOptionChange}
                                            value={"small"}
                                            checked={cartForm.size === "small"}
                                            required={true}
                                        />
                                        Moyenne
                                    </Label>
                                </Radio>
                                <Radio>
                                    <Label>
                                        <input
                                            type="radio"
                                            onChange={handleOptionChange}
                                            value={"large"}
                                            checked={cartForm.size === "large"}
                                            required={true}
                                        />
                                        Grande
                                    </Label>
                                </Radio>
                            </RadioBox>
                        </SizeBox>
                        <ExtraBox>
                            <Titles>Extras *max 4 : </Titles>
                            <ExtraContainer>
                                {fastFoodExtras.map((each) => {
                                    return (
                                        <div key={each.name + each.price}>
                                            <ExtraBtn
                                                id={each.name}
                                                onClick={(e) =>
                                                    handleExtraClilck(
                                                        e,
                                                        each.price
                                                    )
                                                }
                                            >
                                                <ExtraName>
                                                    {each.name}
                                                </ExtraName>
                                                <ExtraPrice>
                                                    {each.price}
                                                </ExtraPrice>
                                            </ExtraBtn>
                                        </div>
                                    );
                                })}
                            </ExtraContainer>
                        </ExtraBox>
                        <ItemInformationBox>
                            {btnExtras.map((extra) => {
                                return (
                                    <AddedExtraBtn
                                        key={extra}
                                        id={extra}
                                        onClick={deleteItem}
                                    >
                                        {extra}
                                    </AddedExtraBtn>
                                );
                            })}
                        </ItemInformationBox>
                        <ItemQuantity>
                            <Label>
                                Quantity:
                                <Select
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <option key={i} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </Select>
                            </Label>
                        </ItemQuantity>
                        <EndBox>
                            <CartButton onClick={handleAddCartBtn}>
                                Ajouter au panier
                            </CartButton>
                            <ItemPrice>
                                {" "}
                                Prix : {cartForm.price.toFixed(2)}
                            </ItemPrice>
                        </EndBox>
                    </form>
                </div>
            );
        case "combos":
            return (
                <div className="ModalContainer">
                    <form onSubmit={handleSubmit} className="Modalbox">
                        <ButtonClose onClick={handleModalClick}>X</ButtonClose>
                        <ItemTitle>{item.name}</ItemTitle>
                        <Titles>{item.description}</Titles>

                        <ExtraBox>
                            <Titles>Extras *max 4 : </Titles>
                            <ExtraContainer>
                                {fastFoodExtras.map((each) => {
                                    return (
                                        <div key={each.name + each.price}>
                                            <ExtraBtn
                                                id={each.name}
                                                onClick={(e) =>
                                                    handleExtraClilck(
                                                        e,
                                                        each.price
                                                    )
                                                }
                                            >
                                                <ExtraName>
                                                    {each.name}
                                                </ExtraName>
                                                <ExtraPrice>
                                                    {each.price}
                                                </ExtraPrice>
                                            </ExtraBtn>
                                        </div>
                                    );
                                })}
                            </ExtraContainer>
                        </ExtraBox>
                        <ItemInformationBox>
                            {btnExtras.map((extra) => {
                                return (
                                    <AddedExtraBtn
                                        key={extra}
                                        id={extra}
                                        onClick={deleteItem}
                                    >
                                        {extra}
                                    </AddedExtraBtn>
                                );
                            })}
                        </ItemInformationBox>
                        <ItemQuantity>
                            <Label>
                                Quantity:
                                <Select
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <option key={i} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </Select>
                            </Label>
                        </ItemQuantity>
                        <EndBox>
                            <CartButton onClick={handleAddCartBtn}>
                                Ajouter au panier
                            </CartButton>
                            {!loadedCategory ? null : (
                                <ItemPrice>
                                    {" "}
                                    Prix : {cartForm.price.toFixed(2)}
                                </ItemPrice>
                            )}
                        </EndBox>
                    </form>
                </div>
            );
        case "platter":
            return (
                <div className="ModalContainer">
                    <form onSubmit={handleSubmit} className="Modalbox">
                        <ButtonClose onClick={handleModalClick}>X</ButtonClose>
                        <ItemTitle>{item.name}</ItemTitle>
                        <SizeBox>
                            <Titles>Taille :</Titles>
                            <RadioBox>
                                <Radio>
                                    <Label>
                                        <input
                                            type="radio"
                                            onChange={handleOptionChange}
                                            value={"ind"}
                                            checked={cartForm.size === "ind"}
                                            required={true}
                                        />
                                        Seule
                                    </Label>
                                </Radio>
                                {item.category === "pitas" &&
                                    Object.keys(item.price).length > 1 && (
                                        <>
                                            <Radio>
                                                <Label>
                                                    <input
                                                        type="radio"
                                                        onChange={
                                                            handleOptionChange
                                                        }
                                                        value={"1Pita"}
                                                        checked={
                                                            cartForm.size ===
                                                            "1Pita"
                                                        }
                                                        required={true}
                                                    />
                                                    Ass 1 pita
                                                </Label>
                                            </Radio>
                                            <Radio>
                                                <Label>
                                                    <input
                                                        type="radio"
                                                        onChange={
                                                            handleOptionChange
                                                        }
                                                        value={"2Pita"}
                                                        checked={
                                                            cartForm.size ===
                                                            "2Pita"
                                                        }
                                                        required={true}
                                                    />
                                                    Ass 2 pitas
                                                </Label>
                                            </Radio>
                                        </>
                                    )}
                                {item.category === "croquettes" ? (
                                    <>
                                        <Radio>
                                            <Label>
                                                <input
                                                    type="radio"
                                                    onChange={
                                                        handleOptionChange
                                                    }
                                                    value={"8pce"}
                                                    checked={
                                                        cartForm.size === "8pce"
                                                    }
                                                    required={true}
                                                />
                                                Ass 8 croquettes
                                            </Label>
                                        </Radio>
                                        <Radio>
                                            <Label>
                                                <input
                                                    type="radio"
                                                    onChange={
                                                        handleOptionChange
                                                    }
                                                    value={"10pce"}
                                                    checked={
                                                        cartForm.size ===
                                                        "10pce"
                                                    }
                                                    required={true}
                                                />
                                                Ass10 croquettes
                                            </Label>
                                        </Radio>
                                    </>
                                ) : null}
                                {item.category === "ailes" &&
                                    Object.keys(item.price).length > 1 && (
                                        <>
                                            <Radio>
                                                <Label>
                                                    <input
                                                        type="radio"
                                                        onChange={
                                                            handleOptionChange
                                                        }
                                                        value={"8pce"}
                                                        checked={
                                                            cartForm.size ===
                                                            "8pce"
                                                        }
                                                        required={true}
                                                    />
                                                    Ass 8 ailes de poulets
                                                </Label>
                                            </Radio>
                                            <Radio>
                                                <Label>
                                                    <input
                                                        type="radio"
                                                        onChange={
                                                            handleOptionChange
                                                        }
                                                        value={"12pce"}
                                                        checked={
                                                            cartForm.size ===
                                                            "12pce"
                                                        }
                                                        required={true}
                                                    />
                                                    Ass 12 ailes de poulets
                                                </Label>
                                            </Radio>
                                            <Radio>
                                                <Label>
                                                    <input
                                                        type="radio"
                                                        onChange={
                                                            handleOptionChange
                                                        }
                                                        value={"16pce"}
                                                        checked={
                                                            cartForm.size ===
                                                            "16pce"
                                                        }
                                                        required={true}
                                                    />
                                                    Ass 16 ailes de poulets
                                                </Label>
                                            </Radio>
                                            <Radio>
                                                <Label>
                                                    <input
                                                        type="radio"
                                                        onChange={
                                                            handleOptionChange
                                                        }
                                                        value={"20pce"}
                                                        checked={
                                                            cartForm.size ===
                                                            "20pce"
                                                        }
                                                        required={true}
                                                    />
                                                    Ass 20 ailes de poulets
                                                </Label>
                                            </Radio>
                                        </>
                                    )}
                            </RadioBox>
                        </SizeBox>
                        <ExtraBox>
                            <Titles>Extras *max 4 : </Titles>
                            <ExtraContainer>
                                {fastFoodExtras.map((each) => {
                                    return (
                                        <div key={each.name + each.price}>
                                            <ExtraBtn
                                                id={each.name}
                                                onClick={(e) =>
                                                    handleExtraClilck(
                                                        e,
                                                        each.price
                                                    )
                                                }
                                            >
                                                <ExtraName>
                                                    {each.name}
                                                </ExtraName>
                                                <ExtraPrice>
                                                    {each.price}
                                                </ExtraPrice>
                                            </ExtraBtn>
                                        </div>
                                    );
                                })}
                            </ExtraContainer>
                        </ExtraBox>
                        <ItemInformationBox>
                            {btnExtras.map((extra) => {
                                return (
                                    <AddedExtraBtn
                                        key={extra}
                                        id={extra}
                                        onClick={deleteItem}
                                    >
                                        {extra}
                                    </AddedExtraBtn>
                                );
                            })}
                        </ItemInformationBox>
                        <ItemQuantity>
                            <Label>
                                Quantity:
                                <Select
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <option key={i} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </Select>
                            </Label>
                        </ItemQuantity>
                        <EndBox>
                            <CartButton onClick={handleAddCartBtn}>
                                Ajouter au panier
                            </CartButton>
                            <ItemPrice>
                                {" "}
                                Prix : {cartForm.price.toFixed(2)}
                            </ItemPrice>
                        </EndBox>
                    </form>
                </div>
            );

        default:
            break;
    }
};

const Label = styled.label`
    margin-right: 20px;
`;
const Select = styled.select`
    margin-right: 40px;
`;
const ButtonClose = styled.button`
    margin-left: 80%;
    margin-top: 10px;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: bold;
    color: #ffffff !important;
    font-size: 18px;
    text-shadow: 1px 1px 0px #3b2410;
    box-shadow: 1px 1px 1px #fa4f11;
    padding: 5px 25px;
    border-radius: 23px;
    border: 1px solid #3b2410;
    background: #fa4f11;
    background: linear-gradient(to top, #fa4f11, #794a20);
    transition: all 250ms ease-in-out;
    max-width: 200px;
    cursor: pointer;
    &:hover {
        color: #000000 !important;
        background: #794a20;
        background: linear-gradient(to top, #794a20, #fa4f11);
    }
`;
const ItemTitle = styled.h1`
    text-align: center;
    border-bottom: 1px solid black;
`;
const SizeBox = styled.div`
    display: flex;
`;
const RadioBox = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;
`;
const Titles = styled.h3`
    color: hsl(28, 58%, 30%);
    margin: 10px 5px;
`;
const Radio = styled.div`
    margin-left: 50px;
`;
const ItemPrice = styled.p``;
const ExtraBox = styled.div``;
const ExtraName = styled.h3``;
const ExtraPrice = styled.h3``;
const ExtraBtn = styled.button`
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    width: 80%;
    margin: auto;
    margin-top: 2px;
    border-radius: 50px;
`;
const ExtraContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const ItemInformationBox = styled.div`
    height: 180px;
`;
const EndBox = styled.div`
    height: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;
const CartButton = styled.button`
    margin-top: 30px;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: bold;
    color: #ffffff !important;
    font-size: 18px;
    text-shadow: 1px 1px 0px #3b2410;
    box-shadow: 1px 1px 1px #fa4f11;
    padding: 5px 25px;
    border-radius: 23px;
    border: 1px solid #3b2410;
    background: #fa4f11;
    background: linear-gradient(to top, #fa4f11, #794a20);
    transition: all 250ms ease-in-out;
    max-width: 200px;
    cursor: pointer;
    &:hover {
        color: #000000 !important;
        background: #794a20;
        background: linear-gradient(to top, #794a20, #fa4f11);
    }
`;
const AddedExtraBtn = styled.button`
    padding: 10px;
    border-radius: 50px;
    margin-top: 10px;
    margin-left: 5px;
    background-color: gray;
`;
const ItemQuantity = styled.div`
    height: 60px;
`;
export default AddCartModal;
