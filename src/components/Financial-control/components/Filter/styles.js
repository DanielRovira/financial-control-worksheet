import styled from 'styled-components';
import MuiIconButton from '@mui/material/IconButton';
import MuiCard from '@mui/material/Card';

export const IconButton = styled(MuiIconButton)`
    width: 20px;
    height: 20px;

    &:hover {
        background-color: var(--color2) !important;
    }

`;

export const Card = styled(MuiCard)`
    /* display: flex; */
    width: 200px;
    /* min-height: min-content; */
    /* height: 200px; */
    padding: 5px;
    /* height: auto; */
    pointer-events: all;

    & .MuiAutocomplete-popper {
        position: relative !important;
        transform: none !important;
    }

    & .MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input {
        padding: 0;
        background-color: white;
        border-radius: 5px;
    }

    & .MuiPaper-root {
        box-shadow: none;
    }

`;
