import { CreateReplenishmentDto } from "~/@types";

export const validateCreateReplenishmentBody = async (request: Request) => {
  try {
    const formData = await request.formData();

    const medias = formData.getAll('medias') as File[];

    if (!medias || !Array.isArray(medias)) {
      throw new Error('No medias found.');
    }

    const sector = formData.get('sector') as string;
    const gallonsQuantity = Number(formData.get('gallonsQuantity')) as number;
    const cupsQuantity = Number(formData.get('cupsQuantity')) as number;
    const date = formData.get('date') as string;

    if(!sector || !gallonsQuantity || !cupsQuantity || !date) {
      throw new Error('Informações de reposição enviadas incorretamente!');
    }

    const createReplenishmentDto: CreateReplenishmentDto = {
      sector,
      gallonsQuantity,
      cupsQuantity,
      date,
      medias,
    }

    return createReplenishmentDto;
  } catch (error: any) {
    throw new Error('Invalid Request', { cause: error?.message });
  }
};
