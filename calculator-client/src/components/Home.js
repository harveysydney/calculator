import React, { Component } from "react";
import {Menu, Button, Container, Form, Segment} from 'semantic-ui-react';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid/dist/ag-grid';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';
import connected from "../connected";
import { calculate } from "../actions/calculation";
import CalculationHistory from "./CalculationHistory"
import { isNumber, toNumber, isNaN } from 'lodash';

export class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      income: "",
      includeSuperAnnuation: false,
      taxYear: "",
      superAnnuation: "",
      email: "",
      modalOpen: false,
      columnDefs: [
        {headerName: "Gross", field: "gross", width: 150, rowDrag: true},
        {headerName: "Gross + Superannuation", field: "grossNSuper", width: 250},
        {headerName: "Superannuation", field: "superAnnuation", width: 150},
        {headerName: "Tax Amount", field: "taxAmount", width: 150},
        {headerName: "Net Amount", field: "netAmount", width: 150},
        {headerName: "Net + Superannuation", field: "netNSuper", width: 250},
      ],
      containerStyle: {height: 150, marginTop: 20},

    };

    this.taxYear = [
      { key: '2016', text: '2016', value: '2016' },
      { key: '2017', text: '2017', value: '2017' },
    ]
  }

  handleInputChange = (event, { name, value, checked }) => {
    if (checked) {
      value = checked;
    }

    this.setState({
      [name]: value
    });
  };

  calculate = () => {

    if (!this.state.taxYear || !this.state.income || !this.state.superAnnuation) {
      alert("Income, Superannuation and tax year must not be empty");
      return;
    }

    if (isNaN(toNumber(this.state.income)) || toNumber(this.state.income) < 0) {
      alert("Income must be a number and greater than 0");
      return;
    }

    if (isNaN(toNumber(this.state.superAnnuation)) || toNumber(this.state.superAnnuation) < 9.5) {
      alert("Superannuation must be a number and no less than 9.5");
      return;
    }

    const params = {
      income: this.state.income,
      includeSuper: this.state.includeSuperAnnuation,
      taxYear: this.state.taxYear,
      superAnnuation: this.state.superAnnuation,
      email: this.state.email,
    };

    this.props.dispatch(calculate(params));
  };

  updateModalStatus = (display) => {
    this.setState({"modalOpen": display});
  };

  historyClicked = () => {
    if (!this.state.email) {
      alert("Please enter your email address to get your calculation history.");
      return;
    }
    this.updateModalStatus(true);
  };

  render() {
    return (
      <Container>
        <Menu color="black" inverted>
          <Menu.Item><h1>Pay Calculator</h1></Menu.Item>
          <Menu.Item position='right' onClick={this.historyClicked}>My Calculation History</Menu.Item>
        </Menu>

        <Segment.Group raised>
          <Segment inverted color='grey'>Income</Segment>
          <Segment>
            <Form>
              <Form.Group>
                <Form.Input name="income" value={this.state.income} onChange={this.handleInputChange} label="Your Income (Annually)" placeholder="Your Income(Annually)" width={5}/>
                <Form.Input name="email" value={this.state.email} onChange={this.handleInputChange} label="Email (Enter email to save your calculation history)" placeholder="Email" width={5}/>
              </Form.Group>
              <Form.Checkbox name="includeSuperAnnuation" checked={this.state.includeSuperAnnuation} onChange={this.handleInputChange} label='Includes Superannuation' width={5} />

              <Form.Group>
                <Form.Select name="taxYear" value={this.state.taxYear} label="Tax Year" onChange={this.handleInputChange} options={this.taxYear} placeholder="Tax Year" width={5}/>
                <Form.Input name="superAnnuation" value={this.state.superAnnuation} onChange={this.handleInputChange} label="Superannuation(%)" placeholder="Superannuation" width={6}/>
              </Form.Group>

              <Button type='submit' onClick={this.calculate}>Calculate</Button>
            </Form>
          </Segment>
        </Segment.Group>

        <div style={this.state.containerStyle} className="ag-theme-fresh">
          <AgGridReact
            rowData={this.props.calculation.calculationResult}
            columnDefs={this.state.columnDefs}
            animateRows={true}
          />
        </div>

        <CalculationHistory
          open={this.state.modalOpen}
          email={this.state.email}
          onClose={this.updateModalStatus}
        />

      </Container>
    )
  }
}

export default connected(Home);