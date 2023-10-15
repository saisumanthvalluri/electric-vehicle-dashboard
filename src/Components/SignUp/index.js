import { useState, useEffect } from "react";
import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import appLogo from "../../IMG/appLogo.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import NativeSelect from "@mui/material/NativeSelect";
import CommuteIcon from "@mui/icons-material/Commute";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import "./index.css";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarData, setSnackData] = useState({ open: false, msg: "", type: "" });
    const [evType, onSelectEvType] = useState("CAR");
    const [evModel, setEvModel] = useState("");
    const vertical = "bottom";
    const horizontal = "right";
    const navigate = useNavigate();

    const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    useEffect(() => {
        const jwtToken = Cookies.get("jwt_token");
        if (jwtToken !== undefined) {
            return navigate("/EV-Dashboard", { replace: true });
        }
    }, [navigate]);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackData({ open: false });
    };

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            if (userName !== "" && email !== "" && password !== "" && evModel !== "") {
                if (!isEmail(email)) {
                    setSnackData({ open: true, msg: "Invalid Email!", type: "warning" });
                } else {
                    // console.log(data);
                    const user = await createUserWithEmailAndPassword(auth, email, password);
                    await setDoc(doc(db, "users", user.user.uid), { email, userName, evType, evModel });
                    const userInfo = {
                        userId: user.user.uid,
                        operationType: user.operationType,
                        name: userName,
                    };
                    Cookies.set("jwt_token", user.user.accessToken, { expires: 1 });
                    localStorage.setItem("user_info", JSON.stringify(userInfo));
                    setSnackData({ open: true, msg: "Success", type: "success" });
                    navigate("/EV-Dashboard", { replace: true });
                }
            } else {
                setSnackData({ open: true, msg: "All fields are mandatory!", type: "warning" });
            }
        } catch (error) {
            if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                setSnackData({ open: true, msg: "This Email Adress alreay exists!", type: "warning" });
            } else if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                setSnackData({ open: true, msg: "Password should be at least 6 characters!", type: "warning" });
            } else if (error.message === "Firebase: Error (auth/network-request-failed).") {
                setSnackData({ open: true, msg: "You are offline. please check your network!", type: "warning" });
            } else if (error.message === "Firebase: Error (auth/invalid-email).") {
                setSnackData({ open: true, msg: "Invalid email!", type: "warning" });
            } else {
                console.log(error.message);
                setSnackData({ open: true, msg: error.message, type: "warning" });
            }
        }
    };

    return (
        <div className="sign-up-container">
            <div className="resp-container">
                <div className="form-container">
                    <div className="form-content">
                        <form className="sign-up-form" onSubmit={handleForm}>
                            <img src={appLogo} alt="chat-app-logo" className="chat-app-logo" />
                            <h1 className="app-title">EV dashboard</h1>
                            {/* <p className="app-caption">Fastest way to chat and simple!</p> */}
                            <Box sx={{ width: "100%", marginTop: "15px" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        mb: 3,
                                    }}>
                                    <AccountCircleOutlinedIcon
                                        sx={{
                                            color: "action.active",
                                            mr: 2,
                                            my: 0.5,
                                            fontSize: 33,
                                        }}
                                    />
                                    <TextField
                                        id="input-User-name"
                                        label="User name"
                                        variant="standard"
                                        fullWidth
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        mb: 3,
                                    }}>
                                    <CommuteIcon
                                        sx={{
                                            color: "action.active",
                                            mr: 2,
                                            my: 0.5,
                                            fontSize: 33,
                                        }}
                                    />
                                    <FormControl sx={{ width: "310px" }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">EV Type</InputLabel>
                                        <NativeSelect
                                            defaultValue={evType}
                                            onChange={(e) => onSelectEvType(e.target.value)}
                                            inputProps={{
                                                name: "EV Type",
                                                id: "uncontrolled-native",
                                            }}>
                                            <option value={"CAR"}>Car</option>
                                            <option value={"BIKE"}>Bike</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        mb: 3,
                                    }}>
                                    <LocalTaxiIcon
                                        sx={{
                                            color: "action.active",
                                            mr: 2,
                                            my: 0.5,
                                            fontSize: 33,
                                        }}
                                    />
                                    <TextField
                                        id="input-Evname"
                                        label="EV Model"
                                        variant="standard"
                                        fullWidth
                                        value={evModel}
                                        onChange={(e) => setEvModel(e.target.value)}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        mb: 3,
                                    }}>
                                    <MailOutlinedIcon
                                        sx={{
                                            color: "action.active",
                                            mr: 2,
                                            my: 0.5,
                                            fontSize: 33,
                                        }}
                                    />
                                    <TextField
                                        id="input-Email"
                                        label="Email"
                                        variant="standard"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        mb: 3,
                                    }}>
                                    <LockOutlinedIcon
                                        sx={{
                                            color: "action.active",
                                            mr: 2,
                                            my: 0.5,
                                            fontSize: 33,
                                        }}
                                    />
                                    <FormControl sx={{ width: "310px" }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            type={showPassword ? "text" : "password"}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setShowPassword((prev) => !prev)}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Box>
                            </Box>
                            <button className="signup-btn" type="submit">
                                Sign Up
                            </button>
                            <p className="have-acc-text">
                                Already have an account? <Link to="/sign-in">Sign In</Link>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="app-logo">
                    <img src={appLogo} alt="chat-app-img" className="chat-app-img" />
                    <p className="app-caption">
                        Experience the thrill of emission-free driving with our cutting-edge electric vehicles. Join the
                        revolution towards a cleaner, greener tomorrow.
                    </p>
                </div>
            </div>
            <Snackbar
                open={snackbarData.open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}
                sx={{ margin: "0px 15px 15px 0px" }}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarData.type} sx={{ width: "100%" }}>
                    {snackbarData.msg}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SignUp;
