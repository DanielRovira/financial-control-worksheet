import styled from 'styled-components';

export const Tr = styled.tr`
    height: 50px;
`;

export const Td = styled.td`
    /* padding-top: 15px; */
    text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
    word-break: break-all;
    min-width: ${(props) => (props.width ? props.width + 'ch' : 'auto')};
    text-transform: capitalize;
    padding: ${(props) => (props.padding ? props.padding + 'px' : 'auto')};

    svg {
        width: 20px;
        height: 20px;
    }
`;