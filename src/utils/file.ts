import fs from 'fs';

const deleteFile = async (filename: string): Promise<void> => {
  try {
    // stat() => essa função verifica se o arquivo existe
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  // unlink() => remove o arquivo encontrado
  await fs.promises.unlink(filename);
};

export { deleteFile };
