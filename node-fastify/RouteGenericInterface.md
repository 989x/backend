### Ask

Type 'RouteGenericInterface' is not assignable to type '{ Params: { id: string; }; }'.
Types of property 'Params' are incompatible.
Type 'unknown' is not assignable to type '{ id: string; }'.

```ts
import { FastifyInstance } from 'fastify';
import { deleteUser } from '../controllers/admin';
import { limitParams } from '../middlewares/checkRequest';
import { validateToken } from '../middlewares/accessToken';

const adminRoutes = async (fastify: FastifyInstance) => {
  fastify.delete('/user/:id', { preHandler: [validateToken, limitParams(20)] }, deleteUser);
};

export default adminRoutes;
```

### ChatGPT

It seems like you're encountering a TypeScript error related to type incompatibility. The error message is indicating that the type `RouteGenericInterface` is not assignable to the type `{ Params: { id: string; } }`, specifically because the types of the 'Params' property are incompatible. The error is further pointing out that the type 'unknown' is not assignable to the expected type '{ id: string; }'.

In your `limitParams` middleware, you are specifying the expected type for the `Params` property as `{ id: string }`. However, when using this middleware in the `adminRoutes` function, Fastify might not be able to infer the type correctly, leading to the TypeScript error.

To resolve this issue, you can explicitly type the request parameter in the `adminRoutes` function. Update the `adminRoutes` function as follows:

```ts
import { FastifyInstance, RouteGenericInterface } from 'fastify';
import { deleteUser } from '../controllers/admin';
import { limitParams } from '../middlewares/checkRequest';
import { validateToken } from '../middlewares/accessToken';

// Define a custom type for the route's generic interface
interface AdminRouteGenericInterface extends RouteGenericInterface {
  Params: { id: string };
}

const adminRoutes = async (fastify: FastifyInstance) => {
  fastify.delete<AdminRouteGenericInterface>('/user/:id', { preHandler: [validateToken, limitParams(20)] }, deleteUser);
};

export default adminRoutes;
```

This should resolve the TypeScript error by explicitly specifying the expected type for the `Params` property in the `adminRoutes` function.
