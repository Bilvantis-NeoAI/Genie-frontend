import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import { useState } from 'react';
import { response } from '../Utils';
import { fetchData } from '../Services/homePageService';
import { Dropzone, FileMosaic } from "@files-ui/react";
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import LanguageIcon from '@mui/icons-material/Language';
import { homePage1TextSamples } from '../utils/constatnts';
import { addDocument } from '../actions/documentActions';
import { useDispatch, useSelector } from 'react-redux';


export function HomePage1() {
  const [formState, setFormState] = useState({
    file: [],
    url: "",
  });
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    file: "",
    url: "",
  });

  const updateFiles = (incomingFiles) => {
    console.log("inco", incomingFiles);
    
    setFormState((prevState) => ({
      ...prevState,
      file: incomingFiles,
    }));
    if (incomingFiles.length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, file: "", url: "" }));
    }
  };


  const validateForm = () => {
    let hasError = false;
    const newErrors = {
      file: "",
      url: "",
    };

    if (formState.file.length === 0 && !formState.url) {
      newErrors.file = homePage1TextSamples.FILES_REQUIRED;
      newErrors.url = homePage1TextSamples.URL_REQUIRED;
      hasError = true;
    } 

    setErrors(newErrors);
    return !hasError;
  };

  
  

  const removeFile = (index) => {
    setFormState((prevState) => {
      const newFiles = prevState.file.filter((_, i) => i !== index);
      return { ...prevState, file: newFiles };
    });

  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      url: newUrl,
    }));

    if (newUrl) {
      setErrors((prevErrors) => ({ ...prevErrors, url: "", file: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formState.file.forEach((file) => {
      console.log("file", file);
      
      formData.append("file", file.file);
    });

    if (formState.url) {
      formData.append("url", formState.url);
    }

    console.log("okay it is");
    const payload = {

    }
    dispatch(addDocument(payload))
    
    
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
            <form onSubmit={handleSubmit}>
              <div class="form-group d-flex justify-content-center w-100 d-flex mt-5 ms-5" >
                <div>
                  <div>
                    <span className='form-field-title'>{homePage1TextSamples.UPLOAD_FILES}</span>
                    <span className='required-styling'>*</span>
                  </div>
                  <Dropzone
                    onChange={updateFiles}
                    value={formState.file}
                    className={`mt-2 dropzone ${formState.file.length === 0 ? 'empty-dropzone' : ''}`}
                    accept=".pdf, application/pdf"
                  >
                    {formState.file.map((file, index) => (
                      <div key={file.name} className="file-preview" tyle={{ maxWidth: '100px', maxHeight: '100px' }}>
                        <FileMosaic {...file} preview />
                        <FolderDeleteIcon onClick={() => removeFile(index)} />

                      </div>
                    ))}
                  </Dropzone>
                  {errors.file && <p className="error-message">{errors.file}</p>}

                  <div className='mt-4'>
                    <div>
                      <span className='form-field-title'>{homePage1TextSamples.URL_INPUT}</span>
                      <span className='required-styling'>*</span>
                    </div>
                    <div class="input-container mt-2">
                      <div class="icon-container">
                        <LanguageIcon />
                      </div>
                      <div class="separator"></div>
                      <input
                        type="url"
                        value={formState.url}
                        onChange={handleUrlChange}
                        placeholder="Enter the URL"
                        className="form-control input-box"
                      />
                    </div>
                    {errors.url && <p className="error-message">{errors.url}</p>}
                  </div>
                  <div className='w-100 d-flex justify-content-center'>
                  <Button className='mt-3' type='submit'>{homePage1TextSamples.SUBMIT}</Button>
                </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded'>
        <span style={{
          color: "white"
        }}>@Bilvantis 2024 </span>
      </div>
    </Container>
  )

}