import { NextResponse } from 'next/server';
import { fetchFromCFPBAPI, aggregateCompanyData } from '@/lib/cfpb';

type SearchQuery = {
  company: string;
  year?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query: SearchQuery = body || { company: '' };

    if (!query.company || query.company.trim().length < 2) {
      return NextResponse.json({ error: 'Company name required (min 2 chars)' }, { status: 400 });
    }

    // Live CFPB call
    const complaints = await fetchFromCFPBAPI(query.company.trim());
    
    if (!complaints.length) {
      return NextResponse.json({ summary: null, message: 'No complaints found for this company name' });
    }

    const summary = aggregateCompanyData(complaints);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('CFPB API Error', error);
    return NextResponse.json({ error: 'Failed to fetch complaint data' }, { status: 500 });
  }
}
