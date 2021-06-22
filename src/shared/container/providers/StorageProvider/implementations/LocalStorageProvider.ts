import fs from 'fs';
import { resolve } from 'path';

import upload from '@config/upload';

import { IStorageProvider } from '../interfaces/IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    // Pega o arquivo do caminho antigo e coloca no novo caminho
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      // stat() => essa função verifica se o arquivo existe
      await fs.promises.stat(filename);
    } catch {
      return;
    }
    // unlink() => remove o arquivo encontrado
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
