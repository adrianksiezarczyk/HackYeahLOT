import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/observable/of'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/delay'
import 'rxjs/Rx'

@Injectable()
export class CsvParser {
    private separator = ','
    constructor() {}
    converToCsv(objArray, ignoreQuotes = false) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray
        var str = ''
        for (var i = 0; i < array.length; i++) {
            var line = ''
            for (var index in array[i]) {
                if (line != '') line += this.separator

                if (ignoreQuotes) line += `${array[i][index]}`
                else line += `"${array[i][index]}"`
            }
            str += line + '\r\n'
        }
        return str
    }
}
