interface IViewAnimalRecord{
  id: string | number;
  name: string;
  age?: {
    years?: number;
    months?: number;
    days?: number;
  };

}