import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export function toNextApiRequest(req: NextRequest | NextApiRequest) {
  const e = !!Object.keys(req.headers).length;
  return (e
    ? req
    : {
        ...req,
        headers: {
          // @ts-ignore
          cookie: req.headers.get("cookie"),

          // @ts-ignore
          authorization: req.headers.get("authorization"),
        },
      }) as unknown as NextApiRequest;
}
