import { useState, useEffect, useCallback } from "react";
import { Button, Container, Form } from "react-bootstrap";
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

  useEffect(() => {
    const explanation = answerData?.repoData?.action?.data?.explanation || [];

    if (explanation.length > 0) {
      explanation.forEach((exp) => {
        const { overview, detailedExplanation } = exp;
        const formattedOverview = overview?.replace(/\\n/g, "\n") || "No overview.";
        const formattedDetailed = detailedExplanation?.replace(/\\n/g, "\n") || "No details.";

        setChatMessages((prev) => {
          const exists = prev.some(
            (msg) =>
              msg.type === "explain" &&
              msg.message?.overview === formattedOverview &&
              msg.message?.detailedExplanation === formattedDetailed
          );
          if (exists) return prev;

          return [
            ...prev,
            {
              sender: "system",
              type: "explain",
              message: {
                overview: formattedOverview,
                detailedExplanation: formattedDetailed,
              },
            },
          ];
        });
      });
    }
  }, [answerData]);

  useEffect(() => {
    const code = getCodeResponse?.getCode?.action?.code;
    if (code) {
      setChatMessages((prev) => {
        const exists = prev.some(msg => msg.message === code && msg.type === "code");
        return exists ? prev : [...prev, { sender: "system", message: code, type: "code" }];
      });
    }
  }, [getCodeResponse]);

  const addChatMessage = useCallback((sender, message, type) => {
    setChatMessages((prev) => {
      if (
        prev.length > 0 &&
        prev[prev.length - 1].message === message &&
        prev[prev.length - 1].type === type
      ) {
        return prev;
      }
      return [...prev, { sender, message, type }];
    });
  }, [setChatMessages]);

  const handleInputChange = useCallback((e) => {
    setInputField(e.target.value);
    if (error) setError("");
  }, [error]);

  const handleSubmit = useCallback(async (actionType) => {
    if (!inputField.trim()) {
      setError(Retrive_repo_data.THIS_FIELD_CANT_NOT_BE_EMPTY);
      return;
    }
    try {
      setError("");
      setLoading(true);
      const currentInput = inputField; 
      setInputField(""); 
      addChatMessage("user", currentInput, actionType);
      if (actionType === "explain") {
        await dispatch(retriveRepoData({ question: currentInput }));
      } else if (actionType === "code") {
        await dispatch(getRepoCodeData({ question: currentInput }));
      }
    } catch {
      addChatMessage("system", Retrive_repo_data.FAILED_TO_RETRIVE_DATA, actionType);
    } finally {
      setLoading(false);
      // setInputField("");
    }
  }, [inputField, dispatch, addChatMessage]);

  return (
    <Container fluid className="w-100">
      <div className="flex-grow-1 w-100vw tab-content-custom">
        <div className="flex-grow-1">
          <div
            className="border rounded p-5 shadow-lg custom-scroll-container"
            style={{ overflowY: 'auto', overflowX: 'hidden',   }}
          >
            {chatMessages.length === 0 && (
              <div className="text-center text-muted" style={{ fontSize: '13px' }}>
                Start by asking a question.
              </div>
            )}

            {chatMessages.map((chat, index) => (
              <div
                key={index}
                className={`mb-4 ${chat.sender === "user" ? "text-end" : "text-start"}`}
                style={{
                  fontSize: '13px',
                  maxWidth: '90%',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  marginLeft: chat.sender === "user" ? 'auto' : '0',
                  marginRight: chat.sender === "user" ? '0' : 'auto'
                }}
              >
                <div className="d-inline-block" style={{ maxWidth: '100%' }}>
                  {chat.type === "code" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {`\`\`\`java\n${chat.message}\n\`\`\``}
                    </ReactMarkdown>
                  ) : chat.type === "explain" && typeof chat.message === "object" ? (
                    <div>
                      <h6><strong>Overview:</strong></h6>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                      >
                        {chat.message.overview}
                      </ReactMarkdown>
                      <hr />
                      <h6><strong>Detailed Explanation:</strong></h6>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                      >
                        {chat.message.detailedExplanation}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {chat.message}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex flex-column mt-2 gap-2 max-w-90">
            <div>
              <Form.Control
                as="textarea"
                placeholder="Ask a question..."
                value={inputField}
                onChange={handleInputChange}
                isInvalid={!!error}
                style={{ minHeight: '60px', resize: 'none', fontSize: '13px' }}
                className="custom-textarea"
              />
              {error && (
                <Form.Control.Feedback type="invalid" className="d-block mt-1" style={{ fontSize: '13px' }}>
                  {error}
                </Form.Control.Feedback>
              )}
            </div>

            <div className="d-flex gap-2 mb-2">
              <Button
                onClick={() => handleSubmit("explain")}
                className="btn btn-secondary px-3 custom-button"
                disabled={loading}
                style={{ fontSize: '13px' }}
              >
                {loading ? "Loading..." : homePageTextSamples.EXPLAIN}
              </Button>
              <Button
                onClick={() => handleSubmit("code")}
                className="btn btn-secondary px-3 custom-button"
                disabled={loading}
                style={{ fontSize: '13px' }}
              >
                {loading ? "Loading..." : homePageTextSamples.GET_CODE}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
