import * as C from './styles';
import GridItem from '../GridItem';
import { useParams } from 'react-router-dom';
import { Checkbox, Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import FilterListIcon from '@mui/icons-material/FilterList';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);

const FilterButton = ({ type, filter, setFilter, setFilterType }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let source = (type === 'expense')
        ? [{value: false, name: lang.entry}, {value: true, name: lang.expense}]
        : Array.from(categoriesList || []).filter(item => item.type === type).sort((a, b) => a.name.localeCompare(b.name))

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setTimeout(() => {  
            document.querySelector('.selectedFilter').querySelector('input')?.focus()
        }, 150);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleFilter = (item) => {
        // setFilter(prev => [...prev, item])
        // (type === 'expense') ? setFilter(true) :
        setFilter(item);
        setFilterType(type);
      };

    return (<>
        <C.IconButton onClick={handleClick}>
            <FilterListIcon sx={{fontSize: '16px'}} />
        </C.IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
            >
                <C.Card className='selectedFilter'>
                    <Autocomplete 
                        freeSolo
                        openOnFocus
                        disableCloseOnSelect
                        disablePortal
                        popupIcon={null}
                        open={true}
                        // onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        options={source.map((options) => options.name)}
                        inputValue={filter || ''}
                        onInputChange={(event, value) => handleFilter(value)}
                        renderInput={(params) => (
                            <TextField 
                            {...params}
                            placeholder={`${lang.filter}`}
                            />)}
                    />
                </C.Card>
            </Popover>
        </>
    )
}

const Grid = ({ rawData, updateDocument, sheetType, setUndoItem, checked, setChecked, archived, setOperationType, handleOpenSnackbar }) => {
    const [filter, setFilter] = useState('');
    const [filterType, setFilterType] = useState();
    const params = useParams();
    const filterData = (filter === '')
        ? rawData
        : (filterType === 'expense')
            ? rawData?.filter((item) => item[filterType] === (filter === lang.expense ? true : filter === lang.entry ? false : null))
            : rawData?.filter((item) => item[filterType] === filter)
    
        let itens = params.taskTitle === 'TRASH'
        ? Array.from(rawData)
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
                    <C.Th alignCenter width={120}><div style={{width: '100px'}}>{lang.date}</div></C.Th>
                    {sheetType === 'financialControl' && 
                    <>
                    <C.Th width={90} alignCenter>{lang.type} <FilterButton type={'expense'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} /></C.Th>
                    <C.Th width={140} >{lang.source} <FilterButton type={'source'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} /></C.Th>
                    <C.Th width={130} >{lang.category} <FilterButton type={'category'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} /></C.Th>
                    <C.Th width={150} >{lang.subCategory} <FilterButton type={'subCategory'} filter={filter} setFilter={setFilter} setFilterType={setFilterType} /></C.Th>
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