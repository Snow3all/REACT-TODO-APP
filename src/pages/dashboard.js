import { useEffect, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import { FaSignOutAlt } from 'react-icons/fa';
import styled from 'styled-components';
import moment from 'moment';
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';

const WrapperDashboard = styled.div`
  width: 400px;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 400px) {
    width: 100%;
    background: transparent;
  }
`;

const Exit = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const BtnSignOut = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const TodoBlock = styled.div`
  width: 100%;
`;

const TodoList = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background: rgb(205, 219, 244);
  background: linear-gradient(
    109deg,
    rgba(205, 219, 244, 1) 0%,
    rgba(229, 209, 223, 1) 100%
  );
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  margin: 10px 0 10px 0;

  &:hover {
    transform: scale(1.05);
  }
`;

const TodoItem = styled.h3`
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 70%;
`;

const Tools = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background: transparent;
  width: 100%;
  height: 100px;
  text-align: center;
`;

const BtnAddTodo = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const WarpperTodoBlock = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  height: 80%;
`;

const DashBoard = () => {
  const [todos, setTodos] = useState([]);

  const [addTodo, setAddTodo] = useState(false);

  const [todoData, setTodoData] = useState();

  const [editTodo, setEditTodo] = useState(false);

  useEffect(() => {
    if(!sessionStorage.getItem('token')) {
      window.location.href = '/';
    }
    fetchAllTodo();
  }, []);

  const signOut = () => {
    sessionStorage.clear()
    window.location.href = '/';
  }

  const fetchAllTodo = async () => {
    const token = sessionStorage.getItem('token');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    await fetch(
      'https://candidate.neversitup.com/todo/todos',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) =>  setTodos(data));
  };

  const handleModalAddTodo = (data) => {
    setAddTodo(data);
    fetchAllTodo();
  }

  const handleEditTodo = (data) => {
    setEditTodo(data)
    fetchAllTodo();
  }

  const handleDeleteTodo = async (data) => {
    setEditTodo(data)
    fetchAllTodo();
  }

  const getTodoData = async(data) => {
    const token = sessionStorage.getItem('token');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    await fetch(
      `https://candidate.neversitup.com/todo/todos/${data._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) =>  setTodoData(data));
    setEditTodo(true);
  };

  return (
    <WrapperDashboard>
      <Exit>
        <BtnSignOut onClick={() => signOut()}>
          <FaSignOutAlt size={20}/>
        </BtnSignOut>
      </Exit>
      <div className='text-center'>
        <h2>ALL TODOS</h2>
      </div>
      <WarpperTodoBlock className='px-4 py-5'>
        <TodoBlock>
          {todos.map((todo, idx) => (
            <TodoList key={`${todo.id}_${idx}`} onClick={() => getTodoData(todo)}>
              <TodoItem>- {todo.title}</TodoItem>
              <h3>{moment(todo.updatedAt).format('DD/MM/YYYY')}</h3>
            </TodoList>
          ))}
        </TodoBlock>
      </WarpperTodoBlock>
      <Tools>
        <BtnAddTodo onClick={() => setAddTodo(true)}>
          <FcPlus size={70}/>
        </BtnAddTodo>
      </Tools>
      { addTodo &&
        <AddTodo handleModalAddTodo={handleModalAddTodo}/>
      }
      { editTodo &&
        <Todo data={todoData} handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo}/>
      }
    </WrapperDashboard>
  )
};

export default DashBoard;