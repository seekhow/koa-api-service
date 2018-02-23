const Boom = require('boom');
const userModel = require('../model/user');
const router = require('koa-joi-router');
const Joi = router.Joi;

const getOne = {
  validate: {
    params: {
      id: Joi.string(),
    },
  },
  handler: async (ctx) => {
    const { params: { id } } = ctx;
    let user;
    try {
      user = await userModel.find({ _id: id }, { password: 0 });
    } catch (error) {
      log.error('错误!查询数据库错误![查询单个用户资料]:', error);
      ctx.body = Boom.badRequest();
    }
    ctx.status = 200;
    ctx.body = user;
  },
};

const getAll = {
  handler: async (ctx) => {
    let users;
    try {
      users = await userModel.find();
    } catch (error) {
      log.error('错误!查询数据库错误![查询全部用户资料]: ', error);
      ctx.body = Boom.badRequest();
    }
    ctx.status = 200;
    ctx.body = users;
  },
};

const create = {
  validate: {
    body: {
      name: Joi.string(),
      password: Joi.string(),
      email: Joi.string().email(),
      tags: Joi.array().optional(),
    },
    type: 'json',
    // output: {
    //   201: {
    //     body: {
    //       id: Joi.any(),
    //       name: Joi.string(),
    //       password: Joi.string(),
    //       email: Joi.string().email(),
    //       update: Joi.date().iso(),
    //       tags: Joi.array().optional(),
    //     }
    //   },
    //   '400-500': {
    //     body: Joi.any(),
    //   }
    // }
  },
  handler: async (ctx) => {
    const modelInstance = userModel(ctx.request.body);
    let user;
    try {
      user = await modelInstance.save();
    } catch (error) {
      log.error('错误!写入数据库错误![创建用户]:', error);
      ctx.body = Boom.badRequest();
    }
    ctx.status = 201;
    ctx.body = user;
  },
};

module.exports = {
  getOne,
  create,
  getAll,
};