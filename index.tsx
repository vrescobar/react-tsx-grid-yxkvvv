import { ColumnDirective, ColumnsDirective, EditSettingsModel, GridComponent, Inject } from '@syncfusion/ej2-react-grids';
import { DialogEditEventArgs, Edit, Grid, Toolbar, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { render } from 'react-dom';
import * as React from 'react';
import { data } from './datasource';
import { IOrderModel } from './ordermodel';
import { DialogFormTemplate } from './wizardtemplate';

export default class App extends React.Component<{}, {}> {
  public editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: this.dialogTemplate.bind(this) };
  public toolbarOptions: ToolbarItems[] = ['Add', 'Edit', 'Delete'];
  public grid: Grid | null;
  public rules: object =  { required: true };
  public dialogTemplate(props: IOrderModel): any {
    const a = [props, this.grid]
    return (<DialogFormTemplate {...a} />);
  }

  public actionComplete(args: DialogEditEventArgs): void {
    // Set initial Focus
    if (args.requestType === 'beginEdit') {
      ((args.form as HTMLFormElement).elements.namedItem('CustomerID') as HTMLInputElement).focus();
    } else if (args.requestType === 'add') {
      ((args.form as HTMLFormElement).elements.namedItem('OrderID')as HTMLInputElement).focus();
    }
  }

  public render() {
    this.actionComplete = this.actionComplete.bind(this);
    return <GridComponent ref={g=> this.grid = g} dataSource={data} actionComplete ={this.actionComplete}
      editSettings={this.editOptions} toolbar={this.toolbarOptions} height={265}>
      <ColumnsDirective>
          <ColumnDirective field='OrderID' headerText='Order ID' width='100' textAlign="Right" isPrimaryKey={true} validationRules= {this.rules}/>
          <ColumnDirective field='CustomerID' headerText='Customer ID' width='120' validationRules= {this.rules}/>
           <ColumnDirective field='Freight' headerText='Freight' width='150'/>
          <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'/>
      </ColumnsDirective>
      <Inject services={[Edit, Toolbar]} />
    </GridComponent>
  }
};
render(<App />, document.getElementById('root'));