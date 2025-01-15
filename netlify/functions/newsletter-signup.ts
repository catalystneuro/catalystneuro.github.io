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

    // Here you would integrate with your newsletter service
    // For example, with Mailchimp:
    // const response = await mailchimp.lists.addListMember(LIST_ID, {
    //   email_address: email,
    //   status: 'subscribed',
    // });

    // For now, we'll just return a success response
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
