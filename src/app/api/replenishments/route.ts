import { NextResponse } from 'next/server';
import type { CreateReplenishment } from '~/@types';

import { createReplenishment, getReplenishments } from '~/api/modules/replenishment';

export async function GET(){
  try {
    const replenishments = await getReplenishments();

    return NextResponse.json(replenishments);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const {
      sector,
      gallonsQuantity,
      cupsQuantity,
      date,
    } = await request.json() as CreateReplenishment;

    if (!sector || !gallonsQuantity || !cupsQuantity || !date) {
      throw new Error("Informações de reposição enviadas incorretamente!");
    };

    const createdReplenishment =  await createReplenishment({
      sector,
      gallonsQuantity,
      cupsQuantity,
      date,
    });

    return NextResponse.json(createdReplenishment);
  } catch (error) {
    return NextResponse.error();
  }
}
