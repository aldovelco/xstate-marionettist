import * as T from "fp-ts/lib/Task";
import { pipe } from "fp-ts/lib/pipeable";

type Token = {
  access_token: string,
  refresh_token: string,
}

export const authenticate = (credentials: {
  email?: string;
  password?: string;
}) =>
  pipe(
    T.of({}),
    T.delay(1000),
    // T.chain(() => () => Promise.reject("Not yet implemented"))
    T.chain(() => async () => {
      try {
        return await fetch('http://www.example.com/token') // .catch(reason => Promise.reject(reason))
      } catch (error) {
        return Promise.reject(`${error}`)
      }
    }),
    T.chain(
      response => () => Promise.all([
        Promise.resolve(response.status),
        response.status === 200 ? response.json() : response.text()
      ])
    )
  );

export default authenticate;
