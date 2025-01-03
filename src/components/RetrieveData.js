import React, { useState, useEffect, useCallback } from "react";
import { Button, Container, Row, Form } from "react-bootstrap";
import { HeaderComponent } from "./header";
import { BootstrapSidebar } from "./sideNav";
import { homePageTextSamples } from "../utils/constatnts";
import downloadIcon from "../Assets/downloadIcon.svg";
import { retriveRepoData, getRepoCodeData } from "../actions/RetriveDataAction";
import { useDispatch, useSelector } from "react-redux";
import { Retrive_repo_data } from "../utils/constatnts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub-flavored markdown
import rehypeHighlight from "rehype-highlight"; // For syntax highlighting
import "highlight.js/styles/github.css";

// Custom hook for using session storage
const useSessionStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const saved = sessionStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

// Download button component
const DownloadButton = ({ onClick }) => (
  <div className="d-flex justify-content-end" onClick={onClick}>
    <img src={downloadIcon} alt="Download" className="downloadbutton" />
  </div>
);

// Main component
export default function RetrieveData() {
  const [inputField, setInputField] = useSessionStorage("inputField", "");
  const [error, setError] = useState("");
  const [chatMessages, setChatMessages] = useSessionStorage("chatMessages", []); // Chat state
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const answerData = useSelector((state) => state.repoData);
  const getCodeResponse = useSelector((state) => state.getCode);

  // Adding system messages on data retrieval
  useEffect(() => {
    if (answerData?.repoData?.action?.data) {
      addChatMessage("system", answerData.repoData.action.data, "explain");
    }
  }, [answerData]);

  useEffect(() => {
    if (getCodeResponse?.getCode?.action?.code) {
      addChatMessage("system", getCodeResponse.getCode.action.code, "code");
    }
  }, [getCodeResponse]);

  // Add message to the chat
  const addChatMessage = useCallback(
    (sender, message, actionType) => {
      setChatMessages((prev) => {
        if (
          prev.length > 0 &&
          prev[prev.length - 1].message === message &&
          prev[prev.length - 1].type === actionType
        ) {
          return prev;
        }
        return [...prev, { sender, message, type: actionType }];
      });
    },
    [setChatMessages]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e) => {
      setInputField(e.target.value);
      if (error) setError("");
    },
    [error]
  );

  // Submit the input
  const handleSubmit = useCallback(
    async (actionType) => {
      if (!inputField.trim()) {
        setError(Retrive_repo_data.THIS_FIELD_CANT_NOT_BE_EMPTY);
        return;
      }

      try {
        setError("");
        setLoading(true);
        addChatMessage("user", inputField, actionType);

        if (actionType === "explain") {
          await dispatch(retriveRepoData({ question: inputField }));
        } else if (actionType === "code") {
          await dispatch(getRepoCodeData({ question: inputField }));
        }
      } catch {
        addChatMessage(
          "system",
          Retrive_repo_data.FAILED_TO_RETRIVE_DATA,
          actionType
        );
      } finally {
        setLoading(false);
        setInputField(""); // Reset input
      }
    },
    [inputField, dispatch, addChatMessage]
  );

  // Handle download functionality
  const handleDownload = useCallback((data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "response.txt";
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
<Container fluid className="w-100">
<Row style={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <HeaderComponent />
        </Row>
      <div className="flex-grow-1 w-100v" style={{ marginTop: "20px", marginLeft:'5%' }}>
        <BootstrapSidebar />
        <div className="flex-grow-1 ms-4">
          <div
            className="border rounded p-3"
            style={{
              maxHeight: "70vh",
              maxWidth:'90%',
              overflowX:'auto',
              overflowY: "auto",
              background: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            {chatMessages.length === 0 && (
              <div className="text-center text-muted">
                Start by asking a question.
              </div>
            )}

            {chatMessages.map((chat, index) => (
              <div
                key={index}
                className={`mb-3 ${chat.sender === "user" ? "text-end" : "text-start"}`}
                style={{ overflowX: "auto" }}
              >
                <div
                  className={`d-inline-block p-2 ${chat.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-light"
                    } rounded`} 
                >
                  {typeof chat.message === "object" ? (
                    <>
                      <DownloadButton onClick={() => handleDownload(chat.message)} />
                      <ReactMarkdown remarkPlugins={[remarkGfm, rehypeHighlight]}>
                        {JSON.stringify(chat.message, null, 2)}
                      </ReactMarkdown>
                    </>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm, rehypeHighlight]}>
                      {chat.message}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <Form.Control
              type="text"
              placeholder="Ask a question..."
              value={inputField}
              onChange={handleInputChange}
              isInvalid={!!error}
              className="form-control"
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>

            <div className="d-flex mt-2">
              <Button
                onClick={() => handleSubmit("explain")}
                className="me-3"
                disabled={loading}
              >
                {loading ? "Loading..." : homePageTextSamples.EXPLAIN}
              </Button>
              <Button onClick={() => handleSubmit("code")} disabled={loading}>
                {loading ? "Loading..." : homePageTextSamples.GET_CODE}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded">
          <span
            style={{
              color: "white",
            }}
          >
            {footerTextSamples.BILVANTIS}
          </span>
        </div> */}
    </Container>
  );
}