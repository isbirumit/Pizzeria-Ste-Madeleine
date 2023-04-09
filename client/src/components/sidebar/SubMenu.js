import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"




const SubMenu = ({item,showSideBar}) => {
    const [subnav, setSubnav] = useState(false)
    const showSubnav = () => setSubnav(!subnav)

    return (
        <>
            <SideBarLink to={item.path} onClick={item.subNav && showSubnav}>
                <SideBarDiv>
                    {item.icon}
                    <SideBarLabel>{item.title}</SideBarLabel>
                </SideBarDiv>
                <div >
                    {item.subNav && subnav
                    ? item.iconOpened
                    : item.subNav
                    ? item.iconClosed
                    : null}
                </div>
            </SideBarLink>
            {subnav &&
                item.subNav.map((item, index) => {
                    return (
                    <DropdownLink  to={item.path} onClick={showSideBar} key={index}>
                        {item.icon}
                        <SideBarLabelSub>{item.title}</SideBarLabelSub>
                    </DropdownLink>
          );
        })}
        </>
    )
}

const SideBarLink = styled(Link)`
    display: flex;

    font-weight: bold;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    text-decoration: none;
    font-size: 18px;
    transition: 260ms;
    border-bottom-left-radius: 10%;
    border-top-right-radius: 10%;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    &:hover {
        background-color: white;
        color: red;
        cursor: pointer;
    }
`

const SideBarDiv = styled.div`
    font-size:150%;
`
const SideBarLabel = styled.span`
    color:black;
    font-family: 'Open Sans', sans-serif;
    margin-left: 16px;
`;
const SideBarLabelSub = styled.span`
    margin-left : 10px;
    font-size: 120%;
`

const DropdownLink = styled(Link)`
    background: white;
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    border-bottom: 1px solid black;
    color: black;
    /* color: #b17200; */
    font-size: 18px;
    font-family: 'Open Sans', sans-serif;
    transition:250ms;
    &:hover {
        color: hsl(28,53%,55%);
        background-color: hsl(0,0%,93%);
        /* background: hsl(28,53%,55%); */
        cursor: pointer;
    }
`;
export default SubMenu