import * as G from './styles';
import { Checkbox } from '@mui/material';
import GridItem from '../GridItem'
import { useState } from 'react';

const Grid = ({ purchasesData, checked, setChecked, handleEdit }) => {
    const [checkedIndex, setCheckedIndex] = useState([]);

    const handleSelect = (event) => {
        checked.length === purchasesData.length
        ? setChecked([])
        : setChecked(purchasesData);
        setCheckedIndex([])
    }

    const handleSelectMultiple = (event) => {
        let firstItem = Math.min(...checkedIndex)
        setChecked([])
        if (firstItem < event) {
            for (let i = firstItem; i <= event; i++) {
                setChecked(prev => [...prev, purchasesData[i]])
            }  
        }
        if (firstItem > event) {
            for (let i = firstItem; i >= event; i--) {
                setChecked(prev => [...prev, purchasesData[i]])
            }  
        }
    }

    return (
        <>
            <G.TableContent >
                <G.Table>
                    <G.Thead>
                        <G.Tr>
                            <G.Th alignCenter width={window.innerWidth < 500 ? 16 : 30}><Checkbox checked={checked.length === purchasesData.length && purchasesData.length > 0} onChange={handleSelect} indeterminate={checked.length > 0 && checked.length < purchasesData.length} /></G.Th>
                            <G.Th width={25} alignCenter>N°</G.Th>
                            <G.Th width={120} alignCenter>Data</G.Th>
                            <G.Th width={145}>Centro de Custo</G.Th>
                            <G.Th width={100}>Solicitante</G.Th>
                            <G.Th width={250}>Descrição</G.Th>
                            <G.Th width={50}>Status</G.Th>
                            <G.Th width={50} alignCenter>Editar</G.Th>
                        </G.Tr>
                    </G.Thead>
                    <G.Tbody>
                        {Array.from(purchasesData)?.map((item, index) => (
                            <GridItem key={item._id || index} item={item} index={index} checked={checked} setChecked={setChecked} handleEdit={handleEdit} handleSelectMultiple={handleSelectMultiple} setCheckedIndex={setCheckedIndex} />
                        ))}
                    </G.Tbody>
                </G.Table>
            </G.TableContent>
        </>
    )
}

export default Grid

