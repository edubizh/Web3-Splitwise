import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
import CreateGroup from '../components/CreateGroup';


const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const GroupList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const GroupItem = styled.li`
  margin: 8px 0;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: #0074cc;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [isCreateGroupVisible, setIsCreateGroupVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const openCreateGroup = () => {
    setIsCreateGroupVisible(true);
  };

  const closeCreateGroup = () => {
    setIsCreateGroupVisible(false);
  };

  return (
    <Container>
      <Title>My Groups</Title>
      <GroupList>
        {groups.map((group, index) => (
          <GroupItem key={index}>
            {group.groupName}
            <Button onClick={openModal}>View</Button>
            <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  className="fixed inset-0 flex items-center justify-center z-50"
  style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
>
  <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
    <button
      onClick={closeModal}
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
    >
      Close
    </button>
    <h2 className="text-2xl font-bold mb-4">{group.groupName}</h2>
    <p className="text-gray-700 mb-4">{group.description}</p>
    <h3 className="text-lg font-semibold mb-2">Wallet IDs:</h3>
    <ul className="list-disc pl-4 mb-4">
      {group.walletIds.map((walletId, index) => (
        <li key={index}>{walletId}</li>
      ))}
    </ul>
    <h3 className="text-lg font-semibold mb-2">Expenses:</h3>
    <ul className="list-disc pl-4">
      {group.expenses.map((expense, index) => (
        <li key={index}>
          <strong>Description:</strong> {expense.description} <br />
          <strong>Amount:</strong> {expense.amount} <br />
          <strong>Currency:</strong> {expense.currency}
        </li>
      ))}
    </ul>
  </div>
</Modal>
          </GroupItem>
        ))}
        

<Button
            onClick={openCreateGroup}
            className="text-white font-semibold hover:text-blue-300"
          >
            Create
          </Button>
      </GroupList>
      {isCreateGroupVisible && ReactDOM.createPortal(
        <CreateGroup isOpen={isCreateGroupVisible} onClose={closeCreateGroup} onSubmit={(formData) => setGroups([...groups, formData])} />,
        document.body
      )}
    </Container>
  );
}

export default Dashboard;
