export interface Replenishment {
  id: string;
  date: string;
  sector: string;
  gallonsQuantity: string;
  cupsQuantity: string;
}
export type CreateReplenishment = Omit<Replenishment, 'id'>;
