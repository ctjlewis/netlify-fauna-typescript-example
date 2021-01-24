/* Import faunaDB sdk */
import { getId } from './utils/getId'
import faunadb from 'faunadb'
import { Context } from 'aws-lambda'
const q = faunadb.query

export const handler = async (event, context: Context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })
  const id = getId(event.path)
  console.log(`Function 'todo-delete' invoked. delete id: ${id}`)
  return client.query(q.Delete(q.Ref(`classes/todos/${id}`)))
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
