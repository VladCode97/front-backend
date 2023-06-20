export const decodeBase64 = (data: string) => {
    const [, payload,] = data.split('.')
    return JSON.parse(atob(payload))
}