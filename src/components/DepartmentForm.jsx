import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import backApi from "../api/backApi";

const DepartmentForm = (props) => {
  const [dptName, setDptName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const [editId, setEditId] = useState(props.match.params.id);
  const onSubmit = () => {
    const formData = { dptName, description };
    if (editId === undefined || editId < 1)
      backApi.post("/department/", formData).then(() => {
        history.push("/departments");
      });
    else {
      backApi.put("/department/" + editId, formData).then(() => {
        history.push("/departments");
      });
    }
  };
  useEffect(() => {
    if (editId) {
      backApi.get("/department/" + editId).then((res) => {
        setDptName(res.data.dptName);
        setDescription(res.data.description);
      });
    }
  }, [editId]);
  return (
    <div className="ui form">
      <h4 className="ui dividing header">Shipping Information</h4>
      <div className="field">
        <label>Name</label>
        <div className="two fields">
          <div className="field">
            <input
              value={dptName}
              onChange={(e) => setDptName(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="field">
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
            />
          </div>
        </div>
      </div>
      <button className="ui primary button" type="submit" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default DepartmentForm;
