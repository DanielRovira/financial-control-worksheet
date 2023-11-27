import styled from 'styled-components';

export const Container = styled.div`
    z-index: 10;
    /* width: 100%; */
    width: calc(var(--vw, 1vw) * 100 - var(--closeSidebarWidth) * 2);
    /* text-align: center; */
    /* background: #fff; */
    animation: scaleAnimationIn .1s;
    /* border-bottom: 1px solid #DADCE0; */

    .leftButtons {
    left: 70px;
    height: 33px;
    }
    
    .rightButtons {
    right: 10px;
    height: 33px;
    }

    p {
        font-size: 14px;
        padding: 0 5px;
    }

    /* @media (max-width: 1300px) {
        height: 120px;
    } */

    @media (max-width: 750px) {
        .leftButtons {
        left: 10px;
        }
    }

    @media (max-width: 450px) {

        .rightButtons {
        right: 0px;
        }

        svg {
            /* height: 0.9em; */
        }
    }
    
`;


export const Buttons = styled.div`
    display: flex;
    position: fixed;
    top: 50px;

    .MuiIconButton-root {
        padding: 6px 6px;
        border-radius: 5px;
    }

    .MuiButtonBase-root.MuiIconButton-root:hover {
    background-color: rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 1300px) {
        /* top: 85px; */
    }

    @media (max-width: 1200px) {
        /* top: 85px; */

        .MuiIconButton-root p {
        display: none;
        }
    }

    @media (max-width: 450px) {
    /* top: 55px; */

    /* .MuiIconButton-root {
        padding: 6px 2px;
    } */

    }
`

export const Header = styled.h1``;

export const Title = styled.div`
    padding: 80px 0 0 5px;
    color: var(--font-color);
    font-size: 1.5rem;
`;

export const ArchivedTitle = styled.div`
    display: flex;
    justify-content: center;
    background-color: red;
    animation: scaleAnimationIn .1s;

     p {
        margin: 0;
        color: white;
        font-size: 14px;
        text-shadow: .5px .5px grey;
    }

    svg {
            height: 0.8em;
            color: white;
        }
`