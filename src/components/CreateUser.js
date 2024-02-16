import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser(){

    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [email, setEmail] = useState()
    const [course, setCourse] = useState()
    const [year_level, setYear_level] = useState()
    const [address, setAddress] = useState()
    const [contact, setContact]= useState()
    const [errorMessage, setErrorMessage] = useState("")

    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !age || !email || !course || !year_level || !address || !contact) {
          setErrorMessage("Please fill in all required fields.");
          return;
        }

        setErrorMessage("");
   
        axios
          .post("http://localhost:3001/create", { name, age, email, course, year_level, address, contact })
          .then((res) => {
            console.log(res);
            navigate("/");
          })
          .catch((err) => console.log(err));
      };

    return (
        <div className="d-flex vh-100  justify-content-center align-items-center">
        <div className="w-50 bg-white  p-3 bordered-container1 ">
                <form onSubmit={handleSubmit} className="bordered-container2 ">
                    <h2 className="centered-label">Add User</h2>
                    <div className="mb-2">
                        <label htmlFor= "">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor= "">Age</label>
                    <input
                        type="text"
                        placeholder="Enter Age"
                        className="form-control"
                        onChange={(e) => setAge(e.target.value)}
                    />
                    </div>
                    <div className="mb-2">
                        <label htmlFor= "">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor= "">Course</label>
                    <input
                        type="text"
                        placeholder="Enter course"
                        className="form-control"
                        onChange={(e) => setCourse(e.target.value)}
                    />
                    </div>
                    <div className="mb-2">
                        <label htmlFor= "">Year Level</label>
                        <input
                            type="text"
                            placeholder="Enter Year Level"
                            className="form-control"
                            onChange={(e) => setYear_level(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor= "">Address</label>
                    <input
                        type="text"
                        placeholder="Enter Address"
                        className="form-control"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                   </div>
                   <div className="mb-2">
                    <label htmlFor= "">Contact</label>
                    <input
                        type="text"
                        placeholder="Enter Contact"
                        className="form-control"
                        onChange={(e) => setContact(e.target.value)}
                    />
                   </div><br></br>
                    {errorMessage && <div className="text-danger mb-2">{errorMessage}</div>}
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-success me-2" style={{ width: "100px", height: "30px", fontSize: "12px" }} onClick={handleSubmit}>
                            Submit
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

export default CreateUser;