import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { useEffect } from 'react';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

function Main({ isLoggedIn }) {
    const history = useNavigate();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    useEffect(() => {
        !isLoggedIn && history('/')
    }, [isLoggedIn])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{ display: 'grid', justifyContent: 'center', rowGap: '30px', paddingTop: '100px' }}>
            {Array.from(sections).map((section) => (
                <Container key={section.title}>
                    <Button
                    variant='contained'
                    onClick={() => {history(`/financial-control/${section.title}`); localStorage.setItem('sheetType', 'financialControl')}}
                    >
                    {section.name}
                    </Button>
                </Container>
            ))}
        </div>
    )
}

export default Main