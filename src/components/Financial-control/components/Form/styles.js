import styled, { css } from 'styled-components';
import CurrencyInput from 'react-currency-input-field'
import InputMui from '@mui/material/Input';
// import MuiTextField from '@mui/material/TextField';

export const Form = styled.div`
    z-index: 1;
    animation: scaleAnimationIn .1s;
`

export const Container = styled.div`
    z-index: 1;
    margin: 0 5px;
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    padding: 8px 0;
    gap: 10px;

    & .MuiInputBase-root {
        width: 140px;
    }

    @media (max-width: 1400px) {
        display: grid;
        grid: repeat(2, auto) / auto-flow;
        gap: 15px;

        & .MuiInputBase-root {
        width: 17vw;
        }

    }
    @media (max-width: 850px) {
        display: grid;
        grid: repeat(3, auto) / auto-flow;

        & .MuiInputBase-root {
        width: 27vw;
        }

    }
    @media (max-width: 500px) {
        display: grid;
        grid: none;

        & .MuiInputBase-root {
        width: 80vw;
        }
    }
`;

export const InputContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label``;

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

