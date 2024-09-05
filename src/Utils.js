import { Text } from "@react-pdf/renderer";

export let response = "To connect Django (a Python web framework) with React (a JavaScript library for building user interfaces), you can follow these general steps:\n\n1. Set up a Django project: Start by creating a new Django project using the `django-admin` command or a Django project template. This will create the necessary files and directories for your Django backend.\n\n2. Create a Django app: Inside your Django project, create a new Django app using the `python manage.py startapp` command. This app will contain the backend logic and API endpoints for your application.\n\n3. Set up Django REST framework: Install Django REST framework (`pip install djangorestframework`) to build a RESTful API in Django. This will allow your React frontend to communicate with the Django backend through API calls.\n\n4. Build API endpoints: Define your API endpoints in Django views using Django REST framework's `APIView` or `ViewSet` classes. These endpoints will handle requests from your React frontend and return JSON data.\n\n5. Set up React frontend: Create a new React project using `create-react-app` or any other preferred method. This will generate the necessary files and dependencies for your React frontend.\n\n6. Make API requests from React: In your React components, use libraries like `axios` or the built-in `fetch` API to make HTTP requests to your Django backend. You can fetch data from the Django API endpoints and update your React components accordingly.\n\n7. Render React components in Django templates: In your Django templates, include the necessary HTML and JavaScript code to render your React components. You can use tools like Webpack or Babel to compile and bundle your React code into a single JavaScript file that can be included in your Django templates.\n\n8. Test and debug: Test your application by running both the Django backend and React frontend simultaneously. Make sure the API requests are working correctly and that the data is being displayed in your React components as expected.\n\nThese are the general steps to connect Django and React. However, the specific implementation details may vary depending on your project requirements and preferences. It's also worth considering using Django REST framework's built-in support for React, such as the `django-rest-framework-reactive` package, which provides additional integration features.\n\nI hope this helps you get started! Let me know if you have any further questions";



// export const response = "The SootDiff process for comparing Java programs is a sophisticated method designed to detect differences between various versions of Java programs. Here is an elaborate explanation of the process:\n\n- **Intermediate Representation (JIMPLE)**: The Soot tool decompiles Java bytecode into an intermediate representation called JIMPLE, which simplifies the bytecode by reducing it to a form with very few native instructions. This makes it easier to analyze and compare.\n\n- **Static Analysis Framework**: SootDiff is a specialized version of Soot that focuses on static analysis. It uses source code clone detection techniques to identify differences between versions of Java programs.\n\n- **Comparison of JIMPLE Outputs**: SootDiff compares the JIMPLE output of the current version of a Java program with a known good version. This comparison is done by ignoring differences that are related to the version of the compiler or the tools used, thus focusing on actual code changes.\n\n- **Detection of Compromised Code**: By running periodic comparisons, SootDiff can detect if any part of the code has been compromised. This includes identifying unauthorized changes or modifications that may have been introduced into the software supply chain.\n\n- **Handling Legitimate Changes**: When legitimate changes are detected, such as updates to libraries, these can be added to the known good versions to ensure that future comparisons are accurate.\n\n- **Clone Detection**: The framework identifies clones of different versions of libraries, packages, or compiled bytecode. This helps in ensuring that the delivered software product matches the original source code.\n\n- **Periodic Checks**: SootDiff can be run periodically to ensure ongoing integrity of the software, making it a useful tool for maintaining the security of Java programs over time.\n\n- **Limitations**: While SootDiff is effective for Java programs, it is a point solution and may not guarantee the security of the entire software supply chain. It is also limited to the Java programming language.\n\n- **Application**: This process is particularly useful in detecting vulnerabilities that may have affected a specific version of the software, ensuring that the end-user receives a product that matches the original source code.\n\nFor further details, you can refer to the works of J. Yang et al., which provide an in-depth analysis of the SootDiff system and its applications in software security.'"



export const cleanAndFormatResponse = (response) => {
    let cleanedResponse = response.replace(/[-*]/g, '');
  
    cleanedResponse = cleanedResponse.replace(/(\d+)/g, '\n$1'); 
    cleanedResponse = cleanedResponse.replace(/(?:\.|\?|\!)\s*(\w)/g, (match, p1) => {
      return match.toUpperCase();
    });
  
  
     return  <Text>{cleanedResponse}</Text>

  };



 export const TextDisplay = ({ text }) => {
    const parseText = (text) => {
      console.log(text);
      
        const regex = /(?:\*\*(.+?)\*\*|(\d+\.\s+|[-*]\s+)?(.+?)):/g;
    
        return text?.split('\n').map((line, index) => {
            const textWithoutAsterisks = line.replace(/\*\*(.+?)\*\*/g, (_, innerText) => {
                return innerText; 
            });
    
            const formattedLine = textWithoutAsterisks.replace(regex, (match, p1, p2, p3) => {
                const textToBold = p1 || p3;
                return `<strong>${textToBold}</strong>:`;
            });
    
            return (
                <p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />
            );
        });
    };
    
    
    return (
      <div>
        <ul>{parseText(text)}</ul>
      </div>
    );
  };

  export const ENDPOINT_FULL_QA = '/fullqa_answer';
  
  