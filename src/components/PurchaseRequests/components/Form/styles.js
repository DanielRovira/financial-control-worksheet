import styled, { css } from 'styled-components';
import CurrencyInput from 'react-currency-input-field'
import InputMui from '@mui/material/Input';
// import MuiTextField from '@mui/material/TextField';

export const Form = styled.div`
    position: fixed;
    top: 15%;
    left: 50%;
    transform: translate(-50%);
    /* margin: auto; */
    z-index: 15;
    /* animation: scaleAnimationIn .1s; */
    /* width: calc(100vw - var(--closeSidebarWidth) - 10px); */
    min-width: 50%;
    box-shadow: 0 24px 54px rgba(0,0,0,.15), 0 4.5px 13.5px rgba(0,0,0,.08);
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
`

export const Container = styled.div`
    z-index: 1;
    display: flex;
    justify-content: space-between;
    padding: 5px 5px;
    gap: 10px;

    & .MuiInputBase-root {
        min-width: 140px;
    }

    th, td {
        padding: 0 5px;
    }
`;

export const Title = styled.h2`
    /* text-align: center; */
    color: var(--font-color);
    font-size: 1.5rem;
`;

export const InputContent = styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.width ? props.width : 'auto')};
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

export const Button = styled.button`
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    background-color: teal;
`;

