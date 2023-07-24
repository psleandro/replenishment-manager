'use client';
import {
  ChangeEvent,
  HTMLAttributes,
  forwardRef,
  useId,
  useState,
} from 'react';

import { FaUpload } from 'react-icons/fa6';

import { SelectedImagesList } from './SelectedImagesList';

interface InputImageProps extends HTMLAttributes<HTMLInputElement> {}

const InputImage = forwardRef<HTMLInputElement, InputImageProps>(
  ({ onChange, ...props }, ref) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const inputId = useId();

    const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
      const newFiles = event.target.files ?? [];
      setSelectedFiles(Array.from(newFiles));
      !!onChange && onChange(event);
    };

    return (
      <div className="flex flex-col items-stretch gap-1">
        <label
          htmlFor={inputId}
          className="flex min-h-[44px] flex-col items-stretch justify-center rounded-md border border-dashed border-blue-gray-200 p-2 transition-all focus-within:border-2 focus-within:border-blue-500 hover:cursor-pointer hover:bg-gray-100"
        >
          <input
            className="h-0 w-0 opacity-0"
            id={inputId}
            type="file"
            accept=".png, .jpg, .jpeg"
            multiple
            {...props}
            onChange={onChangeFile}
            ref={ref}
          />

          <div className="flex items-center justify-center gap-2">
            <FaUpload />
            <p className="border-g text-blue-gray-700 hover:cursor-pointer">
              Selecionar imagens
            </p>
          </div>
        </label>
        <SelectedImagesList selectedFiles={selectedFiles} />
      </div>
    );
  },
);

export { InputImage };
