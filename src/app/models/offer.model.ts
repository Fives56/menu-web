import { Category } from "./category.model";
import { Food } from "./food.model";

export interface Offer {
  id: number;
  name: string;
  price: number;
  categories: Category[] | number[];
  food: Food[] | number[];
}
