import * as assert from 'assert'
import { Context } from 'egg'
import { app } from 'egg-mock/bootstrap'

describe('test/app/service/Test.test.js', () => {
  let ctx: Context

  beforeEach(async () => {
    ctx = app.mockContext()
  })

  it('sayHi', async () => {
    const result = await ctx.service.test.sayHi('Markapi')
    assert(result === 'Markapi')
  })
})
