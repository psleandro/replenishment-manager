import { getReplenishments } from '~/services/replenishment';

import { ReplenishmentManager } from './ReplenishmentManager';
import type { Replenishment } from '~/@types';

export default async function Home() {
  let replenishments: Replenishment[] = [];

  try {
    const results = await getReplenishments();
    replenishments = results;
  } catch (error){
    console.log('Home error: ', error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-3 transition-all lg:p-24">
     <ReplenishmentManager initialReplenishments={replenishments} />
    </main>
  );
}
