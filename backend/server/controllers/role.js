import { SCHEMA, TABLE_DETAILS } from '../constants';
import models from '../models';

export const getAllRoles = async (request, response, next) => {
  try {
    const result = await models.generalDatabaseFunction.getAllData(
      SCHEMA,
      TABLE_DETAILS.roles.name
    );
    response.send(result);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const addRole = async (request, response, next) => {
  try {
    const result = await models.generalDatabaseFunction.insertSingleRow(
      SCHEMA,
      TABLE_DETAILS.roles.name,
      request.body
    );
    response.send({
      roleId: result[0]
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const updateRole = async (request, response, next) => {
  try {
    const { id } = request.body;
    delete request.body.id;

    await models.generalDatabaseFunction.updateSingleRowWithReturn(
      SCHEMA,
      TABLE_DETAILS.roles.name,
      request.body,
      { id: id }
    );
    response.send({
      roleId: id
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const deleteRole = async (request, response, next) => {
  try {
    const { id } = request.body;

    await models.generalDatabaseFunction.deleteData(
      SCHEMA,
      TABLE_DETAILS.roles.name,
      { id: id }
    );
    response.send({
      roleId: id
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const searchRole = async (request, response, next) => {
  try {
    const result = await models.generalDatabaseFunction.search(
      SCHEMA,
      TABLE_DETAILS.roles.name,
      request.body
    );
    response.send(result);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
