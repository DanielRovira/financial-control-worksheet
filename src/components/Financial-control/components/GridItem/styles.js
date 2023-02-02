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
    padding-left: 5px;
    background-color: inherit;
    height: ${(props) => (props.expandRow ? 'auto' : '24px')};

    input {
        margin-left: -5px;
        padding-left: 5px;
    }

    & .MuiInput-root{
        font-family: inherit;
        letter-spacing: inherit;
        padding: 0;
        line-height: inherit;
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