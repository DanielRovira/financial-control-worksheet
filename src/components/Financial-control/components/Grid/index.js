import * as C from './styles';
import GridItem from '../GridItem';
import Filter from '../Filter';
import SavingCloud from '../SavingCloud';
import { useParams } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import { useState} from 'react';
import { CSVLink } from "react-csv";
import { FmdBadOutlined as FmdBadOutlinedIcon } from '@mui/icons-material';

const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);

document.documentElement.style.setProperty('--tableWidth', 'calc((var(--vw, 1vw) * 100) - (var(--closeSidebarWidth) * 2) - 22px)');
window.addEventListener("resize", function () {
    let tableWidth = document.getElementById('table')?.offsetWidth
    document.documentElement.style.setProperty('--tableWidth', `calc(${tableWidth}px - 12px)`);
});

const Grid = ({ rawData, updateDocument, sheetType, setUndoItem, checked, setChecked, archived, setOperationType, handleOpenSnackbar, setAdd, section, syncing }) => {
    const [filter, setFilter] = useState('');
    const [filterType, setFilterType] = useState();
    const params = useParams();

    const CSVheaders = {
        financialControl: [
                { label: lang.date, key: "date" },
                { label: lang.expense, key: "expense" },
                { label: lang.source, key: "source" },
                { label: lang.category, key: "category" },
                { label: lang.subCategory, key: "subCategory" },
                { label: lang.provider, key: "provider" },
                { label: lang.description, key: "desc" },
                { label: lang.value, key: "amount" }],
        todoPayments:[
                { label: lang.date, key: "date" },
                { label: lang.link, key: "link" },
                { label: lang.bank, key: "bank" },
                { label: lang.idnumber, key: "idnumber" },
                { label: lang.provider, key: "provider" },
                { label: lang.description, key: "desc" },
                { label: lang.value, key: "amount" }]
    }

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
    
    let itens = (params.taskTitle === 'TRASH')
        ? Array.from(filterData)
        : !archived ? Array.from(filterData.filter((item) => !item.archived)) : Array.from(filterData.filter((item) => item.archived))
    
    itens.sort(function(a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c-d;
    });

    itens.reverse()
    
    const handleSelect = (event) => {
        checked.length === itens.length
        ? setChecked([])
        : setChecked(itens);
        setOperationType()
    }

    let itensToCSV = itens.map((item) => ({
            ...item,
            amount: item.amount.toString().replace('.', ',')
        })
    )

    // useEffect(() => {
    //     setAdd(false)
    // }, [setAdd]);

    return ( 
        <C.TableContent id='table' >
            <C.Header >
                <C.Title>{lang[sheetType] || lang.home}</C.Title>
                <SavingCloud syncing={syncing} />
            </C.Header>
            {archived &&
            <C.ArchivedTitle className='archivedTitle'>
                <FmdBadOutlinedIcon color='white'/>
                <p>{lang.archived}</p>
            </C.ArchivedTitle>
        }
            <CSVLink id='exportCSV' data={itensToCSV} separator={";"} headers={CSVheaders[sheetType]} filename={`${params.taskTitle} - ${lang[sheetType]}.csv`}/>
            <C.Table>
                <C.Thead>
                    <C.Tr>
                        <C.Th alignCenter width={window.innerWidth < 500 ? 16 : 30}><Checkbox checked={checked.length === itens.length && itens.length > 0} onChange={handleSelect} indeterminate={checked.length > 0 && checked.length < itens.length} /></C.Th>
                        <C.Th alignCenter width={window.innerWidth < 500 ? 64 : 120}>{lang.date} <Filter type={'date'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                        {sheetType === 'financialControl' && 
                        <>
                        <C.Th width={window.innerWidth < 500 ? 59 : 70} alignCenter>{lang.type} <Filter type={'expense'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                        <C.Th width={140} className='Hide' >{lang.source} <Filter type={'source'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                        <C.Th width={120} className='Hide' >{lang.category} <Filter type={'category'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                        <C.Th width={150} className='Hide' >{lang.subCategory} <Filter type={'subCategory'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                        </>}
                        {sheetType === 'todoPayments' && 
                        <>
                        <C.Th width={20} alignCenter>{lang.number}</C.Th>
                        <C.Th width={window.innerWidth < 500 ? 30 : 100} alignCenter>{lang.link}</C.Th>
                        <C.Th width={170} className='Hide' >{lang.bank} <Filter type={'bank'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                        <C.Th width={160} className='Hide' >{lang.idnumber} <Filter type={'idnumber'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                        </>}
                        <C.Th width={160}  className='Hide' >{lang.provider} <Filter type={'provider'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                        <C.Th width={window.innerWidth < 500 ? 120 : 220}>{lang.description} <Filter type={'desc'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                        <C.Th width={window.innerWidth < 500 ? 80 : 130}>{lang.value} <Filter type={'amount'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} filterType={filterType} /></C.Th>
                        {params.taskTitle !== 'TRASH' && <>
                        <C.Th width={50} alignCenter className='Hide' >{lang.edit}</C.Th>
                        <C.Th width={70} alignCenter className='Hide' >{lang.expand}</C.Th>
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