import styled from 'styled-components';

export const Container = styled.div`
    z-index: 10;
    /* width: 100%; */
    /* width: calc(var(--vw, 1vw) * 100 - var(--closeSidebarWidth) * 2); */
    /* text-align: center; */
    background: #fff;
    /* animation: scaleAnimationIn .1s; */
    /* border-bottom: 1px solid #DADCE0; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* margin: 0 5px; */
    border-radius: 2px;
    /* box-shadow: 0px 0px 5px #ccc; */
    box-shadow: var(--box-shadow);
    padding: 0 5px;
    min-height: 38px;
    overflow: hidden;

    .leftButtons {
    left: 70px;
    /* height: 33px; */
    }
    
    .rightButtons {
    right: 10px;
    /* height: 33px; */
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
    /* position: fixed; */
    /* top: 50px; */
    gap: 2px;
    align-items: center;

    .MuiIconButton-root {
        padding: 0 3px;
        border-radius: 3px;
        height: 32px;
        border: 1px solid transparent;
    }

    .MuiButtonBase-root.MuiIconButton-root:hover {
        background-color: #F7F7F7;
        border-color: #E5E5E5;
    }

    @media (max-width: 1300px) {
        /* top: 85px; */
    }

    @media (max-width: 750px) {
        /* top: 85px; */
        /* gap: 15px; */

        .MuiIconButton-root {
            width: 40px;
        }

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

export const Header = styled.h1`
    margin: 55px 5px 0 5px;

    button {
        padding: 5px 15px;
        display: none;
        transition: .3s ease;

        @media (max-width: 750px) {
        display: inherit;
        }
    }


`;

export const Title = styled.div`
    /* padding: 80px 0 0 5px; */
    color: var(--font-color);
    font-size: 1.5rem;
`;

export const ArchivedTitle = styled.div`
    display: flex;
    justify-content: center;
    background-color: red;
    animation: scaleAnimationIn .1s;
    margin: 0 8px;
    /* border-radius: 5px */

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