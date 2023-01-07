import styled from 'styled-components';

export const Table = styled.table`
    width: 98%;
    background-color: #fff;
    padding: 10px 0;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 94%;
    margin: 10px auto auto 80px;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    border-bottom: inset;
    padding-bottom: 5px;
    text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
    width: ${(props) => (props.width ? props.width + 'px' : '10px')};
`;
