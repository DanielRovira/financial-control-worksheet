import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { useEffect } from 'react';
import NestedList from './List';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';


function Main({ isLoggedIn }) {
    const history = useNavigate();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    useEffect(() => {
        !isLoggedIn && history('/')
    }, [isLoggedIn])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{ display: 'grid', justifyContent: 'center', rowGap: '30px', paddingTop: '100px' }}>
            {/* {Array.from(sections).map((section) => (
                <Container key={section.title}>
                    <Button
                    variant='contained'
                    onClick={() => {history(`/financial-control/${section.title}`); localStorage.setItem('sheetType', 'financialControl')}}
                    >
                    {section.name}
                    </Button>
                </Container>
                
            ))} */}
            <List
                  sx={{ width: '400px', maxWidth: 360, bgcolor: 'background.paper' }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Obras
                    </ListSubheader>
                  }
                >
                {Array.from(sections).map((section, index) => (
                    <NestedList key={index} section={section} />
                ))}
            </List>
        </div>
    )
}

export default Main