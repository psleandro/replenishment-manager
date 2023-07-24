import type { CreateReplenishmentDto, Replenishment } from '~/@types';
import { parseCreateReplenishmentDtoToFormData } from '~/factories/replenishment';

import { api } from './api';

export const getReplenishments = async (): Promise<Replenishment[]> => {
  const requestUrl = `/replenishments`;
  const replenishments = await api<Replenishment[]>(requestUrl, {
    next: { revalidate: 0 },
  });

  return replenishments;
};

export const createReplenishment = async (
  replenishment: CreateReplenishmentDto,
): Promise<Replenishment> => {
  const requestUrl = `/replenishments`;

  const formData = parseCreateReplenishmentDtoToFormData(replenishment);

  const createdReplenishment = await api<Replenishment>(requestUrl, {
    method: 'POST',
    body: formData,
  });

  return createdReplenishment;
};
