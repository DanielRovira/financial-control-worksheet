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

    &::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--color1);
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: var(--color2);
    }

    :root {
    --color0: #F0F0F0;
    --color1: #DEDEDE;
    --color2: #C9C9C9;
    --font-color: #3C4043;
    --closeSidebarWidth: 65px;
    }

    @media (max-width: 750px) {
        :root{
        --closeSidebarWidth: 0px;
        }
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
        height: calc(var(--vh, 1vh) * 99);
        max-height: 100%;
        overflow: hidden;
    }

`;

export default  GlobalStyle;