import styled from 'styled-components';

const WrapperModal = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
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

const Btn = styled.button`
  border: none;
  border-radius: 1rem;
  width: 100px;
  height: 30px;
  cursor: pointer;
`;

const BtnDelete = styled.button`
  border: none;
  border-radius: 1rem;
  width: 100px;
  height: 30px;
  background-color: red;
  color: #fff;
  cursor: pointer;
`;

const ModalConfirm = ({ data, confirmDeleteTodo }) => {
  return (
    <WrapperModal>
      <Modal>
        <p>Please confirm after delete</p>
        <h2>{data.title}</h2>
        <div>
          <Btn className='mr-2' onClick={() => confirmDeleteTodo(false)}>Cancel</Btn>
          <BtnDelete onClick={() => confirmDeleteTodo(data)}>Confirm</BtnDelete>
        </div>
      </Modal>
    </WrapperModal>
  )
}

export default ModalConfirm;