import { headers } from "next/headers";

export function getUrl(){
 const headersList = headers();
  // read the custom x-url header
  return new URL(headersList.get('x-url') || "");
}