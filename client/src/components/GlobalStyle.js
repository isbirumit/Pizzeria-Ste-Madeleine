import { createGlobalStyle } from "styled-components";
import BG from "../public/bg.jpg";


export default createGlobalStyle`
        *,
    *::before,
    *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style-type: none;
    }
    body{
        background-color:hsl(0,0%,93%);
        
    }
`