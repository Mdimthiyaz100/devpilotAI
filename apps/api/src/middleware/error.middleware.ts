import type { ErrorHandler } from "hono";

export const errorHandler: ErrorHandler = (err, c) => {
  console.error(`[API Error]:`, err);
  const isDev = true;

  return c.json(
    {
      error: "Internal Server Error",
      message: err.message || "An unexpected error occurred",
      ...(isDev ? { stack: err.stack } : {}),
    },
    500,
  );
};
