interface PublishPayload {
  event: string;
  channels: string[];
  data: string | object;
  socketId?: string | string[];
}

type PublishPayloadType = PublishPayload | PublishPayload[];

export class ApiClient {
  private baseUrl: string;
  private secret: string;

  constructor(options: { baseUrl: string; secret: string }) {
    this.baseUrl = options.baseUrl;
    this.secret = options.secret;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.secret}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: undefined }));
      throw new Error(error.error || `Request failed: ${response.status}`);
    }

    return response.json();
  }

  public get<T>(path: string) {
    return this.request<T>("GET", path);
  }

  public post<T, D>(path: string, data: D) {
    return this.request<T>("POST", path, data);
  }
}

export class Socketo {
  private client: ApiClient;

  constructor(options: { id: string; secret: string }) {
    const { id, secret } = options;

    if (typeof window !== "undefined") {
      throw new Error("This SDK is designed to run only on the server.");
    }

    if (!id) {
      throw new Error("ID is required");
    }

    if (!secret) {
      throw new Error("Secret key is required");
    }

    this.client = new ApiClient({
      baseUrl: `https://api.socketo.dev/apps/${id}`,
      secret: secret,
    });
  }

  public publish(payload: PublishPayloadType) {
    return this.client.post<object, PublishPayloadType>("/events", payload);
  }
}
