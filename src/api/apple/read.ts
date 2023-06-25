import axios from 'axios';

export const fetchAppleData = async () => {
    const response = await axios.get('https://api.music.apple.com/v1/me/storefront', {
        headers: {
            // 'Authorization': `Bearer ${accessToken}`
        }
    });

    console.log(JSON.stringify(response.data))

};
