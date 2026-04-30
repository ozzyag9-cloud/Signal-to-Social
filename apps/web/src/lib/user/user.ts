export function getUser(req: Request) {
  const email = req.headers.get("x-user-email") || "guest";
  return { email };
}
