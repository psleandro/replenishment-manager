'use client';
import Image from 'next/image';

import { Tooltip } from '~/components/MT';

interface SelectedImagesListProps {
  selectedFiles: File[];
}

const SelectedImagesList = ({ selectedFiles }: SelectedImagesListProps) => {
  if (selectedFiles.length <= 0) return <></>;

  return (
    <ul className="flex flex-col items-stretch">
      {selectedFiles.map((selectedFile, index) => {
        const fileUrl = URL.createObjectURL(selectedFile);
        return (
          <li
            key={fileUrl}
            className={`flex gap-2 overflow-hidden rounded-md p-1 ${
              index % 2 !== 0 ? 'bg-blue-gray-50' : ''
            }`}
          >
            <div className="relative h-7 w-7 overflow-hidden rounded-md shadow-md">
              <Image
                src={fileUrl}
                fill
                alt={`Preview ${selectedFile.name} file`}
                className="object-cover object-center"
              />
            </div>
            <Tooltip
              content={selectedFile.name}
              placement="top"
              className="z-[9999]"
            >
              <span className="flex flex-1 items-center overflow-hidden">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {selectedFile.name}
                </p>
              </span>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
};

export { SelectedImagesList };
