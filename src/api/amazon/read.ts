import axios from 'axios';
import { amazon_client_id, amazon_client_secret, amazon_x_api_key, redirect_uri } from '../../private';


// This function redirects the user to Amazon's OAuth 2.0 authorization endpoint.
export const redirectToAmazonLogin = () => {
    const amazonAuthUrl = `https://www.amazon.com/ap/oa?client_id=${amazon_client_id}&scope=profile&response_type=code&redirect_uri=${redirect_uri}`;
    window.location.href = amazonAuthUrl;
};

export async function getAmazonAccessToken(authorizationCode: string) {
    try {
        const requestBody = {
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri: redirect_uri,
            client_id: amazon_client_id,
            client_secret: amazon_client_secret,
        };

        const response = await axios.post('https://api.amazon.com/auth/o2/token', requestBody);
        const accessToken = response.data.access_token;

        return accessToken;

    } catch (error) {
        console.error('Error in getAmazonAccessToken: ' + error);
        throw error;
    }
};

export const fetchAmazonData = async (accessToken: string) => {
    console.log('in fetchAmazonData accessToken:  ' + accessToken)
    try {
        const result = await axios({
            method: 'get',
            url: 'https://api.music.amazon.dev/v1/me/tracks',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'x-api-key': amazon_x_api_key,
            },
        });
        ///tracks: v1/me/tracks
        console.log('amazon data: ' + JSON.stringify(result.data));
    } catch (error) {
        console.error('Error fetching data from Amazon Music Web API', error);
    }
};