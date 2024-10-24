import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';

const Signup = () => {
    const language = useAtomValue(languageAtom)
    const lang = require(`components/Languages/${language}.json`);
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name.slice(4)]: e.target.value,
        }));
    };

    const sendRequest = async () => {
      const res = await fetch(`/api/signup`,
          {
              method:'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                  name: inputs.name,
                  email: inputs.email,
                  password: inputs.password,
            })
          })
          .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // send http request
        sendRequest().then(() => history("/"));
    };
    return (
        <form onSubmit={handleSubmit}>
            <Box
                marginLeft="auto"
                marginRight="auto"
                width={300}
                display="flex"
                flexDirection={"column"}
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant='h4'>{lang.signup}</Typography>
                <TextField
                  name="new-name"
                  onChange={handleChange}
                  value={inputs.name}
                  variant="outlined"
                  label="Name"
                  margin="normal"
                  required
                />
                <TextField
                  name="new-email"
                  onChange={handleChange}
                  type="email"
                  value={inputs.email}
                  variant="outlined"
                  label="Email"
                  margin="normal"
                  autoComplete="new-password"
                  required
                />
                <TextField
                  name="new-password"
                  onChange={handleChange}
                  type="password"
                  value={inputs.password}
                  variant="outlined"
                  label="Password"
                  margin="normal"
                  autoComplete="new-password"
                  required
                />
                <Box className='buttonBox'>
                  <Button variant="contained" type="submit">
                      Signup
                  </Button>
                </Box>
            </Box>
        </form>
    );
};

export default Signup
