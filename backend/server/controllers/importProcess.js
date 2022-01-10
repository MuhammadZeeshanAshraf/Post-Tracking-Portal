export const createItemTemplates = async (request, response, next) => {
  const errorList = [];
  const filePath = path.join(
    __dirname,
    '..',
    'InternalFiles',
    request.file.filename
  );
  response.send('Ok');
};