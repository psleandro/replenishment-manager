import { getReplenishments } from '~/services/replenishment';

import { ReplenishmentManager } from './ReplenishmentManager';

export default async function Home() {
  const replenishments = await getReplenishments();

  return (
    <main className="flex min-h-screen flex-col items-center p-3 transition-all lg:p-24">
     <ReplenishmentManager initialReplenishments={replenishments} />
    </main>
  );
}
