import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { footerTextSamples, adminDashboardTextSamples } from "../utils/constatnts";
import { flushDB, containerRestart, neo4jStatus } from "../actions/adminActions";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export function AdminDashboard() {
    const dispatch = useDispatch();

    const neo4jStatusOptions = [
        { label: "Include All", value: 'False' },
        { label: "Include Texts", value: 'True' },
    ];

    const [selectedNeo4jOption, setSelectedNeo4jOption] = useState('True');


    const handleFlushDB = () => {
        dispatch(flushDB())
            .then((response) => {
                if (response) {
                    toast.success(response.data);
                }
            })
            .catch((error) => {
                toast.error(adminDashboardTextSamples.FLUSH_ERROR);
            });
    };


    const handleContainerRestart = () => {
        dispatch(containerRestart())
        .then((response) => {
            if (response) {
                toast.success(adminDashboardTextSamples.APP_RESATRT_MSG);
            }
        })
        .catch((error) => {
            toast.error(adminDashboardTextSamples.RESTART_ERROR);
        });
    }

    const [isActive, setIsActive] = useState(false);

    const handleToggle = async (event) => {
        const newValue = event.target.checked;
        setIsActive(newValue);

        try {
            if (newValue) {
                console.log("activated");
                let formData = new FormData();
                formData.append('status', 'True');
                formData.append('texts', selectedNeo4jOption);

                dispatch(neo4jStatus(formData))
                    .then((response) => {
                        if (response) {
                            toast.success(response.message);
                        }
                    })
                    .catch((error) => {
                        toast.error(adminDashboardTextSamples.CHANDE_STATUS_ERROR);
                    });
            } else {
                let formData = new FormData();
                formData.append('status', 'False');
                formData.append('texts', selectedNeo4jOption);

                dispatch(neo4jStatus(formData))
                    .then((response) => {
                        if (response) {
                            toast.success(response.message);
                        }
                    })
                    .catch((error) => {
                        toast.error(adminDashboardTextSamples.CHANDE_STATUS_ERROR);
                    });
            }
        } catch (error) {
            console.error(adminDashboardTextSamples.API_ERROR, error);
        }
    };

    const handleNeo4jChange = (event) => {
        console.log("Selected Value >>", event.target.value);
        setSelectedNeo4jOption(event.target.value);
    };


    return (
        <Container className=' w-100' fluid style={{ height: '100vh' }}>
            <Row style={{ height: '10vh' }} >
                <HeaderComponent></HeaderComponent>
            </Row>
            <div className="w-100 mt-3" style={{ height: '82vh' }} >
                <div style={{ width: '10%' }}>
                    <BootstrapSidebar></BootstrapSidebar>
                </div>
                <div className='col-11   h-100 ms-5 mb-5 pb-4' >
                    <div className='card d-flex h-100 align-items-center question-card ms-4' style={{ overflowY: 'scroll' }} >
                        <div className="d-flex justify-content-center mt-3">
                            <button className="btn btn-primary buttons-colour" onClick={handleFlushDB} > {adminDashboardTextSamples.FLUSH_DB}</button>
                            <button className="btn btn-primary buttons-colour ms-3" onClick={handleContainerRestart} > {adminDashboardTextSamples.CONATAINER_RESTART}</button>
                        </div>
                        <div className="card w-25 mt-5">
                            <div className="d-flex flex-column justify-content-center align-items-center p-4">
                                <h4>{adminDashboardTextSamples.NEO_FOURJ}</h4>
                                <div className="d-flex mt-4">
                                    <Box className="select-input-box">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedNeo4jOption}
                                                label="Options"
                                                onChange={handleNeo4jChange}
                                                style={{ height: '38px' }}
                                            >
                                                {neo4jStatusOptions.map((option, index) => (
                                                    <MenuItem key={index} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Switch checked={isActive} size="large" className="ms-4 mb-2" onChange={handleToggle} />

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <ToastContainer />
            </div>
            <div className='position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded'>
                <span style={{
                    color: "white"
                }}>{footerTextSamples.BILVANTIS} </span>
            </div>
        </Container >
    )

}