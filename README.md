# Socketo TypeScript SDK

The official TypeScript SDK for Socketo. Easily publish events from your server-side application.

## Installation

Install the package using your package manager:

```bash
npm install @socketodev/sdk
```

## Usage

```ts
import { Socketo } from "@socketodev/sdk";

// Initialize client
const socketo = new Socketo({
  id: "YOUR_APP_ID",
  secret: "YOUR_APP_SECRET",
});
```

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

## Features
- Publish an event
- Publish batch events

## License
This project is licensed under the MIT License.
