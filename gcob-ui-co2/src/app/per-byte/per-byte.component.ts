import { Component, OnInit } from '@angular/core';
import { co2 } from "@tgwf/co2";

@Component({
  selector: 'app-per-byte',
  standalone: true,
  imports: [],
  templateUrl: './per-byte.component.html',
  styleUrl: './per-byte.component.scss'
})
export class PerByteComponent implements OnInit {

  public co2PerBytes: any;

  ngOnInit(): void {
    this.co2PerBytes = this.getCo2PerBytes(1000);
  }

  getCo2PerBytes(bytes: number): any {
    const swdmV4 =  new co2({ model: "swd", version: 4 });

    const estimate = swdmV4.perByte(bytes, true);

    return estimate;
  }
}
