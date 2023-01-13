import React from 'react';
import ResumeItem from '../ResumeItem';
import * as C from './styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaDollarSign } from 'react-icons/fa';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Resume = ({ result, sheetType, setDrawer }) => {
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let provenience = Array.from(categoriesList || []).filter(item => item.type === 'provenience').sort((a, b) => a.name.localeCompare(b.name))

    return ( 
        <ClickAwayListener onClickAway={() => setDrawer(false)}>
            <C.Container>
                <ResumeItem title={lang.total} Icon={FaDollarSign} value={result.overall.total} />
                {sheetType === 'financialControl' && <>
                <ResumeItem title={lang.entries} Icon={FaRegArrowAltCircleUp} value={result.overall.income} />
                <ResumeItem title={lang.expenses} Icon={FaRegArrowAltCircleDown} value={result.overall.expense} />
                {Array.from(provenience)?.map((item, index) => (
                   <ResumeItem key={index} title={item.name} value={result[item.name].total} /> 
                ))}
                </>}
            </C.Container>
        </ClickAwayListener>
     );
}
 
export default Resume;