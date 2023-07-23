export interface Asset {
  id: string;
  name: string;
  md5Hash: string;
  size: number;
  contentType: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublicAsset extends Asset {
  src: string;
}

export interface PrivateAsset extends Asset {
  path: string;
}
