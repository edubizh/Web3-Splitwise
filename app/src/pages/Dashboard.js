import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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

  const addGroup = () => {
    const groupName = prompt('Enter group name:');
    if (groupName) {
      setGroups([...groups, { name: groupName }]);
    }
  };

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
            <Button>View</Button>
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
