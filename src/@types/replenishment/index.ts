export interface Replenishment {
  id: string;
  date: string;
  sector: string;
  gallonsQuantity: number;
  cupsQuantity: number;
}
export type CreateReplenishment = Omit<Replenishment, 'id' | 'createdAt' | 'updatedAt'>;
