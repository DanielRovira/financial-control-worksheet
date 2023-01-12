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

    :root {
    --color0: #F0F0F0;
    --color1: #DEDEDE;
    --color2: #C9C9C9;

    }

    @keyframes scaleAnimationIn {
        0% {
            transform: translate(0, -100%);
        }
        100% {
            transform: translate(0, 0);
        }
    }

    .FinancialWorksheet {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .Form {
        z-index: 1;
        animation: scaleAnimationIn .1s;
    }

`;

export default  GlobalStyle;