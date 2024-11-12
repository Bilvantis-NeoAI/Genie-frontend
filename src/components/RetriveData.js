import React, { useState } from "react";
import { Button, Container, Row, Form } from "react-bootstrap";
import { HeaderComponent } from "./header";
import { BootstrapSidebar } from "./sideNav";
import { homePageTextSamples } from "../utils/constatnts";

export default function RetrieveData() {
  const [inputField, setInputField] = useState("");
  const [error, setError] = useState("");
  const [displayData, setDisplayData] = useState(false);
  const [Answer, setAnswer] = useState([]);
  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputField(value);
    if (error) setError("");
  };
  const data = [
    {
      Source: "GenieRepo",
      Content: "When the onSubmit function is called, it checks if the inputField is empty. If empty, an error message is displayed using Form.Control.Feedback."
    },
    {
      Source: "Solarwinds",
      Content: "This content comes from Solarwinds. It describes the purpose of the onSubmit function and form error handling."
    },
    {
      Source: "React",
      Content: "Additional React-related content regarding the onSubmit function and empty input checks."
    }
  ];

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputField.trim() === "") {
      setError("This field cannot be empty");
      setDisplayData(false);
    } else {
      setDisplayData(true);
      setAnswer(data.slice(0, 2));
      setError("");
    }
  };

  return (
    <div>
      <Container className="w-100" fluid style={{ height: "100vh" }}>
        <Row style={{ height: "10vh" }}>
          <HeaderComponent />
        </Row>
        <div className="w-100 mt-3" style={{ height: "82vh" }}>
          <div style={{ width: "10%" }}>
            <BootstrapSidebar />
          </div>
          <div className="form-group w-75 d-flex flex-column mt-5 ms-5">
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formQuestion">
                <Form.Control
                  type="text"
                  className="form-control question-box"
                  placeholder="Enter Question"
                  value={inputField}
                  onChange={handleInputChange}
                  isInvalid={!!error}
                />
                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
              </Form.Group>
              <Button className="mt-3 buttons-colour" type="submit">
                {homePageTextSamples.SUBMIT_BUTTON}
              </Button>
            </Form>
            {displayData && (
              <div className="mt-4">
                {Answer.map((item, index) => (
                  <div key={index} className="mb-3">
                    {Object.entries(item).map(([key, value]) => (
                      <p key={key}><strong>{key}:</strong> {value}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
