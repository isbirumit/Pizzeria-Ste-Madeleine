import styled from "styled-components"
import {CgProfile} from "react-icons/cg"
import SideBar from "./sidebar/SideBar"
import { Link } from "react-router-dom"
const Header = () => {

    return (
        <>
            <HeaderWrapper>
                <DropDownMenu>
                    <SideBar />
                </DropDownMenu>
                <Logo to="/">
                    <LogoImg src={require('../public/ste-mad-logo.png')}/>
                </Logo>
                <Profil to={"../profil/profil"}>
                    <ProfilCg />
                </Profil>
            </HeaderWrapper>
        </>
    )
}

const HeaderWrapper = styled.div`
    position: sticky;
    top:0;
    display:flex;
    justify-content: space-between;
    width: auto;
    height: 60px;
    background-color: #b30000;
    border-bottom: solid 2px white;
    -webkit-box-shadow: 0px 6px 11px -5px rgba(252,0,0,0.56);
    -moz-box-shadow: 0px 6px 11px -5px rgba(252,0,0,0.56);
    box-shadow: 0px 6px 11px -5px rgba(252,0,0,0.56);
    z-index: 100;
`
const DropDownMenu = styled.div`
    align-self:center;
    color: #fff;
`
const Logo = styled(Link)`
    font-size: 1.2rem;
    color: #fff;
`
const LogoImg = styled.img`
    width: 100px;
    max-height:60px;
`
const Profil = styled(Link)`
    color: #fff;
    margin-right: 10px;
    align-self:center;
`
const ProfilCg = styled(CgProfile)`
    font-size: 220%;
`

export default Header