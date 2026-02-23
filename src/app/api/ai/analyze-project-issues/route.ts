import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Server API that proxies analyzeProjectIssues. To avoid pulling genkit and
// its node-only dependencies into the Next build, we only dynamically import
// the server flow when GENKIT_ENABLED is set. Otherwise return a safe empty
// analysis result.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = body;
    if (!input) {
      return NextResponse.json({ error: 'input required' }, { status: 400 });
    }

    if (process.env.GENKIT_ENABLED === '1' || process.env.GENKIT_ENABLED === 'true') {
      const mod = await import('@/ai/flows/analyze-project-issues-flow');
      if (mod && typeof mod.analyzeProjectIssues === 'function') {
        const result = await mod.analyzeProjectIssues(input);
        return NextResponse.json(result);
      }
      return NextResponse.json({ criticalIssues: [], summary: '' });
    }

    return NextResponse.json({ criticalIssues: [], summary: '' });
  } catch (err: any) {
    console.error('AI analyze-project-issues error', err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
