import type { CreateReplenishment, Replenishment } from '~/@types';
import { api } from './api';

const replenishmentStorageKey = 'replenishmentList';

export const getReplenishments = async (): Promise<Replenishment[]> => {
  const requestUrl = `/replenishments`;
  const replenishments = await api<Replenishment[]>(requestUrl);

  return replenishments;
};

export const createReplenishment = (replenishment: CreateReplenishment) => {
  if (typeof window === 'undefined')
    throw Error('Create replenishment only works in client side');

  const stored = localStorage.getItem(replenishmentStorageKey);
  const currentReplenishments = stored ? (JSON.parse(stored) as Replenishment[]) : [];

  const randomId = crypto.randomUUID();

  const createdReplenishment: Replenishment = {
    id: randomId,
    ...replenishment,
  };

  const newReplenishmentsList = [
    ...currentReplenishments,
    createdReplenishment,
  ];

  const stringifyList = JSON.stringify(newReplenishmentsList);

  localStorage.setItem(replenishmentStorageKey, stringifyList);

  return createdReplenishment;
};
