'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';

import type { CreateReplenishmentDto, Replenishment } from '~/@types';
import {
  Button,
  Dialog,
  Typography,
  Card,
  CardBody,
  CardFooter,
  Input,
  InputImage,
} from '~/components';
import { createReplenishment } from '~/services/replenishment';

interface ReplenishmentModalProps {
  onCreate: (newReplenishment: Replenishment) => void;
}

const ReplenishmentModal = ({ onCreate }: ReplenishmentModalProps) => {
  const [open, setOpen] = useState(false);
  const toggleReplenighmentModal = () => setOpen((v) => !v);

  const { register, handleSubmit, reset } = useForm<CreateReplenishmentDto>();

  const handleCreateReplenishment = async (
    createReplenishmentDto: CreateReplenishmentDto,
  ) => {
    try {
      const replenishmentCreated = await createReplenishment(
        createReplenishmentDto,
      );

      onCreate(replenishmentCreated);
      toggleReplenighmentModal();
      reset();
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <>
      <Button onClick={toggleReplenighmentModal}>Novo Reabastecimento</Button>
      <Dialog
        size="xs"
        open={open}
        handler={toggleReplenighmentModal}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSubmit(handleCreateReplenishment)}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <div className="p-6">
              <Typography
                variant="h5"
                color="blue-gray"
                className="text-center"
              >
                Novo Reabastecimento
              </Typography>
            </div>
            <CardBody className="flex flex-col gap-4">
              <Input
                type="date"
                defaultValue={new Date().toJSON().slice(0, 10)}
                {...register('date')}
              />
              <Input label="Setor" size="lg" {...register('sector')} />
              <Input
                label="Quantidade de galões"
                size="lg"
                type="number"
                {...register('gallonsQuantity')}
              />
              <Input
                label="Quantidade de copos"
                size="lg"
                type="number"
                {...register('cupsQuantity')}
              />
              <InputImage {...register('medias')} />
            </CardBody>
            <CardFooter className=" t-0 flex gap-4">
              <Button
                variant="outlined"
                onClick={toggleReplenighmentModal}
                fullWidth
              >
                Cancelar
              </Button>
              <Button type="submit" variant="gradient" fullWidth>
                Reabastecer
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
};

export { ReplenishmentModal };
