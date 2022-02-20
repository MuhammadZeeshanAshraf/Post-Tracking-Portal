import { SCHEMA, TABLE_DETAILS } from '../constants';
import models from '../models';
import * as userService from '../services/user';
import moment from 'moment';
import path from 'path';

export const register = async (request, response, next) => {
  try {
    const errorList = [];
    const filePath = path.join(
      __dirname,
      '..',
      'InternalFiles',
      request.file.filename
    );
    const message = await userService.registerService(request.body, models, errorList, filePath);
    // console.log(errorList);
    response.send(message);
    // response.send('OK');
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const postLogin = async (request, response, next) => {
  try {
    const errorList = [];
    const message = await userService.postLoginService(request, request.body, models, errorList);
    // console.log(errorList);
    response.send(message);
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getLogin = async (request, response, next) => {
  try {
    if (request.session.user) {
      response.send({ loggedIn: true, user: request.session.user });
    } else {
      response.send({ loggedIn: false });
    }
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const logout = async (request, response, next) => {
  try {
    if (request.session.user) {
      const time = moment(new Date()).format('YYYY-MM-DD hh:mm:ss A');
      const id = request.session.user.loggingId;
      await models.generalDatabaseFunction.updateSingleRowWithReturn(
        SCHEMA,
        TABLE_DETAILS.userLogging.name,
        { logout_at: time },
        { id: id }
      );

      request.session.destroy((error) => {
        if (error) {
          return response.status(400).send({
            message: error.message
          });
        }
        response.redirect('/');
      });
    } else {
      response.redirect('/');
    }
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const assignRole = async (request, response, next) => {
  try {
    const { id } = request.body;
    delete request.body.id;
    await models.generalDatabaseFunction.updateSingleRowWithReturn(
      SCHEMA,
      TABLE_DETAILS.users.name,
      request.body,
      { id: id }
    );
    response.send({
      userId: id
    });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const otpVerfication = async (request, response, next) => {
  try {
    const result = await models.generalDatabaseFunction.getDataByWhere(
      SCHEMA,
      TABLE_DETAILS.users.name,
      request.body
    );
    if (result.length === 0) {
      response.send({
        message: 'User OTP not verified.'
      });
    } else {
      await models.generalDatabaseFunction.updateSingleRowWithReturn(
        SCHEMA,
        TABLE_DETAILS.users.name,
        {
          otp_verified: 'TRUE'
        },
        { id: request.body.id }
      );
      response.send({
        userId: request.body.id
      });
    }
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};

export const getAllUsers = async (request, response, next) => {
  try {
    const result = await models.generalDatabaseFunction.getAllData(
      SCHEMA,
      TABLE_DETAILS.users.name
    );
    const roles = await models.generalDatabaseFunction.getAllData(
      SCHEMA,
      TABLE_DETAILS.roles.name
    );
    for (const user of result) {
      const momentDate = moment(user.created_at);
      user.created_at = momentDate.format('YYYY-MM-DD hh:mm:ss A');

      const momentDateb = moment(user.updated_at);
      user.updated_at = momentDateb.format('YYYY-MM-DD hh:mm:ss A');

      const role = roles.filter(obj => {
        return obj.id === user.role_id;
      });
      if (role.length > 0) {
        user.role = role[0].role;
      } else {
        user.role = '';
      }
    }
    response.send({ data: result, count: result.length });
  } catch (error) {
    return response.status(400).send({
      message: error.message
    });
  }
};
