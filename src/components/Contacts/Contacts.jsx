// import './styles.css'
// import { List, ListSubheader } from '@mui/material';
// import NestedList from '../Sidebar/NestedList';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/atom';

const Contacts = ({ setMainSheetType }) => {
    const language = useAtomValue(languageAtom);
    const lang = require(`components/Languages/${language}.json`);

    useEffect(() => {
        setMainSheetType('Contacts');
    }, [setMainSheetType]);

    return (
        <div className=''>
            <div className=''>
                <h1>{lang.FinancialWorksheet}</h1>
            </div>
            <div className=''>
            </div>
        </div>
    )
}

export default Contacts