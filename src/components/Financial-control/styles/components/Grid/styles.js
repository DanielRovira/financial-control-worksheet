import styled from 'styled-components';

export const TableContent = styled.div`
    /* flex: content; */

    /* display: flex; */
    /* max-width: 95%; */
    /* align-items: center; */
    /* justify-content: center; */
    margin: 2vh 2vw 2vh 5vw;

    overflow: auto;
    /* height: 60vh; */
    background-color: white;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    padding: 0 5px;

    &::-webkit-scrollbar {
        width: 12px;
        margin-top: 20px;
    }
    &::-webkit-scrollbar-track {
        margin-top: 40px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--color1);
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: var(--color2);
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
