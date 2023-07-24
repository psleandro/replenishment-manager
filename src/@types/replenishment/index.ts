import type { PublicAsset } from '../asset';

export interface Replenishment {
  id: string;
  date: string;
  sector: string;
  gallonsQuantity: number;
  cupsQuantity: number;
  medias: PublicAsset[];
}

interface FsReplenishmentMedias {
  medias: string[];
}

export interface FsReplenishment extends FsReplenishmentMedias {
  id: string;
  date: string;
  sector: string;
  gallonsQuantity: number;
  cupsQuantity: number;
}

export type CreateReplenishment = Omit<
  Replenishment,
  'id' | 'createdAt' | 'updatedAt' | 'medias'
>;

export interface CreateReplenishmentDto extends CreateReplenishment {
  medias: File[];
}

export interface CreateFsReplenishment
  extends CreateReplenishment,
    FsReplenishmentMedias {}
