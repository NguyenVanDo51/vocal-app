import axios from "axios"

export const searchImages = (keyword) => {
  if (!keyword) return new Promise(resolve => resolve([]))

  return axios.get(`https://api.pexels.com/v1/search?query=${keyword}&per_page=10`, {
    headers: {
      "Authorization": process.env.NEXT_PUBLIC_PEXELS_API_KEY
    }
  }).then(res => res.data.photos)
}