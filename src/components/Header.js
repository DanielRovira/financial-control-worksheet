import { AppBar, Box, Tab, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const Header = ({ isLoggedIn, setIsLoggedIn, accName, setAccName }) => {

    const sendLogoutReq = async () => {
    const res = await axios.post("/api/logout", null, {
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
            .then(() => setIsLoggedIn(false));
    };

    return (
        <div>
            <AppBar position="sticky" style={{ background: "teal" , filter:"grayscale(50%)" }}>
                <Toolbar>
                <h1>{accName}</h1>
                    <Typography variant="h3"></Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                        {isLoggedIn ? (
                        <Tab
                        onClick={handleLogout}
                        to="/login"
                        LinkComponent={Link}
                        label="Logout"
                    />
                    ) : (
                        <>
                        {" "}
                        <Tab to="/login" LinkComponent={Link} label="Login" />
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
