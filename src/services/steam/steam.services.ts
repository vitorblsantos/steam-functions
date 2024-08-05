import axios from 'axios'

export const InstanceSteam = axios.create({
  baseURL: 'https://steamcommunity.com'
})
