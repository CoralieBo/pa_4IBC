export const cropAddress = (address?: string) => {
    if (address)
        return `${address.slice(0, 5)}...${address.slice(address.length - 5)}`
}