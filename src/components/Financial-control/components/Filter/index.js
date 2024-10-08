import * as C from './styles';
import { Autocomplete, ClickAwayListener, TextField } from '@mui/material';
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';

const Filter = ({ type, filter, setFilter, setFilterType, filterType }) => {
    const language = useAtomValue(languageAtom);
    const lang = require(`components/Languages/${language}.json`);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let source
    if (type === 'expense') {
        source = [{value: false, name: lang.entry}, {value: true, name: lang.expense}]
    }
    else if (type === 'costCenter') {
        source = sections.filter(section => section.title !== 'TRASH')
    }
    else {
        source = Array.from(categoriesList || []).filter(item => item.type === type).sort((a, b) => a.name.localeCompare(b.name))
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setTimeout(() => {  
            document.querySelector('.selectedFilter').querySelector('input')?.focus()
        }, 300);
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
        <C.IconButton onClick={handleClick} sx={{backgroundColor: (filterType === type && filter !== '') ? 'var(--color1)' : 'auto'}}>
            {filterType === type && filter !== ''
                ? <FilterAltIcon sx={{fontSize: '16px'}} />
                : <FilterListIcon sx={{fontSize: '16px'}} />
            }
        </C.IconButton>
        <Popover
            // id={id}
            open={open}
            style={{pointerEvents: 'none'}}
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
            <ClickAwayListener onClickAway={handleClose}>
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
            </ClickAwayListener>
        </Popover>
    </>)
}
 
export default Filter;