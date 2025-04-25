import { Col, Row, Container, Button, Modal } from "react-bootstrap";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { flushDB, containerRestart, neo4jStatus, reloadData, changeStorage } from "../actions/adminActions";
import { toast } from 'react-toastify';
import Switch from '@mui/material/Switch';

import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import Swal from "sweetalert2";
export default function KbmsAdimnPage(){
    const dispatch = useDispatch();
    const [selectedLLM, setSelectedLLM] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [storageOption, setStorageOption] = useState('local');
    const neo4jStatusOptions = [{ label: "Include All", value: 'False' }, { label: "Include Texts", value: 'True' }];
    const [selectedNeo4jOption, setSelectedNeo4jOption] = useState('True');
    const storageStatusOptions = [{ label: "Local", value: 'local' }, { label: "S3", value: 's3' },
        { label: "Blob", value: 'blob' }, { label: "Google Storage Bucket", value: 'google storage bucket' }];
        const handleStorageClick = () => {
            const formData = new FormData();
            formData.append('storage', storageOption);
            dispatch(changeStorage(formData))
                .then(response => response && toast.success("Storage updated successfully"))
                .catch(() => toast.error("Failed to update storage"));
        };    
    const handleStorageChange = (event) => {
        setStorageOption(event.target.value);
    };
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
        const handleSelect = (value) => {
            setSelectedLLM(value);
        };
        const llmConfig = [
            { label: 'OpenAI', value: 'openai' },
            { label: 'Gemini', value: 'gemini' }
        ];
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
         const handleLLMSubmit = () => {
              const token = sessionStorage.getItem("access_token");
            
              const formData = new FormData();
              formData.append("new_llm_config", selectedLLM);
            
              fetch(process.env.REACT_APP_IP + 'genieapi/update-llm-config', {
                method: 'POST',
                headers: {
                  "Authorization": `Bearer ${token}`,
                  // DO NOT set Content-Type manually
                },
                body: formData
              })
                .then(data => {
                  console.log('LLM selection saved:', data);
                  setSelectedLLM('')
                  Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'LLM configuration updated successfully!',
                    timer: 2000,
                    showConfirmButton: false,
                  });
                })
                .catch(err => {
                  console.error('Error sending LLM to backend:', err);
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update LLM configuration. Please try again.',
                  });
                });
            };
    return(
        <>
         <Container fluid className="w-90">
            <Row style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                <HeaderComponent />
            </Row>
            <div
                className="flex-grow-1"
                style={{ marginTop: "10px" }}
            >
                <BootstrapSidebar /></div>
        <div className='col-7 card' style={{ marginLeft: '16%' }}>
                        <div className='d-flex gap-2 ms-5 mt-3'>
                            <Button className="btn btn-primary btn-sm" onClick={handleFlushDB}>Flush DB</Button>
                            <Button className="btn btn-primary btn-sm" onClick={handleContainerRestart}>Restart Container</Button>
                            <Button className="btn btn-primary btn-sm" onClick={handleReload}>Reload Data</Button>
                        </div>
                        <Row className="flex-column m-3 h-100">
                            {/* <Col className="d-flex flex-column align-items-center p-4 border rounded mb-3">
                                <h5>NeoAI LLM Config</h5>
                                <div className="d-flex align-items-start mt-4 w-100">
                                    <FormControl fullWidth className="p-2">
                                        <InputLabel>Select Option</InputLabel>
                                        <Select
                                            value={selectedLLM}
                                            onChange={e => handleSelect(e.target.value)}
                                            style={{ height: '35px' }}
                                        >
                                            {llmConfig.map((option, index) => (
                                                <MenuItem key={index} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                     <Button className="btn btn-primary btn-sm mt-2" onClick={handleLLMSubmit}>Submit</Button>
                                </div>
                            </Col> */}

                            <Col className="d-flex flex-column align-items-center p-4 border rounded">
                                <h5>Neo4j Status</h5>
                                <div className="d-flex align-items-start mt-4 w-100">
                                    <FormControl fullWidth className="p-2">
                                        <InputLabel>Select Option</InputLabel>
                                        <Select value={selectedNeo4jOption} onChange={e => setSelectedNeo4jOption(e.target.value)} style={{ height: '35px' }}>
                                            {neo4jStatusOptions.map((option, index) => (
                                                <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Switch checked={isActive} size="large" className="" onChange={handleToggle} />
                                </div>
                            </Col>
                            <Col className="d-flex flex-column align-items-center p-4 border rounded mt-3">
                                <h5>Storage Location</h5>
                                <div className="d-flex align-items-start mt-3 w-100 h-10">
                                    <FormControl fullWidth className="p-2">
                                        <InputLabel>Select Storage</InputLabel>
                                        <Select value={storageOption} onChange={handleStorageChange} style={{ height: '35px' }}>
                                            {storageStatusOptions.map((option, index) => (
                                                <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button className="btn btn-primary btn-sm mt-2" onClick={handleStorageClick}>Submit</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    </Container>
                    </>
    )
}