import styled, { css } from 'styled-components';
import CurrencyInput from 'react-currency-input-field'

export const Container = styled.div`
    z-index: 1;
    margin: 10px 20px 0 80px;
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    padding: 15px 0;
    gap: 10px;

    @media (max-width: 1400px) {
        display: grid;
        grid: repeat(2, auto) / auto-flow;
    }
    @media (max-width: 850px) {
        display: grid;
        grid: repeat(3, auto) / auto-flow;
    }
    @media (max-width: 650px) {
        display: grid;
        grid: none
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
    text-transform: capitalize;
    border: none;
    width: 100%;
    height: 100%;
`;

export const Input = styled.input`${Inputs}`
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

