import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { email } = JSON.parse(event.body || '{}');

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email is required' }),
      };
    }

    // Store the email in Netlify Forms
    const response = await fetch('https://api.netlify.com/api/v1/forms/newsletter/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        email,
        'form-name': 'newsletter',
        data: { email },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to store email');
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully signed up for newsletter',
        email,
      }),
    };
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error signing up for newsletter' }),
    };
  }
};

export { handler };