import { PrivateAsset, PublicAsset } from '~/@types';
import { firestore } from '~/api/database';

import { getAssetUrlFromAssetPath, uploadFileToStorage } from '../storage';

const convertPrivateAssetToPublicAsset = (
  privateAsset: PrivateAsset,
): PublicAsset => {
  const { path, ...asset } = privateAsset;

  const publicAssetUrl = getAssetUrlFromAssetPath(path);

  return {
    ...asset,
    src: publicAssetUrl,
  };
};

export const getAsset = async (assetId: string): Promise<PublicAsset> => {
  const assetsRef = firestore.collection('assets');

  const privateAssetSnapshot = await assetsRef.doc(assetId).get();

  if (!privateAssetSnapshot.exists) throw new Error('Asset not found.');

  const privateAsset = privateAssetSnapshot.data() as PrivateAsset;

  return convertPrivateAssetToPublicAsset(privateAsset);
};

export const uploadAsset = async (file: File): Promise<PublicAsset> => {
  const assetsRef = firestore.collection('assets');

  const newAssetId = crypto.randomUUID();

  const { id: _id, path, ...assetUploaded } = await uploadFileToStorage(file);

  const createdPrivateAsset: PrivateAsset = {
    id: newAssetId,
    path,
    ...assetUploaded,
  };

  await assetsRef.doc(newAssetId).set(createdPrivateAsset);

  return convertPrivateAssetToPublicAsset(createdPrivateAsset);
};
