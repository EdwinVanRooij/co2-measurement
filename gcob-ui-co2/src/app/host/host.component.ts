import { Component, OnInit } from '@angular/core';
import { hosting } from "@tgwf/co2";

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss'
})
export class HostComponent implements OnInit{

  public domain: string = 'rabobank.nl';
  public isGreen: boolean | undefined;

  ngOnInit(): void {
    this.isGreen = this.getHostStatus(this.domain);
  }

  getHostStatus(domain: string): any {
    let response = hosting.check(domain, 'gcob-co2-check');
    console.log(response);
    return response;
  }
}


