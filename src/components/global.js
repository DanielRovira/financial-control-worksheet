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
    --color1: #DEDEDE;
    --color2: #C9C9C9;
    --font-color: #3C4043;
    --closeSidebarWidth: 60px;
    --navbar-color: #1976d2;
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
    
    h1, h2, img, span {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }

    h1 {
        @media (max-width: 600px) {
            font-size: 1.6em;
        }
        @media (max-width: 350px) {
            font-size: 1.4em;
        }
    }
    
    .MuiTooltip-popper {
        padding: 0 6px;
        letter-spacing: 1px;
    }

    .FinancialWorksheet, .App {
        display: flex;
        flex-direction: column;
        height: 100vh;
        height: calc(var(--vh, 1vh) * 99);
        max-height: 100%;
        overflow: hidden;
    }

    .MuiButtonBase-root.MuiMenuItem-root {
        line-height: inherit;
        letter-spacing: inherit;
        padding: 7px 18px;
    }

`;

export default  GlobalStyle;