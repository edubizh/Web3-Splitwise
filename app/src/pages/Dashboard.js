import React, { useState } from 'react';

function Dashboard() {
  const [groups, setGroups] = useState([
    { name: 'Group 1' },
    { name: 'Group 2' },
    { name: 'Group 3' },
  ]);

  const addGroup = () => {
    const groupName = prompt('Enter group name:');
    if (groupName) {
      setGroups([...groups, { name: groupName }]);
    }
  };

  return (
    <div>
      <h1>My Groups</h1>
      <ul>
        {groups.map((group) => (
          <li key={group.name}>{group.name}</li>
        ))}
      </ul>
      <button onClick={addGroup}>Add Group</button>
    </div>
  );
}

export default Dashboard;
