import './styles/Login.css'
import { useEffect, useState, useRef } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai'
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/atom';

const Login = ({ isLoggedIn, setIsLoggedIn, setLoading }) => {
  const language = useAtomValue(languageAtom)
  const lang = require(`components/Languages/${language}.json`);
    const history = useNavigate();
    const timer = useRef();
    const setLanguage = useSetAtom(languageAtom)
    const [loadingButton, setLoadingButton] = useState(false);
    const [inputs, setInputs] = useState({
        email: process.env.REACT_APP_DEFAULT_USER,
        password: process.env.REACT_APP_DEFAULT_PASS,
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
        .catch(error => {
            return (alert(lang.alert03), setLoadingButton(false));
        })
        if (res?.user) {
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
          localStorage.setItem('user', JSON.stringify(res.user));
          setLanguage(res.user.language);
          setIsLoggedIn(true);
          setLoading(true);
          return
        }
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
        if (!loadingButton) {
            setLoadingButton(true);
            e.preventDefault();
            sendRequest();
            timer.current = window.setTimeout(() => {
                setLoadingButton(false);
            }, 10000);
        }
    }

    const loginWithGoogle = (ev) => {
        ev.preventDefault();
        window.open(`/api/login/federated/google`, "_self");
      }

    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("submitButton")?.click();
        }
    });

  return (
    <div className='LoginContainer' >
        <form onSubmit={handleSubmit}>
            <img src={`${process.env.REACT_APP_LOGO}.jpg`} alt="logo" />
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
                  margin='normal'
                  autoComplete='current-password'
                  label={lang.password}
                  required
                />
                <Box className='buttonBox'>
                    <Button
                        id='submitButton'
                        variant='contained'
                        type='submit'
                        disabled={loadingButton}
                    >
                      {lang.login}
                    </Button>
                    {loadingButton && <CircularProgress size={null} />}
                </Box>
                {process.env.REACT_APP_GOOGLE_LOGIN && <>
                <Divider flexItem variant="middle" />
                <Box className='buttonBox'>
                    <Button
                      className='thirdPartyLogin'
                      variant='outlined'
                    onClick={loginWithGoogle}
                      >
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" alt="google login" />
                      <p>Google</p>
                    </Button>
                </Box>
                </>}
            </Box>
        </form>
    </div>
  );
};

export default Login
