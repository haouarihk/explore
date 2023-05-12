// it sits as a midleware to every api call
// it also contains the most important funciton HandleApiV1

interface Options<T extends any> {
    /** the Request object, has to contain either headers.cookies, or headers.get()*/
    req: NextApiRequest | NextRequest;
    res?: NextApiResponse;
  
    /** custom calls limiter, ("@/utils/callsLimiter") */
    customLimiter?: CallsLimiter;
  }
  