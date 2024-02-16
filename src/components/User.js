import {Link, useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react'
import axios from "axios";

function Users() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter((user) =>
          Object.entries(user).some(([key, value]) =>
            (typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())) ||
            ((key === 'year_level' || key === 'name') && typeof value === 'number' && value.toString().includes(searchQuery))
          )
        );
        setFilteredData(filtered);
      }, [searchQuery, data]);

    const fetchData = () => {
        axios.get('http://localhost:3001')
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => console.log(err));
    };
    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = data.filter(user =>
            Object.values(user).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()) ||
                typeof value === 'number' && value.toString().includes(searchQuery)
            )
        );
        setFilteredData(filtered);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteUser/${id}`)
            .then(res => {
                console.log(res);
                fetchData();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-200 vw-55  boxe justify-content-center align-items-cente">
            <div className=" w-100 bg-white box1 rounded">
            <h2 className="centered-label">CLASS PROFILE (SY: 2023-2024)</h2> <br></br>
            <form onSubmit={handleSearch}>
                    <div className="d-flex justify-content-between">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="form-control"
                            style={{ width: '85%', backgroundColor: '#ced6da' }}
                        />
                        <button className="btn btn-success btn-sm me-4" style={{ width: '20%', height: '100%', fontSize: '18px' }}>Search</button>
                        <div>
                            <Link to="/create" className="btn btn-primary btn-sm me-4" style={{ width: '120px', height: '40px', fontSize: '18px' }}>Add Student</Link>
                        </div>
                    </div>
                </form>
                <br></br><table className="table">
                    <thead>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Year Level</th>
                        <th>Address</th>
                        <th>Contact</th>
                    </thead>
                    <tbody>
    {filteredData.map((user, index) => {
        return (
            <tr key={index}>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{user.name}</td>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{user.age}</td>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{user.email}</td>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{user.course}</td>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{user.year_level}</td>
                <td>{user.address}</td>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{user.contact}</td>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
                    <Link to={`/edit/${user._id}`} className="btn btn-success me-2" style={{ width: '80px', height: '35px', fontSize: '15px' }}>Update</Link>
                    <button onClick={() => handleDelete(user._id)} className="btn btn-danger" style={{ width: '80px', height: '35px', fontSize: '15px' }}>Delete</button>
                </td>
            </tr>
        );
    })}
</tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;