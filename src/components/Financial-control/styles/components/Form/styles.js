import styled, { css } from 'styled-components';
import CurrencyInput from 'react-currency-input-field'

export const Container = styled.div`
    max-width: 90%;
    margin: 20px auto auto 100px;
    width: 98%;
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
    /* border-radius: 5px; */
    /* margin-top: 5px; */
    /* padding: 5px; */
    font-size: 16px;
    /* border: 1px solid #ccc; */
    text-transform: capitalize;
    /* max-width: 150px; */
    /* width: ${(props) => (props.width ? props.width + 'px' : 'auto')}; */
    border: none;
    width: 100%;
    height: 100%;
`;

export const Input = styled.input`${Inputs}`
export const Select = styled.select`${Inputs}`
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
