import { AppBar, Box, Tab, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const Header = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
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
    sendLogoutReq().then(() => localStorage.setItem("isLoggedIn", JSON.stringify(false)));
  };

  return (
    <div>
      <AppBar position="sticky" style={{ background: "teal" , filter:"grayscale(50%)" }}>
        <Toolbar>
          <Typography variant="h3"></Typography>
          <Box sx={{ marginLeft: "auto" }}>
              {!isLoggedIn && (
                <>
                  {" "}
                  <Tab to="/login" LinkComponent={Link} label="Login" />
                  <Tab to="/signup" LinkComponent={Link} label="Signup" />
                </>
              )}
              {isLoggedIn && (
                <Tab
                  onClick={handleLogout}
                  to="/"
                  LinkComponent={Link}
                  label="Logout"
                />
              )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
