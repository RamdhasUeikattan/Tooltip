import { Component, OnInit, ViewChild } from '@angular/core';
import { gridData } from './data';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { ToolbarService, FilterService } from '@syncfusion/ej2-ng-grids';
import { Tooltip } from '@syncfusion/ej2-popups';

@Component({
    selector: 'my-app',
    template: `<ej-grid #grid id='Grid' [dataSource]='data' [allowFiltering]='true' [toolbar]='toolbar' 
    (toolbarClick)='toolbarClickHandler($event)' (created)='header($event)' (queryCellInfo)='queryCellInfo($event)' gridLines='both'>
                    <e-columns>
                        <e-column field='LastName' headerText='Last Name' width='140'></e-column>
                        <e-column field='FirstName' headerText='First Name' width='170' format= 'C2'></e-column>
                        <e-column field='EmployeeID' headerText='Employee ID' width='120' textAlign="center"></e-column>
                        <e-column field='Title' headerText='Title' width='180' ></e-column>
                        <e-column field='BirthDate' headerText='Bitth Date' width='120' format='yMd' ></e-column>
                        <e-column field='City' headerText='City' width='120' ></e-column>
                    </e-columns>
                </ej-grid>`,
    providers: [ToolbarService, FilterService]
})
export class AppComponent implements OnInit {

    public data: Object[];
    public toolbar;
    @ViewChild('grid')
    public grid;
    ngOnInit(): void {
        this.data = gridData;
        this.toolbar = ['Enable', 'Disable'];
    }

    queryCellInfo(args: QueryCellInfoEventArgs) {
        this.tooltip(args.data[args.column.field], args.cell);
    }

    header() {
        let tr = document.querySelector('.e-columnheader');
        for(let i = 0 ; i < tr.children.length; i++ ){
            this.tooltip((<HTMLElement>tr.children[i]).innerText, tr.children[i]);
        }
    }

    tooltip(data, element) {
        let tooltip: Tooltip = new Tooltip({
            content: data.toString(),
        }, element);
    }

    toolbarClickHandler(args){
        if(args.item.text === 'Enable'){
            this.grid.allowFiltering= true;
        } else {
            this.grid.allowFiltering= false;
        }
        this.grid.dataBind();
    }
}
