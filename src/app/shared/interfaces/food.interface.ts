import { NutriScore } from '../components/nutri-score/nutri-score.enum';
import { Tag } from './tag.interface';

export interface Food {
  id: string;
  name?: string;
  caloriesPer100g?: number;
  weight: number;
  nutriScore?: NutriScore;
  tags?: Tag['id'][];
}
