import { axiosGet } from './settings';

const getImages = async (q, page = 1) => {
    const { data } = await axiosGet('', { params: { q, page } });
    return data;
};

export default getImages;
