'use client';

import { useState } from 'react';

import { Replenishment } from '~/@types';
import { Typography } from '~/components';

import { ReplenishmentList } from './ReplenishmentList';
import { ReplenishmentModal } from './ReplenishmentModal';

interface ReplenishmentManagerProps {
  initialReplenishments: Replenishment[];
}

const ReplenishmentManager = ({
  initialReplenishments,
}: ReplenishmentManagerProps) => {
  const [replenishments, setReplenishments] = useState<Replenishment[]>(
    initialReplenishments,
  );

  const onCreateReplenishment = (newReplesihment: Replenishment) => {
    setReplenishments((prevReplenishments) => [
      ...prevReplenishments,
      newReplesihment,
    ]);
  };

  return (
    <>
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
    </>
  );
};

export { ReplenishmentManager };
