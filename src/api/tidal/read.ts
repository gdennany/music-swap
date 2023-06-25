import axios from 'axios';

export const fetchTidalData = async () => {
    console.log('fetchTidalData')
    const client = axios.create({
        baseURL: 'https://api.tidal.com/v1/',
        timeout: 15000,
        headers: {
            'user-agent': 'TIDAL/3704 CFNetwork/1220.1 Darwin/20.3.0',
            'x-tidal-token': 'i4ZDjcyhed7Mu47q', //from web player: CzET4vdadNUFQ5JU
        },
        params: { limit: 500, countryCode: 'US' },
    });

    const id = 95809187;
    const { data } = await client.get(`tracks/${id}`);
    console.log('data response ' + JSON.stringify(data))
    return data;
};