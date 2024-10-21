# AADSTS50020: Can't sign in to Teams

[**stackoverflow.com/questions/75783208**](https://stackoverflow.com/questions/75783208/i-receive-the-error-aadsts50020-when-authenticating-in-an-azure-app-registration)

## Error Message

Sorry, but we’re having trouble signing you in.

AADSTS50020: User account '...@outlook.com' from identity provider 'live.com' does not exist in tenant 'Microsoft Services' and cannot access the application '....-....-....-....'(example-app) in that tenant. The account needs to be added as an external user in the tenant first. Sign out and sign in again with a different Azure Active Directory user account.

## Solution

The error usually occurs if the Azure AD Application is not configured to authorize multi-Tenant (other organizations/personal accounts users) or not using common endpoint.

To resolve the error, try configuring the Azure AD Application as "Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts" like below:

![Application Settings Screenshot](https://i.stack.imgur.com/bWqGP.png)
