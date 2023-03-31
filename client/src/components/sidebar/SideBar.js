import { useState } from "react"
import { IconContext } from "react-icons/lib"
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { SideBarData } from "./SideBarData"
import SubMenu from "./SubMenu"


const SideBar = () => {
    const [sidebar,setSidebar] = useState(false)


    const showSideBar = () => setSidebar(!sidebar)

    return (
        <>
            <IconContext.Provider value={{color : "#fff"}}>
                <Nav>
                    <NavIcon  to={'#'} >
                        <FaBars onClick={showSideBar}/>
                    </NavIcon>
                </Nav>
                <SideBarNav sidebar={sidebar}>
                    <SideBarWrap>
                        <NavIcon style={{borderBottom: "2px solid #fff", backgroundColor : "red",height: "60px"}} to={'#'}>
                            <AiOutlineClose  onClick={showSideBar} />
                        </NavIcon>
                        {SideBarData.map((item,index) => {
                            return <SubMenu item={item} key={index} />
                        })}
                    </SideBarWrap>
                </SideBarNav>
            </IconContext.Provider>
        </>
    )
}

const Nav = styled.div`
    margin-left: 10px;
    display : flex;
    justify-content:center;
    align-items: center;
`
const NavIcon = styled(Link)`
    font-size : 200%;
    display: flex;
    align-items: center;
`
const SideBarNav = styled.div`
    background: #f7efdf;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 500ms;
    z-index: 10;
    border-right : 2px solid #fff;
    -webkit-box-shadow: 5px 1px 8px -6px rgba(255,0,0,1);
    -moz-box-shadow: 5px 1px 8px -6px rgba(255,0,0,1);
    box-shadow: 5px 1px 8px -6px rgba(255,0,0,1);
`
const SideBarWrap = styled.div`
    width: 100%;
`

export default SideBar