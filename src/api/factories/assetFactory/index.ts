import type { PrivateAsset } from '~/@types';

export const parseStorageFileToPrivateAsset = (
  storageFile: any,
): PrivateAsset => ({
  id: storageFile.id,
  name: storageFile.name,
  path: storageFile.path,
  md5Hash: storageFile.md5Hash,
  size: Number(storageFile.size),
  contentType: storageFile.contentType,
  createdAt: storageFile.timeCreated,
  updatedAt: storageFile.updated,
});
