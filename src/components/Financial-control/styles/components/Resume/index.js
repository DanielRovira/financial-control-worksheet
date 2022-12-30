import React from 'react';
import ResumeItem from '../ResumeItem';
import * as C from './styles';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaDollarSign } from 'react-icons/fa';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Resume = ({ income, expense, total }) => {
    return ( 
        <C.Container>
            {localStorage.getItem('sheetType') === 'financialControl' && <>
            <ResumeItem title={lang.entries} Icon={FaRegArrowAltCircleUp} value={income} />
            <ResumeItem title={lang.expenses} Icon={FaRegArrowAltCircleDown} value={expense} />
            </>}
            <ResumeItem title={lang.total} Icon={FaDollarSign} value={total} />
        </C.Container>
     );
}
 
export default Resume;