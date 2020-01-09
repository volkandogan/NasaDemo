import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DatePicker from 'react-datepicker';

export default class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date(),
            toDate: new Date(),
            data: [],
        };
    }
    getData() {
        let main = this.state.startDate.toLocaleDateString("nl", { year: "numeric", month: "numeric", day: "numeric" })
        let stdate = main.split("-");
        fetch("http://localhost:8000/api/gets")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        data: [result]
                    })
                },
                (error) => {
                    console.log(error)
                }
            )
        /* console.log(date[0]);
         console.log(date[1]);
         console.log(date[2]);*/
    }
    render() {
        return (
            <div className="flex-row">
                <DatePicker
                    selected={this.state.startDate}
                    onChange={date => this.setState({ startDate: date })}
                />
                <DatePicker
                    selected={this.state.toDate}
                    onChange={date => this.setState({ toDate: date })}
                />
                <button type="button" onClick={() => { this.getData() }} className="btn btn-primary">Get</button>
                <div className="p-2">
                    <ul className="list-group">
                        {this.state.data.map((datas, index) =>
                            <li className="list-group-item" key={index}>{datas.name}</li>
                        )}
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
