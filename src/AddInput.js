import React, { useState } from "react";

const AddInput = () => {
  const [formValues, setFormValues] = useState([{ name: "" }]);

  let NameHandler = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i] = e.target.value;
    setFormValues(newFormValues);
    
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "" }]);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formValues));
  };

  return (
    <form onSubmit={handleSubmit}>
      {formValues.map((element, index) => (
        <div key={index}>
          <label>Book Name :{index}</label>
          <input
            type="text"
            onChange={(e) => NameHandler(index, e)}
          />
        </div>
      ))}
     
      <div> 
        <button type="button" onClick={() => addFormFields()}>
          Add
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddInput;
