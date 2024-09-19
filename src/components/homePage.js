import { Col, Container, Form, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BootstrapSidebar } from "./sideNav";
import { HeaderComponent } from "./header";
import { useState, useEffect } from "react";
import { cleanAndFormatResponse, response, TextDisplay } from "../Utils";
import { fetchData } from "../Services/homePageService";
import { PdfModal } from "./modalBox";
import { PDFmaker } from "./pdfMaker";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Snackbar } from "@mui/material";
import { downloadImageService } from "../Services/homePageService";
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { incrementCounter } from '../actions/questionActions'; 
import { fetchAnswersList } from "../actions/questionActions";
import { homePageTextSamples } from "../utils/constatnts";

export function HomePage() {
	const [formFields, setFormFields] = useState([{ text: "" }]);
	 const dispatch = useDispatch();

  const answerData = useSelector((state) => state.answersData);

  const handleIncrementCounter = () => {
    dispatch(incrementCounter());
  };
     
  const [filterQueries, setFilterQueries] = useState({}); // State for filter queries


  const handleSearchInputChange = (index, event) => {
    setFilterQueries((prevQueries) => ({
      ...prevQueries,
      [index]: event.target.value.toLowerCase(),
    }));
  };

	const [textFlag, setTextflag] = useState(false);
	const [imagesList, setImages] = useState([]);
	const [index, setIndex] = useState(null);
	const [vertical, setVertical] = useState("bottom");
	const [horizontal, setHorizontal] = useState("right");
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("text");
	const [showModal, setShowModal] = useState(false);
	const [responseText, setresponseText] = useState("");
	const [color, setColor] = useState("green");
	const [inputField, setInputField] = useState();

	const handleInputChange = (index, event) => {
		const values = [...formFields];
		values[index][event.target.name] = event.target.value;
		setFormFields(values);
		setInputField(values); 

	};
	const handleAddField = () => {
		setFormFields([...formFields, { text: "" }]);
	};

	const [response, setResponse] = useState([]);
	const [tableHtml,setTableHtml] = useState("");
	useEffect(() => {
		console.log("answerData>>>all", answerData.answers);
	
		if (answerData.answers && answerData.answers.length > 0) {
			const newFormFields = answerData.answers.map(answer => ({ text: answer.text }));
			if (newFormFields[newFormFields.length - 1].text !== "") {
				newFormFields.push({ text: "" });
			}
			setFormFields(newFormFields);
			setResponse(answerData.answers);
		} else {
			setFormFields([{ text: "" }]);
		}
	}, [answerData]);
	

	

	const submitQuestion = (field,index) => {
		
		let payload = new FormData();
		payload.set("text", field?.text);
	    dispatch(fetchAnswersList(payload, index))

		// .then((resp) => {
		// 	if (resp) {
		// 		if(response[index] !== undefined && response[index] !== null) {
		// 			console.log("if1");
		// 			let tempVar = response;
		// 			tempVar[index] = resp?.data;
		// 			console.log("tempVar>>>", tempVar);

		// 			setResponse(tempVar);
		// 		}
		// 		else{
		// 			console.log("else?>");
					
		// 			let tempVar = response;
		// 			tempVar.push(resp?.data);
		// 			setResponse(tempVar);
		// 			setIndex(response[0])
		// 			handleAddField();
				
		// 		}
		// 		//setImages(response[0]["images"]);
		// 		console.log('response from api',resp?.data);
				
		// 		setTableHtml(resp?.data?.table)
				
		// 	}
			
		// })
		// fetchData(payload).then(
		// 	(resp) => {
		// 		console.log("....",resp,response[index],index);
				
		// 		// if (resp) {
				
		// 		// 	if(response[index] !== undefined && response[index] !== null) {
		// 		// 		let tempVar = response;
		// 		// 		tempVar[index] = resp?.data;
		// 		// 		setResponse(tempVar);
		// 		// 	}
		// 		// 	else{
						
		// 		// 		let tempVar = response;
		// 		// 		tempVar.push(resp?.data);
		// 		// 		setResponse(tempVar);
		// 		// 		setIndex(response[0])
		// 		// 		handleAddField();
					
		// 		// 	}
		// 		// 	//setImages(response[0]["images"]);
		// 		// 	console.log('response from api',resp?.data);
					
		// 		// 	setTableHtml(resp?.data?.table)
					
		// 		// }
		// 		console.log(("response checking previous", response));
		// 	},
		// 	(error) => {
		// 		setColor("red");
		// 		handleOpen();
		// 	}
			
		// );
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
		}, 5000);
	};
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Open modal
	const openModal = () => {
		setIsModalOpen(true);
	};

	// Close modal
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const [isSimilarityModalOpen, setIsSimilarityModalOpen] = useState(false);

	// Open modal
	const openSimilarityModal = () => {
		setIsSimilarityModalOpen(true)
		
	};

	// Close modal
	const closeSimilarityModal = () => {
		setIsSimilarityModalOpen(false);
	};

	const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
	const[relevantPdfIndex,setRelevantPdfIndex] = useState(0);
	const[similarityPdfIndex, setSimilarityPdfIndex] = useState(0);

	// Open modal
	const openImagesModal = () => {
		setIsImagesModalOpen(true);
		console.log("-----", response[0]["images"]);
		
	};

	// Close modal
	const closeImagesModal = () => {
		setIsImagesModalOpen(false);
	};

	const test = () => {
		setIndex("");
		// setShowModal(true);
	};

	const downloadImages = (index)=>{

		response[index]?.images?.forEach(element => {			
		downloadImageService(element);
		});
	}

	const filteredData = (data, query) =>
		data.filter(
		  (item) =>
			item?.Document.toLowerCase().includes(query) ||
			item?.Name.toLowerCase().includes(query) ||
			item?.Link.toLowerCase().includes(query)
		);

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
			<Row style={{ height: "10vh" }}>
				<HeaderComponent></HeaderComponent>
			</Row>
		
			
			<Form>
				<div className="w-100 mt-3" style={{ height: "82vh" }}>
					<div style={{ width: "10%" }}>
						<BootstrapSidebar></BootstrapSidebar>
					</div>
					<Modal
						isOpen={isModalOpen}
						onRequestClose={closeModal}
						contentLabel="PDF Viewer"
						style={{
							content: {
								width: "80%",
								height: "80%",
								margin: "auto",
							},
						}}
					>
						{/* Close button */}
						<button onClick={closeModal} style={{ float: "right" }} className="btn btn-primary mb-1">
							{homePageTextSamples.CLOSE}
						</button>

						{/* Iframe to display PDF */}
						<iframe
							src={"http://3.135.9.244:8000/"+response[relevantPdfIndex]?.context_pdf}
							width="100%"
							height="100%"
							title="PDF Viewer"
						/>
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
							},
						}}
					>
						{/* Close button */}
						<button onClick={closeSimilarityModal} style={{ float: "right" }} className="btn btn-primary mb-1">
							{homePageTextSamples.CLOSE}
						</button>

						{/* Iframe to display PDF */}
						<iframe
							src={"http://3.135.9.244:8000/"+response[relevantPdfIndex]?.relevant_pdf}
							width="100%"
							height="100%"
							title="PDF Viewer"
						/>
					</Modal>
					<Modal
						isOpen={isImagesModalOpen}
						onRequestClose={closeImagesModal}
						contentLabel="Image Modal"
					>
						<button onClick={closeImagesModal} className="btn btn-primary mb-3" style={{ float: "right" }} >Close</button>
						{/* <button></button> */}
						<div className="modal-content p-3 d-flex">
							{response[relevantPdfIndex]?.images?.length==0 &&<span className="w-100 d-flex justify-content-center" style={{fontWeight:'bolder',fontSize:'16px'}}>No Images Found</span>}
						{response[relevantPdfIndex]?.images?.map((image, index) => (
							<img
							key={"http://3.135.9.244:8000/"+image
							}
							src = {"http://3.135.9.244:8000/"+image}
							alt={`Image ${index}`}
							className="modal-image "
							/>
						))}
						</div>
					</Modal>
					<div className="col-11   h-100 ms-5 mb-5 pb-4">
						<div
							className="card d-flex h-100 question-card ms-4"
							style={{ overflowY: "scroll" }}
						>
							{formFields.map((field, index) => (
								<>
									<div class="form-group w-75 d-flex mt-5 ms-5">
										<input
											type="text"
											className="form-control question-box"
											key={index}
											placeholder="Enter Question"
											name="text"
											// value={field.text}
											value={inputField ? inputField[index]?.text || field.text : field.text}
                                            onKeyDown={(event) => {
												if (event.key === 'Enter') {
												  event.preventDefault(); 
												  submitQuestion(field,index)
												  
												}
											  }}
											onChange={(event) =>
												handleInputChange(index, event)
											}
										/>
										<Button
											className="ms-5"
											onClick={() =>
												submitQuestion(field,index)
											}
										>
											{homePageTextSamples.SUBMIT_BUTTON}
										</Button>
									</div>
									{response.length > 0 && !response[index] &&<div className="mb-5"></div>}
									{response.length > 0 && response[index] && (
										<div className="card w-75 mt-3 ms-5  text-style p-2">
											<p
												className="text-style ms-2 me-2"
												id={`item-${field}`}
											>
												{" "}
												<TextDisplay
													text={
														response[index]?.text2
													}
												></TextDisplay>
											</p>
										</div>
									)}
									{response.length > 0 && response[index] && (
										<div className="ms-5 w-75">
											<p className="heading-style mt-2">
												{homePageTextSamples.HYPERLINKS}
											</p>
											<hr className="hr-line"></hr>
											
											 <input
                                               placeholder="search for link"
                                               className="w-100 form-control question-box"
                                               value={filterQueries[index] || ''}
                                               onChange={(event) => handleSearchInputChange(index, event)}
                                             />
											<Table
												responsive
												className="mt-2 w-100"
											>
												<thead className=" w-100">
												    <tr className="table-header w-100 ">
														<th className="table-header" >
															Document{" "}
														</th>
														<th className="table-header">
															Page&nbsp;No
														</th>
														<th className="table-header">
															Name{" "}
														</th>
														<th className="table-header">
															Link{" "}
														</th>
													</tr>
												</thead>
												<tbody>
												{filteredData(response[index]?.table || [], filterQueries[index] || '').map((value,index)=>(
													<tr>
														<td>{value?.Document}</td>
														<td>{value?.PageNo || '-'}</td>
														<td>{value?.Name||'-'}</td>
														<td>
															<a href={value?.Link}>
																{value?.Link}
															</a>
														</td>
													</tr>
												))
}

												</tbody>
											</Table>
											{/* <div dangerouslySetInnerHTML={{ __html: tableHtml }} /> */}
										</div>
									)}
									{response.length > 0 && response[index] && (
										<div className=" ms-5 d-flex justify-content-center w-75 mt-3">
											<Button
												onClick={(e) => openModal()}
												className="button-style"
											>
												{homePageTextSamples.VIEW_SIMILARITY}
												</Button>
											<Button
													className="ms-3 button-style"
													onClick={(e) => {openSimilarityModal()
														setRelevantPdfIndex(index);
													}
													}
												>
													{homePageTextSamples.VIEW_REVELANT}
												</Button>

											{/* <PDFDownloadLink
												document={
													<PDFmaker
														response={
															response[index]
																?.text2
														}
														type="text"
													></PDFmaker>
												}
												fileName="form"
											>
												{" "}
												<Button
													className="ms-3 button-style"
													onClick={() =>
														downloadPdf(
															`ss already in useitem-${field}`
														)
													}
												>
													View PDF - Similairty
												</Button>
											</PDFDownloadLink> */}
											<Button
												className="ms-3 button-style"
												onClick={(e) =>{ openImagesModal()
													setRelevantPdfIndex(index)
												}
												}
											>
												{" "}
												{homePageTextSamples.OPEN_IMAGES}
											</Button>
											{/* <PDFDownloadLink
												document={
													<PDFmaker
														response={
															response[index]
																?.text2
														}
														type="image"
													></PDFmaker>
												}
												fileName="form"
											>
												<Button className="ms-3 button-style">
													Download images{" "}
												</Button>
											</PDFDownloadLink> */}
											<Button className="ms-3 button-style" onClick={()=>downloadImages(index)}>{homePageTextSamples.DOWNLOAD_IMAGES}</Button>
										</div>
									)}
								</>
							))}
						</div>
					</div>
				</div>
			</Form>
			<div className="position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded">
				<span
					style={{
						color: "white",
					}}
				>
					@Bilvantis 2024{" "}
				</span>
			</div>
		</Container>
	);
}
