import { Socketo } from '../../src/index'

const socketo = new Socketo({ id: 'default', secret: 'secret' })

async function start() {
  // Publish an event to a channel
  // for batching: `publish([{...}])`
  const { error } = await socketo.publish({
    event: 'my-event',
    channels: ['my-channel'],
    data: 'Hello from SDK!',
  })

  if (error) {
    console.log(error)
  }
}

start()
