import { strategyApi, pressReleaseApi, socialApi, campaignsApi, healthApi, ApiError } from "@/lib/api";

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

describe("API Service Layer", () => {
  describe("strategyApi", () => {
    it("generates strategy with correct request", async () => {
      const mockResponse = { status: "success", data: "strategy result" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const brief = {
        company_name: "Acme",
        objective: "Launch product",
        context: "SaaS startup",
      };
      const result = await strategyApi.generate(brief);

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/strategy/generate",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({ "Content-Type": "application/json" }),
          body: JSON.stringify(brief),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it("fetches templates", async () => {
      const mockResponse = { templates: [{ id: "1", name: "Launch", description: "Product launch" }] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await strategyApi.getTemplates();
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/strategy/templates",
        expect.objectContaining({
          headers: expect.objectContaining({ "Content-Type": "application/json" }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it("throws ApiError on failed request", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve("Internal Server Error"),
      });

      await expect(strategyApi.getTemplates()).rejects.toThrow(ApiError);
    });

    it("includes optional fields when provided", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ status: "success", data: "" }),
      });

      await strategyApi.generate({
        company_name: "Acme",
        objective: "Launch",
        context: "Context",
        timeline: "Q2 2026",
        budget: "$10k",
        constraints: "None",
      });

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.timeline).toBe("Q2 2026");
      expect(body.budget).toBe("$10k");
      expect(body.constraints).toBe("None");
    });
  });

  describe("pressReleaseApi", () => {
    it("generates press release", async () => {
      const mockResponse = { status: "success", data: "press release content" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await pressReleaseApi.generate({
        headline: "Big News",
        announcement: "We launched",
      });

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/press-release/generate",
        expect.objectContaining({ method: "POST" })
      );
      expect(result).toEqual(mockResponse);
    });

    it("fetches formats", async () => {
      const mockResponse = { formats: [{ id: "trad", name: "Traditional", description: "Standard format" }] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await pressReleaseApi.getFormats();
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/press-release/formats",
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("socialApi", () => {
    it("generates social content", async () => {
      const mockResponse = { status: "success", data: "social posts" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await socialApi.generate({
        topic: "Product launch",
        platforms: ["linkedin", "twitter"],
      });

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/social/generate",
        expect.objectContaining({ method: "POST" })
      );
      expect(result).toEqual(mockResponse);
    });

    it("fetches platforms", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ platforms: [] }),
      });

      await socialApi.getPlatforms();
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/social/platforms",
        expect.any(Object)
      );
    });
  });

  describe("campaignsApi", () => {
    it("generates campaign plan", async () => {
      const mockResponse = { status: "success", data: "campaign plan" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await campaignsApi.generatePlan({
        name: "Q2 Launch",
        objective: "Awareness",
        target_audience: "Developers",
        start_date: "2026-04-01",
        end_date: "2026-06-30",
      });

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/campaigns/generate-plan",
        expect.objectContaining({ method: "POST" })
      );
      expect(result).toEqual(mockResponse);
    });

    it("fetches campaign templates", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ templates: [] }),
      });

      await campaignsApi.getTemplates();
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/campaigns/templates",
        expect.any(Object)
      );
    });
  });

  describe("healthApi", () => {
    it("checks health endpoint", async () => {
      const mockResponse = { status: "healthy", version: "0.1.0" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await healthApi.check();
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/health",
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("error handling", () => {
    it("throws ApiError with status code on 4xx", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: () => Promise.resolve("Not Found"),
      });

      try {
        await healthApi.check();
        fail("Should have thrown");
      } catch (err) {
        expect(err).toBeInstanceOf(ApiError);
        expect((err as ApiError).status).toBe(404);
        expect((err as ApiError).message).toBe("Not Found");
      }
    });

    it("throws ApiError with status code on 5xx", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        text: () => Promise.resolve("Service Unavailable"),
      });

      try {
        await healthApi.check();
        fail("Should have thrown");
      } catch (err) {
        expect(err).toBeInstanceOf(ApiError);
        expect((err as ApiError).status).toBe(503);
      }
    });

    it("handles network errors gracefully", async () => {
      mockFetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));

      await expect(healthApi.check()).rejects.toThrow("Failed to fetch");
    });
  });
});
