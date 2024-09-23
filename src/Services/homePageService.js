import { Api } from "../Interceptor/interceptor";
import { ENDPOINT_FULL_QA } from "../Utils";

export const fetchData =  (payload) => {
      const response =  Api.post(ENDPOINT_FULL_QA, payload);
      return Promise.resolve(response);
  
  };


export const downloadImageService = async (imageName) => {
  try {
    
    const imageUrl = "http://0.0.0.0:9000/"+imageName; 

    const response = await Api.get(imageUrl, {
      responseType: 'blob', // Important to specify blob type to handle binary data
    });

    // Create a URL for the Blob object
    const imageBlobUrl = window.URL.createObjectURL(new Blob([response.data]));

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = imageBlobUrl;
    link.setAttribute('download', imageName); // Set the download attribute with the image name
    document.body.appendChild(link);
    link.click(); // Trigger the download
    link.remove(); // Clean up by removing the anchor element

    // Optionally revoke the Blob URL after the download
    window.URL.revokeObjectURL(imageBlobUrl);
  } catch (error) {
    console.error('Failed to download image', error);
  }
};

  


