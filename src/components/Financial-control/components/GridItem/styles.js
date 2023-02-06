import styled from 'styled-components';
import CurrencyInput from 'react-currency-input-field'

export const Tr = styled.tr`
    height: 32px;
    
    &:hover {
        background-color: var(--color0);
    }

    .nohover:hover, .nohover:focus-within {
        background-color: inherit;
    }

`;

export const TdCont = styled.div`
    background-color: inherit;
    height: ${(props) => (props.expandRow ? 'auto' : '24px')};
    width: 100%;
    
    & p {
        padding-left: 5px;
        width: ${(props) => (props.expandRow ? 'none' : 'max-content')};
    }

    & .MuiInput-root, & .MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiTextField-root {
        height: inherit;
        font-family: inherit;
        letter-spacing: inherit;
        padding: 0;
        line-height: inherit;
        width: 100%;
        border-radius: 5px;
    }

    & .MuiAutocomplete-root .MuiOutlinedInput-root, & .MuiOutlinedInput-input, & .MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input {
        padding: 0;
        background-color: white;
        border-radius: 5px;
    }

    & .MuiInputBase-input, & .MuiAutocomplete-root .MuiOutlinedInput-root {
        padding: 0 3px 0 5px;
        
    }

    & .MuiMenu-paper {
    transition-duration: 0s !important;
}

`

export const Td = styled.td`
    text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
    max-width: 0;
    overflow: hidden;
    text-transform: capitalize;
    padding: 0 5px;
    /* height: 30px; */

    &:hover {
        background-color: var(--color1);
    }

    &:focus-within  {
        background-color: var(--color2);
    }
    
    svg {
        width: 20px;
        height: 20px;
    }

    svg:hover {
        transform: scale(1.1);
    }

    & + .nohover:hover {
        background-color: inherit;
    }

    & .MuiCheckbox-root {
        padding: 0;
    }

    & .MuiToggleButton-root {
        height: inherit;
        margin-top: -3px;
        border: none;
    }

`;

export const Currency = styled(CurrencyInput)`
    position: relative;
    /* outline: none; */
    border-radius: 5px;
    font-size: 16px;
    text-transform: ${(props) => (props.lowercase ? 'none' : 'capitalize')};
    /* border: none; */
    width: calc(100% - 5px);
    height: 22px;
    background-color: white;
    border: 1px solid #C4C4C4;
    padding-left: 4.2px;
    
    &:hover {
        border-color: black;
    }

    &:focus{
    outline: none;
    height: 20px;

    border: 2px solid #1976D2;
    padding-left: 3.4px;
    /* padding: 0 0 0 9px; */
}


`