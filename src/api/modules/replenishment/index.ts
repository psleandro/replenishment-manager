import type { CreateReplenishment, Replenishment } from '~/@types';
import { firestore } from '~/api/database';

export const createReplenishment = async (createRepleneshimentDto: CreateReplenishment) => {
  const replenishmentsRef = firestore.collection('replenishments');

  const newRepleneshimentId = crypto.randomUUID();

  const createdReplenishment: Replenishment = {
    id: newRepleneshimentId,
    ...createRepleneshimentDto,
  }

  await replenishmentsRef.doc(newRepleneshimentId).set(createdReplenishment);

  return createdReplenishment;
};
