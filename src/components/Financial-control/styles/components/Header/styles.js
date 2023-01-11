import styled from 'styled-components';

export const Container = styled.div`
    z-index: 10;
    /* margin: 5px; */
    /* position: absolute; */
    /* display: flex; */
    width: 100%;
    /* height: 170px; */
    text-align: center;
    background: teal;

`;

export const Buttons = styled.div`
    position: fixed;
    right: 50px;
    top: 80px;

    button {
        color: white;
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
`

export const Header = styled.h1``;

export const Title = styled.div`
    padding-top: 75px;
    padding-bottom: 10px;
    color: #fff;
`;
