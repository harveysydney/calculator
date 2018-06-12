import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { getHistory, deleteHistory } from '../actions/calculation';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid/dist/ag-grid';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css'
import connected from "../connected";

class CalculationHistory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      columnDefs: [
        {headerName: "Gross", field: "gross", width: 150},
        {headerName: "Include Super", field: "includeSuper", width: 150},
        {headerName: "Tax Year", field: "taxYear", width: 150},
        {headerName: "Superannuation(%)", field: "superPercent", width: 200},
        {headerName: "Gross + Superannuation", field: "grossNSuper", width: 250},
        {headerName: "Superannuation", field: "superannuation", width: 150},
        {headerName: "Tax Amount", field: "taxAmount", width: 150},
        {headerName: "Net Amount", field: "netAmount", width: 150},
        {headerName: "Net + Superannuation", field: "netNSuper", width: 250},
      ],
      containerStyle: {height: 550, marginTop: 20},
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  deleteHistory = () => {
    const selectedRows = this.gridApi.getSelectedRows();
    let selectedIDs = [];
    selectedRows.forEach((selectedRow) => {
      selectedIDs = selectedIDs.concat(selectedRow.id);
    });

    if (selectedIDs.length > 0) {
      this.props.dispatch(deleteHistory(selectedIDs));
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({
        open: nextProps.open,
      });

      this.props.dispatch(getHistory(nextProps.email));
    }
  }

  close = () => {
    this.props.onClose(false);
  };

  render() {
    return (
      <div>
        <Modal
          open={this.state.open}
          closeOnRootNodeClick={false}
          onClose={this.close}>

          <Modal.Header>My Calculation History</Modal.Header>
          <Modal.Content>
            <Button color='grey' onClick={this.deleteHistory}>Delete</Button>
            <span>(Select row by clicking rows and then delete, also supports multiple selection by using shift + click)</span>
            <div style={this.state.containerStyle} className="ag-theme-fresh">
              <AgGridReact
                rowData={this.props.calculation.calculationHistory}
                columnDefs={this.state.columnDefs}
                animateRows={true}
                onGridReady={this.onGridReady.bind(this)}
                rowSelection="multiple"
              />
            </div>
          </Modal.Content>

          <Modal.Actions>
            <Button color='grey' onClick={this.close}>Close</Button>
          </Modal.Actions>


        </Modal>
      </div>
    )
  }
}

export default connected(CalculationHistory);