### 🙎🏻‍♂️ 💬 how to use file .env to protect mogodb password in file app.module.ts 

on 
```ts
@Module({
  imports: [
    MongooseModule.forRoot()
})
```

### ChatGPT

You can use a .env file to store sensitive information, such as your MongoDB password, and load it into your NestJS application using the dotenv package.

First, install the dotenv package by running the following command:

```bash
pnpm install dotenv
```
Then, create a .env file in the root directory of your project and add your MongoDB connection string with your password as an environment variable, like this:

```bash
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/my-real-estate-db?retryWrites=true&w=majority
```
Replace username and password with your MongoDB credentials and cluster-name with the name of your MongoDB cluster.

In your app.module.ts file, import the dotenv package and load the .env file:

```typescript
import { Module } from '@nestjs/common';
import { RealEstateModule } from './real-estate/real-estate.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config(); // Load .env file

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    RealEstateModule,
  ],
})
export class AppModule {}
```

The config() function from dotenv loads the environment variables from the .env file into process.env. We can then access the MONGO_URI environment variable in the MongooseModule.forRoot() call using process.env.MONGO_URI.

With this setup, you can now securely store sensitive information like your MongoDB password in a separate .env file, without having to hardcode it in your code.