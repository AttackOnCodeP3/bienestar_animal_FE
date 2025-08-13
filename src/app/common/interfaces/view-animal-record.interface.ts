export interface IViewAnimalRecord {
  id: number | string;
  name: string;
  weight?: number;
  species?: {
    id: number;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  race?: {
    id: number;
    name: string;
    description?: string | null;
    createdAt?: string;
    updatedAt?: string;
  };
  sex?: {
    id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
  };
  birthDate?: string;
  animalType?: {
    id: number;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  latitude?: number;
  longitude?: number;
  sanitaryControls?:  [];
  createdAt?: string | null;
  updatedAt?: string | null;
  age?: {
    years?: number;
    months?: number;
    days?: number;
    empty?: boolean;
    newborn?: boolean;
  };
}