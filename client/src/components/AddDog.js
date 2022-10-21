
import React,{useState} from 'react'

import '../styles/Dogs.css'
const AddDog = ({onNewDog}) => {
    const [name,setName] =useState('')
    const [breed,setBreed] =useState('')
    const [dateOfBirth,setDateOfBirth] =useState('')
    
    const submitHandler =(e)=>{
        e.preventDefault();
        onNewDog({
            name,breed,dateOfBirth
        })
    }
  return (
   <form className='add_dog' onSubmit={submitHandler}>
        <p>Dog Name</p>
        <input type='text' onChange={(e)=>setName(e.target.value)} />
        <p>Dog Breed</p>
        <input type='text' onChange={(e)=>setBreed(e.target.value)} />
        <p>Dog Date of Birth</p>
        <input type='date' onChange={(e)=>setDateOfBirth(e.target.value)} />

        <div>
            <button type='submit' className='btn_submit'>Submit</button>
        </div>
   </form>
  )
}

export default AddDog