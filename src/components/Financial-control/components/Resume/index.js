import * as C from './styles';
import ResumeItem from '../ResumeItem';
import { ClickAwayListener } from '@mui/material';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaDollarSign } from 'react-icons/fa';
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';

const Resume = ({ result, sheetType, setDrawer }) => {
    const language = useAtomValue(languageAtom);
    const lang = require(`components/Languages/${language}.json`);
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let sources = Array.from(categoriesList || []).filter(item => item.type === 'source').sort((a, b) => a.name.localeCompare(b.name))

    return ( 
        <ClickAwayListener onClickAway={() => setDrawer(false)}>
            <C.Container>
                <ResumeItem title={lang.total} Icon={FaDollarSign} value={result[sheetType].total} />
                {sheetType === 'financialControl' && <>
                <ResumeItem title={lang.entries} Icon={FaRegArrowAltCircleUp} color={'green'} value={result[sheetType].income} />
                <ResumeItem title={lang.expenses} Icon={FaRegArrowAltCircleDown} color={'red'} value={result[sheetType].expense} />
                {Array.from(sources)?.map((item, index) => (
                   <ResumeItem key={index} title={item.name} Icon={FaDollarSign} value={result[item.name].total} /> 
                ))}
                </>}
            </C.Container>
        </ClickAwayListener>
     );
}
 
export default Resume;