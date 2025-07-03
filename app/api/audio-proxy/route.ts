import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const audioUrl = searchParams.get('url');

  if (!audioUrl) {
    return NextResponse.json(
      { error: 'Audio URL is required' },
      { status: 400 }
    );
  }

  // Validate that the URL is from a trusted source
  const allowedDomains = [
    'audio.buzzsprout.com',
    'www.buzzsprout.com',
    'feeds.buzzsprout.com'
  ];

  try {
    const url = new URL(audioUrl);
    const isAllowed = allowedDomains.some(domain =>
      url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    );

    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Domain not allowed' },
        { status: 403 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid URL' },
      { status: 400 }
    );
  }

  try {
    // Fetch the audio file with headers that bypass referrer restrictions
    const response = await fetch(audioUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'audio/*,*/*;q=0.9',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        // Remove referrer to bypass referrer restrictions
        'Referrer-Policy': 'no-referrer',
      },
      // Don't follow redirects automatically to handle them properly
      redirect: 'manual',
    });

    // Handle redirects manually
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        // Recursive call to handle redirects
        const redirectUrl = new URL(location, audioUrl).toString();
        return GET(new NextRequest(request.url.replace(encodeURIComponent(audioUrl), encodeURIComponent(redirectUrl))));
      }
    }

    if (!response.ok) {
      console.error(`Audio fetch failed: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        {
          error: 'Failed to fetch audio',
          status: response.status,
          statusText: response.statusText
        },
        { status: response.status }
      );
    }

    // Get the audio content
    const audioBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'audio/mpeg';
    const contentLength = response.headers.get('content-length');

    // Create response with proper headers
    const audioResponse = new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': contentLength || audioBuffer.byteLength.toString(),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400', // Cache for 1 hour
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Range, Content-Range, Content-Length, Content-Type',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        // Security headers
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
    });

    return audioResponse;

  } catch (error) {
    console.error('Error proxying audio:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Range, Content-Length, Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Handle HEAD requests for audio metadata
export async function HEAD(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const audioUrl = searchParams.get('url');

  if (!audioUrl) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const response = await fetch(audioUrl, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'audio/*,*/*;q=0.9',
        'Referrer-Policy': 'no-referrer',
      },
    });

    if (!response.ok) {
      return new NextResponse(null, { status: response.status });
    }

    return new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'audio/mpeg',
        'Content-Length': response.headers.get('content-length') || '0',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Error getting audio metadata:', error);
    return new NextResponse(null, { status: 500 });
  }
}
