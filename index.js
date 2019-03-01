module.exports = function koadepsi(deps) {
  return async(ctx, next) => {
    ctx.deps = deps
    await next()
  }
}
