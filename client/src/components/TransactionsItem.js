import React, {useState} from "react"
import Edit from "./Edit"
import Delete from "./Delete";

export default function TransactionsItems(props){
  const [showForm, toggleForm] = useState(false)
  const [showDelete, toggleDelete] = useState(false)
  
  const {
    category_id,
    id,
    name,
    amount,
    entered_on,
    description,
    onDeleteSuccess,} = props

    function renderEdit(){
      toggleForm(prev => !prev)
    }
  
    function renderDelete(){
      toggleDelete(prev => !prev)
    }

  return(
    <div>
    <button type="submit" onClick={renderEdit}>Edit</button>
    <button type="submit" onClick={renderDelete}>Delete</button>

    {showDelete && <Delete 
      renderDelete={renderDelete}
      id={id}
      renderDelete={renderDelete}
      onDeleteSuccess={onDeleteSuccess}
      />
      }

      {showForm && <Edit 
      renderEdit={renderEdit}
      category_id={category_id}
      id={id} 
      name={name} 
      amount={amount} 
      entered_on={entered_on} 
      description={description}
       />}
    </div>
  )
}