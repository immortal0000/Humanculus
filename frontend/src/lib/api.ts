const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "Unknown error");
    throw new ApiError(errorBody, response.status);
  }

  return response.json();
}

// Strategy API
export const strategyApi = {
  generate: (brief: {
    company_name: string;
    objective: string;
    context: string;
    timeline?: string;
    budget?: string;
    constraints?: string;
  }) => request<{ status: string; data: string }>("/api/strategy/generate", {
    method: "POST",
    body: JSON.stringify(brief),
  }),

  getTemplates: () =>
    request<{ templates: Array<{ id: string; name: string; description: string }> }>("/api/strategy/templates"),
};

// Press Release API
export const pressReleaseApi = {
  generate: (data: {
    headline: string;
    subheadline?: string;
    announcement: string;
    quotes?: string;
    boilerplate?: string;
    brand_voice?: string;
    format?: string;
  }) => request<{ status: string; data: string }>("/api/press-release/generate", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getFormats: () =>
    request<{ formats: Array<{ id: string; name: string; description: string }> }>("/api/press-release/formats"),
};

// Social Content API
export const socialApi = {
  generate: (data: {
    topic: string;
    context?: string;
    platforms: string[];
    content_type?: string;
    brand_voice?: string;
  }) => request<{ status: string; data: string }>("/api/social/generate", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getPlatforms: () =>
    request<{ platforms: Array<{ id: string; name: string; specs: Record<string, unknown> }> }>("/api/social/platforms"),
};

// Campaigns API
export const campaignsApi = {
  generatePlan: (data: {
    name: string;
    objective: string;
    target_audience: string;
    start_date: string;
    end_date: string;
    budget?: string;
  }) => request<{ status: string; data: string }>("/api/campaigns/generate-plan", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getTemplates: () =>
    request<{ templates: Array<{ id: string; name: string; description: string }> }>("/api/campaigns/templates"),
};

// Health check
export const healthApi = {
  check: () => request<{ status: string; version: string }>("/api/health"),
};

export { ApiError };
