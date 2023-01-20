import styled from 'styled-components';

export const Container = styled.div`
    z-index: 10;
    width: 100%;
    text-align: center;
    background: #fff;
    animation: scaleAnimationIn .1s;
    border-bottom: 1px solid #DADCE0;

    
    /* @media (max-width: 600px) {
        & .MuiButtonBase-root {
            padding: 0;
            top: -5px;
            right: -5px;
        }
    } */
    
    @media (max-width: 500px) {
        & {
            text-align: left;
            padding-left: 20px;
        }
    }
`;

export const Buttons = styled.div`
    display: flex;
    position: fixed;
    right: 30px;
    top: 65px;
    gap: 5px;

    button {
        color: #767676;
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }

    @media (max-width: 600px) {
        right: 0px;
        top: 60px;
        gap: 0px;
    }

`

export const Header = styled.h1``;

export const Title = styled.div`
    padding-top: 65px;
    /* padding-bottom: 10px; */
    color: var(--font-color);

    @media (max-width: 600px) {
        & {
            padding-top: 60px;
            padding-bottom: 0px;
        }
    }
`;
