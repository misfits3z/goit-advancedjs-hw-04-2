import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/'
const API_KEY = '46457503-330abda4e6a20c9fb19d2e08a';

let page = 1;

async function getPhotos(query, resetPage = false) {
    if (resetPage) {
        page = 1;
    }

    try {
        const response = await axios('', {
            params: {
                key: API_KEY,
                q: query,
                page: page,
                per_page: 15,
            }
        });

        const data = response.data;

        if (data.totalHits > 0) {
            page += 1;
            return { hits: data.hits, totalHits: data.totalHits }; 
        } else {
            iziToast.error({
                message: `Sorry, there are no images matching your search query. Please try again!`,
                position: "topRight",
                timeout: 2000,
                color: "#FF0000",
                messageColor: "#FFFFFF",
            });
            return { hits: [], totalHits: 0 }; 
        }
    } catch (err) {
        console.log(err);
        return { hits: [], totalHits: 0 }; 
    }
}
export { getPhotos };



