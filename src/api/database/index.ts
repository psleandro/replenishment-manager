import { getApps, initializeApp, cert } from 'firebase-admin/app';
import type { ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const credential: ServiceAccount = {
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY
    ? JSON.parse(process.env.PRIVATE_KEY)
    : undefined,
};

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(credential),
      databaseURL: `https://${process.env.DB_NAME}.firebaseio.com`,
    });

const firestore = getFirestore(app);

export { firestore };
