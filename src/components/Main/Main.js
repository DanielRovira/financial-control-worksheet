import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { useEffect } from 'react';

function Main({ sections, isLoggedIn }) {
    const history = useNavigate();
    useEffect(() => {
        isLoggedIn ? void(0) : history(`${process.env.REACT_APP_FRONTEND}/`)
    }, [isLoggedIn])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{ display: 'grid', justifyContent: 'center', rowGap: '30px', paddingTop: '100px' }}>
            {Array.from(sections).map((section) => (
                <Container key={section.title}>
                    <Button
                    variant='contained'
                    onClick={() => history(`/${process.env.REACT_APP_FRONTEND}/financial-control/${section.title}`)}
                    >
                    {section.title}
                    </Button>
                </Container>
            ))}
        </div>
    )
}

export default Main