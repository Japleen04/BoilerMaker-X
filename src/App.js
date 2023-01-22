import React, {useEffect, useState} from 'react';
import './App.css';
// importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  // state
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  // run once when the app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  // use effect
  useEffect(() => {
    const filterHandler = () => {
      switch(status) {
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true))
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false))
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };

    filterHandler();
    saveLocalTodos();
  },[todos, status]);


  // save to local
  const saveLocalTodos = () => {
    //if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    //}
  };

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
  

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
      </header>
      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus={setStatus}
        />
      <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/>
    </div>
  )
};

export default App;
