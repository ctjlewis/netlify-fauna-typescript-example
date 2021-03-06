/* Import faunaDB sdk */
import { Context, Handler } from 'aws-lambda'
import faunadb from 'faunadb'
const q = faunadb.query

/* export our lambda function as named "handler" export */
export const handler: Handler = async (event, context: Context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body)
  console.log('Function `todo-create` invoked', data)
  const todoItem = {
    data: data
  }

  /* construct the fauna query */
  return client.query(q.Create(q.Ref('classes/todos'), todoItem))
    .then((response) => {
      console.log('success', response)
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      console.log('error', error)
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
