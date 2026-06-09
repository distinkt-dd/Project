export class Api {
  readonly baseUrl: string;
  protected options: RequestInit;

  constructor(baseUrl: string, options: RequestInit = {}, token?: string) {
    this.baseUrl = baseUrl;
    this.options = {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...((options.headers as object) ?? {}),
      },
    };
  }

  protected handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      if (response.status === 204) {
        return Promise.resolve() as Promise<T>;
      }
      return response.json();
    } else {
      return response
        .json()
        .then((data) => Promise.reject(data.error ?? response.statusText));
    }
  }

  protected request<T>(
    uri: string,
    method: string,
    data?: object,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    const queryString = params
      ? '?' +
        new URLSearchParams(
          Object.fromEntries(
            Object.entries(params)
              .filter(([, v]) => v != null)
              .map(([k, v]) => [k, String(v)])
          )
        ).toString()
      : '';

    const config: RequestInit = {
      ...this.options,
      method,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    return fetch(this.baseUrl + uri + queryString, config).then((response) =>
      this.handleResponse<T>(response)
    );
  }

  get<T>(
    uri: string,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    return this.request<T>(uri, 'GET', undefined, params);
  }

  post<T>(uri: string, data: object): Promise<T> {
    return this.request<T>(uri, 'POST', data);
  }

  put<T>(uri: string, data: object): Promise<T> {
    return this.request<T>(uri, 'PUT', data);
  }

  patch<T>(uri: string, data: object): Promise<T> {
    return this.request<T>(uri, 'PATCH', data);
  }

  delete<T>(uri: string): Promise<T> {
    return this.request<T>(uri, 'DELETE');
  }
}
