import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import backApi from "../api/backApi";
const EmployeeForm = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [doj, setDoj] = useState(new Date().toUTCString());
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState(0);
  const [departmentId, setDepartmentId] = useState(0);
  const [editId, setEditId] = useState(props.match.params.id);
  const [departments, setDepartments] = useState([]);

  const onSubmit = () => {
    const formData = {
      employee: { name, doj, email, mobile, address, departmentId },

      salary,
    };
    if (editId === undefined || editId < 1)
      backApi
        .post("/employee", formData)
        .then(() => history.push("/employees"));
    else {
      backApi
        .put("/employee/" + editId, formData)
        .then(() => history.push("/employees"));
    }
  };

  useEffect(() => {
    backApi
      .get("/department")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.log(err));
    if (editId > 0) {
      backApi.get("/employee/" + editId).then((res) => {
        const { name, doj, email, address, salary, departmentId, mobile } =
          res.data;
        setName(name);
        setSalary(salary);
        setDoj(new Date(doj).toDateString());
        setEmail(email);
        setMobile(mobile);
        setAddress(address);
        setDepartmentId(departmentId);
      });
    }
  }, [editId]);

  return (
    <div className="ui form">
      <div className="six wide field ">
        <label>Name</label>
        <input
          value={name}
          onChange={(evt) => {
            setName(evt.target.value);
          }}
          type="text"
          placeholder="First Name"
        />
      </div>
      <div className="four wide field">
        <label>DOJ</label>
        <input
          value={doj}
          onChange={(evt) => {
            setDoj(evt.target.value);
          }}
          type="text"
          placeholder="DOJ"
        />
      </div>
      <div className="six wide field">
        <label>Email</label>
        <input
          value={email}
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
          type="text"
          placeholder="Email"
        />
      </div>
      <div className="four wide field">
        <label>Mobile</label>
        <input
          value={mobile}
          onChange={(evt) => {
            setMobile(evt.target.value);
          }}
          type="text"
          placeholder="Mobile"
        />
      </div>
      <div className="four wide field">
        <label>Salary</label>
        <input
          value={salary}
          onChange={(evt) => {
            setSalary(evt.target.value);
          }}
          type="text"
          placeholder="Address"
        />
      </div>
      <div className="six wide field">
        <label>Address</label>
        <input
          value={address}
          onChange={(evt) => {
            setAddress(evt.target.value);
          }}
          type="text"
          placeholder="Address"
        />
      </div>
      <div className="four wide field">
        <label>Department</label>
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          class="ui fluid dropdown"
        >
          <option value={0}>Select Department</option>
          {departments.map((dep) => (
            <option value={dep.deptId}>{dep.dptName}</option>
          ))}
        </select>
      </div>

      <button className="ui primary button" type="submit" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default EmployeeForm;
