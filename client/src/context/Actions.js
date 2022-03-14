export const LoginStart = (userCreadentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
});

// logout

export const Logout = () => ({
    type: "LOGOUT"
})

// upload profile image

export const UpadteStart = (userCreadentials) => ({
    type: "UPDATE_START",
});

export const UpadteSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
});

export const UpadteFailure = () => ({
    type: "UPDATE_FAILURE"
});
