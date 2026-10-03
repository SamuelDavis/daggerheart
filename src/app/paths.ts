import { useParams } from '@solidjs/router'

const encode = encodeURIComponent

const query = (params: Record<string, string>) => {
  const search = new URLSearchParams(params).toString()
  return search ? `?${search}` : ''
}

export const paths = {
  characters: '/',
  library: '/library',
  catalog: (catalog: string, filters: Record<string, string> = {}) => `/library/${catalog}${query(filters)}`,
  entry: (catalog: string, name: string) => `/library/${catalog}/${encode(name)}`,
  character: (name: string) => `/characters/${encode(name)}`,
  levelUp: (name: string) => `/characters/${encode(name)}/level-up`,
  print: (name: string) => `/characters/${encode(name)}/print`,
  build: (name: string, step?: string) => `/characters/${encode(name)}/build${step ? `/${step}` : ''}`,
}

export const routePatterns = {
  characters: '/',
  library: '/library',
  catalog: '/library/:catalog',
  entry: '/library/:catalog/:name',
  character: '/characters/:name',
  levelUp: '/characters/:name/level-up',
  print: '/characters/:name/print',
  build: '/characters/:name/build/:step?',
}

export const useCharacterName = () => {
  const params = useParams<{ name: string }>()
  return () => decodeURIComponent(params.name)
}
