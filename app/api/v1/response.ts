export default function res(
  body: object,
  status: number = 200,
  additionals?: ResponseInit
) {
  return new Response(JSON.stringify(body), {
    ...additionals,
    status,
    headers: {
      "Content-Type": "application/json",
      ...additionals?.headers,
    },
  });
}
