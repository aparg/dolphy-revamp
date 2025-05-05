import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Helper function for debugging fetch requests
const debugFetch = async (url, options) => {
  console.log(`Fetching: ${url}`);
  console.log("Options:", JSON.stringify(options, null, 2));

  const response = await fetch(url, options);

  console.log(`Response status: ${response.status}`);
  return response;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/_allauth/browser/v1/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await res.json();

          if (res.ok && data.data?.user) {
            return {
              id: data.data.user.id,
              email: data.data.user.email,
              name: data.data.user.display,
              accessToken: data.data.user.access_token,
              refreshToken: data.data.user.refresh_token,
              hasUsablePassword: data.data.user.has_usable_password,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === "google") {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/_allauth/browser/v1/auth/provider/token`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  provider: "google",
                  process: "login",
                  token: {
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    id_token: account.id_token,
                    access_token: account.access_token,
                  },
                }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to authenticate with backend");
            }

            const data = await response.json();
            return {
              ...token,
              accessToken: data.data.user.access_token,
              refreshToken: data.data.user.refresh_token,
              id: data.data.user.id,
              email: data.data.user.email,
              name: data.data.user.display,
              hasUsablePassword: data.data.user.has_usable_password,
            };
          } catch (error) {
            console.error("Google auth error:", error);
            return token;
          }
        } else {
          // Handle credentials sign in
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            id: user.id,
            email: user.email,
            name: user.name,
            hasUsablePassword: user.hasUsablePassword,
          };
        }
      }

      // Check if token needs refresh
      if (token.refreshToken) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/_allauth/browser/v1/auth/token/refresh`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                refresh_token: token.refreshToken,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            return {
              ...token,
              accessToken: data.data.access_token,
            };
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.hasUsablePassword = token.hasUsablePassword;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/unauthorized",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
