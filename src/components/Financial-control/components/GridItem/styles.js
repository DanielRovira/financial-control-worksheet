import styled from 'styled-components';

export const Tr = styled.tr`
    height: 30px;
    
    &:hover {
        background-color: var(--color0);
    }
`;

export const TdCont = styled.div`
    height: inherit;
    padding-left: 5px;
    background-color: inherit;

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
    padding: 0 5px;

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
`;