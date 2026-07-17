import { decode, type JwtPayload } from 'jsonwebtoken'

type CustomPayload = JwtPayload & {
  id: string
  name: string
  email: string
  azp?: string
}

interface Result {
  payload: CustomPayload
  user: {
    id: string
    name: string
    email: string
  }
}

export function getPayload(token: string): Result {
  const tokenDecoded = decode(token, { complete: true })

  if (!tokenDecoded) {
    return null
  }

  const payload = tokenDecoded.payload as CustomPayload

  return {
    payload,
    user: {
      id: payload?.id,
      name: payload?.name,
      email: payload?.email,
    },
  }
}
