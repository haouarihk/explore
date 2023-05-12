type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
    ...args: any
  ) => Promise<infer R>
    ? R
    : any;
  
  type TypesInput = {
    in?: string[];
    notIn?: string[];
    contains?: string;
    endsWith?: string;
    equals?: string;
    mode?: "default" | "insensitive";
    not?: string;
    startsWith?: string;
  };