export type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: Error;
    };
    /*This code is the foundation of our error-handling system.
    
    Result<T> says:
A request can have only two possible results:
1. Success
{
  success: true,
  data: ...
}
For example, if we request a user:
{
  success: true,
  data: { name: "Nunush" }
}
2. Error
{
  success: false,
  error: ...
}
For example:
{
  success: false,
  error: new Error("Network failed")
} */

  export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  query?: Record<string, string | number | boolean>;
  body?: unknown;
  headers?: Record<string, string>;
};

// This tells TypeScript what our request() function can accept:
// method → GET, POST, PUT, DELETE
// query → URL parameters like ?page=2
// body → JSON data for POST/PUT
// headers → custom headers*/

export async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<Result<T>> {
  try {
    // We'll add the request logic here next.
    const { method = "GET", query, body, headers = {} } = options;

const urlObject = new URL(url);

if (query) {
  Object.entries(query).forEach(([key, value]) => {
    urlObject.searchParams.set(key, String(value));
  });
}

const response = await fetch(urlObject, {
  method,
  headers: {
    "Content-Type": "application/json",
    ...headers,
  },
  body: body ? JSON.stringify(body) : null,
});

if (!response.ok) {
  return {
    success: false,
    error: new Error(`HTTP error: ${response.status}`),
  };
}

const data = (await response.json()) as T;

return {
  success: true,
  data,
};
/*
What this does
If the server responds with something like 404 or 500:
success: false
If it responds successfully:
success: true
data: ...
And importantly, both paths return Result<T>. */

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
/*
That means our function promises to return either success or error, matching the type we just created.
The try/catch also ensures errors are returned as Result values instead of escaping as thrown errors.
*/


