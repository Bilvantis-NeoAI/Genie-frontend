import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { footerTextSamples, adminDashboardTextSamples } from "../utils/constatnts";
import { flushDB, containerRestart } from "../actions/adminActions";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

export function AdminDashboard() {
    const dispatch = useDispatch();
    // const graphsData = useSelector((state) => state.graphsData);
    
    // useEffect(() => {
    //     dispatch(flushDB())
    // }, []);

    const handleFlushDB = () => {
        dispatch(flushDB())
        .then((response) => {
            if (response) {
              toast.success(response.data);
            } 
          })
          .catch((error) => {
            toast.error('An error occurred while flushing.');
          });
        };


    const handleContainerRestart = () => {
        dispatch(containerRestart())
    }    

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
                    <div className='card d-flex h-100 question-card ms-4' style={{ overflowY: 'scroll' }} >
                       <div className="d-flex justify-content-center mt-3">
                          <button className="btn btn-primary"   onClick={handleFlushDB} > {adminDashboardTextSamples.FLUSH_DB}</button>
                          <button className="btn btn-primary ms-3"   onClick={handleContainerRestart} > {adminDashboardTextSamples.CONATAINER_RESTART}</button>
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