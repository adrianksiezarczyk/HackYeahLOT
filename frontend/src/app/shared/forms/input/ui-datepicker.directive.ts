import { Directive, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { config } from "app/shared/smartadmin.config";
import { DatePipe } from '@angular/common';

declare var $: any;

@Directive({
  selector: '[saUiDatepicker]'
})
export class UiDatepickerDirective implements OnInit {

  @Input() saUiDatepicker: any;
  @Output() ngModelChange = new EventEmitter();


  constructor(private el: ElementRef, private datePipe: DatePipe) {
  }

  ngOnInit() {
    let onSelectCallbacks = [];
    let saUiDatepicker = this.saUiDatepicker || {};
    let element = $(this.el.nativeElement);

    if (saUiDatepicker.minRestrict) {
      onSelectCallbacks.push((selectedDate) => {
        $(saUiDatepicker.minRestrict).datepicker('option', 'minDate', selectedDate);
      });
    }
    if (saUiDatepicker.maxRestrict) {
      onSelectCallbacks.push((selectedDate) => {
        $(saUiDatepicker.maxRestrict).datepicker('option', 'maxDate', selectedDate);
      });
    }

    //Let others know about changes to the data field
    onSelectCallbacks.push((selectedDate) => {
      element.triggerHandler("change");

      let form = element.closest('form');

      if (typeof form.bootstrapValidator == 'function') {
        try {
          form.bootstrapValidator('revalidateField', element);
        } catch (e) {
          console.log(e.message)
        }
      }
    });

    let options = $.extend(saUiDatepicker, {
      prevText: '<i class="fa fa-chevron-left"></i>',
      nextText: '<i class="fa fa-chevron-right"></i>',
      firstDate: '1',
      onSelect: (selectedDate) => {
        onSelectCallbacks.forEach((callback) => {
          callback.call(callback, selectedDate)
        })
      }
    });

    $.datepicker.regional['pl'] = {
            closeText: 'Zamknij',
            prevText: '&#x3C;Poprzedni',
            nextText: 'Następny&#x3E;',
            currentText: 'Dziś',
            monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
            'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
            monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze',
            'Lip','Sie','Wrz','Pa','Lis','Gru'],
            dayNames: ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
            dayNamesShort: ['Nie','Pn','Wt','Śr','Czw','Pt','So'],
            dayNamesMin: ['N','Pn','Wt','Śr','Cz','Pt','So'],
            weekHeader: 'Tydz',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['pl']);

    if($.datepicker)
      $.datepicker.setDefaults($.datepicker.regional['pl']);
    element.datepicker(options).change(() => {
      let date = element.datepicker('getDate');
      if (date) {
        this.ngModelChange.emit(new Date(date).toISOString());
      }
    });
  }


}