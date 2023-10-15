import "./index.css";
import { styled } from "@mui/material/styles";
import appLogo from "../../IMG/appLogo.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Avatar from "@mui/material/Avatar";
import { FcMiddleBattery, FcElectricity } from "react-icons/fc";
import { PiThermometerHotFill } from "react-icons/pi";
import { TbCircuitVoltmeter } from "react-icons/tb";
import car from "../../IMG/sampleCar.png";
import bike from "../../IMG/sampleBike.png";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";

const EvDashboard = () => {
    // const [batteryPercentage, setBatteryPercentage] = useState(50);
    const [tab, setTab] = useState(0);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        if (userInfo) {
            const unsubuserData = onSnapshot(collection(db, `users`), (snapshot) => {
                snapshot.docs.forEach((e) => {
                    if (e.id === userInfo?.userId) {
                        setUserData({ ...e.data(), userId: e.id });
                    }
                });
            });

            return () => {
                unsubuserData();
            };
        }
    }, []);

    const TabChange = (event, value) => {
        setTab(value);
    };

    const StyledTabs = styled((props) => (
        <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
    ))({
        "& .MuiTabs-indicator": {
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
        },
        "& .MuiTabs-indicatorSpan": {
            maxWidth: 40,
            width: "100%",
            backgroundColor: "#635ee7",
        },
    });

    const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
        textTransform: "none",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        color: "rgba(255, 255, 255, 0.7)",
        "&.Mui-selected": {
            color: "#fff",
        },
        "&.Mui-focusVisible": {
            backgroundColor: "#fff",
        },
    }));

    return (
        <div className="bg-container">
            <div className="ev-dashboard">
                <nav className="navbar">
                    <div className="app-icon-box">
                        <img src={appLogo} alt="" className="app-icon" />
                        <h1 className="app-name">EV Dashboard</h1>
                    </div>
                    <div className="menu-bar">
                        <StyledTabs value={tab} onChange={TabChange} centered>
                            <StyledTab label="Overview" />
                            <StyledTab label="Maps" />
                            <StyledTab label="Media" />
                        </StyledTabs>
                    </div>
                    <div className="profile-box">
                        <h3 className="user-name">{userData?.userName}</h3>
                        <Avatar sx={{ bgcolor: "blue" }}>S</Avatar>
                    </div>
                </nav>

                <div className="ev-spec-ev-type-box">
                    <div className="ev-spec-box">
                        <div className="ev-spec-row">
                            <div className="ev-spec">
                                <h2 className="ev-spec-name">Battery</h2>
                                <div className="ev-spec-icon-details-box">
                                    <FcMiddleBattery className="ev-spec-icon" />
                                    <div className="ev-spev-details-box">
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">350Km</strong>
                                            <p className="ev-spec-details-item-desc">left</p>
                                        </div>
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">50%</strong>
                                            <p className="ev-spec-details-item-desc">charging</p>
                                        </div>
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">4000Km</strong>
                                            <p className="ev-spec-details-item-desc">distance traveled</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ev-spec">
                                <h2 className="ev-spec-name">Voltage</h2>
                                <div className="ev-spec-icon-details-box">
                                    <TbCircuitVoltmeter className="ev-spec-icon" color="yellow" />
                                    <div className="ev-spev-details-box">
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">100 volts</strong>
                                            <p className="ev-spec-details-item-desc">peek</p>
                                        </div>
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">70 volts</strong>
                                            <p className="ev-spec-details-item-desc">average</p>
                                        </div>
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">40 volts</strong>
                                            <p className="ev-spec-details-item-desc">least</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ev-spec-row">
                            <div className="ev-spec">
                                <h2 className="ev-spec-name">Current</h2>
                                <div className="ev-spec-icon-details-box">
                                    <FcElectricity className="ev-spec-icon" />
                                    <div className="ev-spev-details-box">
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">200 amps</strong>
                                            <p className="ev-spec-details-item-desc">peek</p>
                                        </div>
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">120 amps</strong>
                                            <p className="ev-spec-details-item-desc">average</p>
                                        </div>
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">40 amps</strong>
                                            <p className="ev-spec-details-item-desc">least</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ev-spec">
                                <h2 className="ev-spec-name">Temperature</h2>
                                <div className="ev-spec-icon-details-box">
                                    <PiThermometerHotFill className="ev-spec-icon" size={130} />
                                    <div className="ev-spev-details-box">
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">
                                                120<sup>o</sup> C
                                            </strong>
                                            <p className="ev-spec-details-item-desc">peek</p>
                                        </div>
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">
                                                80<sup>o</sup> C
                                            </strong>
                                            <p className="ev-spec-details-item-desc">average</p>
                                        </div>
                                        <div className="ev-spec-details-item">
                                            <strong className="ev-spec-details-item-label">
                                                40<sup>o</sup> C
                                            </strong>
                                            <p className="ev-spec-details-item-desc">least</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ev-type-box">
                        <h1 className="ev-text">EV</h1>
                        {userData?.evType === "CAR" ? (
                            <img src={car} alt="" className="ev-image" />
                        ) : (
                            <img src={bike} alt="" className="ev-image" />
                        )}
                        <div className="ev-owner-details-box">
                            <div className="ev-details-box">
                                <div className="ev-details-item">
                                    <p className="ev-details-item-desc">Model</p>
                                    <strong className="ev-details-item-label">{userData?.evModel}</strong>
                                </div>
                                <div className="ev-details-item">
                                    <p className="ev-details-item-desc">Top Speed</p>
                                    <strong className="ev-details-item-label">322km/h</strong>
                                </div>
                                <div className="ev-details-item">
                                    <p className="ev-details-item-desc">Engine</p>
                                    <strong className="ev-details-item-label">3-phase AC induction motor</strong>
                                </div>
                                <div className="ev-details-item">
                                    <p className="ev-details-item-desc">Electric Range</p>
                                    <strong className="ev-details-item-label">348–402 mi (560–647 km)</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EvDashboard;
