import { request } from "./index.js";

type User = {
  id: number;
  name: string;
};

async function test() {
  const result = await request<User>(
    "https://jsonplaceholder.typicode.com/users/999999"
  );

  if (result.success) {
    console.log("User:", result.data);
  } else {
    console.log("Error:", result.error.message);
  }
}

test();
/*
What we're testing

This checks that:

request<T>() accepts a typed response.

T becomes User.

A successful response gives us result.data.

An error gives us result.error.

No try/catch is needed in the calling code. */
