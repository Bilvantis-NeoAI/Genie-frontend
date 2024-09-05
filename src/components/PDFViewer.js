import React, { useEffect, useState } from "react";
import { pdf } from '@react-pdf/renderer';
import { PDFmaker } from "./pdfMaker";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

export function PDFViewerComponent({ response, type }) {
    const [pdfBlob, setPdfBlob] = useState(null);

    useEffect(() => {
        const generatePdf = async () => {
            const blob = await pdf(<PDFmaker response={response} type={type} />).toBlob();
            setPdfBlob(blob);
        };

        generatePdf();
    }, [response]);

    if (!pdfBlob) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ height: '80vh', width: '100%' }}>
           <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                {/* <Viewer
                    fileUrl={URL.createObjectURL(pdfBlob)}
                    plugins={[defaultLayoutPluginInstance]}
                    scrollMode={ScrollMode.Vertical}
                /> */}
                <div
    style={{
    
        height: '750px',
    }}
    className="mt-2"
>
    <Viewer     fileUrl='../' />
</div>
            </Worker>
        </div>
    );
}
