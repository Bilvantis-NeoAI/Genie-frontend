import {Container, Form, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import {TextDisplay } from "../Utils";
import { PdfModal } from "./modalBox";
import { Snackbar } from "@mui/material";
import { downloadImageService } from "../Services/homePageService";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnswersList } from "../actions/questionActions";
import { homePageTextSamples } from "../utils/constatnts";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import { baseURL } from "../utils/constatnts";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";

export function HomePage() {
  const [formFields, setFormFields] = useState([{ text: "" }]);
  const dispatch = useDispatch();

  const [selectedSearchOption, setSelectedSearchOption] = useState("All");

  const searchOptions = ["Chroma", "Best", "Milvus", "Neo4j", "Elastic Search", "All"];

  const answerData = useSelector((state) => state.answersData);

  const [selectRelevantOption, setSelectRelevantOption] =
    useState("relevant_pdf");

  const relevantOptions = [
    { label: "Relevant pdf", value: "relevant_pdf" },
    { label: "Relevant docx", value: "relevant_docx" },
    { label: "Relevant pptx", value: "relevant_pptx" },
    { label: "Relevant csv", value: "relevant_csv" },
    { label: "Relevant xlsx", value: "relevant_xlsx" },
  ];

  const [selectContextOption, setSelectContextOption] = useState("context_pdf");

  const contextOptions = [
    { label: "Context pdf", value: "context_pdf" },
    { label: "Context docx", value: "context_docx" },
    { label: "Context pptx", value: "context_pptx" },
    { label: "Context csv", value: "context_csv" },
    { label: "Context xlsx", value: "context_xlsx" },
  ];
  const [filterQueries, setFilterQueries] = useState({});

  const handleSearchInputChange = (index, event) => {
    setFilterQueries((prevQueries) => ({
      ...prevQueries,
      [index]: event.target.value.toLowerCase(),
    }));
  };

  const index= null;
  const vertical ="bottom";
  const horizontal = "right";
  const [open, setOpen] = useState(false);
  const type = "text";
  const [showModal, setShowModal] = useState(false);
  const color = "green";
  const [inputField, setInputField] = useState();

  const handleInputChange = (index, event) => {
    const values = [...formFields];
    values[index][event.target.name] = event.target.value;
    setFormFields(values);
    setInputField(values);
  };
  const [response, setResponse] = useState([]);
  useEffect(() => {
    if (answerData.answers && answerData.answers.length > 0) {
      const newFormFields = answerData.answers.map((answer) => ({
        text: answer.text,
      }));
      if (newFormFields[newFormFields.length - 1].text !== "") {
        newFormFields.push({ text: "" });
      }
      setFormFields(newFormFields);
      setResponse(answerData.answers);
    } else {
      setFormFields([{ text: "" }]);
    }
  }, [answerData]);

  const submitQuestion = (field, index) => {
    let payload = new FormData();
    payload.set("question", field?.text);
    payload.set("answer_config", selectedSearchOption);

    dispatch(fetchAnswersList(payload, index));
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const handleOpen = () => {
  //   setOpen(true);
  //   setTimeout(() => {
  //     setOpen(false);
  //   }, 5000);
  // };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);

  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isSimilarityModalOpen, setIsSimilarityModalOpen] = useState(false);

  const openSimilarityModal = () => {
    setIsSimilarityModalOpen(true);
  };

  const closeSimilarityModal = () => {
    setIsSimilarityModalOpen(false);
  };

  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [relevantPdfIndex, setRelevantPdfIndex] = useState(0);
  // const [similarityPdfIndex, setSimilarityPdfIndex] = useState(0);
  const [isGraphsModalOpen, setIsGraphsModalOpen] = useState(false);

  const openImagesModal = () => {
    setIsImagesModalOpen(true);
  };

  const closeImagesModal = () => {
    setIsImagesModalOpen(false);
  };

  const openGraphsModal = () => {
    setIsGraphsModalOpen(true);
  };

  const closeGraphsModal = () => {
    setIsGraphsModalOpen(false);
  };
  const downloadImages = (index) => {
    response[index]?.images?.forEach((element) => {
      downloadImageService(element, response[relevantPdfIndex]?.storage);
    });
  };

  const filteredData = (data, query) =>
    data.filter(
      (item) =>
        item?.Document.toLowerCase().includes(query) ||
        item?.Name.toLowerCase().includes(query) ||
        item?.Link.toLowerCase().includes(query)
    );

  const handleSearchChange = (event) => {

    setSelectedSearchOption(event.target.value);
  };

  return (
    <Container className="w-100" fluid style={{ height: "100vh" }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Error Occured"
        key={vertical + horizontal}
        ContentProps={{
          sx: { backgroundColor: color },
        }}
      />
      {showModal && (
        <PdfModal
          showContent={index}
          hideModal={(e) => setShowModal(e)}
          type={type}
        ></PdfModal>
      )}
      <Form>
        <div className="w-100 mt-3" style={{ height: "82vh" }}>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="PDF Viewer"
            style={{
              content: {
                width: "80%",
                height: "80%",
                margin: "auto",
                zIndex: 1402,
              },
              overlay: {
                zIndex: 1302,
              },
            }}
          >
            <button
              onClick={closeModal}
              style={{ float: "right" }}
              className="btn btn-primary mb-1"
            >
              {homePageTextSamples.CLOSE}
            </button>
            

         

            {response[relevantPdfIndex]?.[selectContextOption] ? (
              <iframe
                src={
                  response[relevantPdfIndex]?.storage === "local"
                    ? baseURL + response[relevantPdfIndex]?.[selectContextOption]
                    : 
                    `https://docs.google.com/viewer?url=${encodeURIComponent(response[relevantPdfIndex]?.[selectContextOption])}&embedded=true`

                }
                width="100%"
                height="100%"
                title="PDF Viewer"
              />
            ) : (
              <Typography variant="h6" className = "text-center mt-5" color="error">
                {homePageTextSamples.NO_SELECTED_FILE}
              </Typography>
            )}
          </Modal>
          <Modal
            isOpen={isSimilarityModalOpen}
            onRequestClose={closeSimilarityModal}
            contentLabel="PDF Viewer"
            style={{
              content: {
                width: "80%",
                height: "80%",
                margin: "auto",
                zIndex: 1402,
              },
              overlay: {
                zIndex: 1302,
              },
            }}
          >
            <button
              onClick={closeSimilarityModal}
              style={{ float: "right" }}
              className="btn btn-primary mb-1"
            >
              {homePageTextSamples.CLOSE}
            </button>


            {response[relevantPdfIndex]?.[selectRelevantOption] ? (
              <iframe
                src={
                  response[relevantPdfIndex]?.storage === "local"
                    ? baseURL + response[relevantPdfIndex]?.[selectRelevantOption]
                    :
                    // response[relevantPdfIndex]?.[selectRelevantOption]
                    `https://docs.google.com/viewer?url=${encodeURIComponent(response[relevantPdfIndex]?.[selectRelevantOption])}&embedded=true`
                }
                width="100%"
                height="100%"
                title="PDF Viewer"
              />
            ) : (
              <Typography variant="h6" className="text-center mt-5" color="error">
                {homePageTextSamples.NO_SELECTED_FILE}
              </Typography>
            )}
          </Modal>
          <Modal
            isOpen={isImagesModalOpen}
            onRequestClose={closeImagesModal}
            contentLabel="Image Modal"
            style={{
              content: {
                zIndex: 1402,
              },
              overlay: {
                zIndex: 1302,
              },
            }}
          >
            <button
              onClick={closeImagesModal}
              className="btn btn-primary buttons-colour mb-3"
              style={{ float: "right" }}
            >
              Close
            </button>
            <div className="modal-content p-3 d-flex">
              {response[relevantPdfIndex]?.images?.length === 0 && (
                <span
                  className="w-100 d-flex justify-content-center"
                  style={{ fontWeight: "bolder", fontSize: "16px" }}
                >
                  No Images Found
                </span>
              )}
              {response[relevantPdfIndex]?.images?.map((image, index) => (
                <img
                  key={baseURL + image}
                  src={
                    response[relevantPdfIndex]?.storage === "local"
                      ? baseURL + image
                      : image
                  }
                  alt={`Image ${index}`}
                  className="modal-image "
                />
              ))}
            </div>
          </Modal>
          <Modal
            isOpen={isGraphsModalOpen}
            onRequestClose={closeGraphsModal}
            contentLabel="Graphs Modal"
            style={{
              content: {
                zIndex: 1402,
              },
              overlay: {
                zIndex: 1302,
              },
            }}
          >
            <button
              onClick={closeGraphsModal}
              className="btn btn-primary buttons-colour mb-3"
              style={{ float: "right" }}
            >
              Close
            </button>
            <div className="modal-content w-100 p-3 d-flex justify-content-center">
              {!response[relevantPdfIndex]?.full_graph &&
                !response[relevantPdfIndex]?.semi_graph ? (
                <span
                  className="w-100 d-flex justify-content-center"
                  style={{ fontWeight: "bolder", fontSize: "16px" }}
                >
                  No Graphs Found
                </span>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center w-100">
                  {response[relevantPdfIndex]?.full_graph && (
                    <iframe
                      src={
                        response[relevantPdfIndex]?.storage === "local"
                          ? baseURL + response[relevantPdfIndex]?.full_graph
                          : response[relevantPdfIndex]?.full_graph
                      }
                      style={{
                        border: "none",
                        marginBottom: "20px",
                        width: "100%",
                        maxWidth: "1200px",
                        height: "600px",
                        overflow: "auto",
                      }}
                    />
                  )}

                  {response[relevantPdfIndex]?.semi_graph && (
                    <iframe
                      src={
                        response[relevantPdfIndex]?.storage === "local"
                          ? baseURL + response[relevantPdfIndex]?.semi_graph
                          : response[relevantPdfIndex]?.semi_graph
                      }
                      style={{
                        border: "none",
                        marginBottom: "20px",
                        width: "100%",
                        maxWidth: "1200px",
                        height: "600px",
                        overflow: "auto",
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </Modal>
          <div className="h-100 ms-5 mb-5 pb-4">
            <div
              className="card d-flex h-100 question-card ms-4"
              style={{ overflowY: "scroll" }}
            >
              {formFields.map((field, index) => (
                <>
                  <div className="form-group w-75 d-flex mt-4 ms-5">
                    <input
                      type="text"
                      className="form-control question-box"
                      key={index}
                      placeholder="Enter Question"
                      name="text"
                      value={
                        inputField
                          ? inputField[index]?.text || field.text
                          : field.text
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          submitQuestion(field, index);
                        }
                      }}
                      onChange={(event) => handleInputChange(index, event)}
                    />

                    <Box className="select-input-box ms-1">
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select{" "}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedSearchOption}
                          label="Options"
                          onChange={handleSearchChange}
                          style={{ height: "38px" }}
                        >
                          {searchOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    <Button
                      className="ms-5 buttons-colour"
                      onClick={() => submitQuestion(field, index)}
                    >
                      {homePageTextSamples.SUBMIT_BUTTON}
                    </Button>
                  </div>
                  {response.length > 0 && !response[index] && (
                    <div className="mb-5"></div>
                  )}
                  {response.length > 0 && response[index] && (
                    <div className="card w-75 mt-3 ms-5  text-style p-2">
                      <p className="text-style ms-2 me-2" id={`item-${field}`}>
                        {" "}
                        <TextDisplay
                          text={response[index]?.text2}
                        ></TextDisplay>
                      </p>
                    </div>
                  )}
                  {response.length > 0 && response[index] && (
                    <div className="ms-5 w-75">
                      <p className="heading-style mt-2">
                        {homePageTextSamples.HYPERLINKS}
                      </p>
                      <input
                        placeholder="search for link"
                        className="w-100 form-control question-box"
                        value={filterQueries[index] || ""}
                        onChange={(event) =>
                          handleSearchInputChange(index, event)
                        }
                      />
                      <Table responsive className="mt-2 w-100">
                        <thead className="w-100" >
                          <tr className="table-header w-100">
                            <th className="table-header">Document </th>
                            <th className="table-header">Page&nbsp;No</th>
                            <th className="table-header">Name </th>
                            <th className="table-header">Link </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData(
                            response[index]?.table || [],
                            filterQueries[index] || ""
                          ).map((value, index) => (
                            <tr>
                              <td>{value?.Document}</td>
                              <td>{value?.PageNo || "-"}</td>
                              <td>{value?.Name || "-"}</td>
                              <td>
                                <a href={value?.Link}>{value?.Link}</a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                  {response.length > 0 && response[index] && (
                    <div>
                      <div className=" ms-5 d-flex justify-content-center w-75 mt-3">

                        <Box className="select-input-box ms-3">
                          <FormControl fullWidth>
                            <Select
                              labelId="context-label"
                              id="context-select"
                              value={selectContextOption}
                              label="Select Context"
                              input={<OutlinedInput />}
                              sx={{ height: "38px" }}
                            >
                              <MenuItem value="Select Content" disabled>
                                Select Context File
                              </MenuItem>
                              {contextOptions.map((option, indexed) => (
                                <MenuItem
                                  key={indexed}
                                  value={option.value}
                                  onClick={() => {
                                    setSelectContextOption(option.value);
                                    setRelevantPdfIndex(index);
                                    openModal();
                                  }}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>


                        <Box className="select-input-box ms-3">
                          <FormControl fullWidth>
                            <Select
                              labelId="relevant-label"
                              id="relevant-select"
                              value={selectRelevantOption}
                              label="Select Relevant"
                              input={<OutlinedInput />}
                              sx={{ height: "38px" }}
                            >
                              <MenuItem value="Select Content" disabled>
                                Select Relevant File
                              </MenuItem>
                              {relevantOptions.map((option, indexed) => (
                                <MenuItem
                                  key={indexed}
                                  value={option.value}
                                  onClick={() => {
                                    setSelectRelevantOption(option.value);
                                    setRelevantPdfIndex(index);
                                    openSimilarityModal();
                                  }}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>

                        <Button
                          className="ms-3 button-style"
                          onClick={(e) => {
                            openImagesModal();
                            setRelevantPdfIndex(index);
                          }}
                        >
                          {" "}
                          {homePageTextSamples.OPEN_IMAGES}
                        </Button>
                        <Button
                          className="ms-3 button-style"
                          onClick={() => downloadImages(index)}
                        >
                          {homePageTextSamples.DOWNLOAD_IMAGES}
                        </Button>
                        <Button
                          className="ms-3 button-style"
                          onClick={(e) => {
                            openGraphsModal();
                            setRelevantPdfIndex(index);
                          }}
                        >
                          {homePageTextSamples.OPEN_GRAPHS}
                        </Button>
                      </div>
                      <hr className="hr-line"></hr>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </Form>
      {/* <div className="position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded">
        <span
          style={{
            color: "white",
          }}
        >
         {footerTextSamples.BILVANTIS_COPYRIGHT}
        </span>
      </div> */}
    </Container>
  );
}