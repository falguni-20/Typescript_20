import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

const Abcd = () => {
  const a:number=9
  // console.log(a)

  type Employee =  {
    firstName: string;
    lastName: string;
    age: number;
    jobTitle: string;
};

const employee: Employee = {
  firstName: 'John',
  lastName: 'Doe',
  age: 25,
  jobTitle: 'Web Developer',
};

// const [employee, setPerson] = useState<employee>({ name: 'John Doe', age: 30 });
const [file,setFile]=useState<string>()
useEffect(() => {
  setFile("hello")

}, []);


let fruits: string[] | number[] = [1, 2, 3]; 
console.log(file)

function multiply(a: number, b: number) {
  const t =  a * b;

}
  return (
    <div>
      <Button>egge</Button>
    </div>
  )
}

export default Abcd
