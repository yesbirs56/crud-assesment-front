import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import backApi from "../api/backApi";
import AlertDialog from "./Dialogs/AlertDialog";
const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [id, setId] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();
  useEffect(() => {
    backApi.get("/department").then((res) => {
      setDepartments(res.data);
    });
  }, []);
  const onEdit = (deptId) => {
    history.push("/edit-department/" + deptId);
  };
  const onDelete = () => {
    backApi
      .delete("/department/" + id)
      .then(() => console.log("delete successfull"));
  };

  return (
    <div>
      <AlertDialog
        title="Delete Confirmation"
        text={`Are you sure you want to delete department with id : ${id}`}
        action={onDelete}
        open={isShow}
        setOpen={setIsShow}
      />
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dpt) => (
            <tr>
              <td data-label="Name">{dpt.deptId}</td>
              <td data-label="Age">{dpt.dptName}</td>
              <td data-label="Job">{dpt.description}</td>
              <td>
                <button
                  className="ui button"
                  onClick={() => {
                    onEdit(dpt.deptId);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    setId(dpt.deptId);
                    setIsShow(true);
                  }}
                  className="ui red button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Department;
