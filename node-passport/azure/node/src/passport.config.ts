import passport from 'passport';
import { OIDCStrategy } from 'passport-azure-ad';
import { Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const initPassport = async () => {
  // AADSTS50020: User account '...90@outlook.com' from identity provider 'live.com' does not exist in tenant 'Microsoft Services' and cannot access the application
  // const idmetadata = `${process.env.CLOUD_INSTANCE}${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`;

  // unauthorized_client: The client does not exist or is not enabled for consumers.
  const idmetadata = "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration";

  // AADSTS500201: We are unable to issue tokens from this API version for a Microsoft account. Please contact the application vendor as they need to use version 2.0 of the protocol to support this.
  // const idmetadata = "https://login.microsoftonline.com/common/.well-known/openid-configuration";

  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  const azureADConfig: any = {
    identityMetadata: idmetadata,
    clientID: clientId,
    clientSecret: clientSecret,
    responseType: process.env.RESPONSE_TYPE,
    responseMode: process.env.RESPONSE_MODE,
    redirectUrl: process.env.REDIRECT_URI,
    allowHttpForRedirectUrl: true, // Set to true for local development
    isB2C: false, // Set to true if using Azure AD B2C
    validateIssuer: false, // Set to true if you want to validate the issuer
    passReqToCallback: true,
    useCookieInsteadOfSession: false, // Use cookies for session management
    scope: ['openid', 'profile', 'email'], // Specify the required scopes
    loggingLevel: 'info', // Adjust logging level as needed
  };

  const callbackFunction = (
    req: Request,
    iss: any,
    sub: any,
    profile: any,
    accessToken: any,
    refreshToken: any,
    done: any
  ) => {
    if (accessToken) {
      //console.log( 'Received accessToken - ' + accessToken );
    }
    if (refreshToken) {
      //console.log( 'Received refreshToken - ' + refreshToken );
    }
    if (!profile.oid) {
      //console.log( 'Received accessToken - ' + accessToken );
      return done(new Error('No oid found'), null);
    }
    // if (profile) {
    //   console.log('profile - ' + JSON.stringify(profile));
    // }

    return done(null, profile);
  };

  passport.use(new OIDCStrategy(azureADConfig, callbackFunction));
};

export { initPassport };
