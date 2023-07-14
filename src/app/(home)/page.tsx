'use client';

import { useState } from 'react';

import { Replenishment } from '~/@types';
import { Typography } from '~/components';
import { getReplenishments } from '~/services/replenishment';

import { ReplenishmentList } from './ReplenishmentList';
import { ReplenishmentModal } from './ReplenishmentModal';

export default function Home() {
  const [replenishments, setReplenishments] = useState<Replenishment[]>(
    getReplenishments(),
  );

  const onCreateReplenishment = (newReplesihment: Replenishment) => {
    setReplenishments((prevReplenishments) => [
      ...prevReplenishments,
      newReplesihment,
    ]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-3 transition-all lg:p-24">
      <div className="mb-8 flex flex-col items-center justify-between self-stretch lg:flex-row">
        <Typography
          variant="h3"
          className="text-center transition-all lg:text-start"
        >
          Controle de Reabastecimento
        </Typography>
        <ReplenishmentModal onCreate={onCreateReplenishment} />
      </div>
      <ReplenishmentList replenishments={replenishments} />
    </main>
  );
}
