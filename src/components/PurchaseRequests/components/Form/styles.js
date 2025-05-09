import styled, { css } from 'styled-components';
import CurrencyInput from 'react-currency-input-field'
import InputMui from '@mui/material/Input';
import ButtonMui from '@mui/material/Button';
// import MuiTextField from '@mui/material/TextField';

export const Form = styled.div`
    position: fixed;
    top: 15%;
    left: 50%;
    transform: translate(-50%);
    /* margin: auto; */
    z-index: 15;
    animation: formAnim .1s;
    /* width: calc(100vw - var(--closeSidebarWidth) - 10px); */
    max-height: calc(100vh - 100px);
    min-width: 60%0px;
    width:  60%;
    box-shadow: 0 24px 54px rgba(0,0,0,.15), 0 4.5px 13.5px rgba(0,0,0,.08);
    border-radius: 5px;
    /* overflow: hidden; */
    overflow: auto;
    background-color: #fff;

    @media (max-width: 1100px) {
        min-width: 650px;
        width:  650px;
    }
    @media (max-width: 650px) {
        min-width: calc(100vw - 10px);
        width: calc(100vw - 10px);
        /* margin: 2px; */
    }
    @media (max-width: 600px) {
        top: 100px;
    }

    @keyframes formAnim {
        0% {
            transform: translate(-50%, -50%);
        }
        100% {
            transform: translate(-50%, 0);
        }
    }
`

export const Container = styled.div`
    z-index: 1;
    display: flex;
    justify-content: space-between;
    padding: 5px 5px;
    gap: 10px;

    & .MuiInputBase-root {
        min-width: 50px;
    }

    & .small div {
        padding: 0;
    }
    & .small input, & .small textarea {
        padding: 3px 5px;
    }
/* 
    th, td {
        padding: 0 5px;
    } */
`;

export const UpperContainer = styled(Container)`
    @media (max-width: 600px) {
        flex-direction: column;
    }
`

export const Title = styled.h2`
    /* text-align: center; */
    color: var(--font-color);
    font-size: 1.5rem;

    @media (max-width: 600px) {
        width:100%;
        text-align: center;
    }
`;

export const InputContent = styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.width ? props.width : 'auto')};
    min-width: 200px;

    @media (max-width: 600px) {
        width: 100%;
    }
    
`;

export const Inputs = css`
    outline: none;
    border-radius: 5px;
    font-size: 16px;
    text-transform: ${(props) => (props.lowercase ? 'none' : 'capitalize')};
    border: none;
    width: 100%;
    height: 100%;
    background-color: white;
`;

export const Input = styled(InputMui)`${Inputs}`
// export const TextField = styled(MuiTextField)`${Inputs}`
export const Select = styled.select`${Inputs}`
export const Currency = styled(CurrencyInput)`${Inputs}`

// export const Button = styled.button`
//     padding: 5px 10px;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     color: white;
//     background-color: teal;
// `;
export const Button = styled(ButtonMui)`
    max-height: 36.5px;
`;

export const Th = styled.th`
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        min-width: 30px;
    }
`;

