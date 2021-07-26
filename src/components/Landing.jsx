import React from "react";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();
  const onDepartmentClick = () => {
    history.push("/departments");
  };
  const onEmployeeClick = () => {
    history.push("/employees");
  };
  return (
    <div className="ui form">
      <button className="ui primary" onClick={onDepartmentClick}>
        Department{" "}
      </button>
      <button className="ui primary" onClick={onEmployeeClick}>
        Employee{" "}
      </button>
    </div>
  );
};

export default Landing;
