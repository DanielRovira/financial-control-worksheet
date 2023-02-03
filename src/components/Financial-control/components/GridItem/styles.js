import styled from 'styled-components';

export const Tr = styled.tr`
    height: 30px;
    
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
        height: inherit;
        padding: 0;
        /* padding-left: 20px; */
        background-color: white;
        border-radius: 5px;
    }

    & .MuiInputBase-input, & .MuiAutocomplete-root .MuiOutlinedInput-root {
        padding-left: 5px;
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