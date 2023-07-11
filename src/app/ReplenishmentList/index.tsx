'use client';

import type { Replenishment } from '~/@types';
import { Card, Typography } from '~/components';

interface ReplenishmentListProps {
  replenishments: Replenishment[];
}

const tableHeads = [
  'Data',
  'Setor',
  'Quantidade de galões',
  'Quantidade de Copos',
];

const ReplenishmentList = ({ replenishments }: ReplenishmentListProps) => (
  <Card className="h-full w-full overflow-auto">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {tableHeads.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {replenishments.map(
          ({ id, date, sector, gallonsQuantity, cupsQuantity }, index) => {
            const isLast = index === replenishments.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {sector}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {gallonsQuantity}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {cupsQuantity}
                  </Typography>
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  </Card>
);

export { ReplenishmentList };
