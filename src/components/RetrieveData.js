import React, { useState, useEffect, useCallback } from "react";
import { Button, Container, Row, Form } from "react-bootstrap";
import { HeaderComponent } from "./header";
import { BootstrapSidebar } from "./sideNav";
import { homePageTextSamples } from "../utils/constatnts";
import { retriveRepoData, getRepoCodeData } from "../actions/RetriveDataAction";
import { useDispatch, useSelector } from "react-redux";
import { Retrive_repo_data } from "../utils/constatnts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

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

export default function RetrieveData() {
  const [inputField, setInputField] = useSessionStorage("inputField", "");
  const [error, setError] = useState("");
  const [chatMessages, setChatMessages] = useSessionStorage("chatMessages", []);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const answerData = useSelector((state) => state.repoData);
  const getCodeResponse = useSelector((state) => state.getCode);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (answerData?.repoData?.action?.data?.explanation) {
      answerData.repoData.action.data.explanation.forEach((exp) => {
        const overview = exp.overview;
        const detailedExplanation = exp.detailedExplanation;
        setChatMessages((prev) => {
          const exists = prev.some(msg => msg.message === overview && msg.type === "explain");
          return exists ? prev : [...prev, { sender: "system", message: overview, type: "explain" }];
        });

        setChatMessages((prev) => {
          const exists = prev.some(msg => msg.message === detailedExplanation && msg.type === "explain");
          return exists ? prev : [...prev, { sender: "system", message: detailedExplanation, type: "explain" }];
        });
      });
    }
  }, [answerData]);
  useEffect(() => {
    if (getCodeResponse?.getCode?.action?.code) {
      setChatMessages((prev) => {
        const exists = prev.some(msg => msg.message === getCodeResponse.getCode.action.code && msg.type === "code");
        return exists ? prev : [...prev, { sender: "system", message: getCodeResponse.getCode.action.code, type: "code" }];
      });
    }
  }, [getCodeResponse]);
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
  const handleInputChange = useCallback(
    (e) => {
      setInputField(e.target.value);
      if (error) setError("");
    },
    [error]
  );

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
        setInputField("");
      }
    },
    [inputField, dispatch, addChatMessage]
  );
  const renderExplanation = (explanation) => {
    const formatMarkdown = (value) => {
      if (typeof value === "string") {
        return value.replace(/\\n/g, "\n").trim();
      }
      if (value === null || value === undefined) return "N/A";
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      return String(value);
    };

    const explanationArray = Array.isArray(explanation) ? explanation : [explanation];

    return explanationArray.map((exp, index) => {
      const { overview, detailedExplanation } = exp || {};
      const processedOverview = formatMarkdown(overview || "No overview provided.");
      const processedDetailedExplanation = formatMarkdown(detailedExplanation || "No detailed explanation provided.");

      return (
        <div key={index} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "5px" }}>
          <div style={{ marginBottom: "10px" }}>
            <strong>Overview:</strong>
            <div>{processedOverview}</div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Detailed Explanation:</strong>
            <div>{processedDetailedExplanation}</div>
          </div>
        </div>
      );
    });
  };


  return (
    <Container fluid className="w-100">
      <div
        className="flex-grow-1 w-100v"
        style={{ marginTop: "20px", marginLeft: "5%" }}
      >
        <div className="flex-grow-1 ms-4">
          <div
            className="border rounded p-3"
            style={{
              maxHeight: "60vh",
              maxWidth: "90%",
              overflowX: "auto",
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
                  className={`d-inline-block p-2 text-black bg-light
                    ${chat.sender === "user"
                      ? "text-light"
                      : "bg-light"
                    } rounded`
                  }
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {chat.type === "code"
                      ? `\`\`\`javascript\n${chat.message}\n\`\`\``
                      : chat.message}
                  </ReactMarkdown>
                </div>

              </div>
            ))}
            <div style={{ padding: '10px' }}
              className={'d-inline-block p-2 text-black bg-light'}
            >
              {renderExplanation(data)}
            </div>

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
    </Container>
  );
}
