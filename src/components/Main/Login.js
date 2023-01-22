import './styles/Login.css'
import { useEffect, useState, useRef } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
    const history = useNavigate();
    const timer = useRef();
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

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
        // getSections()
        // getCategories()
        localStorage.setItem('isLoggedIn', JSON.stringify(true))
        localStorage.setItem('user', JSON.stringify({name: res.user.name, email: res.user.email}))
        // setAccName(res.user.name)
        setIsLoggedIn(true)
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
        if (!loading) {
            setLoading(true);
            e.preventDefault();
            sendRequest();
            timer.current = window.setTimeout(() => {
                setLoading(false);
            }, 10000);
        }
    }

  return (
    <div className='LoginContainer' >
        {/* <Typography style={{ padding: '20px' }} align='center' variant='h3'>{lang.financialControl}</Typography> */}
        <form onSubmit={handleSubmit}>
            <img src={process.env.REACT_APP_LOGO} alt="logo" />
            <Box
              marginLeft='auto'
              marginRight='auto'
              width={300}
              display='flex'
              flexDirection={'column'}
              justifyContent='center'
              alignItems='center'
            >
            <Typography variant='h4'>{lang.login}</Typography>
            <TextField
              name='email'
              onChange={handleChange}
              type={'email'}
              value={inputs.email}
              variant='outlined'
            //   placeholder={lang.email}
              margin='normal'
              autoComplete='username'
              label={lang.email}
              required
            />
            <TextField
              name='password'
              onChange={handleChange}
              type='password'
              value={inputs.password}
              variant='outlined'
            //   placeholder={lang.password}
              margin='normal'
              autoComplete='current-password'
              label={lang.password}
              required
            />
            <Box className='buttonBox'>
                <Button
                    variant='contained'
                    type='submit'
                    disabled={loading}
                >
                  {lang.login}
                </Button>
                {loading && <CircularProgress size={null} />}
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Login
