const hello = {
  getHello: async (ctx, next) => {
    ctx.body = 'hello wolrd';
  },
};

module.exports = hello;