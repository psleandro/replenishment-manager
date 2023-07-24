import { PrivateAsset } from '~/@types';
import { storage } from '~/api/database';
import { parseStorageFileToPrivateAsset } from '~/api/factories/assetFactory';

import { deleteFileFromTmpStorage, saveFileOnTmpStorage } from '../tmpStorage';

export const getAssetUrlFromAssetPath = (assetPath: string) => {
  const filePublicUrl = storage.bucket().file(assetPath).publicUrl();

  return filePublicUrl;
};

export const getFileFromStorage = async (
  path: string,
): Promise<PrivateAsset> => {
  const fileRef = storage.bucket().file(path);
  const [fileExists] = await fileRef.exists();

  if (!fileExists) throw new Error(`No no files found in the path: ${path}.`);

  const [, metadata] = await fileRef.get();

  return parseStorageFileToPrivateAsset({ ...metadata, path });
};

export const uploadFileToStorage = async (file: File) => {
  const { fileTempPath, fileName } = await saveFileOnTmpStorage(file);

  const [, metadata] = await storage.bucket().upload(fileTempPath, {
    destination: fileName,
    public: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  await deleteFileFromTmpStorage(fileTempPath);

  return parseStorageFileToPrivateAsset({ ...metadata, path: fileName });
};
