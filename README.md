# Socketo TypeScript SDK

The official TypeScript SDK for Socketo. Easily publish events from your server-side application.

## Installation

Install the package using your package manager:

```bash
npm install @socketodev/sdk
```

## Usage

#### Initialize client
```ts
import { Socketo } from "@socketodev/sdk";

const socketo = new Socketo({
  id: "YOUR_APP_ID",
  secret: "YOUR_APP_SECRET",
});
```

#### Publish an event
```ts
// Publish an event to one or more channels
const { data, error } = await socketo.publish({
  event: "my-event",
  channels: ["my-channel"],
  data: "Hello from SDK!",
});

// Publish batch events to one or more channels
const { data, error } = await socketo.publish([
  {
    event: "my-event",
    channels: ["my-channel"],
    data: "Hello from SDK-Batch!",
  },
  {
    event: "my-event",
    channels: ["my-channel"],
    data: "Hello from SDK-Batch!",
  },
]);

// Handle errors
if (error) {
  console.log(error);
}
```

#### Get channels with subscribers
```ts
const { data, error } = await socketo.channels();

// Handle errors
if (error) {
  console.log(error);
}

//
console.log(data) // { "channel-name": [ "socket_id" ], ... }
```

#### Get sockets count
```ts
const { data, error } = await socketo.sockets();

// Handle errors
if (error) {
  console.log(error);
}

//
console.log(data) // number
```

## Features
- Publish an event
- Publish batch events
- Get channels with subscribers
- Get sockets count

## License
This project is licensed under the MIT License.
