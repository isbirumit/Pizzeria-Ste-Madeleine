import { createGlobalStyle } from "styled-components";

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
        background-color: #f7efdf;
    }
`