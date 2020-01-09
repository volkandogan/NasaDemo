import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let main = this.state.startDate
        console.log(main.format('L'));
    }

    render() {
        return (
            <div className="container">
                <h3>React Datepicker Example</h3>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default App;