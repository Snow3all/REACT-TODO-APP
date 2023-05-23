import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ModalConfirm from './ModalConfirm';

const WrapperModal = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  transform: translate(-50%, -50%);
  background: rgb(205, 219, 244);
  background: linear-gradient(
    109deg,
    rgba(205, 219, 244, 1) 0%,
    rgba(229, 209, 223, 1) 100%
  );
  border-radius: 1rem;
  border: 2px solid #fff;
  text-align: center;
  padding: 10px;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 300px;
  height: 250px;
  border-radius: 1rem;
  padding: 10px;
`;

const Btn = styled.button`
  border: none;
  border-radius: 1rem;
  width: 100px;
  height: 30px;
  cursor: pointer;
`;

const BtnSubmit = styled.input`
  border: none;
  border-radius: 1rem;
  width: 100px;
  height: 30px;
  cursor: pointer;
`;

const AlertValidator = styled.span`
  color: red;
  font-size: 15px;
`;

const ModernInput = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 1rem;
  border: none;
  text-align: center;
`;

const AddTodo = ({ data, handleEditTodo, handleDeleteTodo }) => {
  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [isValidTitles, setIsValidTitles] = useState(false);

  const [isValidDescriptions, setIsValidDescriptions] = useState(false);

  const [isModalConfirm, setIsModalConfirm] = useState(false);

  useEffect(() => {
    const validateField = () => {
      const isValid = title.trim() !== '';
      setIsValidTitles(isValid);
    };
    validateField();
  }, [title]);

  useEffect(() => {
    const validateField = () => {
      const isValid = description.trim() !== '';
      setIsValidDescriptions(isValid);
    };
    validateField();
  }, [description]);

  useEffect(() => {
    setTitle(data.title)
    setDescription(data.description);
  }, [data.title, data.description])

  const onSubmit = async (e) => {
    e.preventDefault();
    if(title && description) {
      const token = sessionStorage.getItem('token');
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      };
      await fetch(
        `https://candidate.neversitup.com/todo/todos/${data._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then(() => handleEditTodo(false))
    }
  };

  const deleteTodo = () => {
    setIsModalConfirm(true)
  }

  const confirmDeleteTodo = async(data) => {
    if(data) {
      const token = sessionStorage.getItem('token');
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      };
      await fetch(
        `https://candidate.neversitup.com/todo/todos/${data._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setIsModalConfirm(false)
          handleDeleteTodo(false)
        });
    } else {
      setIsModalConfirm(data)
    }
  }

  return (
    <WrapperModal>
      <Modal>
        <div>
          <h2>EDIT TODO</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <div className='mb-1'>TITLE</div>
            <div className='mb-1'>
              <ModernInput type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            {!isValidTitles && (
                <div>
                  <AlertValidator>Please fill Todo Title !</AlertValidator>
                </div>
              )}
          </div>
          <div>
            <div className='mb-1'>DESCRIPTION</div>
            <div>
              <TextArea value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            {!isValidDescriptions && (
                <div>
                  <AlertValidator>Please fill description !</AlertValidator>
                </div>
              )}
          </div>
          <div className='flex justify-center mt-2'>
            <div>
              <BtnSubmit type='submit' value='Edit'></BtnSubmit>
            </div>
          </div>
        </form>
        <div className='my-2'>
          <Btn onClick={() => deleteTodo()}>Delete</Btn>
        </div>
        <div className='my-2'>
          <Btn onClick={() => handleEditTodo(false)}>Cancel</Btn>
        </div>
      </Modal>
      { isModalConfirm &&
        <ModalConfirm data={data} confirmDeleteTodo={confirmDeleteTodo}/>
      }
    </WrapperModal>
  );
};

export default AddTodo;
