import styled from 'styled-components';

export const Container = styled.div`
    z-index: 10;
    width: 100%;
    text-align: center;
    background: #fff;
    animation: scaleAnimationIn .1s;
    border-bottom: 1px solid #DADCE0;
`;

export const Buttons = styled.div`
    position: fixed;
    right: 50px;
    top: 80px;

    button {
        color: #767676;
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }

`

export const Header = styled.h1``;

export const Title = styled.div`
    padding-top: 75px;
    padding-bottom: 10px;
    color: #3C4043;
`;
