import { Component, OnInit } from '@angular/core';
import { co2 } from '@tgwf/co2';

@Component({
  selector: 'app-per-visit',
  standalone: true,
  imports: [],
  templateUrl: './per-visit.component.html',
  styleUrl: './per-visit.component.scss'
})
export class PerVisitComponent implements OnInit {

  public co2PerVisit: any;
  public numberOfVisits: number | undefined;

  ngOnInit(): void {
    this.numberOfVisits = 100;
    this.co2PerVisit = this.getCo2PerVisit(this.numberOfVisits);
  }

  getCo2PerVisit(numberOfVisits: number): any {
    const swdmV4 =  new co2({ model: "swd", version: 4 });

    const estimate = swdmV4.perVisit(numberOfVisits, true);

    return estimate;
  }

}
