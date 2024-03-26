import { Category } from "./category.model";
import { Food } from "./food.model";

export interface Order {
  id: number;
  name: string;
  price: number;
  isComplete:boolean;
  categories: Category[] | number[];
  food: Food[] | number[];
}
