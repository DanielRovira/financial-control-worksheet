import * as C from './styles';
import GridItem from '../GridItem';
import { useParams } from 'react-router-dom';
import { Checkbox } from '@mui/material';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Grid = ({ rawData, updateDocument, sheetType, setUndoItem, checked, setChecked, filter, setOperationType, handleOpenSnackbar }) => {
    const params = useParams();

    let itens = params.taskTitle === 'TRASH'
        ? Array.from(rawData)
        : !filter ? Array.from(rawData.filter((item) => !item.archived)) : Array.from(rawData.filter((item) => item.archived))
    itens.sort(function(a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c-d;
    });

    const handleSelect = (event) => {
        checked.length === itens.length
        ? setChecked([])
        : setChecked(itens);
        setOperationType()
    }

    return ( 
        <C.TableContent>
        <C.Table>
            <C.Thead>
                <C.Tr>
                    <C.Th alignCenter width={30}><Checkbox checked={checked.length === itens.length && itens.length > 0} onChange={handleSelect} indeterminate={checked.length > 0 && checked.length < itens.length} /></C.Th>
                    <C.Th alignCenter width={120}><div style={{width: '100px'}}>{lang.date}</div></C.Th>
                    {sheetType === 'financialControl' && 
                    <>
                    <C.Th width={90} alignCenter>{lang.type}</C.Th>
                    <C.Th width={120} alignCenter>{lang.source}</C.Th>
                    <C.Th width={130} alignCenter>{lang.category}</C.Th>
                    <C.Th width={130} >{lang.subCategory}</C.Th>
                    </>}
                    {sheetType === 'todoPayments' && 
                    <>
                    <C.Th width={20} alignCenter>{lang.number}</C.Th>
                    <C.Th width={100} alignCenter>{lang.link}</C.Th>
                    <C.Th width={140}>{lang.bank}</C.Th>
                    <C.Th width={160} alignCenter>{lang.idnumber}</C.Th>
                    </>}
                    <C.Th width={200}>{lang.provider}</C.Th>
                    <C.Th width={250}>{lang.description}</C.Th>
                    <C.Th width={130}>{lang.value}</C.Th>
                    {params.taskTitle !== 'TRASH' && <>
                    <C.Th width={50} alignCenter>{lang.edit}</C.Th>
                    <C.Th width={70} alignCenter>{lang.expand}</C.Th>
                    </>}
                    {params.taskTitle === 'TRASH' && <C.Th width={130} alignCenter>{lang.sections}</C.Th>}
                </C.Tr>
            </C.Thead>
            <C.Tbody>
                {Array.from(itens)?.map((item, index) => (
                    <GridItem key={item._id || index} item={item} index={index} updateDocument={updateDocument} sheetType={sheetType} rawData={rawData} setUndoItem={setUndoItem} checked={checked} setChecked={setChecked} setOperationType={setOperationType} filter={filter} handleOpenSnackbar={handleOpenSnackbar} />
                ))}
            </C.Tbody>
        </C.Table>
        </C.TableContent>
     );
};
 
export default Grid;