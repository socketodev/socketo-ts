import type {
  ApiReponseType,
  PublishPayloadType,
  PublishReponseType,
} from './types'

const baseUrl = process?.env?.SOCKETO_API_URL ?? `https://api.socketo.dev`

class ApiClient {
  private readonly baseUrl: string

  constructor(readonly options: { id: string; secret: string }) {
    this.baseUrl = `${baseUrl}/apps/${options.id}`
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
  ): Promise<ApiReponseType<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${this.options.secret}`,
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      })

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status} - ${response.statusText}`,
        )
      }

      return { data: await response.json(), error: null }
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error ? error.message : 'Unknown error occurred',
        },
      }
    }
  }

  public get<T>(path: string) {
    return this.request<T>('GET', path)
  }

  public post<T>(path: string, data: unknown) {
    return this.request<T>('POST', path, data)
  }
}

export class Socketo {
  private client: ApiClient

  constructor(readonly options: { id: string; secret: string }) {
    const { id, secret } = options

    if (typeof window !== 'undefined') {
      throw new Error('This SDK is designed to run only on the server.')
    }

    if (!id) {
      throw new Error('ID is required')
    }

    if (!secret) {
      throw new Error('Secret key is required')
    }

    this.client = new ApiClient({ id, secret })
  }

  public async publish(payload: PublishPayloadType) {
    return this.client.post<PublishReponseType>('/events', payload)
  }
}
