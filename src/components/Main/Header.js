import { AppBar, Box, Tab, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const Header = ({ isLoggedIn, setIsLoggedIn, accName, setAccName, type, setType }) => {
    const history = useNavigate();
    const sendLogoutReq = async () => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/logout`, null, {
        withCredentials: true,
    });
    if (res.status === 200) {
        return res;
    }

    return new Error("Unable TO Logout. Please try again");
    };

    const handleLogout = () => {
        sendLogoutReq()
            .then(() => localStorage.clear())
            .then(() => setAccName(null))
            .then(() => setIsLoggedIn(false))
            .then(() => setType(""))
            .then(() => history("/"));
    };

    return (
        <div>
            <AppBar position="sticky" style={{ background: "teal" , filter:"grayscale(50%)" }}>
                <Toolbar>
                {/* <h1>{accName}</h1> */}
                <h1 style={{textAlign: 'center'}} >{type}</h1>
                    <Typography variant="h3"></Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                        {isLoggedIn ? (
                        <Tab
                        onClick={handleLogout}
                        to="/"
                        LinkComponent={Link}
                        label="Logout"
                    />
                    ) : (
                        <>
                        {" "}
                        <Tab to="/" LinkComponent={Link} label="Login" />
                        <Tab to="/signup" LinkComponent={Link} label="Signup" />
                        </>
                    )}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Header;
