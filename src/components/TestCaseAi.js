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

export function TestCaseAi() {
    const [firstDropzoneState, setFirstDropzoneState] = useState({
        file: [],
    });
    const [secondDropzoneState, setSecondDropzoneState] = useState({
        file: [],
    });
    const [firstDropzoneErrors, setFirstDropzoneErrors] = useState("");
    const [secondDropzoneErrors, setSecondDropzoneErrors] = useState("");
    const [headers, setHeaders] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    console.log("===firstDropzoneErrorsfirstDropzoneErrors", firstDropzoneState, secondDropzoneState);

    const dispatch = useDispatch();
    const aiTestCaseData = useSelector((state) => state.aiTestCaseData);
    console.log("===aiTestCaseDataaiTestCaseData", aiTestCaseData);

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

            for (var pair of combinedFormData.entries()) {
                console.log("jjjjjjjjjjjjjjjjjj" + pair[0] + ', ' + pair[1]);
            }
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
            const fullUrl = `http://34.55.15.61/${filePath}`;


            fetch(fullUrl)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    console.log("===fullUrlfullUrl", fullUrl, res);
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
        setTableData(tableData.map(row => ({
            ...row,
            isSelected: checked
        })));
    };

    const handleSelectRow = (index, checked) => {
        const newData = [...tableData];
        newData[index].isSelected = checked;
        setTableData(newData);
        setSelectAll(newData.every(row => row.isSelected));
    };

    const handleExport = () => {
        const selectedData = tableData.filter(row => row.isSelected);
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

    const handleSendToBackend = async () => {
        try {
            const selectedData = tableData.filter(row => row.isSelected);

            const csvContent = [
                headers.join(','),
                ...selectedData.map(row =>
                    Object.values(row).slice(0, headers.length).join(',')
                ),
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });

            const file = new File([blob], "selected_data.csv", { type: 'text/csv' });

            const formData = new FormData();
            formData.append("test_case_file", file);
            const response = await dispatch(addAiCsvData(formData));

            if (response?.data) {
                console.log("aiTestCaseData?.aiCsv?.data222", aiTestCaseData?.aiCsv?.data);

                const { collection_file, data_file } = response.data;

                const downloadFile = async (url, filename) => {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch file from ${url}`);
                    }
                    const blob = await response.blob();
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };

                if (collection_file) {
                    await downloadFile(collection_file, "collection.json");
                }
                if (data_file) {
                    await downloadFile(data_file, "data.json");
                }
            } else {
                console.error("No data available in Redux.");
            }

        } catch (error) {
            console.error("Error sending data to backend:", error);
        }
    };


    const handleCellEdit = (index, field, value) => {
        const newData = [...tableData];
        newData[index] = {
            ...newData[index],
            [field]: value
        };
        setTableData(newData);
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
                <div className='h-100 ms-5 mb-5 pb-4 align-items-center'>
                    <div className='card pb-3 h-100 question-card ms-4 align-items-center' style={{ overflowY: 'scroll' }}>
                        <div className="d-flex justify-content-center gap-4">
                            <DropzoneSection
                                title="Upload Documentation Files"
                                dropzoneState={firstDropzoneState}
                                updateFiles={(files) => updateFiles(files, "first")}
                                removeFile={(index) => removeFile(index, "first")}
                                errors={firstDropzoneErrors}
                                required={true}
                            />

                            <DropzoneSection
                                title="Upload Backend Files"
                                dropzoneState={secondDropzoneState}
                                updateFiles={(files) => updateFiles(files, "second")}
                                removeFile={(index) => removeFile(index, "second")}
                                errors={secondDropzoneErrors}
                                required={true}
                            />
                        </div>

                        <Button
                            onClick={handleCombinedSubmit}
                            className="mt-5 primary text-white "
                            style={{ width: '15%' }}
                        >
                            Submit
                        </Button>
                        {headers.length > 0 && tableData.length > 0 ? (
                            <>
                                <div className="mt-4 p-4" style={{marginRight : '50%'}}>
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
                                                {headers.map((header) => (
                                                    <th key={header}>
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((row, rowIndex) => (
                                                <tr key={row.id}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={row.isSelected}
                                                            onChange={(e) => handleSelectRow(rowIndex, e.target.checked)}
                                                        />
                                                    </td>
                                                    {headers.map((header) => (
                                                        <td key={header}>
                                                            <input
                                                                type="text"
                                                                value={row[header]}
                                                                onChange={(e) => handleCellEdit(rowIndex, header, e.target.value)}
                                                                className="form-control"
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-between mt-4">
                                    <Button
                                        onClick={handleExport}
                                        className="btn-primary"
                                    >
                                        Export Selected CSV
                                    </Button>
                                    <Button
                                        onClick={handleSendToBackend}
                                        className="btn-success"
                                    >
                                        Send Selected Data to Backend
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p className="text-center mt-4">No data available</p>
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
        <div className="d-flex flex-column align-items-center mt-2 px-2 w-100">
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
                                <button
                                    type="button"
                                    className="text-danger"
                                    onClick={() => removeFile(index)}
                                >
                                    <FolderDeleteIcon fontSize="small" />
                                </button>
                            </div>
                        ))}
                    </Dropzone>

                    {errors && <p className="text-danger mt-1">{errors}</p>}
                </div>
            </div>
        </div>
    );
}
