import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import { useState } from 'react';
import { response } from '../Utils';
import { fetchData } from '../Services/homePageService';

export function HomePage3(){


const[textFlag, setTextflag] = useState(false);
const submitQuestion = ()=>{ 
      fetchData().then((response)=>{
        console.log(response);
        
      },(error) => {
    
      })
    setTextflag(true);
    let array = [];
    for (let i = 0; i < questions.length+1; i++) {
        array.push(i);
    }
    setQuestions(array);
}

const[questions,setQuestions] = useState([0]);

return (
<Container className=' w-100' fluid style={{height:'100vh'}}>
<Row style={{height:'10vh'}} >
<HeaderComponent></HeaderComponent>
</Row>
<div className= "w-100 mt-3" style={{height:'82vh'}} >
<div style={{width:'10%'}}>
<BootstrapSidebar></BootstrapSidebar>
</div>
<div className='col-11   h-100 ms-5 mb-5 pb-4' >
<div className='card d-flex h-100 question-card ms-4' style={{overflowY:'scroll'}} >
{questions?.map((e)=><>
<div class="form-group w-75 d-flex mt-5 ms-5" >
 <input type="text" class="form-control question-box" id="" placeholder="Enter Question" />
 <Button className='ms-5' onClick={submitQuestion}>Submit</Button>
</div>
  {(textFlag)&&<div className='card w-75 mt-3 ms-5'>
<span className='p-2'>
    {response}
    </span>
    </div>}
<div className=' ms-5 d-flex justify-content-center w-75 mt-3'>
    <Button>Generate PDF</Button>
    <Button className='ms-3'>Generate PDF </Button>
    <Button className='ms-3'> Generate PDF</Button>
    <Button className='ms-3'>Generate PDF </Button>
</div>
</>
)}
</div>

</div>
</div>
<div className='position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded'>
<span style={{
    color:"white"
}}>@Bilvantis 2024 </span>
</div>
</Container>
    )

}