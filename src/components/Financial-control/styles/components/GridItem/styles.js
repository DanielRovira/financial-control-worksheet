import styled from 'styled-components';

export const Tr = styled.tr`
    height: 30px;
`;

export const TdCont = styled.div`
    height: inherit;
    padding-left: 5px;

    input {
        margin-left: -5px;
        padding-left: 5px;
    }
`

export const Td = styled.td`
    /* padding-top: 15px; */
    text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
    /* word-break: break-all; */
    /* max-width: ${(props) => (props.width ? props.width + 'ch' : 'auto')}; */
    max-width: 0;
    overflow: hidden;
    text-transform: capitalize;
    /* height: inherit; */
    padding: 5px 5px;
    
    svg {
        width: 20px;
        height: 20px;
    }
`;