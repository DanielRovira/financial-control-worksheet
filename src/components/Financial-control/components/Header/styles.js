import styled from 'styled-components';

export const Container = styled.div`
    z-index: 10;
    width: 100%;
    text-align: center;
    background: #fff;
    animation: scaleAnimationIn .1s;
    border-bottom: 1px solid #DADCE0;

    .leftButtons {
    left: 75px;
    }
    
    .rightButtons {
    right: 10px;
    }

    
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
            height: 0.9em;
        }
    }
    
`;


export const Buttons = styled.div`
    display: flex;
    position: fixed;
    top: 50px;

    .MuiIconButton-root {
        padding: 6px;
        border-radius: 5px;
    }

    @media (max-width: 450px) {
    /* top: 55px; */

    .MuiIconButton-root {
        padding: 6px 2px;

    }
    }
`

export const Header = styled.h1``;

export const Title = styled.div`
    padding-top: 50px;
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