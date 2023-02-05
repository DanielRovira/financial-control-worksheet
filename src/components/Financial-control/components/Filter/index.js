import * as C from './styles';
import { Autocomplete, ClickAwayListener, TextField } from '@mui/material';
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import FilterListIcon from '@mui/icons-material/FilterList';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Filter = ({ type, filter, setFilter, setFilterType }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let source = (type === 'expense')
        ? [{value: false, name: lang.entry}, {value: true, name: lang.expense}]
        : Array.from(categoriesList || []).filter(item => item.type === type).sort((a, b) => a.name.localeCompare(b.name))

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
        <C.IconButton onClick={handleClick}>
            <FilterListIcon sx={{fontSize: '16px'}} />
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
        </>
    )
}
 
export default Filter;