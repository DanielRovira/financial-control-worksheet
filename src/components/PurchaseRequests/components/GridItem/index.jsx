import * as G from './styles';
import { Button, Checkbox  } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';

const GridItem = ({ item, index, checked, setChecked, handleEdit }) => {
    let tempId = item._id ? item._id : Date.now()
    
    const handleSelect = () => {
        checked.includes(item)
        ? item._id && setChecked(checked.filter(it => it !== item))
        : item._id && setChecked((prev) => [ ...prev, item]);
    };

    return (
        <G.Tr>
            <G.Td alignCenter className='nohover'><Checkbox checked={checked?.filter((it) => it._id === item._id)[0]?._id === tempId} onChange={handleSelect} /></G.Td>
            <G.Td alignCenter><G.TdCont>{index+1}</G.TdCont></G.Td>
            <G.Td alignCenter><G.TdCont>{item.date.slice(-2)}/{item.date.slice(5,-3)}/{item.date.slice(0,-6)}</G.TdCont></G.Td>
            <G.Td><G.TdCont>{item.costCenter}</G.TdCont></G.Td>
            <G.Td><G.TdCont>{item.creator}</G.TdCont></G.Td>
            <G.Td><G.TdCont>{item.desc}</G.TdCont></G.Td>
            <G.Td><G.TdCont>{item.status}</G.TdCont></G.Td>
            <G.Td alignCenter className='nohover editButton'><Button onClick={() => handleEdit(item)} variant='text' ><EditNoteIcon /></Button></G.Td>
        </G.Tr>
    )
}

export default GridItem