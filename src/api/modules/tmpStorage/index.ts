import { existsSync } from 'fs';
import { writeFile, unlink  } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from "path";

export const saveFileOnTmpStorage = async (file: File) => {
  const tempDir = tmpdir();
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const uniqueSuffix = `${Date.now().toString()}_`;
  const fileName = `${uniqueSuffix}${file.name}`;


  const fileTempPath = join(tempDir, fileName);

  await writeFile(fileTempPath, fileBuffer);

  return { fileTempPath, fileName };
}

export const deleteFileFromTmpStorage = async (filePath: string) => {
  const fileExists = existsSync(filePath);

  if(fileExists) await unlink(filePath);
}
