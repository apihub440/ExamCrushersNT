export default async function handler(req, res) {
  // Enable CORS for your frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract parameters from request body
    const { course_id, parent_id } = req.body;

    if (!course_id || !parent_id) {
      return res.status(400).json({ 
        error: 'Missing required parameters: course_id and parent_id' 
      });
    }

    // Prepare headers for the target API
    const headers = {
      'Origin': 'https://examcrushers.in',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 14; 22127PC951 Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/147.0.7727.137 Mobile Safari/537.36',
      'Referer': 'https://examcrushers.in/',
      'version': '1',
      'platform': '3',
      'accept': 'application/json, text/plain, */*',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNjU4NDc0LCJhcHBfaWQiOiIxNzcwOTgxMzQ3IiwiZGV2aWNlX2lkIjoiMjgxZWE1YjEtMzY5OS00ODRhLTgwZmYtZGUzZjJkOTkzZGVlIiwicGxhdGZvcm0iOiIzIiwidXNlcl90eXBlIjoiMiIsImlhdCI6MTc3NzUwMDI5OCwiZXhwIjoxNzgwNTgyMjk4fQ.uvCV2MDhs_oalFrPey0Ezio8zza-nidJ6wfhmTmNAU',
      'sec-ch-ua': '"Android WebView";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
      'sec-ch-ua-mobile': '?1',
      'user_id': '682065',
      'sec-ch-ua-platform': '"Android"',
      'content-type': 'application/json',
      'app_id': '1770981347'
    };

    // Make request to the target API
    const response = await fetch('https://course.nexttoppers.com/course/course-details', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        course_id: course_id,
        parent_id: parent_id
      })
    });

    // Get response data
    const data = await response.json();

    // Return the response with original status code
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
