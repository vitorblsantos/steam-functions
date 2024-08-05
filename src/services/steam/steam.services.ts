import axios from 'axios'

export const ServiceSteam = axios.create({
  baseURL: 'https://steamcommunity.com'
})
