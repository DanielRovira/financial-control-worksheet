import React from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from 'react';
import * as C from './styles'
import Form from '../Form';
import Header from '../Header';
import GlobalStyle from '../../global';
import Resume from '../Resume';

const ItemDetail = ({ handleDescAddition, income, expense, total }) => {
    const params = useParams();
    const history = useNavigate();

    const handleBackButtonClick = () => {
        history(-1);
    };

    // const handleInputChange = (e) => {
    //     window.description = e.target.value;
    // };

    // useEffect(() => {
    //     return () => {
    //         handleDescAddition(window.description, params.taskTitle);
    //     };
    // }, [window.description]);

    return (
        <>
            <Header />
            <Resume income={income} expense={expense} total={total} />
            <Form />
            <GlobalStyle />
            <div className='back-button-container'>
                <C.Button variant='contained' className='back-button' onClick={handleBackButtonClick} style={{ textTransform: 'none' }}>Back</C.Button>
            </div>
            <div className="task-details-container">
                <h2>ID: {params.taskTitle}</h2>
            </div>
            <div>
                <textarea
                    autoFocus 
                    type="text"
                    placeholder="Details.."
                    className='task-input-detail'
                    id='task-input-detail'
                    // onChange={handleInputChange}
                    // defaultValue={window.description}
                    // onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                />
            </div>
        </>
    );
}

export default ItemDetail;