import { User } from "@prisma/client";
import { toNextApiRequest } from "../toNextjs";
import CallsLimiter from "@/utils/callsLimiter";
import { getServerAuth } from "@/app/components/auth";


export const limiter = new CallsLimiter();

export async function HandleApiV1<NoLimit extends boolean = false>(
  options: Options<NoLimit>
): Promise<{
  user: User;
  token: string;
}> {
  const req = toNextApiRequest(options.req);

  if (!options.req) throw new Error("You need API KEY");

    const session = await getServerAuth();

    if (!session?.user) throw new Error("Not Signed in!");

    const user = session.user;
  if (!user) throw new Error("Token Invalid");

  await (options.customLimiter || limiter).check(user.id);

  return {
    token: user.id,
    user: user as any,
  };
}
