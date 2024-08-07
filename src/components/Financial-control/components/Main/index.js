import './styles.css'
import { useState, useEffect } from 'react';
import { List, ListSubheader } from '@mui/material';
import MainNestedList from './MainNestedList';
import Calendar from '../Calendar';
import UploadFile from '../UploadFile';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Main = ({ setOpenSidebar }) => {
    const [results, setResults] = useState(JSON.parse(localStorage.getItem("results")) || []);
    const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || []);
    // const [sections, setSections] = useState(JSON.parse(localStorage.getItem("sections")) || []);
    const sections = JSON.parse(localStorage.getItem("sections")) || [];

    const getData = async (section) => {
        const res = await
        fetch(`/api/${process.env.REACT_APP_DB}/list/${section}-financialControl`, { method:'GET', credentials: 'include' })
            .then(response => response.json())
            .catch(error => {
                // setIsLoggedIn(false); history('/');
            })

        const calc = (list) => {
            const amountExpense = Array.from(list)
                .filter((item) => item.expense)
                .map((transaction) => Number(transaction.amount));
            
            const amountIncome = Array.from(list)
                .filter((item) => !item.expense)
                .map((transaction) => Number(transaction.amount));
            
            const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
            const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);
            const total = (income - expense).toFixed(2);
            
            return {total}
        }

        if (res.status === 200) {
            // setLoadingData(false)
            setResults((prev) => ({ ...prev,
                [section]: calc((res.post).filter(item => !item.archived) || [])
            }));
            (res.post).filter(item => !item.archived).map((x) => setData((prev) =>( {...prev, [x._id]: x})));
        }
    }

    useEffect(() => {
        localStorage.setItem("results", JSON.stringify(results));
    }, [results]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(data));
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setOpenSidebar && setOpenSidebar(false);

            Array.from(sections)?.filter((section) => section.title !== 'TRASH').map((prov) => (
                getData(prov.title)
             ))
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='FinancialWorksheetMainContainer'>
            <div className='SubContainer'>
                <div className='TableContainer'>
                    <div className='Header'>
                        <h1>{lang.FinancialWorksheet}</h1>
                    </div>
                    <UploadFile/>
                    <List
                        subheader={
                            <ListSubheader>
                                <h2>{lang.sections}</h2>
                            </ListSubheader>
                          }
                        >
                        {Array.from(sections).filter((section) => section.title !== 'TRASH').map((section, index) => (
                            <MainNestedList key={index} section={section} hideTitle={true} arrow={true} result={results[section.title]?.total} />
                        ))}
                    </List>
                    {/* <table>
                        <thead>
                            <tr>
                                <th>{lang.sections}</th>
                                <th>{lang.total}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(sections).filter((section) => section.title !== 'TRASH').map((section, index) => (
                                <tr key={index}>
                                    <td style={{minWidth:'200px'}}>
                                        {section.name}
                                    </td>
                                    <td style={{textAlign:'right'}}>
                                        {Number((results[section.title]?.total || 0).toString().replace(/,/g, '.')).toLocaleString('pt-BR', { style: 'currency', currency: process.env.REACT_APP_CURRENCY })
                                        
                                        
                                        
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                </div>
                <div>
                    <div className='CalendarHeader' >
                        <h1>Calendario</h1>
                    </div>
                    <Calendar rawData={Object.entries(data).map(item => item[1])} defaultView={'year'}  maxDetail={'year'} />
                </div>
            </div>
        </div>
    )
}

export default Main