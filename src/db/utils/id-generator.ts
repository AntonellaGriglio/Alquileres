import { customAlphabet } from "nanoid"

const alphabetSymbols =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const alphabetLenght = 15
// ~448 thousand years or 3T IDs needed, in order to have a 1% probability of at least one collision.
// Check on https://zelark.github.io/nano-id-cc/
const nanoid = customAlphabet(alphabetSymbols, alphabetLenght)

export const getIdGenerator = (prefix: string) => () => {
  const id = nanoid()
  return `${prefix}_${id}`
}
