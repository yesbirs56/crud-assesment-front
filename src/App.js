import logo from "./logo.svg";
import "./App.css";
import Employee from "./components/Employee";
import Department from "./components/Department";
import Landing from "./components/Landing";
import EmployeeForm from "./components/EmployeeForm";
import { BrowserRouter, Route } from "react-router-dom";
import DepartmentForm from "./components/DepartmentForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route exact path="/employee-form" component={EmployeeForm} />
        <Route exact path="/edit-employee/:id" component={EmployeeForm} />
        <Route exact path="/departments" component={Department} />
        <Route exact path="/department-form" component={DepartmentForm} />
        <Route exact path="/edit-department/:id" component={DepartmentForm} />
        <Route exact path="/employees" component={Employee} />
      </BrowserRouter>
    </div>
  );
}

export default App;
