import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import React, { useRef, useState } from 'react';
import { response } from '../Utils';
import { fetchData } from '../Services/homePageService';

export function HomePage2() {
    const [recordedUrl, setRecordedUrl] = useState('');
    const mediaStream = useRef(null);
    const mediaRecorder = useRef(null);
    const chunks = useRef([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStream.current = stream;
            mediaRecorder.current = new MediaRecorder(stream);

            mediaRecorder.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.current.push(e.data);
                }
            };

            mediaRecorder.current.onstop = () => {
                const recordedBlob = new Blob(chunks.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(recordedBlob);
                setRecordedUrl(url);
                chunks.current = [];
                uploadAudio(recordedBlob);
            };

            mediaRecorder.current.start();
            setIsRecording(true);
            setIsPaused(false);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.stop();
        }
        if (mediaStream.current) {
            mediaStream.current.getTracks().forEach((track) => track.stop());
        }
        setIsRecording(false);
        setIsPaused(false);
    };

    const pauseRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.pause();
            setIsPaused(true);
        }
    };

    const resumeRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'paused') {
            mediaRecorder.current.resume();
            setIsPaused(false);
        }
    };

    const uploadAudio = async (blob) => {
        const formData = new FormData();
        formData.append('audio', blob, 'recording.webm');

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setUploadStatus('Audio uploaded successfully!');
            } else {
                setUploadStatus('Failed to upload audio.');
            }
        } catch (error) {
            console.error('Error uploading audio:', error);
            setUploadStatus('Error uploading audio.');
        }
    };

    const handlePauseResume = () => {
        if (isPaused) {
            resumeRecording(); // Resume the paused recording
        } else {
            pauseRecording(); // Pause the recording
        }
    };

    return (
        <Container className='w-100' fluid style={{ height: '100vh' }}>
            <Row style={{ height: '10vh' }}>
                <HeaderComponent />
            </Row>
            <div className="w-100 mt-3" style={{ height: '82vh' }}>
                <div style={{ width: '10%' }}>
                    <BootstrapSidebar />
                </div>
                <div className='col-11 h-100 ms-5 mb-5 pb-4'>
                    <div className='card d-flex align-items-center w-100 h-100 question-card ms-4' style={{ overflowY: 'scroll' }}>
                        <div className='w-50 d-flex justify-content-evenly mt-5'>
                        <audio controls src={recordedUrl} />
                            <button onClick={startRecording} disabled={isRecording} className='btn btn-primary'>Start Recording</button>
                            <button onClick={handlePauseResume} disabled={!isRecording} className='btn btn-secondary'>
                                {isPaused ? 'Resume Recording' : 'Pause Recording'}
                            </button>
                            <button onClick={stopRecording} disabled={!isRecording} className='btn btn-danger'>Stop Recording</button>
                            
                        </div>
                        <p className='mt-2'>{uploadStatus}</p>
                    </div>
                   

                </div>
            </div>
            <div className='position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded'>
                <span style={{ color: "white" }}>@Bilvantis 2024</span>
            </div>
        </Container>
    );
}
