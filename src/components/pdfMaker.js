import React, { useEffect, useState } from "react";
import { Document, Page, Text, StyleSheet, View, Image } from '@react-pdf/renderer';
import { cleanAndFormatResponse } from "../Utils";
import image1 from '../Assets/image_3.png';
import image2 from '../Assets/image_4.png';

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 45,
        paddingHorizontal: 35,
    },
    text: {
        margin: 12,
        fontSize: 12,
        fontFamily: 'Times-Roman',
        textAlign:'justify'
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 0, // Make sure this is consistent across all pages
        left: 0,
        right: 0,
        textAlign:'right',
        color: 'grey',
    },
    images:{
        paddingTop: 35,
        paddingBottom: 45,
        width:'250px',
        paddingLeft:0,
        paddingRight:0

    }
});




export function PDFmaker({ response, type }) {
    const[imagesList,setImages] = useState([]);

    useEffect(() => {
        const imagesArray = [];

        for (let index = 0; index < 8; index++) {
            imagesArray.push(image1);
            imagesArray.push(image2);
        }

        setImages(imagesArray);
    }, [type]);
    return (
        <Document>
          <Page size="A4" style={styles.body}>
   {type == 'text'&&<View style={{ flexGrow: 1 }}>
        <Text style={styles.text}>{cleanAndFormatResponse(response)}</Text>
    </View>}
    {type === 'image' && (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap',flexGrow: 1 }}>
                        {imagesList.map((img, index) => (<>
                            <Image key={index} src={img} style={styles.images} />
                            </>
                        ))}
                    </View>
                )}

    <View fixed>
        {/* <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} /> */}
    </View>
</Page>

        </Document>
    );
}
