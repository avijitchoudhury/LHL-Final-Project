import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/NewEntry.css"

//New entry view
export default function NewEntry() {
  const [storeName, setStoreName] = useState('');
  const [categoryId, setCateroryId] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [enteredOn, setEnteredOn] = useState('');
  const [description, setDescription] = useState('');
  const [currentCategories, setCurrentCategories] = useState([])

  function submitTransaction(evt) {
    evt.preventDefault()
    axios({
      method: "post",
      url: `/new-entry`,
      data: {
        store_name: storeName,
        category_id: categoryId,
        amount: transactionAmount,
        entered_on: enteredOn,
        description: description
      },
      responseType: JSON
    }).then(
      function(response) {
        console.log("TEH Response", response);
        setStoreName('')
        setCateroryId('')
        setTransactionAmount('')
        setEnteredOn('')
        setDescription('')
      },
      error => {
        console.log("GOOTTT!");
        console.log(error);
      }
    );
  }

  useEffect(() => {
    console.log("INHERE!")
    axios.get('/api/home')
      .then((res) => {
        console.log("TESTING",res.data)
        setCurrentCategories(res.data)
      })  
  }, [])

  return (
    <div className="new-entry">
      <form>
      <h1>Add a new entry!</h1>
      
      Store Name
      <span>
        <input
          className="inputMaterial"
          type="text"
          value={storeName}
          placeholder="Enter store name"
          onChange={event => setStoreName(event.target.value)}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
      </span>

      Date
      <span>
        <input
        className="inputMaterial"
          type="date"
          value={enteredOn}
          onChange={event => setEnteredOn(event.target.value)}
          placeholder="Enter date of occurance"
          
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        </span>

        Amount
        <span>
        <input
        className="inputMaterial"
          type="number"
          value={transactionAmount}
          onChange={event => setTransactionAmount(event.target.value)}
          placeholder="Enter the total amount"
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        </span>

        Receipt
        <span>
        <input
        className="inputMaterial"
          type="file"
          name="avatar"
          placeholder="Click here for receipt"
          accept="image/png, image/jpeg"
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        </span>

        Description
        <span>
        <input
          className="inputMaterial"
          type="text"
          value={description}
          onChange={event => setDescription(event.target.value)}
          placeholder="Provide description of transactions!"
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        </span>

        Category
        <span>
        <input list="browsers" name="browser"/>
          <datalist id="browsers">
            {currentCategories.map(category => {
              return(
                <option value={category.name}/>
              )
            })}
          </datalist>
        </span>


        <button className="newEntryButton" type="submit" onClick={submitTransaction}>
          Submit
        </button>
      </form>
    </div>
  );
}
