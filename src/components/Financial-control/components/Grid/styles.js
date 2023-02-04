import styled from 'styled-components';
import MuiIconButton from '@mui/material/IconButton';
import MuiCard from '@mui/material/Card';
import MuiList from '@mui/material/List';

export const TableContent = styled.div`
    margin: 10px 10px 60px calc((var(--closeSidebarWidth)) + 10px);
    overflow: auto;
    background-color: white;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    padding: 5px;
    /* width: 93vw; */

    &::-webkit-scrollbar-track {
        margin-top: 35px;
    }

    & .MuiCheckbox-root {
        padding: 0;
        margin-bottom: 2px;
    }

`;

export const Table = styled.table`
    width: 100%;
    table-layout:fixed;
    border-spacing: 0;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    background-color: white;
    padding: 5px 5px;
    border-bottom: inset;
    padding-bottom: 5px;
    text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
    max-width: ${(props) => (props.width ? props.width + 'px' : 'auto')};
    min-width: ${(props) => (props.width ? props.width + 'px' : 'auto')};
    width: ${(props) => (props.width ? props.width + 'px' : 'auto')};
    position: sticky;
    top: 0;
    z-index: 1;
`;

export const IconButton = styled(MuiIconButton)`
    width: 10px;

    &:hover {
        background-color: inherit !important;
    }

`;

export const Card = styled(MuiCard)`
    /* display: flex; */
    width: 200px;
    /* min-height: min-content; */
    /* height: 200px; */
    padding: 5px;
    /* height: auto; */

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

export const List  = styled(MuiList)`
    /* width: 200px;
    height: 200px; */
`;