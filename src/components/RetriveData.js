import React, { useState } from "react";
import { Button, Container, Row, Form } from "react-bootstrap";
import { HeaderComponent } from "./header";
import { BootstrapSidebar } from "./sideNav";
import { homePageTextSamples } from "../utils/constatnts";
import downloadIcon from "../Assets/downloadIcon.svg"
export default function RetrieveData() {
  const [inputField, setInputField] = useState("");
  const [error, setError] = useState("");
  const [displayData, setDisplayData] = useState(false);
  const [Answer, setAnswer] = useState([
    {
      Source: "GenieRepo",
      Content: "This is sample content from GenieRepo. This is sample content from GenieRepo.This is sample content from GenieRepo.This is sample content from GenieRepo. This is sample content from GenieRepo.",
    },
    {
      Sourceh: "Solarwinds",
      Content: "This is sample content from Solarwinds.",
    },
    {
      Source: "React",
      Content: "This is sample content from React.",
    },
    {
      Source: "React",
      Content: "This is sample content from React.",
    },
    {
      Source: "React",
      Content: "This is sample content from React.",
    },
  ]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputField(value);
    if (error) setError("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputField.trim() === "") {
      setError("This field cannot be empty");
      setDisplayData(false);
    } else {
      setDisplayData(true);
      setError("");
    }
  };
  const handleDownload = (item) => {
    const content = Object.entries(item)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.Source}_data.txt`;
    link.click();

    URL.revokeObjectURL(url);
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
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
              <Button className="mt-3 buttons-colour" type="submit">
                {homePageTextSamples.SUBMIT_BUTTON}
              </Button>
            </Form>

            {displayData && (
              <div className="mt-4">
                <table className="table table-bordered">
                  <tbody>
                    {Answer.slice(0, 3).map((item, index) => (
                      <tr key={index}>
                        <td>
                        <div className=" d-flex justify-content-end" onClick={() => handleDownload(item)}>
                           <img src={downloadIcon} alt="" className="downloadbutton"/>
                           </div>
                          {Object.entries(item).map(([key, value]) => (
                            <div key={key}>
                              <strong>{key}:</strong> {value}
                            </div>
                          ))}
                          <td></td>
                        </td>
                      </tr>
                    ))}
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
