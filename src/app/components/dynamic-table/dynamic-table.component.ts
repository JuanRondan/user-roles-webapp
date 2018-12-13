import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit {
  search : any;
  Table : any;
  @Input() configuration : any;
  @Input() listComponent : any;

  constructor() {
    this.search = {
      keywords : {
        change : function($event, component, Table){
          let str = $event.target.value.toLowerCase();
          let something = [];
          let fieldsToEval = Table.search.fieldsToEval;

          component.getItems().forEach(item => {
            let cond = false;
            let i = -1, n = fieldsToEval.length;
            while (!cond && ++i < n) {
              switch (fieldsToEval[i].type) {
                case 'string' : {
                  item[fieldsToEval[i].name] = item[fieldsToEval[i].name] || '';
                  cond = cond || item[fieldsToEval[i].name].toLowerCase().indexOf(str) !== -1;
                }break;
              }
            }

            if (cond) {
              something.push(item);
            }
          });

          Table.search.result.source = something;
          Table.search.result.chunk.interval.start = 1;
          Table.search.page.value = 1;
          Table.search.show(component, Table);
        },
      },
      sort : {
        change : function($event, component, attr, Table) {
          Table.search.fieldsToSort[attr].asc = !Table.search.fieldsToSort[attr].asc;
          let factor = Table.search.fieldsToSort[attr].asc ? 1 : -1;
          if ($event.path[1].className.indexOf("-asc") !== -1) {
            $event.path[1].className = $event.path[1].className.replace("-asc", "-desc");
          } else {
            $event.path[1].className = $event.path[1].className.replace("-desc", "-asc");
          }
          let f = (u, v) => {
            if (u[attr] < v[attr]) return factor * -1;
            if (u[attr] > v[attr])  return factor * 1;
            return 0;
          };
          component.setItems(component.getItems().sort(f));
          if (Table.search.result.source) Table.search.result.source.sort(f);
          Table.search.show(component, Table);
        },
      },
      page : {
        change : function($event){
        },
        move : function(component, factor, Table) {
          if (Table.search.page.value + factor > 0 && Table.search.page.value + factor <= Table.search.result.total.pages) {
            Table.search.page.value += factor;
            Table.search.result.chunk.interval.start = ((Table.search.page.value - 1) * Table.search.perPage.value) + 1;
            Table.search.show(component, Table);
          }
        },
        value : 1,
      },
      perPage : {
        change : function(page, component, Table) {
          Table.search.perPage.value = page;
          Table.search.result.chunk.interval.start = 1;
          Table.search.page.value = 1;
          Table.search.show(component, Table);
        },
        options : [2, 5, 10, 15, 20],
        value : 2,
      },
      result : {
        total : {
          items : null,
          pages : null,
        },
        chunk : {
          interval : {
            start : 1,
            end : null,
          }
        },
        items : [],
        source : null,
      },
      show : function(component, Table){
        let tmp = Table.search.result.source ? Table.search.result.source : component.getItems();
        if (tmp) {
          Table.search.result.total.items = tmp.length;
          Table.search.result.total.pages = Math.ceil(Table.search.result.total.items / Table.search.perPage.value);
          Table.search.result.chunk.interval.end = Table.search.result.chunk.interval.start + Table.search.perPage.value - 1;
          Table.search.result.items = tmp.slice(Table.search.result.chunk.interval.start - 1, Table.search.result.chunk.interval.end);
        }
      },
    }
  }

  ngOnInit() {
    this.Table = self;
    this.Table.search = this.search;
    this.Table.search.names = this.configuration.names;
    this.Table.search.fieldsToSort = this.configuration.fieldsToSort;
    this.Table.search.fieldsToEval = this.configuration.fieldsToEval;
    this.Table.search.title = this.configuration.title;
    this.Table.actions = this.configuration.actions;
    this.listComponent[this.Table.search.names.asyncItems].subscribe(((component, Table) => {
      return v => {
        component[Table.search.names.items] = v;
        Table.search.show(component, Table);
      };
    })(this.listComponent, this.Table));
    //this.search.show(this.listComponent, this.Table);
  }
}
