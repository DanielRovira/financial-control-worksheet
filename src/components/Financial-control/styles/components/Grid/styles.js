import styled from 'styled-components';

export const TableContent = styled.div`
    width: 95%;
`;

export const Table = styled.table`
    /* width: 100%; */
    background-color: #fff;
    padding: 10px 0;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 94%;
    margin: 20px auto auto 100px;
    table-layout:fixed;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    padding: 0 5px;
    border-bottom: inset;
    padding-bottom: 5px;
    text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
    max-width: ${(props) => (props.width ? props.width + 'px' : 'auto')};
    min-width: ${(props) => (props.width ? props.width + 'px' : 'auto')};
    width: ${(props) => (props.width ? props.width + 'px' : 'auto')};
`;
