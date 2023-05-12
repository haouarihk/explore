import prisma from "@/prisma/index";
import { NextRequest } from "next/server";
import { HandleApiV1 } from "./handler";
import res from "./response";

export type CustomRequest = NextRequest & {
  getQuery?: (name: string) => Promise<string>;
};


export default function API(
    cb: (props: {
      req: CustomRequest;
      handler: AsyncReturnType<typeof HandleApiV1>;
      props: { testMode?: boolean; params?: any };
    }) => Promise<any>,
    options?: Omit<Parameters<typeof HandleApiV1>[0], "req">
  ) {
  return async (
    req: NextRequest,
    props: {
      params?: any;
      query: { [key: string]: string };
    }
  ) => {
    try {
      const handler = await HandleApiV1({
        req,
        ...options,
      });
      try {
        // @ts-ignore
        req.getQuery = (name: string) =>
          props.query?.[name] || req.nextUrl.searchParams.get(name) || "";

        const returnData = await cb({
          req,
          handler,
          props,
        });

        return res(returnData);
      } catch (err: any) {
        return res({ detail: err?.message || err || "Internal Error" }, 500);
      }
    } catch (err: any) {
      return res(
        { detail: err?.message || err || "Authentication error" },
        500
      );
    }

  };
};

export const jj = <T>(body: any, key: keyof T, customBodyKey?: string) =>
  key in body ? ({ [key]: body[customBodyKey || key] } as T) : {};
