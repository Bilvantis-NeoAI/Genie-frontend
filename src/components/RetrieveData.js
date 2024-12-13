import React, { useState, useEffect } from "react";
import { Button, Container, Row, Form } from "react-bootstrap";
import { HeaderComponent } from "./header";
import { BootstrapSidebar } from "./sideNav";
import { homePageTextSamples } from "../utils/constatnts";
import downloadIcon from "../Assets/downloadIcon.svg";
import { retriveRepoData, getRepoCodeData } from "../actions/RetriveDataAction";
import { useDispatch, useSelector } from "react-redux";
import { Retrive_repo_data } from "../utils/constatnts";
import ReactMarkdown from "react-markdown";
export default function RetrieveData() {
  const [inputField, setInputField] = useState("");
  const [error, setError] = useState("");
  const [explainData, setExplainData] = useState([]);
  const [codeData, setCodeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const dispatch = useDispatch();
  const answerData = useSelector((state) => state.repoData);
  const getCodeResponse = useSelector((state) => state.getCode);
  useEffect(() => {
    const savedInput = sessionStorage.getItem("inputField");
    const savedExplainData = sessionStorage.getItem("explainData");
    const savedCodeData = sessionStorage.getItem("codeData");

    if (savedInput) setInputField(savedInput);
    if (savedExplainData) setExplainData(JSON.parse(savedExplainData));
    if (savedCodeData) setCodeData(JSON.parse(savedCodeData));
  }, []);
  useEffect(() => {
    sessionStorage.setItem("inputField", inputField);
    sessionStorage.setItem("explainData", JSON.stringify(explainData));
    sessionStorage.setItem("codeData", JSON.stringify(codeData));
  }, [inputField, explainData, codeData]);
  useEffect(() => {
    if (answerData?.repoData?.action?.data) {
      setExplainData([{ data: answerData.repoData.action.data }]);
      setActiveTab("explain");
    }
  }, [answerData]);
  useEffect(() => {
    if (getCodeResponse?.getCode?.action?.code) {
      setCodeData([{ data: getCodeResponse.getCode.action.code }]);
      setActiveTab("code");
    }
  }, [getCodeResponse]);

  const onSubmitExplain = async (event) => {
    event.preventDefault();
    if (!inputField.trim()) {
      setError(Retrive_repo_data.THIS_FIELD_CANT_NOT_BE_EMPTY);
      return;
    }
    try {
      setError("");
      setLoading(true);
      setExplainData([]);
      await dispatch(retriveRepoData({ question: inputField }));
    } catch (error) {
      setError(Retrive_repo_data.FAILED_TO_RETRIVE_DATA);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitGetCode = async (event) => {
    event.preventDefault();
    if (!inputField.trim()) {
      setError(Retrive_repo_data.THIS_FIELD_CANT_NOT_BE_EMPTY);
      return;
    }
    try {
      setError("");
      setLoading(true);
      setCodeData([]);
      await dispatch(getRepoCodeData({ question: inputField }));
    } catch (error) {
      setError(Retrive_repo_data.FAILED_TO_FETCH_CODE);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputField(event.target.value);
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
  const renderTableData = (data) => (
    <table className="table table-bordered">
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              <td>
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
                {Array.isArray(item.data) ? (
                  item.data.map((codeSnippet, snippetIndex) => (
                    <div key={snippetIndex} style={{ marginBottom: "20px" }}>
                      <ReactMarkdown>
                        {`\n\`\`\`javascript\n${codeSnippet}\n\`\`\``}
                      </ReactMarkdown>
                    </div>
                  ))
                ) : typeof item.data === "object" && item.data !== null ? (
                  Object.entries(item.data).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: "10px" }}>
                      <strong>{key}:</strong>
                      {Array.isArray(value) ? (
                        value.map((innerItem, innerIndex) => (
                          <div
                            key={innerIndex}
                            style={{
                              marginLeft: "20px",
                              marginBottom: "10px",
                            }}
                          >
                            {Object.entries(innerItem).map(([innerKey, innerValue]) => (
                              <div key={innerKey}>
                                <strong>{innerKey}:</strong>
                                <ReactMarkdown>
                                  {typeof innerValue === "string"
                                    ? innerValue
                                    : JSON.stringify(innerValue, null, 2)}
                                </ReactMarkdown>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <ReactMarkdown>
                          {typeof value === "string"
                            ? value
                            : JSON.stringify(value, null, 2)}
                        </ReactMarkdown>
                      )}
                    </div>
                  ))
                ) : (
                  <ReactMarkdown>
                    {`\n\`\`\`javascript\n${item.data}\n\`\`\``}
                  </ReactMarkdown>
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
  );
  return (
    <div>
      <Container className="w-90" fluid style={{ height: "100vh" }}>
        <Row style={{ height: "10vh" }}>
          <HeaderComponent />
        </Row>
        <div className="w-80 mt-5" style={{ marginLeft: "5%" }}>
          <BootstrapSidebar />
          <div className="form-group w-50 mt-5 ms-5">
            <Form>
              <Form.Control
                type="text"
                placeholder="Enter Question"
                value={inputField}
                onChange={handleInputChange}
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
              <Button
                className="mt-3 buttons-colour"
                disabled={loading}
                onClick={onSubmitExplain}
              >
                {homePageTextSamples.EXPLAIN}
              </Button>
              <Button
                className="mt-3 buttons-colour"
                disabled={loading}
                style={{ marginLeft: "30px" }}
                onClick={onSubmitGetCode}
              >
                {homePageTextSamples.GET_CODE}
              </Button>
            </Form>
          </div>
          {loading && (
            <div className="loader">
              <span>Loading...</span>
            </div>
          )}
          <div className="form-group w-90 mt-5 ms-5" style ={{overflowX: "auto", width: "70%"}}>
            {activeTab === "explain" && renderTableData(explainData)}
            {activeTab === "code" && renderTableData(codeData)}
          </div>
        </div>
      </Container>
    </div>
  );
}
