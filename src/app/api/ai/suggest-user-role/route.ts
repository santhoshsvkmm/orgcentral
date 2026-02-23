import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This route intentionally avoids importing genkit at module-evaluation time
// to prevent server-side-only dependencies from being pulled into the Next
// build when not configured. If GENKIT_ENABLED env var is truthy, we will
// dynamically import and call the server-only flow. Otherwise we return a
// safe empty suggestion result.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobDescription } = body;
    if (!jobDescription || typeof jobDescription !== 'string') {
      return NextResponse.json({ error: 'jobDescription is required' }, { status: 400 });
    }

    if (process.env.GENKIT_ENABLED === '1' || process.env.GENKIT_ENABLED === 'true') {
      // Dynamically import the server flow only when explicitly enabled.
      const mod = await import('@/ai/flows/suggest-user-role');
      if (mod && typeof mod.suggestUserRole === 'function') {
        const result = await mod.suggestUserRole({ jobDescription });
        return NextResponse.json(result);
      }
      return NextResponse.json({ suggestedRoles: [] });
    }

    // GENKIT not enabled — return an empty suggestion set so clients still work
    return NextResponse.json({ suggestedRoles: [] });
  } catch (err: any) {
    console.error('AI suggest-user-role error', err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
