import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PDFViewerComponent } from './PDFViewer';
import  image1 from '../Assets/image_3.png'
import  image2 from '../Assets/image_4.png'

export function PdfModal({ showContent, hideModal , type}) {
    const closeModal = () => {
        hideModal(false);
    };

    return (
        <Modal
            show={true}
            size="xl"
            style={{ maxHeight: '95%' }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={closeModal}
        >
            <Modal.Header closeButton className='close-button'>
                <Modal.Title id="contained-modal-title-vcenter">
                   Document
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: 0, backgroundColor: '#ffffff' }}>
                <div style={{ height: '80vh', width: '100%', backgroundColor: '#ffffff' }} className=''>
                    <PDFViewerComponent response={showContent} type={type} />
                </div>

          
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
