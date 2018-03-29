import   React , {Component} from "react";
import {createContainer} from 'meteor/react-meteor-data'
import {Employees} from '../../imports/collections/employee'
import  EmployeeDetail  from "./employee_detail";
const PER_PAGE = 20;

class EmpolyeeList extends Component {

    componentWillMount(){
        this.page = 1;
    }

    handleButtonClick(){
        Meteor.subscribe('employees', PER_PAGE * (this.page+1   ) )
        this.page +=1
    }

    render (){
    //props.employee array of employee object
        return (
            <div>
                <div className="employee-list">
                    {this.props.employees.map(employee => <EmployeeDetail key={employee._id } employee={employee}/>)}
                </div>
                <button onClick={this.handleButtonClick.bind(this) } 
                    className="btn btn-primary">
                    Load More
                </button>
            </div>
        );
    }  
};


export default  createContainer(() => {
    //set up subscription inside our container
    Meteor.subscribe('employees', PER_PAGE);
    // returned will set to Employeelist as props

    return {employees: Employees.find({}).fetch()}
},EmpolyeeList); 

