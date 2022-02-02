import axios from 'axios'
const baseUrl = process.env.BASE_URL

export async function getArticles() {
  const res = await axios.get(`${baseUrl}/articles?populate=%2A`)
  return res.data.data
}

export async function getOneArticle(slug) {
  const res = await axios.get(`${baseUrl}/articles?filters[slug]$eq=${slug}&populate=%2A`)
  return res.data.data[0]
}

export async function getAllCategories() {
  const res = await axios.get(`${baseUrl}/categories?populate[0]=articles&sort[0]=isDiagnose%3Adesc&sort[1]=name`)
  return res.data.data
}

export async function getAllDiagnoses() {
  const res = await axios.get(`${baseUrl}/categories?filters[isDiagnose][$eq]=true&populate[0]=articles&[0]=name`)
  return res.data.data
}