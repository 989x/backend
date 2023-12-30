## Securing MongoDB Password using .env in NestJS

To enhance the professionalism of your README.md, consider the following revised version with improved formatting and clarity:

## Protecting MongoDB Password with .env in NestJS

In NestJS applications, it's essential to safeguard sensitive information such as your MongoDB password. One recommended approach is to use a `.env` file to manage environment variables securely.

### Installation

Start by installing the `dotenv` package using your package manager. If you're using `pnpm`, run:

```bash
pnpm install dotenv
```

### Configuration

Create a `.env` file in the root directory of your project. Add your MongoDB connection string with the password as an environment variable:

```bash
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/my-real-estate-db?retryWrites=true&w=majority
```

Replace `username` and `password` with your MongoDB credentials, and `cluster-name` with the name of your MongoDB cluster.

### Integration

In your `app.module.ts` file, import the necessary modules and load the `.env` file:

```ts
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

The `config()` function from `dotenv` loads the environment variables from the `.env` file into `process.env`. You can then securely access the `MONGO_URI` environment variable in the `MongooseModule.forRoot()` call using `process.env.MONGO_URI`.

By adopting this setup, you can confidently store sensitive information, such as your MongoDB password, in a separate `.env` file, enhancing the security of your NestJS application without hardcoding sensitive data in your code.
