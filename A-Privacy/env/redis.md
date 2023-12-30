## Troubleshooting Redis URL Undefined Issue

If the Redis URL appears as undefined, it suggests that there might be an issue with correctly reading environment variables. Let's troubleshoot the problem:

### 1. Validate Your .env File

Ensure that you have a valid `.env` file in the root of your project.

```bash
NODE_ENV=development
REDIS_URL_DEV=redis://127.0.0.1:6379
REDIS_URL_PROD=redis://203.0.113.12:6379
```

### 2. Environment Variable Loading

If you are using a library like `dotenv` to load environment variables, make sure it is installed and configured properly. Install it using:

```bash
npm install dotenv
```

Then, at the top of your application file (e.g., `app.ts`), add the following line:

```javascript
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
```

Ensure this code is executed before any other imports or code that relies on the environment variables.

### 3. Restart Your Application

After making these changes, restart your application to ensure the new configuration is applied.

## Updated Code

Here's an updated version of your code considering these changes:

```javascript
import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config(); // Load environment variables from .env file

const redisUrl = process.env.NODE_ENV === 'production'
  ? process.env.REDIS_URL_PROD
  : process.env.REDIS_URL_DEV;

console.log('Redis URL:', redisUrl);

const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => {
  console.log('Redis Error', err);
});

export function redisConnect() {
  return redisClient.connect();
}

export default redisClient;
```

Make sure you have addressed these points, and if the issue persists, please double-check your project setup and the configuration of environment variables.
