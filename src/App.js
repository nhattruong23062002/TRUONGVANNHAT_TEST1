import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUser(user); 
  };

  const handleClosePopup = () => {
    setSelectedUser(null); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='input_search'
      />
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Address</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>
                <p onClick={() => handleUserClick(user)} style={{cursor: 'pointer'}}>
                  {user.name}
                </p>
              </td>
              <td>{user.email}</td>
              <td>{`${user.address.street}, ${user.address.city}`}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="popup">
          <div className="popup-content">
            <h2><strong>{selectedUser.name}</strong></h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Address:</strong> {selectedUser.address.city}</p>
            <p><strong>Company:</strong> {selectedUser.company.name}</p>
            <button onClick={handleClosePopup} style={{ marginTop: '10px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
