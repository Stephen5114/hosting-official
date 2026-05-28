const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL as string | undefined) ?? "https://api.hostvibecoding.com";

export type HostingPlan = {
  slug: string;
  name: string;
  description: string;
  recommendedSiteLimit: number;
  diskLimitMb: number;
  fileLimitCount: number;
  monthlyPrice: number;
  nodeType: string;
};

export type RegionDefinition = {
  slug: string;
  name: string;
  availableNodeCount: number;
  isDefault: boolean;
};

export type CatalogResponse = {
  plans: HostingPlan[];
  regions: RegionDefinition[];
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  waitlisted: boolean;
  customerId: string | null;
  serverNodeId: string | null;
  requiresEmailVerification: boolean;
  verificationPreviewUrl?: string | null;
};

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as { message?: string };
    if (payload.message) return payload.message;
  } catch {
    // ignore
  }
  return `Request failed: ${response.status}`;
}

export async function fetchCatalog() {
  const response = await fetch(`${API_BASE_URL}/api/catalog`);
  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }
  return parseJson<CatalogResponse>(response);
}

export async function registerLead(payload: { email: string; password: string }) {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Cannot connect to backend.");
  }

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return parseJson<RegisterResponse>(response);
}
