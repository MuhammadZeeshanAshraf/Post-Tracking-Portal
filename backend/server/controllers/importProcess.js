import path from 'path';

export const importTrackingWorkSheet = async (request, response, next) => {
  const errorList = [];
  const filePath = path.join(
    __dirname,
    '..',
    'InternalFiles',
    request.file.filename
  );
  response.send('Ok');
};
