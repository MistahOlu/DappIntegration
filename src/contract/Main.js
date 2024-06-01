import { useState } from "react";
import { ethers } from "ethers";
import "../App.css";
import Todos from "../cards/TodoList.jsx";
import getContractInstance from "./getContractInstance.js";


function Contracting() {

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const [inputTodo, setInputTodo] = useState("");
  const [getAllTodos, setAllTodos] = useState([]);
  const [sortedRes, setSortedRes] = useState([]);

  async function sendMessageToCreateTodo() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await requestAccount();
        const contract = getContractInstance();

          if(inputTodo !== ""){
            const tx = await contract.createTodo(inputTodo, {
              gasLimit: 500000,
              gasPrice: ethers.utils.parseUnits("20", "gwei"), 
            });
            
            await tx.wait();
            
            setInputTodo(""); 
          }else alert("input boxes cannot be empty");
      } catch (err) {
        console.error("Error setting message:", err);
        alert("Error setting message. Please check the console for details.");
      }
    }
  }

  async function getAllTodosFromContract() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await requestAccount();
        const contract = getContractInstance();

        const allTodos = await contract.getAllTodos();
        
        setAllTodos(allTodos);
      } catch (err) {
        console.error("Error getting message:", err);
        alert("Error getting message. Please check the console for details.");
      }
    }
  }

  async function getAllCompletedTodo() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await requestAccount();
        const contract = getContractInstance();

        const response = await contract.getAllTodos();
        const result = response.filter(x => x.isCompleted === true);

        setSortedRes(result);

      } catch (err) {
        console.error("Error getting message:", err);
        alert("Error getting message. Please check the console for details.");
      }
    }
  }

  const handleSendTodo = (e) => setInputTodo(e.target.value);

  const clearMessage = () => {
    setAllTodos([]);
    setSortedRes([]);    
  }


  return (
    <div className="App" style={{background: "black"}}>
      <div>
        <h1>Simple Todo</h1>
        <h2>Smart Contract and DApp Integration</h2>
        <h3>
          <i>Getter and Setter Function call</i>
        </h3>
        <br />
        <input
          type="text"
          placeholder="enter todo here"
          value={inputTodo}
          onChange={handleSendTodo}
          required
        />
        <button onClick={sendMessageToCreateTodo}>Create Todo</button>
        <br /><br />
        
        <button onClick={getAllCompletedTodo}>Get Completed Todos</button>
        <br /><br />
        <div>
          { sortedRes.length > 0 ?
            <Todos todos={sortedRes}/> : <div style={{background: "white"}}>"No Completed Todo yet"</div>}
        </div>
        <button onClick={getAllTodosFromContract}>Get Todos</button>
        <br /> <br />
      </div>
      <div>
        <Todos todos={getAllTodos}/>
        <button onClick={clearMessage}>Clear message</button>
      </div>
    </div>
  );
}

export default Contracting;