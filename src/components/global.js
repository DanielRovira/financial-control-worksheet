import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', Sans-Serif;
    }

    body {
        font-family: 'Poppins', Sans-Serif;
        background-color: #f2f2f2;
    }

    .page {
        height: 98vh;
    }

    :root {
    --color1: #DEDEDE;
    --color2: #C9C9C9;

    }

`;

export default  GlobalStyle;