async function RefreshAccessToken(tokenObject: any) {
  console.log("refreshAccessToken");
  try {
    const tokenResponse = await axios.post(`${API_URL}/auth/refreshToken`, {
      accessToken: tokenObject.accessToken,
      refreshToken: tokenObject.refreshToken,
    });

    // console.log("tokenResponse", tokenResponse);

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.token,
      exp: tokenResponse.data.exp,
      refreshToken: tokenResponse.data.refreshToken,
    };
  } catch (error: any) {
    // console.log("refreshToken",error.message, error.response.data)
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

const callbacks = {
  jwt: async ({ token, user, account }: any) => {
    if (account && account.provider === "google") {
      user.token = account.token;
      user.refreshToken = account.refresh;
      user.expires = account.exp;

      return await Promise.resolve(user);
    }
    // console.log("jwt", token);
    if (user) {
      // console.log("user", user)
      token.token = user.token;
      token.expires = user.exp;
      token.refreshToken = user.refreshToken;
    } else {
      return await Promise.resolve(token);
    }

    // console.log("jwt EXP",token.exp < Date.now(),token.exp, Date.now())
    // if token expired, refresh it
    if (token.exp && token.exp < Date.now()) {
      token = RefreshAccessToken(token);
    }

    return await Promise.resolve(token);
  },
};
