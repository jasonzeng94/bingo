"use server";

import { NextApiRequest, NextApiResponse } from "next";

const pickHeaders = (headers: any, keys: (string | RegExp)[]): Headers => {
  const picked = new Headers();
  for (const key of headers.keys()) {
    if (keys.some((k) => (typeof k === "string" ? k === key : k.test(key)))) {
      const value = headers.get(key);
      if (typeof value === "string") {
        picked.set(key, value);
      }
    }
  }
  return picked;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestUrl = new URL(req.url!);

  const dirtyUrl = requestUrl.searchParams.get("url");

  if (!dirtyUrl) {
    return new Response("hello");
  }

  const targetUrl = decodeURIComponent(dirtyUrl);

  const fetchUrl = new URL(targetUrl);

  const headers = pickHeaders(req.headers, [
    "cookie",
    "content-type",
    "authorization",
    "x-csrf-token",
  ]);

  return fetch(fetchUrl.toString(), { headers });
}

export const config = {
  runtime: "edge",
};
