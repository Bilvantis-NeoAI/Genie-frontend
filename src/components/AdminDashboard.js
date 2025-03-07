import { Col, Container, Form, Row, Table, Button, Card } from "react-bootstrap";
import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { flushDB, containerRestart, neo4jStatus, reloadData, changeStorage } from "../actions/adminActions";
import { toast, ToastContainer } from 'react-toastify';
import Switch from '@mui/material/Switch';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export function AdminDashboard() {
    let users = [{
        name: "santhosh", role: "Super Super"
    }, { name: "kiran", role: "Finance" }, { name: "sai", role: "HR" }]
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("users");

    const neo4jStatusOptions = [
        { label: "Include All", value: 'False' },
        { label: "Include Texts", value: 'True' },
    ];

    const storageStatusOptions = [
        { label: "Local", value: 'local' },
        { label: "S3", value: 's3' },
        { label: "Blob", value: 'blob' },
        { label: "Google Storage Bucket", value: 'google storage bucket' },
    ];

    const [selectedNeo4jOption, setSelectedNeo4jOption] = useState('True');
    const [storageOption, setStorageOption] = useState('local');
    const [isActive, setIsActive] = useState(false);

    const handleFlushDB = () => {
        dispatch(flushDB())
            .then(response => response && toast.success(response.data))
            .catch(() => toast.error("Failed to flush database"));
    };

    const handleContainerRestart = () => {
        dispatch(containerRestart())
            .then(response => response && toast.success("Application restarted successfully"))
            .catch(() => toast.error("Failed to restart application"));
    };

    const handleReload = () => {
        dispatch(reloadData())
            .then(response => response && toast.success(response.data.message))
            .catch(() => toast.error("Failed to reload data"));
    };

    const handleToggle = (event) => {
        const newValue = event.target.checked;
        setIsActive(newValue);
        const formData = new FormData();
        formData.append('status', newValue ? 'True' : 'False');
        formData.append('texts', selectedNeo4jOption);

        dispatch(neo4jStatus(formData))
            .then(response => response && toast.success(response.message))
            .catch(() => toast.error("Failed to update status"));
    };

    const handleStorageChange = (event) => {
        setStorageOption(event.target.value);
    };

    const handleStorageClick = () => {
        const formData = new FormData();
        formData.append('storage', storageOption);

        dispatch(changeStorage(formData))
            .then(response => response && toast.success("Storage updated successfully"))
            .catch(() => toast.error("Failed to update storage"));
    };

    return (
        <Container fluid className="w-100">
            <Row style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                <HeaderComponent />
            </Row>
            <div
                className="flex-grow-1 w-100v"
                style={{ marginTop: "20px", marginLeft: "5%" }}
            >
                <BootstrapSidebar /></div>
            <div className="row">
                <div className='col-5 card' style={{ marginLeft: '6%' }}>
                    <div className='d-flex gap-2 m-3 mt-5 mb-4'>
                        <Button variant='primary' onClick={handleFlushDB}>Flush DB</Button>
                        <Button variant='primary' onClick={handleContainerRestart}>Restart Container</Button>
                        <Button variant='primary' onClick={handleReload}>Reload Data</Button>
                    </div>
                    <Row className=' flex-column justify-content-center m-3'>
                        <Col className='d-flex  align-items-center p-4 border rounded'>
                            <h5>Neo4j Status</h5>
                            <FormControl fullWidth className='mt-5 p-2 flex-column'>
                                <InputLabel>Select Option</InputLabel>
                                <Select value={selectedNeo4jOption} onChange={e => setSelectedNeo4jOption(e.target.value)}>
                                    {neo4jStatusOptions.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Switch checked={isActive} size='large' className='mt-3 p-2' onChange={handleToggle} />
                        </Col>
                        <Col className='d-flex align-items-center p-4 border rounded mt-3'>
                            <h5>Storage Location</h5>
                            <FormControl fullWidth className='mt-3 p-2'>
                                <InputLabel>Select Storage</InputLabel>
                                <Select value={storageOption} onChange={handleStorageChange}>
                                    {storageStatusOptions.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button className='mt-3' onClick={handleStorageClick}>Submit</Button>
                        </Col>
                    </Row>
                </div>
                <div className="col-6 card ms-3 p-3">
                    <ul className="nav gap-5">
                        <li className="nav-item mt-2">
                            <a
                                className={`nav-link ${activeTab === "users" ? "active-tab" : ""}`}
                                href="#"
                                onClick={() => setActiveTab("users")}
                            >
                                Users
                            </a>
                        </li>
                        <li className="nav-item mt-2">
                            <a
                                className={`nav-link ${activeTab === "roles" ? "active-tab" : ""}`}
                                href="#"
                                onClick={() => setActiveTab("roles")}
                            >
                                Roles
                            </a>
                        </li>
                    </ul>
                    <hr className="navBarAdmin"></hr>
                    <div className="content mt-3">
                        {activeTab === "users" && (
                            <div className="table-responsive">
                                <table className="table table-bordered  table-hover mt-3 align-itmes-center" style={{ fontSize: 10 }}>
                                    <thead className="table-secondary">
                                        <tr >
                                            <th style={{ width: "10%" }}>Sl.N</th>
                                            <th style={{ width: "30%" }}>Name</th>
                                            <th style={{ width: "30%" }}>Role</th>
                                            <th style={{ width: "30%" }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {users.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <button className="statusButtons btn btn-light me-2">Accept</button>
                                                    <button className="statusButtons btn btn-light">Reject</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === "roles" && <h4>List of Roles</h4>}
                    </div>


                </div>
            </div>
            <ToastContainer />

        </Container >

    );
}
