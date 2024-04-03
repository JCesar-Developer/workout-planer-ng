export interface Exercise {
  id:       number;
  name:     string;
  category: Category;
  image:    string;
  alternativeImage?: string;
}

export enum Category {
  ALL = "Todos",
  CORE = "Core",
  CHEST = "Pecho",
  LEGS = "Piernas",
  BACK = "Espalda",
  GLOBAL = "Global"
}
