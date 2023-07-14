import type { CreateReplenishment, Replenishment } from '~/@types';
import { firestore } from '~/api/database';

export const getReplenishments = async (): Promise<Replenishment[]> => {
  const replenishmentsRef = firestore.collection('replenishments');

  const replenishmentSnapshot = await replenishmentsRef.get();
  const replenishments: Replenishment[] = [];

  if(replenishmentSnapshot.empty) return [];

  replenishmentSnapshot.forEach(doc => {
    const replenishment = doc.data() as Replenishment;

    replenishments.push(replenishment);
  })

  return replenishments;
};


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
