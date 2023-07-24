import type {
  CreateFsReplenishment,
  FsReplenishment,
  Replenishment,
} from '~/@types';
import { firestore } from '~/api/database';

import { getAsset } from '../assets';

const getReplenishmentMedias = async (
  replenishment: FsReplenishment,
): Promise<Replenishment> => {
  const replenishmentMedias = await Promise.all(
    replenishment.medias.map((mediaId) => getAsset(mediaId)),
  );

  return {
    ...replenishment,
    medias: replenishmentMedias,
  };
};

export const getReplenishments = async (): Promise<Replenishment[]> => {
  const replenishmentsRef = firestore.collection('replenishments');

  const replenishmentSnapshot = await replenishmentsRef.get();
  const replenishments: FsReplenishment[] = [];

  if (replenishmentSnapshot.empty) return [];

  replenishmentSnapshot.forEach((doc) => {
    const replenishment = doc.data() as FsReplenishment;

    replenishments.push(replenishment);
  });

  const replenishmentsWithMedias = await Promise.all(
    replenishments.map((replenishment) =>
      getReplenishmentMedias(replenishment),
    ),
  );

  return replenishmentsWithMedias;
};

export const createReplenishment = async (
  createRepleneshimentDto: CreateFsReplenishment,
) => {
  const replenishmentsRef = firestore.collection('replenishments');

  const newRepleneshimentId = crypto.randomUUID();

  const createdReplenishment: FsReplenishment = {
    id: newRepleneshimentId,
    ...createRepleneshimentDto,
  };

  await replenishmentsRef.doc(newRepleneshimentId).set(createdReplenishment);

  return createdReplenishment;
};
