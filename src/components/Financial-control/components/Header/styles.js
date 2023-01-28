import styled from 'styled-components';

export const Container = styled.div`
    z-index: 10;
    width: 100%;
    text-align: center;
    background: #fff;
    animation: scaleAnimationIn .1s;
    border-bottom: 1px solid #DADCE0;

    .leftButtons {
    left: 80px;
    }
    
    .rightButtons {
    right: 20px;
    }

    
    @media (max-width: 750px) {
        .leftButtons {
        left: 10px;
        }
    }
    @media (max-width: 600px) {

        .rightButtons {
        right: 0px;
        }

        svg {
            height: 0.9em;
        }
    }
    
    @media (max-width: 500px) {
        & {
            /* text-align: left; */
            /* padding-left: 20px; */
        }
    }
`;

export const Buttons = styled.div`
    display: flex;
    position: fixed;
    top: 65px;
    gap: 5px;

    @media (max-width: 600px) {
    top: 55px;
    gap: 0px;

    .MuiIconButton-root {
        padding: 8px 3px;
    }
    }
`

export const Header = styled.h1``;

export const Title = styled.div`
    padding-top: 65px;
    /* padding-bottom: 10px; */
    color: var(--font-color);

    @media (max-width: 599px) {
        & {
            padding-top: 60px;
            padding-bottom: 0px;
        }
    }
`;
