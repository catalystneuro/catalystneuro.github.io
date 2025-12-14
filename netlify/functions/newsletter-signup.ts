import { Handler } from '@netlify/functions';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const handler: Handler = async (event) => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Method not allowed' }) 
    };
  }

  try {
    const { email } = JSON.parse(event.body || '{}');

    if (!email) {
      return { 
        statusCode: 400, 
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Email is required' }) 
      };
    }

    // Submit to Netlify Forms by posting to the site itself
    const siteUrl = process.env.URL || 'https://catalystneuro.com';
    
    const formData = new URLSearchParams();
    formData.append('form-name', 'newsletter');
    formData.append('email', email);

    const response = await fetch(siteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      console.error('Netlify form submission failed:', response.status, response.statusText);
      throw new Error('Failed to submit to Netlify Forms');
    }

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Successfully signed up for newsletter',
        email,
      }),
    };
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Error signing up for newsletter' }),
    };
  }
};

export { handler };
