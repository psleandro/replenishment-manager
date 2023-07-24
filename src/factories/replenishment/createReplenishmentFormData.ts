import type { CreateReplenishmentDto } from '~/@types';

export const parseCreateReplenishmentDtoToFormData = (
  createReplenishmentDto: CreateReplenishmentDto,
) => {
  const { sector, gallonsQuantity, cupsQuantity, date, medias } =
    createReplenishmentDto;

  const formData = new FormData();

  formData.append('sector', sector);
  formData.append('gallonsQuantity', String(gallonsQuantity));
  formData.append('cupsQuantity', String(cupsQuantity));
  formData.append('date', date);

  const mediasArray = Array.from(medias);
  mediasArray.forEach((media) => formData.append('medias', media));

  return formData;
};
