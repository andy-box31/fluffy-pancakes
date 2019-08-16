import Axios from 'Axios'

const Api = {
  get: async (endpoint) => {
    let location = `/data/${endpoint}`
    try {
      const resp = await Axios.get(location)
      if (resp.status === 200) {
        return resp.data
      }
      throw new Error(`Unexpected response code ${resp.status} from ${location}`, resp)
    } catch (e) {
      throw(e)
    }
  }
}

export default Api
