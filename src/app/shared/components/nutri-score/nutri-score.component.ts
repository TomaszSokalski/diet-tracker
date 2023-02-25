import { Component, Input } from '@angular/core';
import { NutriScore } from './nutri-score.enum';

@Component({
  selector: 'app-nutri-score',
  templateUrl: './nutri-score.component.html',
  styleUrls: ['./nutri-score.component.scss'],
})
export class NutriScoreComponent {
  @Input() nutriScore: NutriScore;

  nutriScoreEnum = NutriScore;
  nutriScoreToColor: any = {
    [this.nutriScoreEnum.A]: 'green',
    [this.nutriScoreEnum.B]: 'lightgreen',
    [this.nutriScoreEnum.C]: 'yellow',
    [this.nutriScoreEnum.D]: 'orange',
    [this.nutriScoreEnum.E]: 'red',
  };
}
