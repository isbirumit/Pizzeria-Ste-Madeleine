import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import SideBar from "./sidebar/SideBar";
import { Link } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
const Header = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    return (
        <>
            <HeaderWrapper>
                <DropDownMenu>
                    <SideBar />
                </DropDownMenu>
                <Logo to="/">
                    <h1>Pizzeria Ste Madelein</h1>
                </Logo>
                {!currentUser ? (
                    <Profil to={"/login"}>
                        <ProfilCg />
                    </Profil>
                ) : (
                    <Profil to={`/${currentUser.firstName}/cart`}>
                        {currentUser.cart.length}
                        <ProfilCg />
                    </Profil>
                )}
            </HeaderWrapper>
        </>
    );
};

const HeaderWrapper = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    width: auto;
    height: 60px;
    background-image: linear-gradient(
        to right,
        hsl(28, 58%, 30%),
        hsl(16, 96%, 52%)
    );
    border-bottom: solid 2px white;
    -webkit-box-shadow: 0px 6px 11px -5px rgba(201, 136, 80, 0.56);
    -moz-box-shadow: 0px 6px 11px -5px rgba(201, 136, 80, 0.56);
    box-shadow: 0px 6px 11px -5px rgba(201, 136, 80, 0.56);
    z-index: 100;
`;
const DropDownMenu = styled.div`
    align-self: center;
    color: #fff;
`;
const Logo = styled(Link)`
    font-size: 1.2rem;
    color: #fff;
    text-decoration: none;
    align-items: center;
    text-align: center;
    display: flex;
    transition: 1s;
    &:hover {
        color: black;
    }
`;
const LogoImg = styled.img`
    width: 100px;
    max-height: 60px;
`;
const Profil = styled(Link)`
    color: #fff;
    margin-right: 10px;
    align-self: center;
`;
const ProfilCg = styled(FaShoppingCart)`
    font-size: 220%;
`;

export default Header;
