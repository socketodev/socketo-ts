import { Socketo } from '../../src/index'

const socketo = new Socketo({ id: 'default', secret: 'secret' })

async function start() {
  // Publish an event to a channel
  // for batching: `publish([{...}])`
  await socketo.publish({
    event: 'my-event',
    channels: ['my-channel'],
    data: 'Hello from SDK!',
  })
}

start()
