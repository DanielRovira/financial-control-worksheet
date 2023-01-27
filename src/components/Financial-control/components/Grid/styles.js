import styled from 'styled-components';

export const TableContent = styled.div`
    margin: 10px 10px 60px calc((var(--closeSidebarWidth)) + 10px);
    overflow: auto;
    background-color: white;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    padding: 0 5px;
    /* width: 93vw; */

    &::-webkit-scrollbar-track {
        margin-top: 35px;
    }

    & .MuiCheckbox-root {
        padding: 0;
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
