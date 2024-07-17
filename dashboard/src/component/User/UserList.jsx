import { useState, useEffect } from 'react';
import './userList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [editedUser, setEditedUser] = useState({
        id: '',
        name: '',
        email: '',
        rol: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/apiUser");
                const data = await response.json();
                if (data.users ) {
                    setUsers(data.users);
                    setFilteredUsers(data.users);
                    updateTotalPages(data.users);
                } else {
                    console.error('Data from API is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        //  search filter
        const filteredData = users.filter((user) =>
            Object.values(user).some(
                (value) =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredUsers(filteredData);
        setCurrentPage(1);
        updateTotalPages(filteredData);
    }, [searchTerm, users]);

    const updateTotalPages = (data) => {
        setTotalPages(Math.ceil(data.length / pageSize));
    };

    const handleEditClick = (user) => {
        window.location.href = `http://localhost:3000/users/profileEdit/${user.id}`;
        setEditedUser(user);
    };

    const handleSaveEdit = () => {
        // Implement edit logic 
        const updatedUsers = users.map((u) => (u.id === editedUser.id ? editedUser : u));
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setEditedUser({
            id: '',
            name: '',
            email: '',
            rol: '',
        });
    };

    const handleDeleteClick = (userId) => {
        // Implement delete logic 
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setSelectedRows(selectedRows.filter((id) => id !== userId));
    };

    const handleCheckboxChange = (userId) => {
        // Toggle selected row
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(userId)) {
                return prevSelectedRows.filter((id) => id !== userId);
            } else {
                return [...prevSelectedRows, userId];
            }
        });
    };

    const handleSelectAll = () => {
        // Select or deselect all rows on the current page
        const allIdsOnPage = filteredUsers.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
        ).map((user) => user.id);

        if (selectedRows.length === allIdsOnPage.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(allIdsOnPage);
        }
    };

    const handleDeleteSelected = () => {
        // Delete selected rows 
        const updatedUsers = users.filter((user) => !selectedRows.includes(user.id));
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setSelectedRows([]);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleInputChange = (e) => {
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className='user-Main'>
            <h1>User List</h1>
            <input
                className='search'
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {console.log(filteredUsers)}
                    {filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((user) => (
                            <tr key={user.id} className={selectedRows.includes(user.id) ? 'selected' : ''}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(user.id)}
                                        onChange={() => handleCheckboxChange(user.id)}
                                    />
                                </td>
                                <td><img src={`http://localhost:3000/img/users/${user.imagen}`} className='avataruser' /></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className='edit-btn' onClick={() => handleEditClick(user)}>Edit</button>
                                    <button className='delete-btn' onClick={() => handleDeleteClick(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className='allbuttons'>
                <div>
                    <button onClick={handleSelectAll}>Select/Deselect All</button>
                    <button onClick={handleDeleteSelected}>Delete Selected</button>
                </div>
                <div>
                    <button onClick={() => handlePageChange(1)}>First Page</button>
                    <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    >
                        Previous Page
                    </button>
                    <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    >
                        Next Page
                    </button>
                    <button onClick={() => handlePageChange(totalPages)}>Last Page</button>
                    <span>
                        {"  "} Page {currentPage} of {totalPages}
                    </span>
                </div>
            </div>

            {editedUser.id && (
                <div className='edit-form'>
                    <h2>Edit User</h2>
                    <form>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={editedUser.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="text"
                                name="email"
                                value={editedUser.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Role:
                            <input
                                type="text"
                                name="role"
                                value={editedUser.imagen}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button type="button" onClick={handleSaveEdit}>Save</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserList;