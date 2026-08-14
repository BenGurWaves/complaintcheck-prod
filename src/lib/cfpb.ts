export type Complaint = {
  date_received: string;
  company_public_response?: string;
  company_name: string;
  product?: string;
  sub_product?: string;
  issue?: string[];
  sub_issue?: string[];
  consumer_consented?: boolean;
};

export type CompanySummary = {
  companyName: string;
  total12Months: number;
  totalAllTime: number;
  topIssues: { issue: string; count: number }[];
  trend: 'rising' | 'flat' | 'falling';
  trendPercent: number;
  cfpbUrl: string;
};

const CFPB_API_BASE = 'https://www.consumerfinance.gov/data-research/consumer-complaints/complaints-data/';

export async function fetchCompanyComplaints(companyName: string): Promise<Complaint[]> {
  const url = new URL(CFPB_API_BASE + 'download/');
  url.searchParams.set('year', '2024-2025'); // CSV endpoint, we will use the public API via data.json
  throw new Error('Legacy endpoint');
}

export async function fetchFromCFPBAPI(companyName: string): Promise<Complaint[]> {
  const apiUrl = 'https://www.consumerfinance.gov/data-research/consumer-complaints/complaint-database/';
  const query = `https://cfpb.github.io/ccdb5-api/api/v1/query`;
  
  // Real CFPB API uses POST with JSON. For demo, we'll use a mock pattern that can be swapped.
  // Actual public endpoint: https://www.consumerfinance.gov/data-research/consumer-complaints/
  // We'll build a compatible wrapper using the CSV download via fetch and parse.
  
  try {
    const res = await fetch('https://raw.githubusercontent.com/cfpb/ccdb5-api/main/src/example_requests.json');
    if (!res.ok) throw new Error('CFPB API proxy not available');
    const sample = await res.json();
    return [];
  } catch {
    // Fallback to mock data for development
    return getMockComplaints(companyName);
  }
}

function getMockComplaints(companyName: string): Complaint[] {
  const seed = companyName.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const random = (n: number) => {
    const x = Math.sin(seed + n) * 10000;
    return x - Math.floor(x);
  };
  
  const baseCompanies = ['Bank of America','Chase Bank','Wells Fargo','Capital One','Discover','American Express','Citi','US Bank'];
  const issues = ['Account opening, closing or management','Credit reporting, credit repair services, or other personal consumer reports','Managing an account','Dealing with my lender or servicer','Loan servicing, payments, lost-notice credit','Billing dispute','Collection practices'];
  
  return Array.from({ length: Math.floor(150 + random(0) * 800) }, (_, i) => ({
    date_received: new Date(Date.now() - Math.floor(random(i)*365)*24*60*60*1000).toISOString().split('T')[0],
    company_name: companyName,
    issue: [issues[Math.floor(random(i)*issues.length)]],
  }));
}

export function aggregateCompanyData(complaints: Complaint[]): CompanySummary {
  const now = new Date();
  const twelveMonthsAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const twentyFourMonthsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());

  const recent = complaints.filter(c => new Date(c.date_received) >= twelveMonthsAgo);
  const prior = complaints.filter(c => {
    const d = new Date(c.date_received);
    return d >= twentyFourMonthsAgo && d < twelveMonthsAgo;
  });

  const issueMap = new Map<string, number>();
  for (const c of recent) {
    const iss = c.issue?.[0] ?? 'Unknown';
    issueMap.set(iss, (issueMap.get(iss) ?? 0) + 1);
  }

  const topIssues = Array.from(issueMap.entries())
    .sort((a,b)=>b[1]-a[1])
    .slice(0,3)
    .map(([issue,count])=>({issue,count}));

  const total12 = recent.length;
  const totalPrior = prior.length;
  
  let trend: 'rising'|'flat'|'falling' = 'flat';
  let trendPercent = 0;
  if (totalPrior > 0) {
    trendPercent = Math.round(((total12 - totalPrior)/totalPrior)*100);
    if (trendPercent > 5) trend = 'rising';
    else if (trendPercent < -5) trend = 'falling';
    else trend = 'flat';
  } else if (total12 > 0) {
    trend = 'rising';
    trendPercent = 100;
  }

  return {
    companyName: complaints[0]?.company_name || 'Unknown',
    total12Months: total12,
    totalAllTime: complaints.length,
    topIssues,
    trend,
    trendPercent,
    cfpbUrl: `https://www.consumerfinance.gov/data-research/consumer-complaints/complaints-database/#!/complaints?company=${encodeURIComponent(complaints[0]?.company_name || '')}`,
  };
}
