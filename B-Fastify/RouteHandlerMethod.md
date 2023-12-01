### Ask

Argument of type '(request: FastifyRequest<EstateRouteGenericInterface>, reply: FastifyReply) => Promise<void>' is not assignable to parameter of type 'RouteHandlerMethod<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, EstateRouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, FastifyBaseLogger>'.

```ts
fastify.put<EstateRouteGenericInterface>(
'/:id',
{ preHandler: [validateToken, limitParams(20)] },
updateEstate
);
```

### ChatGPT

It appears that you're encountering an issue with the type of the `updateEstate` function when defining the `put` route in Fastify. To address this, you should explicitly specify the type of the `updateEstate` function in the `put` method. The correct type for the `updateEstate` function should be `RouteHandlerMethod`.

Here's how you can adjust the `put` method:

```ts
import { RouteHandlerMethod } from 'fastify';
import { FastifyRequest, FastifyReply } from 'fastify';
import { EstateRouteGenericInterface, updateEstate } from '../controllers/estate';

fastify.put<EstateRouteGenericInterface>(
  '/:id',
  { preHandler: [validateToken, limitParams(20)] },
  updateEstate as RouteHandlerMethod
);
```

Make sure to import `RouteHandlerMethod` from 'fastify'. This cast `as RouteHandlerMethod` explicitly informs TypeScript about the type of `updateEstate` when used in the `put` method.

This should resolve the TypeScript error you're facing. If the issue persists or if there are additional errors, please let me know, and I'll be happy to assist further.
