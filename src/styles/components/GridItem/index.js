import React from 'react';
import * as C from './styles'
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const GridItem = ({ item, onDelete }) => {
    const history = useNavigate();

    const handleItemDetailsClick = () => {
        window.description = item.desc;
        history(`/${item.id}`);
    }

    return (
        <C.Tr>
            <C.Td width={9}>{item.date.slice(-2)}-{item.date.slice(5,-3)}-{item.date.slice(0,-6)}</C.Td>
            <C.Td alignCenter>
                {item.expense ? (
                    <FaRegArrowAltCircleDown color="red" />
                    ) : (
                        <FaRegArrowAltCircleUp color="green" />
                        )
                    }
            </C.Td>
            <C.Td>{item.prov}</C.Td>
            <C.Td>{item.forn}</C.Td>
            <C.Td>{item.desc}</C.Td>
            <C.Td>{Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</C.Td>
            <C.Td alignCenter>
                {/* <FaTrash onClick={() => onDelete(item.id)} /> */}
                <FaTrash onClick={handleItemDetailsClick} />
            </C.Td>
        </C.Tr>
    );
};

export default GridItem;