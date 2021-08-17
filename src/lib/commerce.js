import Commerce from '@chec/commerce.js'
// import { API_KEY } from '../global'

export const commerce = new Commerce(process.env.REACT_APP_COMMERCE, true)