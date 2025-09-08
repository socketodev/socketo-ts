export type ApiReponseType<T> =
  | { data: T; error: null }
  | { data: null; error: { message: string } }

interface PublishPayload {
  event: string
  channels: string[]
  data: string | object
  socketId?: string | string[]
}

interface ChannelsReponse {
  [channel: string]: string[]
}

export type PublishPayloadType = PublishPayload | PublishPayload[]
export type PublishReponseType = undefined

export type ChannelsReponseType = ChannelsReponse | object
