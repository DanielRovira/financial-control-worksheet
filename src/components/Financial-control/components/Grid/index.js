import * as C from './styles';
import GridItem from '../GridItem';
import Filter from '../Filter';
import { useParams } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import { useState } from 'react';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Grid = ({ rawData, updateDocument, sheetType, setUndoItem, checked, setChecked, archived, setOperationType, handleOpenSnackbar }) => {
    const [filter, setFilter] = useState('');
    const [filterType, setFilterType] = useState();
    const params = useParams();

    let filterData
    if (filter === '') {
        filterData = rawData
    }

    else {
        if (filterType === 'date') {
            filterData = rawData?.filter((item) => `${item[filterType].slice(-2)}/${item[filterType].slice(5,-3)}/${item[filterType].slice(0,-6)}`.includes(filter))
        }
        else if (filterType === 'expense') {
            filterData = rawData?.filter((item) => item[filterType] === (filter === lang.expense ? true : filter === lang.entry ? false : null))
        }
        else if (filterType === 'amount') {
            filterData = rawData?.filter((item) => item[filterType].toString().includes(Number(filter?.replace(/,/g, '.'))))
        }
        else {
            filterData = rawData?.filter((item) => item[filterType]?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(filter?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()))
        }
    }
    
    let itens = params.taskTitle === 'TRASH'
        ? Array.from(filterData)
        : !archived ? Array.from(filterData.filter((item) => !item.archived)) : Array.from(filterData.filter((item) => item.archived))
    
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
                    <C.Th alignCenter width={120}>{lang.date} <Filter type={'date'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                    {sheetType === 'financialControl' && 
                    <>
                    <C.Th width={70} alignCenter>{lang.type} <Filter type={'expense'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                    <C.Th width={140} >{lang.source} <Filter type={'source'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                    <C.Th width={120} >{lang.category} <Filter type={'category'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                    <C.Th width={150} >{lang.subCategory} <Filter type={'subCategory'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                    </>}
                    {sheetType === 'todoPayments' && 
                    <>
                    <C.Th width={20} alignCenter>{lang.number}</C.Th>
                    <C.Th width={100} alignCenter>{lang.link}</C.Th>
                    <C.Th width={170}>{lang.bank} <Filter type={'bank'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                    <C.Th width={160}>{lang.idnumber} <Filter type={'idnumber'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                    </>}
                    <C.Th width={160}>{lang.provider} <Filter type={'provider'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                    <C.Th width={220}>{lang.description} <Filter type={'desc'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                    <C.Th width={130}>{lang.value} <Filter type={'amount'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                    {params.taskTitle !== 'TRASH' && <>
                    <C.Th width={50} alignCenter>{lang.edit}</C.Th>
                    <C.Th width={70} alignCenter>{lang.expand}</C.Th>
                    </>}
                    {params.taskTitle === 'TRASH' && <C.Th width={160} alignCenter>{lang.sections} <Filter type={'costCenter'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>}
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