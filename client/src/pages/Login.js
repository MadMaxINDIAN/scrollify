import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
// import Copyright from "../components/Copyright";
import { connect } from "react-redux";
import { login } from "../redux/services/actions/authActions";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import PropTypes from 'prop-types'
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function Login(props) {
    const [value, setValue] = React.useState(0)
    const navigate = useNavigate();
    const location = useLocation()

    React.useEffect(() => {
        console.log(props.auth)
        if (props.auth?.isAuthenticated) {
            navigate("/");
        }
    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const CustomTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
        textTransform: 'none',
        fontFamily: 'Poppins',
        fontSize: 16,
        color: '#222222',
        backgroundColor: '#F8F5CC',
        width: 150,
        '&.Mui-selected': {
            backgroundColor: '#F2EC94',
            color: '#222222',
        },
        "&.Mui-indicator": {
            display: "none"
        }
    }))

    return (
        <div style={{ width: '100vw', minHeight: '150vh', padding: '20px 10px', backgroundColor: '#F8F5CC' }}>

            <Paper sx={{ width: '100%', maxWidth: 700, margin: 'auto', padding: window.innerWidth > 400 ? 5 : '20px 5px' }} elevation={4}>
                <Box>
                    <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{
                        style: { display: 'none' }
                    }}>
                        <CustomTab label='Login' />
                        <CustomTab label='Signup' />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <LoginForm navigateUrl={location?.state?.navigateUrl} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SignupForm navigateUrl={location?.state?.navigateUrl} />
                </TabPanel>
            </Paper>
        </div>
    );
}

const mapstatetoprops = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapstatetoprops, { login })(Login);