import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function App() {

  const [height,setHeight] = useState(0)
  const [weight,setWeight] = useState(0)
  const [bmi,setBMI] = useState(0)
  const [comment,setComment]= useState('')

  //conditionally render
  const [isHeight,setIsheight] = useState(true)
  const [isWeight,setIsweight] = useState(true)


  const validate = (e) =>{
    // console.log(e.target.value);
    const {name,value}  = e.target
    console.log(name);
    console.log(value);

    // console.log(value.match(/^[0-9]*$/))
    // console.log(!!value.match(/^([0-9]{1,2})+(\.[0-9]{1,3})?$/));
    if(!!value.match(/^[0-9]+(\.[0-9]*)?$/)){
      if(name == 'height'){
        setHeight(value)
        setIsheight(true)
      }
      else{
        setWeight(value)
        setIsweight(true)
      }
    }
    else{
      if(name == 'height'){
        setHeight(value)
        setIsheight(false)
      }
      else{
        setWeight(value)
        setIsweight(false)
      }
    }
  }
  //function to reset
  const handleReset = () => {
    setHeight(0)
    setWeight(0)
    setIsheight(true)
    setIsweight(true)
    setBMI(0)
    setComment('')
  }
  //function to calculate bmi
  const calculateBMI = () =>{
    const bmiv=(weight/(height/100)**2).toFixed(2)
    setBMI(bmiv)

    if(bmiv<18.5){
      setComment('📢 You are UnderWeight')      
    }
    else if(bmiv>18.5 && bmiv<24.9){
      setComment('📢 You are Normal Weight')      
    }
    else if(bmiv>25 && bmiv<29.9){
      setComment('📢 You are Over Weight')      
    }
    else{
      setComment('📢 You are Obese')      
    }
  }

  return (
    <>
      <div className='main'>
        <div className='innermain mt-3'>
          
          <div className='calculator-div rounded-4 mt-5'>
            <form action="" className='mt-3 ms-5 me-5'>
            <h1 className='text-center mt-4'>BMI Calculator</h1>

              <TextField id="standard-basic" label="Height(cm)" value={height || ''} variant="standard" name='height' className='w-100 mt-3' onChange={(e)=>validate(e)}/>

              {!isHeight && <p className='text-danger'>Invalid Input</p>}

              <TextField id="standard-basic" label="Weight(kg)" value={weight || ''} variant="standard" name='weight' className='w-100 mt-5' onChange={(e)=>validate(e)}/>   

              {!isWeight && <p className='text-danger'>Invalid Input</p>} 

            <div className='d-flex mt-5'>
              <Button variant="contained" color='secondary' className='w-50' onClick={handleReset}>Reset</Button>
              <Button variant="contained" color='secondary' className='ms-3 w-50'onClick={calculateBMI} disabled={!height || !weight || !isHeight || !isWeight}>Calculate</Button>
            </div>
            </form>  

            <div className='result'>
              <h3 className='mt-5 text-center'>Your BMI is</h3>
              <div className='result-div mt-3 rounded-5'>
                  <h4 className='text-center mt-4'>{bmi}</h4>
              </div>
            </div>
            <h5 className='mt-3 ms-3 text-center'>{comment}</h5>
        </div>
        </div>
      </div>
    </>
  )
}

export default App



//BMI = weight(kg)/(height(cm)/100)^2