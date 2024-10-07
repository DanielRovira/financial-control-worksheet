import { Box, Button, TextField } from "@mui/material";
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
  console.log(inputs)
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
    <div style={{ padding: '10px 0 20px 0' }}>
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
          <h2>{lang.signup}</h2>
          <TextField
            name="new-name"
            onChange={handleChange}
            value={inputs.name}
            variant="outlined"
            placeholder="Name"
            margin="normal"
          />
          <TextField
            name="new-email"
            onChange={handleChange}
            type="email"
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
            autoComplete="new-password"
          />
          <TextField
            name="new-password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
            autoComplete="new-password"
          />
          <Button variant="contained" type="submit">
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup
