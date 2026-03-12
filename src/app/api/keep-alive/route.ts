import { NextResponse } from 'next/server';
import { getMasterclassData } from '@/lib/strapi';

export async function GET() {
  try {
    // This forces the Strapi -> Neon connection to activate
    const data = await getMasterclassData();

    return NextResponse.json({
      status: 'Heartbeat Successful',
      database: data ? 'Connected' : 'No Data',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ status: 'Heartbeat Failed', error: 'Internal Error' }, { status: 500 });
  }
}
