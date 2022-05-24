import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const { API_BASE_URL } = publicRuntimeConfig
