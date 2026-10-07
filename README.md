# typed-fetch

A small TypeScript HTTP request helper with typed responses and safe error handling.

## Features

* Supports GET, POST, PUT, and DELETE
* Typed responses with `request<T>()`
* Query parameters
* JSON request bodies
* Custom headers
* Discriminated `Result<T>` type
* Errors are returned instead of thrown

## Usage

### 1. GET request — success

```ts
type User = {
  id: number;
  name: string;
};

const result = await request<User>(
  "https://jsonplaceholder.typicode.com/users/1"
);

if (result.success) {
  console.log(result.data.name);
} else {
  console.error(result.error.message);
}
```

### 2. GET request — error

```ts
const result = await request<User>(
  "https://jsonplaceholder.typicode.com/users/999999"
);

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.message);
}
```

### 3. POST request — JSON body and headers

```ts
const result = await request<{ id: number }>(
  "https://jsonplaceholder.typicode.com/posts",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer token",
    },
    body: {
      title: "Hello",
      body: "This is a test",
      userId: 1,
    },
  }
);

if (result.success) {
  console.log("Created:", result.data);
} else {
  console.error("Error:", result.error.message);
}
```

## Installation

```bash
npm install
```

## License

MIT
