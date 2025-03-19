import {Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import { useState } from 'react';
import { Dropzone, FileMosaic } from "@files-ui/react";
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import LanguageIcon from '@mui/icons-material/Language';
import { homePage1TextSamples } from '../utils/constatnts';
import { addDocument } from '../actions/documentActions';
import { useDispatch } from 'react-redux';
import { addUrl } from '../actions/urlActions';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function HomePage1() {
  const [formState, setFormState] = useState({
    file: [],
    url: "",
  });
  const [fileErrors, setFileErrors] = useState("");
  const [urlErrors, setUrlErrors] = useState("");
  const dispatch = useDispatch();

const updateFiles = (incomingFiles) => {

  setFormState((prevState) => ({
    ...prevState,
    file: incomingFiles,
  }));

  if (incomingFiles.length > 0) {
    setFileErrors(""); 
  }
};


  const removeFile = (index) => {
    setFormState((prevState) => {
      const newFiles = prevState.file.filter((_, i) => i !== index);
      return { ...prevState, file: newFiles };
    });
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    setFileErrors("");
    if (formState.file.length === 0) {
      setFileErrors(homePage1TextSamples.FILES_REQUIRED);
      return;
    }

    const formData = new FormData();
    formState.file.forEach((file) => {
      formData.append("files", file.file);
    });

     

    dispatch(addDocument(formData))
    .then((response) => {
      if (response.data.status === 'success') {
        toast.success('Document added successfully!');
        setFormState((prevState) => ({
          ...prevState,
          file: []  
        }));
      
      } 
    })
    .catch((error) => {
      toast.error('An error occurred while adding the document.');
    });
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      url: newUrl,
    }));

    if (newUrl) {
      setUrlErrors("");
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!formState.url) {
      setUrlErrors(homePage1TextSamples.URL_REQUIRED);
      return;
    }

    const formData = new FormData();
    formData.append("url", formState.url);   
    dispatch(addUrl(formData))
    .then((response) => {
      
      if (response.data.status === 'success') {
        toast.success('URL added successfully!');
        setFormState((prevState) => ({
          ...prevState,
          url : ''  
        }));
      
      } 
    })
    .catch((error) => {
      toast.error('An error occurred while adding the URL.');
    });
  };

  return (
    <Container className='w-100' fluid style={{ height: '100vh' }}>
      <Row style={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <HeaderComponent />
        </Row>
      <div className="w-100 mt-3" style={{ height: '82vh' }}>
        <div style={{ width: '10%' }}>
          <BootstrapSidebar />
        </div>
        <div className='h-100 ms-5 mb-5 pb-4'>
          <div className='card d-flex h-100 question-card ms-4' style={{ overflowY: 'scroll' }}>
            <div className="form-group d-flex flex-column align-items-center w-100 d-flex mt-3 ms-5">

              <form onSubmit={handleFileSubmit}>
                <div>
                  <div>
                    <span className='form-field-title'>{homePage1TextSamples.UPLOAD_FILES}</span>
                    <span className='required-styling'>*</span>
                  </div>
                  <Dropzone
                    onChange={updateFiles}
                    value={formState.file}
                    className={`mt-2 dropzone`}
                    accept=".pdf, .docx, .pptx, .jpg, .jpeg, .png, .bmp, .tiff, .svg, .csv, .xlsx"
                  >
                    {formState.file.map((file, index) => (
                      <div key={file.name} className="file-preview" >
                        <FileMosaic {...file} preview />
                        <FolderDeleteIcon onClick={() => removeFile(index)} />
                      </div>
                    ))}
                  </Dropzone>
                  {fileErrors && <p className="error-message">{fileErrors}</p>}

                  <div className='w-100 d-flex justify-content-center'>
                    <Button className='mt-3 buttons-colour' type='submit'>{homePage1TextSamples.SUBMIT}</Button>
                  </div>
                </div>
              </form>

              <form onSubmit={handleUrlSubmit}>
                <div >
                  <div className='mt-4'>
                    <div>
                      <span className='form-field-title'>{homePage1TextSamples.URL_INPUT}</span>
                      <span className='required-styling'>*</span>
                    </div>
                    <div className="input-container mt-2" style={{width:'260%'}}>
                      <div className="icon-container"  >
                        <LanguageIcon />
                      </div>
                      <div className="separator"></div>
                      <input
                        type="url"
                        value={formState.url}
                        onChange={handleUrlChange}
                        placeholder="Enter the URL"
                        className="form-control input-box"
                        
                      />
                    </div>
                    {urlErrors && <p className="error-message">{urlErrors}</p>}
                  </div>
                  <div className='w-100 d-flex justify-content-center'>
                    <Button className='mt-3 buttons-colour' type='submit'>{homePage1TextSamples.SUBMIT}</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded'>
        <span style={{ color: "white" }}>{footerTextSamples.BILVANTIS_COPYRIGHT}</span>
      </div> */}
      <ToastContainer />
    </Container>
  );
}