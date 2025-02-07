import { Component, OnInit } from '@angular/core';
import { co2 } from '@tgwf/co2';
import { readFileSync } from 'fs';
import { convert } from 'pagexray';

@Component({
  selector: 'app-per-page',
  standalone: true,
  imports: [],
  templateUrl: './per-page.component.html',
  styleUrl: './per-page.component.scss'
})
export class PerPageComponent implements OnInit {
  ngOnInit(): void {
    this.getCo2EmissionPerPage('../har-files/dashboard.har')
  }

  getCo2EmissionPerPage(filePath: string): any{
    const swd =  new co2({ model: "swd", version: 4 });
    const oneByte = new co2({ model: "1byte" });
    
    const filesString = readFileSync(filePath, 'utf-8');

    const har = JSON.parse(filesString);
    const page = convert(har);

    const emissions_swd_per_page = swd.perPage(page, true)
    const emissions_1byte_per_page = oneByte.perPage(page, true)

  }
}
