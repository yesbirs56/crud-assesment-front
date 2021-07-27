import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import backApi from "../api/backApi";
import AlertDialog from "./Dialogs/AlertDialog";
const Employee = () => {
  const history = useHistory();
  const [employees, setEmployees] = useState([]);
  const [isShow, setIsShow] = useState(0);
  const [delId, setDelId] = useState(0);

  useEffect(() => {
    backApi
      .get("/employee")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);
  const onAddEmployee = () => {
    history.push("/employee-form");
  };
  const onEdit = (id) => {
    history.push("/edit-employee/" + id);
  };
  const onDelete = () => {
    backApi
      .delete("/employee/" + delId)
      .then(() => console.log("delete successfull"));
  };
  let rank = 0;
  let preSal = 0;
  return (
    <div>
      {console.log(isShow)}
      {
        <AlertDialog
          title="Confirm Delete"
          text={`Are you sure ? want to delete employee`}
          action={onDelete}
          open={isShow}
          setOpen={setIsShow}
        />
      }
      <div>
        <table className="ui compact celled definition table">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOJ</th>
              <th>E-mail address</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Department Name</th>
              <th>Salary Amount</th>
              <th>Rank</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr>
                <td>{employee.name}</td>
                <td>{employee.doj}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.address}</td>
                <td>{employee.dptName}</td>
                <td>{employee.salary}</td>
                <td>{preSal !== employee.salary ? ++rank : rank}</td>
                {(preSal = employee.salary)}
                <td>
                  <button
                    className="ui button"
                    onClick={() => onEdit(employee.employeeId)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="ui red button"
                    onClick={() => {
                      setIsShow(true);
                      setDelId(employee.employeeId);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th colspan="4">
                <div
                  className="ui right floated small primary labeled icon button"
                  onClick={onAddEmployee}
                >
                  <i className="user icon"></i> Add Employee
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Employee;
