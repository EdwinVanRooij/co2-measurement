import { Component, OnInit } from '@angular/core';
import { co2 } from '@tgwf/co2';
import { convert } from 'pagexray';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-per-page',
  standalone: true,
  imports: [],
  templateUrl: './per-page.component.html',
  styleUrl: './per-page.component.scss'
})
export class PerPageComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCo2EmissionPerPage();
  }

  getCo2EmissionPerPage(): void {
    this.http.get('assets/har-files/dashboard.har', { responseType: 'text' })
        .subscribe(filesString => {
          const har = JSON.parse(filesString);
          const page = convert(har);

          const swd = new co2({ model: 'swd', version: 4 });
          const oneByte = new co2({ model: '1byte' });

          const emissions_swd_per_page = swd.perPage(page, true);
          const emissions_1byte_per_page = oneByte.perPage(page, true);
        });
  }
}
