import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit {
  search : any;
  @Input() searchConfig : any;
  @Input() _self : any;

  constructor() {
    this.search = {
      keywords : {
        change : function($event, component){
          let str = $event.target.value.toLowerCase();
          let something = [];
          let fieldsToEval = component.search.fieldsToEval;

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

          component.search.result.source = something;
          component.search.result.chunk.interval.start = 1;
          component.search.page.value = 1;
          component.search.show(component, something);
        },
      },
      sort : {
        change : function($event, component, attr) {
          component.search.fieldsToSort[attr] = !component.search.fieldsToSort[attr];
          let factor = component.search.fieldsToSort[attr] ? 1 : -1;
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
          if (component.search.result.source) component.search.result.source.sort(f);
          component.search.show(component);
        },
      },
      page : {
        change : function($event){
        },
        move : function(component, factor) {
          if (component.search.page.value + factor > 0 && component.search.page.value + factor <= component.search.result.total.pages) {
            component.search.page.value += factor;
            component.search.result.chunk.interval.start = ((component.search.page.value - 1) * component.search.perPage.value) + 1;
            component.search.show(component);
          }
        },
        value : 1,
      },
      perPage : {
        change : function(page, component) {
          component.search.perPage.value = page;
          component.search.result.chunk.interval.start = 1;
          component.search.page.value = 1;
          component.search.show(component);
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
      show : function(component){
        let tmp = component.search.result.source ? component.search.result.source : component.getItems();
        component.search.result.total.items = tmp.length;
        component.search.result.total.pages = Math.ceil(component.search.result.total.items / component.search.perPage.value);
        component.search.result.chunk.interval.end = component.search.result.chunk.interval.start + component.search.perPage.value - 1;
        component.search.result.items = tmp.slice(component.search.result.chunk.interval.start - 1, component.search.result.chunk.interval.end);
      },
    }
  }

  ngOnInit() {
    this._self.roles$.subscribe((component => {
      return v => {
        component.roles = v;
        component.search.show(component);
      };
    })(this._self));
    this._self.search = this.search;
    this._self.search.names = this.searchConfig.names;
    this._self.search.fieldsToSort = this.searchConfig.fieldsToSort;
    this._self.search.fieldsToEval = this.searchConfig.fieldsToEval;
    this.search.show(this._self);
  }
}
