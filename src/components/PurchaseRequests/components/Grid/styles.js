import styled from 'styled-components';

export const TableContent = styled.div`
    /* margin: 10px 10px 60px calc((var(--closeSidebarWidth)) + 10px); */
    /* margin: 0 5px; */
    overflow: auto;
    background-color: white;
    /* box-shadow: 0px 0px 5px #ccc; */
    box-shadow: var(--box-shadow);
    border-radius: 2px;
    /* padding: 5px; */
    /* width: 93vw; */
    z-index: 10;

    @media (max-width: 750px) {
        /* max-height: calc((var(--vh, 1vh) * 100) - 250px); */
        margin-bottom: 115px;
    }

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
    /* width: var(--tableWidth); */
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`

    @media (max-width: 650px) {
        .Hide {
                display: none;
        }
    }
`;

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

// export const Header = styled.h1`
//     margin-left: 10px;
//     display: flex;
//     flex-direction: row;
    
//     p {
//         font-size: 14px;
//         padding: 0 5px;
//     }

//     button {
//         flex-wrap: wrap;
//         padding: 0 5px;
//         align-items: end;
//         padding-bottom: 5px;
//     }

//     button svg {
//         height: 20px;
//         width: 20px;
//     }

// `;

// export const Title = styled.div`
//     /* padding: 80px 0 0 5px; */
//     color: var(--font-color);
//     font-size: 1.5rem;
//     white-space: nowrap;
// `;

// export const ArchivedTitle = styled.div`
//     display: flex;
//     justify-content: center;
//     background-color: red;
//     animation: scaleAnimationIn .1s;
//     /* margin: 0 8px; */
//     /* border-radius: 5px */

//      p {
//         margin: 0;
//         color: white;
//         font-size: 14px;
//         text-shadow: .5px .5px grey;
//     }

//     svg {
//             height: 0.8em;
//             color: white;
//         }
// `

// export const Buttons = styled.div`
//     height: min-content;

//     .MuiIconButton-root {
//         /* padding: 0 3px; */
//         border-radius: 3px;
//         /* height: 32px; */
//         border: 1px solid transparent;
//         align-items: end;
//     }

//     .MuiButtonBase-root.MuiIconButton-root:hover {
//         background-color: #F7F7F7;
//         border-color: #E5E5E5;
//     }
// `