import React, { useState, useRef } from "react";
import classes from'./ToList.module.css'
var listItem = [],
  comp,
  prev,
  index;
const ToList = () => {
  var value = useRef("");
  const [state, setState] = useState(listItem);
  const [current, setCurrent] = useState("");
  const [show, setShow] = useState(true);

  let NameHandler = (e) => {
    e.preventDefault();
    let newItem = [...state];
    setCurrent(e.target.value);

    setState(newItem);
  };
  const newElement = (i, e) => {
    setState([...state, { name: `${current}` }]);
  };

  const deleteItem = (e) => {
    setShow(false);
    console.log(e.target.value);
    let x = [...state];
    x.splice(e.target.value, 1);

    setState(x);
    setShow(true);
    console.log(state);
    console.log("work");
  };
  const editValue = (e) => {
    e.preventDefault();
    let y = state[e.target.value];
    index = e.target.value;

    console.log(y);

    value.current.value = y.name;
    console.log(state);
    prev = y.name;
  };
  const editHandler = (e) => {
    e.preventDefault();
    setShow(false);
    index = e.target.value;
    console.log(current);
    let arr = [...state];
    arr[index] = { name: `${current}` };
    console.log(arr);

    setState(arr);
    console.log(state);
    setShow(true);
    console.log(state);
  };

  return (
    <div className={classes.container}>
      <div >
        <h1>My To Do List</h1>
        <input className={classes.increase}
          type="text"
          placeholder="entered name"
          ref={value}
          onChange={(e) => NameHandler(e)}
        />
        <span  onClick={newElement}>
          <button className={classes.btn}>Add+</button>
        </span>{" "}
      </div>
      <div>
        <table className={classes.class}>
        
          <tbody>
          {show &&
            state.map((value, i) => {
              return (
                <tr key={Math.random()}>
                  <td>
                    {value.name}{" "} </td>
                    <td> <button value={i} onClick={editValue}>
                      Edit
                    </button>
                    </td>
                    <td> <button value={i} onClick={deleteItem}>
                      Delete
                    </button>
                   </td>
                   <td> <button onClick={editHandler} value={i}>
                      Update
                    </button>
                    </td>
                 
                </tr>
              );
            })}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToList;
