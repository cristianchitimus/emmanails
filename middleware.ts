export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/cont", "/cont/comenzi", "/cont/comenzi/:path*"],
};
