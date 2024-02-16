import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateUser(){

    const { id } = useParams();

    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [email, setEmail] = useState()
    const [course, setCourse] = useState()
    const [year_level, setYear_level] = useState()
    const [address, setAddress] = useState()
    const [contact, setContact]= useState()
    const [message, setMessage] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("http://localhost:3001/get/" + id);
                console.log(response);
                setName(response.data.name)
                setAge(response.data.age)
                setEmail(response.data.email)
                setCourse(response.data.course)
                setYear_level(response.data.year_level)
                setAddress(response.data.address)
                setContact(response.data.contact)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault();
        axios
          .put("http://localhost:3001/update/" + id, { name, age, email, course, year_level, address, contact })
          .then((res) => {
            console.log(res);
            navigate("/");
          })
          .catch((err) => console.log(err));
      };

    return (
        <div className="d-flex vh-100  justify-content-center align-items-center">
            <div className="w-50 bg-white  p-3 bordered-container1 ">
            <form onSubmit={handleUpdate} className="bordered-container2 ">
                    <h2 className="centered-label">Update User</h2>
                    <div className="mb-2">
                        <label htmlFor= "">Name</label>
                        <input
                            type="text"
                            placeholder={name}
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor= "">Age</label>
                    <input
                        type="text"
                        placeholder={age}
                        className="form-control"
                        onChange={(e) => setAge(e.target.value)}
                    />
                    </div>
                    <div className="mb-2">
                        <label htmlFor= "">Email</label>
                        <input
                            type="email"
                            placeholder={email}
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor= "">Course</label>
                    <input
                        type="text"
                        placeholder={course}
                        className="form-control"
                        onChange={(e) => setCourse(e.target.value)}
                    />
                    </div>
                    <div className="mb-2">
                        <label htmlFor= "">Year Level</label>
                        <input
                            type="text"
                            placeholder={year_level}
                            className="form-control"
                            onChange={(e) => setYear_level(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor= "">Address</label>
                    <input
                        type="text"
                        placeholder={address}
                        className="form-control"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                   </div>
                   <div className="mb-2">
                    <label htmlFor= "">Contact</label>
                    <input
                        type="text"
                        placeholder={contact}
                        className="form-control"
                        onChange={(e) => setContact(e.target.value)}
                    />
                   </div><br></br>
                   <div className="d-flex justify-content-between">
                        <button className="btn btn-success me-2" style={{ width: "100px", height: "30px", fontSize: "12px" }}>
                        Update
                        </button>
                        <button className="btn btn-secondary me-2" style={{ width: "100px", height: "30px", fontSize: "12px" }} onClick={() => navigate("/")}>
                        Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;