import axios from 'axios';

export const axiosGet = axios.create({
    baseURL: 'https://pixabay.com/api/',

    params: {
        key: '24182944-6a44f26d4ebf1d494c89c0c95',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
    },
});
