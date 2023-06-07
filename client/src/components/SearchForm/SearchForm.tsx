import { useState } from 'react';
export default function SearchForm () {
    // const [inputs, setInputs] = useState({});

    // const handleChange = (event) => {
    //   const name = event.target.name;
    //   const value = event.target.value;
    //   setInputs(values => ({...values, [name]: value}))
    // }
  
    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   alert(inputs);
    // }
return (<form>
    <input 
      type="text" 
      name="meetingPoint" 
      placeholder='meeting point'
        value={""} 
    //   value={inputs.username || ""} 
    //   onChange={handleChange}
    />

      <input 
        type="text" 
        name="typeofevent" 
        placeholder='type of event'
        // value={inputs.age || ""} 
        // onChange={handleChange}
      />
        <input 
      type="date" 
      name="date" 

    //   value={inputs.username || ""} 
    //   onChange={handleChange}
    />

      <input type="submit"  placeholder='type of event'/>
      {/* <input type="search"  placeholder='search🔍'/> */}
      </form>)
}