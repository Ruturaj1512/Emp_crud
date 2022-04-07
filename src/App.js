import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('todos');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}


export const App = () => {

  // Users array of objects
  const [todos, settodos]=useState(getDatafromLS());

  // input field state
  const [Name, setName]=useState('');
  const [ID, setId]=useState('');
  const[age,setagevalue]=useState('');
  const[dob,setdob]= useState('');
  const[address,setAdd]=useState('');
  

  // form submit event
  const handleAddtodoSubmit=(e)=>{
    e.preventDefault();

debugger
    // creating an object
    let todo={
    
      Name,
      ID,
      age,
      dob,
      address
    
    }
    settodos([...todos,todo]);
    setName('');
    setId('');
    setagevalue('');
    setdob('');
    setAdd('');

  }

 

  const [editForm,seteditform]=useState(false);


  // delete a task from local storage
  const deletetodo=(Name)=>{
    const filteredtodos=todos.filter((element,index)=>{
      return element.Name !== Name
    })
    settodos(filteredtodos);
  }





  //updating a task 
  const updatetodo=(todo,id)=>{
   
seteditform(true);

setName(todo.Name);
setId(todo.ID);
setagevalue(todo.age);
setdob(todo.dob);
setAdd(todo.address);
setId(id);


      
  }


  const handleEditSubmit=(e)=>{
    debugger
    if(editForm===false){
      handleAddtodoSubmit(e)
    }
    else{
      e.preventDefault();
 
      let items=[...todos];
      let item=items[ID-1];
      
      item.Name=Name;
      items[ID-1]=item;
      item.age = age;
      item.dob = dob;
      item.address = address;
      
      settodos(items);
      seteditform(false);
    setName('');
    setId('');
    setagevalue('');
    setdob('');
    setAdd('');  
      
    }



  
    
  }


  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos])

  return (
    <div className='wrapper'>
      <h1>Employee app</h1>
      <p>Add and view employee details using local storage</p>
      
      
      <div className='main'>

<div className='form-container'>
  <form autoComplete="off" className='form-group'
  onSubmit={handleEditSubmit}>

    <label>Name </label>
    <input type="text" className='form-control' required
    onChange={(e)=>setName(e.target.value)} value={Name}></input>
    <br></br>


    {editForm===false&&<>
    <label>ID#</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setId(e.target.value)} value={ID}></input>
            <br></br>
            </>  }

    <label>Age</label>
    <input type="text" className='form-control' required
    onChange={(e)=>setagevalue(e.target.value)} value={age}></input>
    <br></br>

    <label>DOB</label>
    <input type="date" className='form-control' required
    onChange={(e)=>setdob(e.target.value)} value={dob}></input>
    <br></br>

    <label>Address </label>
    <input type="text" className='form-control' required
    onChange={(e)=>setAdd(e.target.value)} value={address}></input>
    <br></br>

    


    
    <button type="submit" className='btn btn-success btn-md'>
    {editForm?  'Update' : 'Sumbit'}
    </button>
  </form>
</div>



        

        <div className='view-container'>
          {todos.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                   
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>DOB</th>
                    <th>Address</th>
                    <th>Delete</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  <View todos={todos} deletetodo={deletetodo} updatetodo={updatetodo}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>settodos([])}>Remove All</button>
          </>}
          {todos.length < 1 && <div>No details Added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App