import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import { useState, useEffect } from 'react';
import { Dropzone } from "@files-ui/react";
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import { homePage1TextSamples } from '../utils/constatnts';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addAiDocument, addAiCsvData } from '../actions/aiTestCasesActions';
import Papa from 'papaparse';
import { IP } from '../utils/config'
export function TestCaseAi() {
    const [firstDropzoneState, setFirstDropzoneState] = useState({
        file: [],
    });
    const [secondDropzoneState, setSecondDropzoneState] = useState({
        file: [],
    });
    const [selectedType, setSelectedType] = useState("collection");
    const dataTypes = ["collection", "python", "curl"];

    const [firstDropzoneErrors, setFirstDropzoneErrors] = useState("");
    const [secondDropzoneErrors, setSecondDropzoneErrors] = useState("");
    const [headers, setHeaders] = useState([]);
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [tableData, setTableData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [fileContent, setFileContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [feedback, setFeedback] = useState("");
    const dispatch = useDispatch();

    const aiTestCaseData = useSelector((state) => state.aiTestCaseData);
    const updateFiles = (incomingFiles, dropzone) => {
        if (dropzone === "first") {
            setFirstDropzoneState((prevState) => ({
                ...prevState,
                file: incomingFiles,
            }));
            if (incomingFiles.length > 0) setFirstDropzoneErrors("");
        } else {
            setSecondDropzoneState((prevState) => ({
                ...prevState,
                file: incomingFiles,
            }));
            if (incomingFiles.length > 0) setSecondDropzoneErrors("");
        }
    };

    const removeFile = (index, dropzone) => {
        if (dropzone === "first") {
            setFirstDropzoneState((prevState) => {
                const newFiles = prevState.file.filter((_, i) => i !== index);
                return { ...prevState, file: newFiles };
            });
        } else {
            setSecondDropzoneState((prevState) => {
                const newFiles = prevState.file.filter((_, i) => i !== index);
                return { ...prevState, file: newFiles };
            });
        }
    };

    const handleCombinedSubmit = async () => {
        let hasErrors = false;

        if (firstDropzoneState.file.length === 0) {
            setFirstDropzoneErrors(homePage1TextSamples.FILES_REQUIRED);
            hasErrors = true;
        }
        if (secondDropzoneState.file.length === 0) {
            setSecondDropzoneErrors(homePage1TextSamples.FILES_REQUIRED);
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            const combinedFormData = new FormData();
            firstDropzoneState.file.forEach((fileObj) => {
                if (fileObj.file) {
                    combinedFormData.append("csv_file", fileObj.file);
                } else {
                    console.error("File is undefined in first dropzone", fileObj);
                }
            });
            secondDropzoneState.file.forEach((fileObj) => {
                if (fileObj.file) {
                    combinedFormData.append("code_file", fileObj.file);
                } else {
                    console.error("File is undefined in second dropzone", fileObj);
                }
            });
            combinedFormData.append("output_type", selectedType);

            const response = await dispatch(addAiDocument(combinedFormData));

            if (response?.status === 200) {
                toast.success('All documents added successfully!');
                setFirstDropzoneState({ file: [] });
                setSecondDropzoneState({ file: [] });
            } else {
                toast.error('Failed to upload documents.');
            }
        } catch (error) {
            toast.error('An error occurred while adding the documents.');
            console.error('Upload error:', error);
        }
    };


    useEffect(() => {
        if (aiTestCaseData?.aiDocument?.data?.test_case_file_path) {
            const filePath = aiTestCaseData.aiDocument.data.test_case_file_path;
            const fullUrl = `${IP}test_ai/${filePath}`;


            fetch(fullUrl)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.text();
                })
                .then((text) => {
                    const parsedData = Papa.parse(text, { header: true });
                    setHeaders(parsedData.meta.fields);
                    const formattedData = parsedData.data.map((row) => ({
                        ...row,
                        isSelected: false,
                    }));
                    setTableData(formattedData);
                })
                .catch((error) =>
                    console.error(`Error fetching CSV from test_case_file_path:`, error)
                );
        }
    }, [aiTestCaseData]);
    
    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        if (checked) {
            setSelectedRows(new Set(tableData.map((_, idx) => idx)));
        } else {
            setSelectedRows(new Set());
        }
    };
    const handleSelectRow = (index, checked) => {
        const updated = new Set(selectedRows);
        if (checked) {
            updated.add(index);
        } else {
            updated.delete(index);
        }
        setSelectedRows(updated);
        setSelectAll(updated.size === tableData.length);
    };

    const handleExport = () => {
        const selectedData = tableData.filter((_, idx) => selectedRows.has(idx));
        console.log("selectedData handleExport",selectedData);
        const csvContent = [
            headers.join(','),
            ...selectedData.map(row => Object.values(row).slice(0, headers.length).join(','))
        ].join('\n');
 
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "selected_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleCellEdit = (index, field, value) => {
        const newData = [...tableData];
        newData[index] = {
            ...newData[index],
            [field]: value
        };
        setTableData(newData);
    };
    const handleSendToBackend = async () => {
        try {
            const selectedData = tableData.filter((_, idx) => selectedRows.has(idx));
            console.log("selectedData",selectedData);
            
            if (selectedData.length === 0) {
                console.warn("No rows selected.");
                return;
            }

            const csvContent = [
                headers.join(','),
                ...selectedData.map(row => headers.map(h => row[h] ?? '').join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const file = new File([blob], "selected_data.csv", { type: 'text/csv' });

            const formData = new FormData();
            formData.append("test_cases_file", file);

            const response = await dispatch(addAiCsvData(formData));
            if (response?.data?.output_file_path) {
                const fileUrl = `${IP}test_ai/${response.data.output_file_path}`;
                const fileResponse = await fetch(fileUrl);
                const content = await fileResponse.text();
                setFileContent(content);
                setFileName(response.data.output_file_path);
            }

        } catch (err) {
            console.error("Error sending to backend:", err);
        }
    };

    
    const handleSubmit = async () => {
        setIsLoading(true); // Start loader
        try {
            const token = sessionStorage.getItem("access_token");
            const formData = new FormData();
            formData.append("test_file", new Blob([fileContent], { type: 'text/plain' }));
            formData.append("modification_text", feedback);
    
            const response = await fetch(`${IP}test_ai/modify_test_file`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
    
            const data = await response.json();
            console.log("AI Test Case Data:", data);
    
            if (data?.output_file_path) {
                const fetchFileContent = async (url) => {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`Failed to fetch file from ${url}`);
                    return await response.text();
                };
    
                const fileUrl = `${IP}test_ai/${data.output_file_path}`;
                const content = await fetchFileContent(fileUrl);
    
                console.log("content>>>", content);
                setFeedback(""); // clear feedback
                setFileContent(content);
                setFileName(data.output_file_path);
            } else {
                console.error("No data available from backend.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        } finally {
            setIsLoading(false); // Stop loader
        }
    };
    

    const handleDownload = () => {
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName || "downloaded_file.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <Container fluid className='w-100' style={{ height: '100vh' }}>
            <Row style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                <HeaderComponent />
            </Row>
            <div className="w-100 mt-3" style={{ height: '82vh' }}>
                <div style={{ width: '10%' }}>
                    <BootstrapSidebar />
                </div>
                <div className='card pb-3 h-100 ' style={{ overflowY: 'scroll', marginLeft: '8%', marginRight: '2%', fontSize: '15px' }}>
                    <div className="col-12 d-flex">
                        <div className='col-6'>
                            <DropzoneSection
                                title={<span className="dropzone-title">Upload Feature Files</span>}
                                dropzoneState={firstDropzoneState}
                                updateFiles={(files) => updateFiles(files, "first")}
                                removeFile={(index) => removeFile(index, "first")}
                                errors={firstDropzoneErrors}
                                required={true}
                            />
                        </div>
                        <div className='col-5'>
                            <DropzoneSection
                                title={<span className="dropzone-title">Upload OpenAPI Config/Backend Files</span>}
                                dropzoneState={secondDropzoneState}
                                updateFiles={(files) => updateFiles(files, "second")}
                                removeFile={(index) => removeFile(index, "second")}
                                errors={secondDropzoneErrors}
                                required={true} />
                        </div>
                    </div>
                    <div className="col-md-8 ms-4 mt-5 d-flex align-items-center gap-3">
                        <label className="mb-0" style={{  }}>
                            Select Data Type:
                        </label>

                        <select
                            className="form-select form-select-sm"
                            style={{ flex: 1 }}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            {dataTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        <Button
                            onClick={handleCombinedSubmit}
                            className="btn btn-primary text-white"
                            style={{ width: "15%" }}
                        >
                            Submit
                        </Button>
                    </div>

                    {headers.length > 0 && tableData.length > 0 ? (
                <>
                    <div className="mt-4 p-4" style={{ width: '100%' }}>
                        <table className="table table-bordered w-100">
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                        />
                                    </th>
                                    {headers.map(header => (
                                        <th key={header}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody style={{ width: "100%", fontSize: "12px" }}>
                                {tableData.map((row, rowIndex) => (
                                    <tr key={row.id || rowIndex} className={selectedRows.has(rowIndex) ? "table-active" : ""}>
                                        <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.has(rowIndex)}
                                                onChange={(e) => handleSelectRow(rowIndex, e.target.checked)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </td>
                                        {headers.map(header => (
                                            <td key={header}>
                                                <input
                                                    type="text"
                                                    value={row[header]}
                                                    onChange={(e) => handleCellEdit(rowIndex, header, e.target.value)}
                                                    className="table-cell-input"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-between mt-4 gap-3 ms-4">
                        <Button onClick={handleExport} className="btn-primary">
                            Export Selected CSV
                        </Button>
                        <Button onClick={handleSendToBackend} className="btn-success">
                            Generate Test Cases
                        </Button>
                    </div>
                </>
            ) : (
                <p className="text-center mt-4" style={{ marginLeft: '20%' }}>
                    No data available
                </p>
            )}
    
                   <div className="position-relative container">
    {isLoading && (
        <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
           
        >
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )}

    {fileContent && (
        <div className="row g-4 mt-3 ms-1">
            <div className="">
                <div className="p-4 bg-dark text-white rounded shadow">
                    <h5 className="mb-3">Processed File</h5>
                    <textarea
    value={fileContent}
    readOnly
    className="form-control bg-black text-white font-monospace"
    style={{
        height: '350px',
        marginLeft: '12%',
        resize: 'none',           // 🔒 disables manual resizing
        overflowY: 'auto'         // enables scrolling if content overflows
    }}
/>

                    <button
                        onClick={handleDownload}
                        className="btn btn-success mt-3"
                        style={{ marginLeft: '12%' }}
                    >
                        Download File
                    </button>
                    <h5 className="mb-3 mt-5" style={{ marginLeft: '12%' }}>Feedback</h5>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write your feedback here..."
                        className="form-control bg-light text-dark font-monospace resize-none border custom-textarea"
                        style={{ height: '30%', marginLeft: '12%' }}
                    />
                    <button
                        onClick={handleSubmit}
                        className="btn btn-primary mt-3"
                        style={{ marginLeft: '12%' }}
                        disabled={isLoading}
                    >
                        Submit Feedback
                    </button>
                </div>
            </div>
        </div>
    )}
</div>


                </div>
            </div>
            <ToastContainer />
        </Container>
    );
}

function DropzoneSection({ title, dropzoneState, updateFiles, removeFile, errors, required }) {
    return (
        <div className="d-flex flex-column align-items-center mt-2 px-2 w-100 ms-3">
            <div className="max-w-xs bg-white shadow-sm rounded-md p-3 border border-gray-200">
                <div className="mb-3">
                    <div className="d-flex justify-content-between">
                        <h3 className="text-sm font-weight-bold">{title}</h3>
                        {required && <span className="text-danger">*</span>}
                    </div>

                    <Dropzone
                        onChange={updateFiles}
                        value={dropzoneState.file}
                        className="mt-2 border-2 border-dashed border-primary rounded p-2 bg-light"
                        accept=".pdf, .docx, .pptx, .jpg, .jpeg, .png, .bmp, .tiff, .svg, .csv, .xlsx"
                    >
                        {dropzoneState.file.map((file, index) => (
                            <div
                                key={file.name}
                                className="d-flex justify-content-between p-1 bg-light rounded mb-1"
                            >
                                <p className="text-muted text-truncate" style={{ maxWidth: '120px' }}>
                                    {file.name}
                                </p>
                            </div>
                        ))}
                    </Dropzone>

                    {errors && <p className="text-danger mt-1">{errors}</p>}
                </div>
            </div>
        </div>
    );
}
