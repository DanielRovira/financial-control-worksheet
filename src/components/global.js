import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', Sans-Serif;
    }

    html {
        overflow: hidden;
    }

    body {
        font-family: 'Poppins', Sans-Serif;
        background-color: #f2f2f2;
        touch-action: none;
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
    --color0-5: #E6E6E6;
    --color1: #DEDEDE;
    --color2: #C9C9C9;
    --font-color: #3C4043;
    --sidebarWidth: 210px;
    --closeSidebarWidth: 45px;
    --navbar-color: #106EBE;
    --selected-sidebar: #CFE4FA;
    --box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14);
    }

    @media (max-width: 750px) {
        :root{
        --closeSidebarWidth: 0px;
        }
    }

    @keyframes scaleAnimationIn {
        0% {
            transform: translate(0, -50%);
        }
        100% {
            transform: translate(0, 0);
        }
    }
    
    h1, h2, img, span {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }

    /* h1 {
        @media (max-width: 450px) {
            font-size: 1.6em;
        }
    } */
    
    .MuiTooltip-popper {
        padding: 0 6px;
        letter-spacing: 1px;
    }

    .App {
        display: flex;
        flex-direction: row;
        height: 100vh;
        width: 100vw;
        /* height: calc(var(--vh, 1vh) * 99.8); */
        /* width: calc(var(--vw, 1vw) * 99.8); */
        max-height: 100%;
        overflow: hidden;

    }

    .FinancialWorksheet {
        display: flex;
        flex-direction: column;
        /* height: 100vh; */
        /* height: calc(var(--vh, 1vh) * 99); */
        /* width: calc(var(--vw, 1vw) * 100 - var(--closeSidebarWidth) * 2); */
        /* max-height: 100%; */
        overflow: hidden;
        /* margin-right: 5px; */
        gap: 5px;
        width: inherit;
        /* height: inherit; */
        padding-right: 5px;
    }

    .FinancialWorksheet .MuiLinearProgress-root {
        margin: 0 2px;
        border-radius: 5px;
    }

`;

export default  GlobalStyle;