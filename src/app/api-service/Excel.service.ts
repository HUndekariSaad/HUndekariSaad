import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

constructor() { }

public exportExcel(tableId: string, name?: string): void {
  const timeSpan = new Date().toISOString();
  const prefix = name || 'ExportResult';
  const fileName = `${prefix}-${timeSpan}`;
  const targetTableElm = document.getElementById(tableId);
  const wb = XLSX.utils.table_to_book(targetTableElm, { sheet: prefix } as
  XLSX.Table2SheetOpts);
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

}
