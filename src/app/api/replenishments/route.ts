import { NextResponse } from 'next/server';

import { uploadAsset } from '~/api/modules/assets';
import {
  createReplenishment,
  getReplenishments,
} from '~/api/modules/replenishment';
import { validateCreateReplenishmentBody } from '~/api/validators';

export async function GET() {
  try {
    const replenishments = await getReplenishments();

    return NextResponse.json(replenishments);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const { sector, gallonsQuantity, cupsQuantity, date, medias } =
      await validateCreateReplenishmentBody(request);

    const uploadedAssets = await Promise.all(
      medias.map((media) => uploadAsset(media)),
    );

    const mediasIds = uploadedAssets.map((uploadedAsset) => uploadedAsset.id);

    const createdReplenishment = await createReplenishment({
      sector,
      gallonsQuantity,
      cupsQuantity,
      date,
      medias: mediasIds,
    });

    Object.assign(createdReplenishment, { medias: uploadedAssets });

    return NextResponse.json(createdReplenishment);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, cause: error.cause },
        { status: 500 },
      );
    }

    return NextResponse.error();
  }
}
