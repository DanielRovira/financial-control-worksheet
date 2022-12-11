import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from "@mui/material";

function Main({ sections }) {
    const history = useNavigate();
    return (

        <div style={{ display: 'grid', justifyContent: 'center', rowGap: '30px', paddingTop: '100px' }}>
            {sections.map((section) => (
                <Container key={section.title}>
                    <Button
                    variant="contained"
                    onClick={() => history(`/financial-control/${section.title}`)}
                    >
                    {section.title}
                    </Button>
                </Container>
            ))}
        </div>
    )
}

export default Main