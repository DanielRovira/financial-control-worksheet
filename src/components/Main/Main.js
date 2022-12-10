import React from 'react';
import data from '../../config.json'
import { useNavigate } from 'react-router-dom';
import { Button, Container } from "@mui/material";

function Main() {
    const history = useNavigate();
    return (

        <div style={{ display: 'grid', justifyContent: 'center', columnGap: '50px', rowGap: '10px' }}>
            {data.sections.map((task) => (
                <Container key={task.title}>
                    <Button
                    variant="contained"
                    onClick={() => history(`/financial-control/${task.title}`)}
                    >
                    {task.title}
                    </Button>
                </Container>
            ))}
        </div>
    )
}

export default Main