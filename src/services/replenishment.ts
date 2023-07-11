import type { CreateReplenishment, Replenishment } from '~/@types';

const replenishmentStorageKey = 'replenishmentList';

export const getReplenishments = (): Replenishment[] => {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(replenishmentStorageKey);
  const list = stored ? (JSON.parse(stored) as Replenishment[]) : [];

  return list;
};

export const createReplenishment = (replenishment: CreateReplenishment) => {
  if (typeof window === 'undefined')
    throw Error('Create replenishment only works in client side');

  const currentReplenishments = getReplenishments();

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
