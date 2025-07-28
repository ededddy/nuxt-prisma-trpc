import { createAuthClient } from "better-auth/vue";

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  requestPasswordReset,
  resetPassword,
} = createAuthClient({
  baseURL: "http://localhost:3000/api/auth",
});
