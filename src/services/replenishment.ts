import type { CreateReplenishment, Replenishment } from '~/@types';
import { api } from './api';

export const getReplenishments = async (): Promise<Replenishment[]> => {
  const requestUrl = `/replenishments`;
  const replenishments = await api<Replenishment[]>(requestUrl, {
    next: { revalidate: 0 }
  });

  return replenishments;
};

export const createReplenishment = async (replenishment: CreateReplenishment): Promise<Replenishment> => {
  const requestUrl = `/replenishments`;

  const stringifyData = JSON.stringify(replenishment);
  const createdReplenishment = await api<Replenishment>(requestUrl, {
    method: 'POST',
    body: stringifyData,
  });

  return createdReplenishment;
};
