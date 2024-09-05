import { Col, Container, Form, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BootstrapSidebar } from "./sideNav";
import { HeaderComponent } from "./header";
import { useState } from "react";
import { cleanAndFormatResponse, response, TextDisplay } from "../Utils";
import { fetchData } from "../Services/homePageService";
import { PdfModal } from "./modalBox";
import { PDFmaker } from "./pdfMaker";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Snackbar } from "@mui/material";
import Modal from "react-modal";

export function HomePage() {
	const [formFields, setFormFields] = useState([{ text: "" }]);

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

	const handleInputChange = (index, event) => {
		const values = [...formFields];
		values[index][event.target.name] = event.target.value;
		setFormFields(values);
	};
	const handleAddField = () => {
		setFormFields([...formFields, { text: "" }]);
	};

	const [response, setResponse] = useState([]);

	const submitQuestion = (field) => {
		console.log(formFields, field);

		let payload = new FormData();
		payload.set("text", field?.text);
		fetchData(payload).then(
			(resp) => {
				if (resp) {
					let tempVar = response;
					tempVar.push(resp?.data);
					setResponse(tempVar);
					handleAddField();
					console.log(tempVar);
					setImages(response[0]["images"]);
				}
			},
			(error) => {
				setColor("red");
				handleOpen();
			}
		);
	};
	const downloadPdf = () => {};
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
						<button onClick={closeModal} style={{ float: "right" }}>
							Close
						</button>

						{/* Iframe to display PDF */}
						<iframe
							src="/sample.pdf"
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
						<button onClick={closeSimilarityModal} style={{ float: "right" }}>
							Close
						</button>

						{/* Iframe to display PDF */}
						<iframe
							src="/abc.pdf"
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
						<button onClick={closeImagesModal}>Close</button>
						<div className="modal-content">
						{imagesList.map((image, index) => (
							<img
							key={index}
							src={`data:image/${image.filename.split('.').pop()};base64,${image.base64}`}
							alt={`Image ${index}`}
							className="modal-image"
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
											value={field.text}
											onChange={(event) =>
												handleInputChange(index, event)
											}
										/>
										<Button
											className="ms-5"
											onClick={() =>
												submitQuestion(field)
											}
										>
											Submit
										</Button>
									</div>
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
												Hyperlinks
											</p>
											<hr className="hr-line"></hr>
											<input
												placeholder="search for link "
												className="w-100 form-control question-box"
											></input>
											<Table
												responsive
												className="mt-2 w-100"
											>
												<thead className=" w-100">
													<tr className="table-header">
														<th className="table-header">
															Document{" "}
														</th>
														<th className="table-header">
															Page no{" "}
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
													<tr>
														<td>Test</td>
														<td>1</td>
														<td>test</td>
														<td>
															<a href="google.com">
																link
															</a>
														</td>
													</tr>
												</tbody>
											</Table>
										</div>
									)}
									{response.length > 0 && response[index] && (
										<div className=" ms-5 d-flex justify-content-center w-75 mt-3">
											<Button
												onClick={(e) => openModal()}
												className="button-style"
											>
												View PDF - Relevant
											</Button>
											<Button
													className="ms-3 button-style"
													onClick={(e) => openSimilarityModal()}
												>
													View PDF - Similairty
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
															`item-${field}`
														)
													}
												>
													View PDF - Similairty
												</Button>
											</PDFDownloadLink> */}
											<Button
												className="ms-3 button-style"
												onClick={(e) => openImagesModal()}
											>
												{" "}
												Open images
											</Button>
											<PDFDownloadLink
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
											</PDFDownloadLink>
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
