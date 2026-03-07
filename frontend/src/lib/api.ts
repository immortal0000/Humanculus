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

// --- AI Tool APIs ---

// Media Pitch API
export const pitchApi = {
  generate: (data: {
    journalist_name: string;
    outlet: string;
    beat: string;
    story_angle: string;
    company_name: string;
    key_points: string[];
    tone?: string;
    previous_coverage?: string;
  }) => request<{ status: string; data: string }>("/api/pitch/generate", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getTemplates: () =>
    request<{ templates: Array<{ id: string; name: string; description: string }> }>("/api/pitch/templates"),
};

// Brand Voice API
export const brandVoiceApi = {
  analyze: (data: {
    content_samples: string[];
    company_name: string;
  }) => request<{ status: string; data: string }>("/api/brand-voice/analyze", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getPresets: () =>
    request<{ presets: Array<{ id: string; name: string; description: string }> }>("/api/brand-voice/presets"),
};

// Content Repurpose API
export const repurposeApi = {
  generate: (data: {
    source_content: string;
    source_type: string;
    target_formats: string[];
    brand_voice?: string;
  }) => request<{ status: string; data: string }>("/api/repurpose/generate", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getFormats: () =>
    request<{ formats: Array<{ id: string; name: string; description: string }> }>("/api/repurpose/formats"),
};

// Sentiment Explainer API
export const sentimentApi = {
  explain: (data: {
    mention_text: string;
    source: string;
    headline: string;
    sentiment: string;
  }) => request<{ status: string; data: string }>("/api/sentiment/explain", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

// Headlines API
export const headlinesApi = {
  generate: (data: {
    content: string;
    goal?: string;
    count?: number;
  }) => request<{ status: string; data: string }>("/api/headlines/generate", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

// Competitive Intelligence API
export const competitiveApi = {
  analyze: (data: {
    company_name: string;
    competitors: string[];
    focus_areas?: string[];
  }) => request<{ status: string; data: string }>("/api/competitive/analyze", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

// Crisis Simulation API
export const crisisSimApi = {
  simulate: (data: {
    scenario: string;
    company_name: string;
    industry: string;
    severity?: string;
    response_plan?: string;
  }) => request<{ status: string; data: string }>("/api/crisis-sim/simulate", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getScenarios: () =>
    request<{ scenarios: Array<{ id: string; name: string; severity: string; description: string }> }>("/api/crisis-sim/scenarios"),
};

// Meeting Prep API
export const meetingPrepApi = {
  generate: (data: {
    journalist_name: string;
    outlet: string;
    beat: string;
    meeting_type?: string;
    topic: string;
    company_name: string;
    recent_articles?: string[];
  }) => request<{ status: string; data: string }>("/api/meeting-prep/generate", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getMeetingTypes: () =>
    request<{ meeting_types: Array<{ id: string; name: string; description: string }> }>("/api/meeting-prep/meeting-types"),
};

// --- Non-AI Tool APIs ---

// Distribution API
export const distributionApi = {
  send: (data: {
    subject: string;
    content: string;
    recipients: string[];
    send_at?: string;
  }) => request<{ status: string; data: Record<string, unknown> }>("/api/distribution/send", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getHistory: () =>
    request<{ distributions: Array<Record<string, unknown>> }>("/api/distribution/history"),

  getStats: () =>
    request<Record<string, unknown>>("/api/distribution/stats"),
};

// Calendar API
export const calendarApi = {
  getEvents: (month?: string, eventType?: string) => {
    const params = new URLSearchParams();
    if (month) params.set("month", month);
    if (eventType) params.set("event_type", eventType);
    const query = params.toString();
    return request<{ events: Array<Record<string, unknown>> }>(`/api/calendar/events${query ? `?${query}` : ""}`);
  },

  createEvent: (data: {
    title: string;
    description?: string;
    event_type: string;
    start_date: string;
    end_date?: string;
    campaign_id?: string;
    status?: string;
  }) => request<{ status: string; data: Record<string, unknown> }>("/api/calendar/events", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getUpcoming: () =>
    request<{ events: Array<Record<string, unknown>> }>("/api/calendar/upcoming"),

  getEventTypes: () =>
    request<{ event_types: Array<{ id: string; name: string; color: string }> }>("/api/calendar/event-types"),
};

// Embargo API
export const embargoApi = {
  list: (status?: string) => {
    const query = status ? `?status=${status}` : "";
    return request<{ embargoes: Array<Record<string, unknown>> }>(`/api/embargo/list${query}`);
  },

  create: (data: {
    title: string;
    press_release_id?: string;
    lift_date: string;
    lift_time?: string;
    timezone?: string;
    recipients?: string[];
    notes?: string;
  }) => request<{ status: string; data: Record<string, unknown> }>("/api/embargo/create", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  lift: (embargoId: string) =>
    request<{ status: string; data: Record<string, unknown> }>(`/api/embargo/${embargoId}/lift`, { method: "POST" }),

  getStats: () =>
    request<Record<string, unknown>>("/api/embargo/stats"),
};

// Approval API
export const approvalApi = {
  list: (status?: string, priority?: string) => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (priority) params.set("priority", priority);
    const query = params.toString();
    return request<{ approvals: Array<Record<string, unknown>> }>(`/api/approval/list${query ? `?${query}` : ""}`);
  },

  request: (data: {
    item_type: string;
    item_id: string;
    title: string;
    content_preview: string;
    requested_by: string;
    reviewers: string[];
    priority?: string;
    deadline?: string;
  }) => request<{ status: string; data: Record<string, unknown> }>("/api/approval/request", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  decide: (approvalId: string, data: {
    decision: string;
    reviewer: string;
    comments?: string;
  }) => request<{ status: string; data: Record<string, unknown> }>(`/api/approval/${approvalId}/decide`, {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getStats: () =>
    request<Record<string, unknown>>("/api/approval/stats"),
};

// Clipbook API
export const clipbookApi = {
  create: (data: {
    title: string;
    mention_ids: string[];
    include_summary?: boolean;
    include_charts?: boolean;
    date_range?: string;
  }) => request<{ status: string; data: Record<string, unknown> }>("/api/clipbook/create", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  list: () =>
    request<{ clipbooks: Array<Record<string, unknown>> }>("/api/clipbook/list"),

  getMentions: () =>
    request<{ mentions: Array<Record<string, unknown>> }>("/api/clipbook/mentions"),

  get: (clipbookId: string) =>
    request<{ status: string; data: Record<string, unknown> }>(`/api/clipbook/${clipbookId}`),
};

// Contact Timeline API
export const contactTimelineApi = {
  getTimeline: (contactId: string) =>
    request<{ contact_id: string; interactions: Array<Record<string, unknown>>; total_interactions: number }>(`/api/contact-timeline/contacts/${contactId}`),

  addInteraction: (data: {
    contact_id: string;
    interaction_type: string;
    subject: string;
    notes?: string;
    outcome?: string;
    date?: string;
  }) => request<{ status: string; data: Record<string, unknown> }>("/api/contact-timeline/interactions", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getRecent: (limit?: number) =>
    request<{ interactions: Array<Record<string, unknown>> }>(`/api/contact-timeline/recent${limit ? `?limit=${limit}` : ""}`),

  getStats: () =>
    request<Record<string, unknown>>("/api/contact-timeline/stats"),
};

// Analytics API
export const analyticsApi = {
  getOverview: () =>
    request<Record<string, unknown>>("/api/analytics/overview"),

  getChannels: () =>
    request<{ channels: Array<Record<string, unknown>> }>("/api/analytics/channels"),

  getCampaigns: () =>
    request<{ campaigns: Array<Record<string, unknown>> }>("/api/analytics/campaigns"),

  getSocial: () =>
    request<{ platforms: Array<Record<string, unknown>> }>("/api/analytics/social"),
};

// Notifications API
export const notificationsApi = {
  list: (unreadOnly?: boolean) =>
    request<{ notifications: Array<Record<string, unknown>>; unread_count: number }>(`/api/notifications/list${unreadOnly ? "?unread_only=true" : ""}`),

  markRead: (notificationId: string) =>
    request<{ status: string }>(`/api/notifications/${notificationId}/read`, { method: "POST" }),

  markAllRead: () =>
    request<{ status: string; marked: number }>("/api/notifications/read-all", { method: "POST" }),

  getConfig: () =>
    request<{ config: Record<string, unknown> }>("/api/notifications/config"),

  updateConfig: (data: {
    channel: string;
    webhook_url?: string;
    events?: string[];
  }) => request<{ status: string; config: Record<string, unknown> }>("/api/notifications/config", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

// Health check
export const healthApi = {
  check: () => request<{ status: string; version: string }>("/api/health"),
};

export { ApiError };
