import styled from 'styled-components';

export const Container = styled.div`
    margin: 70px 10px 0 0;
    padding: 5px 5px 10px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 95vh;
    overflow-y: auto;

    &::-webkit-scrollbar-track {
        margin-bottom: 5px;
    }
`;