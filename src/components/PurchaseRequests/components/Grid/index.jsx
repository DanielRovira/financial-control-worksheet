import * as G from '../../../Financial-control/components/Grid/styles';
// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Button, Checkbox  } from '@mui/material';
// const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Header = ({ purchasesData, checked, setChecked, handleEdit }) => {
    // const params = useParams();
    // const sections = JSON.parse(localStorage.getItem("sections")) || [];
    // let section = sections.filter((sec) => sec.title === params.taskTitle)[0];

    const GridItem = ({ item, index }) => {
        let tempId = item._id ? item._id : Date.now()
        
        const handleSelect = (event) => {
            checked.includes(item)
            ? item._id && setChecked(checked.filter(it => it !== item))
            : item._id && setChecked((prev) => [ ...prev, item]);
        };

        return (
            <tr>
                <td><Checkbox checked={checked?.filter((it) => it._id === item._id)[0]?._id === tempId} onChange={handleSelect} /></td>
                <td>{item.date}</td>
                <td>{item.costCenter}</td>
                <td>{item.desc}</td>
                <td>{item.creator}</td>
                <td>{item.status}</td>
                <td><Button onClick={() => handleEdit(item)} variant='text' >Editar</Button></td>
            </tr>
        )
    }

    return (
        <>
            <G.TableContent >
                <G.Table>
                    <G.Thead>
                        <G.Tr>
                            <G.Th></G.Th>
                            <G.Th>Data</G.Th>
                            <G.Th>Centro de Custo</G.Th>
                            <G.Th>Descrição</G.Th>
                            <G.Th>Solicitante</G.Th>
                            <G.Th>Status</G.Th>
                            <G.Th></G.Th>
                        </G.Tr>
                    </G.Thead>
                    <G.Tbody>
                        {Array.from(purchasesData)?.map((item, index) => (
                            <GridItem key={item._id || index} item={item} index={index}/>
                        ))}
                    </G.Tbody>
                </G.Table>
            </G.TableContent>
        </>)
}

export default Header

