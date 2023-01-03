import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Login = ({ isLoggedIn, setIsLoggedIn, setAccName }) => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const getSections = async () => {
        await fetch(`/api/${process.env.REACT_APP_DB}/sections`, { method: 'GET', credentials: 'include' })
        .then(response => response.json())
        .then(response => localStorage.setItem('sections', JSON.stringify(response)))
        setIsLoggedIn(true)
    }

    const getCategories = async () => {
        await fetch(`/api/${process.env.REACT_APP_DB}/categories`, { method:'GET', credentials: 'include' })
        .then(response => response.json())
        .then(response => localStorage.setItem('categories', JSON.stringify(response)))
    }

    const sendRequest = async () => {
        const res = await fetch(`/api/login`,
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: inputs.email,
                password: inputs.password,
              })
        })
        .then(response => response.json())
        if (res.status !== 200) {
            return alert(lang.alert03);
        }
        getSections()
        getCategories()
        localStorage.setItem('isLoggedIn', JSON.stringify(true))
        localStorage.setItem('userName', res.user.name)
        setAccName(res.user.name)
        // setIsLoggedIn(true)
    };

    useEffect(() => {
        isLoggedIn && history('/main')
    }, [isLoggedIn, history]);

    function handleChange(e) {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendRequest()
    }

  return (
    <div>
        <Typography style={{ paddingTop: '20px' }} align='center' variant='h3'>{lang.financialControl} {process.env.REACT_APP_NAME}</Typography>
        <form style={{ paddingTop: '20px' }} onSubmit={handleSubmit}>
            <Box
              marginLeft='auto'
              marginRight='auto'
              width={300}
              display='flex'
              flexDirection={'column'}
              justifyContent='center'
              alignItems='center'
            >
            <Typography variant='h3'>{lang.login}</Typography>
            <TextField
              name='email'
              onChange={handleChange}
              type={'email'}
              value={inputs.email}
              variant='outlined'
              placeholder={lang.email}
              margin='normal'
              autoComplete='username'
            />
            <TextField
              name='password'
              onChange={handleChange}
              type='password'
              value={inputs.password}
              variant='outlined'
              placeholder={lang.password}
              margin='normal'
              autoComplete='current-password'
            />
            <Button variant='contained' type='submit'>
              Login
            </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
