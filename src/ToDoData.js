
import React, { useState, useRef } from "react";
import classes from "./ToList.module.css";

var listItem = [],
  forward = [],
  backword = [];
const ToDoData = () => {
  var value = useRef("");
  var dateDesc = useRef(new Date());
  var textDesc = useRef("");
  const pName = useRef("amit");
  const pDate = useRef(new Date());
  const [state, setState] = useState(listItem);
  const [curDate, setDate] = useState(new Date());
  const [current, setCurrent] = useState("");
  const [show, setShow] = useState(true);
  const [pshow, setPShow] = useState(false);
  const [pstate, setpState] = useState(forward);
  const [qandN, setQNState] = useState([]);
  const [qnShow, setQnShow] = useState(false);
  const [index, setIndex] = useState();
  const [cshow,setCShow]=useState(false)
  const [complete,setcomplete]=useState([])
  let NameHandler = (e) => {
    e.preventDefault();
    let newItem = [...state];
    setCurrent(e.target.value);
    setState(newItem);
  };

  let DateHandler = (e) => {
    e.preventDefault();

    setDate(e.target.value);
    console.log(e.target.value);
  };
  const newElement = async (i, e) => {
    if (current === "") {
      alert("please enter value");
      return;
    }

    setState([...state, { name: `${current}`, date: `${curDate}` }]);
    setcomplete([
      ...state,
      { name: `${current}`, date: `${curDate}` }
    ])
     console.log(complete)
     setCShow(false)
    await fetch(
      "https://react-http-384d6-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          name: current,
          date: curDate,
        }),
      }
    );
  };
  const updatHandler = (e) => {
    e.preventDefault();

    console.log(e.target.value);
    setpState([
      ...pstate,
      { name: `${textDesc.current.value}`, date: `${dateDesc.current.value}` },
    ]);
   
    console.log(pstate);
   
    // setPShow(false);
  };
  const forWardPHandler = (e) => {
    e.preventDefault();
    setPShow(true);
  };

  const forWardQHandler = (e) => {
    e.preventDefault();

    setQnShow(true);
    setQNState([
      ...qandN,
      {
        name: `${pDate.current.innerText}`,
        date: `${pName.current.innerText}`,
      },
    ]);
    console.log(qandN);
  };

   const forwardCHandler=(e)=>{
     e.preventDefault();
     console.log(e.target.value)
     setCShow(true)
   }
  return (
    <div className={classes.container}>
      <div>
        <h1>My To Do List</h1>
        <input
          className={classes.increase}
          type="text"
          placeholder="entered name"
          ref={value}
          onChange={(e) => NameHandler(e)}
        />
        <input
          className={classes.increase}
          type="date"
          placeholder="entered name"
          ref={value}
          onChange={(e) => DateHandler(e)}
        />
        <span onClick={newElement}>
          <button className={classes.btn}>Add+</button>
        </span>{" "}
      </div>
      <div className={classes.row}>
        <div className={classes.col}>
          {" "}
          <strong>Backlog</strong>
          {show &&
            state.map((value, i) => {
              return (
                <div className={classes.card} key={i}>
                  <form>
                    <strong>
                      <p>{value.name}</p>
                    </strong>
                    <strong>
                      <p>{value.date}</p>
                    </strong>
                    <input ref={dateDesc} type="date"></input>
                    <input ref={textDesc}></input>
                    <button value={i} onClick={updatHandler}>
                      Update
                    </button>

                    <button value={i} onClick={forWardPHandler}>
                      ForWard
                    </button>
                  </form>
                </div>
              );
            })}
        </div>

        <div className={classes.col}>
          <strong>Inprogress</strong>
          {pshow &&
            pstate.map((value, i) => {
              return (
                <div className={classes.card} key={i}>
                  <form>
                    <strong>
                      <p ref={pName}>{value.name}</p>
                    </strong>
                    <strong>
                      <p ref={pDate}>{value.date}</p>
                    </strong>
                    {/* <button value={i}onClick={updatHandler}>Update</button> */}
                    <p>current Status</p>

                    <button value={i} onClick={forWardQHandler}>
                      ForWard
                    </button>
                  </form>
                </div>
              );
            })}
        </div>

        <div className={classes.col}>
          <strong> QAndN</strong>
          {qnShow &&
            qandN.map((qandN, i) => {
              return (
                <div className={classes.card} key={i}>
                  <form>
                    <strong>
                      <select
                        onClick={(e) => {
                          setIndex(e.target.selectedIndex);
                        }}
                      >
                        <option value="volvo">Description</option>
                        <option value="date">Date</option>
                      </select>
                    </strong>
                    <strong>
                      {index ? <h3>{qandN.name}</h3> : <h3>{qandN.date}</h3>}
                    </strong>
                    <button value={i} onClick={forwardCHandler}>ForWard</button>
                  </form>
                </div>
              );
            })}
        </div>

        <div className={classes.col}>
          <strong>Completed</strong>
          {cshow && complete.map((value,i)=>{
            return (
              <h1 key={i}>{value.name} has finished</h1>
            )
          })}
        </div>
      </div>
    </div>
  );
};
export default ToDoData;
