import React, { useState, useEffect } from "react";
import { Button, Container, Row, Form } from "react-bootstrap";
import { HeaderComponent } from "./header";
import { BootstrapSidebar } from "./sideNav";
import { homePageTextSamples } from "../utils/constatnts";
import downloadIcon from "../Assets/downloadIcon.svg";
import { retriveRepoData } from "../actions/RetriveDataAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Retrive_repo_data } from "../utils/constatnts";
import ReactMarkdown from 'react-markdown';
export default function RetrieveData() {
  const [inputField, setInputField] = useState("");
  const [error, setError] = useState("");
  const [displayData, setDisplayData] = useState(false);
  const [Answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [disable , setDisable] =useState(false)
  const answerData = useSelector((state) => state.repoData);
  useEffect(() => {
    const savedQuestion = localStorage.getItem("inputField");
    const savedAnswer = localStorage.getItem("retrievedData");
    if (savedQuestion) {
      setInputField(savedQuestion);
    }
    if (savedAnswer) {
      setAnswer(JSON.parse(savedAnswer));
      setDisplayData(true);
    }
  }, []);
  useEffect(() => {
    setDisplayData(false);
    if (answerData && answerData.repoData?.action?.data) {
      const data = answerData.repoData.action.data;
      const newAnswer = [{ response: data.response }];
      setAnswer(newAnswer);
      setDisplayData(true);
      localStorage.setItem("retrievedData", JSON.stringify(newAnswer));
    }
  }, [answerData]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setDisable(true)
    if (inputField.trim() === "") {
      setError(Retrive_repo_data.THIS_FIELD_CANT_NOT_BE_EMPTY);
      setDisplayData(false);
      return;
    }
    const payload = { q: inputField };
    try {
      setError("");
      setDisplayData(false);
      setLoading(true);
      await dispatch(retriveRepoData(payload));
      setLoading(false);
      localStorage.setItem("inputField", inputField); // Save the question in localStorage
    } catch (error) {
      setError(Retrive_repo_data.FAILED_TO_RETRIVE_DATA);
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setDisable(false)
    setInputField(value);
    localStorage.setItem("inputField", value); // Update localStorage as user types
    if (error) setError("");
  };

  const handleDownload = (item) => {
    const content = Object.entries(item)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `data.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Container className="w-90" fluid style={{ height: "100vh" }}>
        <Row style={{ height: "10vh" }}>
          <HeaderComponent />
        </Row>
        <div className="w-80 mt-5" style={{marginLeft: "5%" }}>
          <div>
            <BootstrapSidebar />
          </div>
          <div className="form-group w-50 mt-5 ms-5">
            <Form onSubmit={onSubmit}>
              <Form.Control
                type="text"
                className="form-control question-box"
                placeholder="Enter Question"
                value={inputField}
                onChange={handleInputChange}
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
              <Button className="mt-3 buttons-colour" type="submit" disabled={disable}>
                {homePageTextSamples.SUBMIT_BUTTON}
              </Button>
            </Form>
          </div>
          {loading && (
            <div className="loader">
              <span>Loading...</span>
            </div>
          )}
          <div className="form-group w-90 mt-5 ms-5">
            {displayData && (
              <div className="mt-4">
                <table className="table table-bordered">
                  <tbody>
                    {Answer && Array.isArray(Answer) && Answer.length > 0 ? (
                      Answer.slice(0, 3).map((item, index) => (
                        <tr key={index}>
                          <td >
                            <div
                              className="d-flex justify-content-end"
                              onClick={() => handleDownload(item)}
                            >
                              <img
                                src={downloadIcon}
                                alt="Download"
                                className="downloadbutton"
                              />
                            </div>
                             {item && typeof item === "object" ? (
                              Object.entries(item).map(([key, value]) => (
                                <div key={key} style={{marginLeft:'4%'}}>
                                   <ReactMarkdown>{value}</ReactMarkdown>
                                </div>
                              ))
                            ) : (
                              <p>{Retrive_repo_data.NO_DATA_AVAILABLE}</p>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>{Retrive_repo_data.NO_DATA_AVAILABLE}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
