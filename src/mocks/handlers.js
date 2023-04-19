import { rest } from 'msw'
import orders from './orders.json'
const baseUrl = process.env.REACT_APP_API_URL;

export const handlers = [
  rest.post(`${baseUrl}/auth/login`, (req, res, ctx) => {
    if (req.body.username !== 'test' || req.body.password !== 'test') {
      return res(ctx.status(400),
        ctx.json(getApplicationError("Auth.LoginNoMatch", "Incorrect username or password. Expected: username: test, password: test"))
      )
    }
    return res(ctx.status(200))
  }),
  rest.post(`${baseUrl}/auth/validate-otp`, (req, res, ctx) => {
    if (/[^0-9]/.test(req.body.otp)) {
      return res(ctx.status(400),
        ctx.json(getInternalError("Convert to int fail (Parameter 'otp')"))
      )
    }
    if (req.body.otp !== '123456' || req.body.username !== 'test') {
      return res(ctx.status(400),
        ctx.json(getApplicationError("Auth.ValidateOtpFail", "Username or otp is incorrect. Expected: username: test, otp: 123456"))
      )
    }
    return res(
      ctx.status(200),
      ctx.json({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJlbWFpbEB0ZXN0IiwibmFtZWlkZW50aWZpZXIiOiI5NGFkZTVmZC0wNmYzLTQ1MTYtYTE3ZC1hOWE0ZDMyMTk3N2YiLCJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoic2Fsa2FrYWwtdXNlciIsImlhdCI6MTUxNjIzOTAyMn0.Up1YpPK5UGNKgnt1hxX1nGiCFPPg_PxxOvIaJbVJf7E"
      })
    )
  }),

  rest.post(`${baseUrl}/orders`, (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json(orders),
    )
  }),
]


function getApplicationError(code, message){
  return {
    type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    title: "One or more validation errors occurred.",
    status: 400,
    traceId: "00-134c53d18c40e1ea62f050e2fd6ed556-5b8f5f2f51cf3d1c-00",
    errors: {
      [code]: [
        message
      ]
    }
  }
}
function getInternalError(message){
  return {
    type: "https://tools.ietf.org/html/rfc7231#section-6.6.1",
    message: message,
    stackTrace: ["   at Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware..."]
  }
}
