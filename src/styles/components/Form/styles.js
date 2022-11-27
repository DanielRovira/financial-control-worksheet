import styled, { css } from "styled-components";
import CurrencyInput from "react-currency-input-field"

export const Container = styled.div`
    max-width: 90%;
    margin: 20px auto;
    width: 98%;
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    padding: 15px 0;
    gap: 10px;

    @media (max-width: 750px) {
        display: grid;
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
    margin-top: 5px;
    padding: 5px 10px;
    font-size: 15px;
    border: 1px solid #ccc;
    text-transform: capitalize;
`;

export const Input = styled.input`${Inputs}`
export const Currency = styled(CurrencyInput)`${Inputs}`

export const RadioGroup = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */

    input {
        accent-color: black;
        margin-right: 5px;
    }
`;

export const Button = styled.button`
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    background-color: teal;
`;

export const RadioContent = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 13px;
`