import './styles.js'
import * as C from './styles';
// import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Divider, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add as AddIcon,
    RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Form = ({ editItem, setEditItem, setAdd, sections, insertDocument, updateDocument }) => {
    // const params = useParams();
    const toDay = dateToTimezone().toISOString().substring(0, 10)
    function dateToTimezone() {
        let rawDate = new Date()
        rawDate.setHours(rawDate.getHours() - 3)
        return rawDate
    }
    
    const [date]  = useState(editItem ? editItem.date : toDay);
    const [costCenter, setCostCenter]  = useState(editItem ? editItem.costCenter : '');
    const [desc, setDesc]  = useState(editItem ? editItem.desc : '');

    const data = [
        {
            description: "",
            unit: "",
            quantity: "",
        },
    ];

    const [items, setItems]  = useState(editItem ? editItem.data : data)

    const handleSave = () => {
        if (!desc || !costCenter) {
            alert(lang.alert04);
            return;
        }

        const transaction = {
            _id: editItem?._id || null,
            date: date,
            costCenter: costCenter,
            desc: desc,
            data: data,
        }

        editItem ? updateDocument(transaction) : insertDocument(transaction)
        setAdd(false)
        setEditItem()
    };

    const handleAdd = () => {
        setItems([...data, {description: "",unit: "",quantity: "",}])
    }
    
    const handleRemove = (index) => {
        if (items.length > 1) {
            setItems(data.toSpliced(index, 1))
        }
    }

    const TableRow = ({ index, key, item }) => {
        const [itemDesc, setItemDesc]  = useState(item.description);
        const [itemUnit, setItemUnit]  = useState(item.unit);
        const [itemQuantity, setItemQuantity]  = useState(item.quantity);

        const itemData = 
        {
            description: itemDesc,
            unit: itemUnit,
            quantity: itemQuantity,
        }

        useEffect(() => {
            data[index] = itemData
        }, [itemDesc, itemUnit, itemQuantity]); // eslint-disable-line react-hooks/exhaustive-deps

        return (
        <tr>
            <td>{index+1}</td>
            <td>
                <TextField
                    multiline
                    className='small'
                    sx={{width: "100%"}}
                    value={itemDesc}
                    onChange={(e) => {setItemDesc(e.target.value)}}
                    onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                    size="small"
                    />
            </td>
            <td>
                <TextField
                    className='small'
                    sx={{width: "100%"}}
                    value={itemUnit}
                    onChange={(e) => setItemUnit(e.target.value)}
                    onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                    size="small"
                    />
            </td>
            <td>
                <TextField
                    className='small'
                    sx={{width: "100%"}}
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                    onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                    size="small"
                    />
            </td>
            <div>
                <C.Button sx={{minWidth:'100%'}} onClick={() => handleRemove(index)} variant='text' ><RemoveCircleIcon/></C.Button>
            </div>
        </tr>
        )
    }

    return ( 
        <C.Form>
            <C.UpperContainer>
                <C.Container>
                    <C.Title>Nova solicitação de compra</C.Title>
                </C.Container>
                <C.Container>
                    <C.Button onClick={() => {setAdd(false); setEditItem()}} variant='outlined' >Cancelar</C.Button>
                    <C.Button onClick={handleSave} variant='contained' >{lang.save}</C.Button>
                </C.Container>
            </C.UpperContainer>
            <C.UpperContainer>
                {/* <C.InputContent>
                    <TextField
                        value={date}
                        type='date'
                        onChange={(e) => setDate(e.target.value)}
                        size="small"
                        label={lang.date}
                        // disabled
                        />
                </C.InputContent> */}
                <C.InputContent width={"70%"}>
                    <TextField
                        value={desc}
                        label={`${lang.description}`}
                        onChange={(e) => {setItems(data); setDesc(e.target.value)}}
                        size="small"
                        />
                </C.InputContent>
                <C.InputContent width={"30%"}>
                    <FormControl>
                        <InputLabel size="small" >{lang.section}</InputLabel>
                        <Select
                            value={costCenter}
                            onChange={(e) => {setItems(data); setCostCenter(e.target.value)}}
                            size="small"
                            label={lang.sections}
                            MenuProps={{disableScrollLock: true,}}
                        >
                            {Array.from(sections).filter((section) => section.title !== 'TRASH').map(element => <MenuItem key={element.title} value={element.title}>{element.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </C.InputContent>
            </C.UpperContainer>
            <Divider />
            <C.Container>
                <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th width={"50%"}>Item</th>
                            <th>{window.innerWidth > 500 ? lang.unit : lang.unitAbrv}</th>
                            <th>{window.innerWidth > 500 ? lang.quantity : lang.quantityAbrv}</th>
                            <C.Th><C.Button sx={{minWidth:'100%', padding:'3px 0'}} onClick={handleAdd} variant='contained' ><AddIcon/></C.Button></C.Th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from(items).map((item, index) => <TableRow key={index} index={index} item={item} />)}
                    </tbody>
                </table>
            </C.Container>
        </C.Form>
     );
}
 
export default Form;