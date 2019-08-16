import Axios from 'Axios'

const Api = {
  get: async (endpoint) => {
    try {
      const resp = await Axios.get(`/data/${endpoint}`)
      if (resp.status === 200) {
        return resp.data
      }
      return { isError: true }
    } catch (e) {
      return { isError: true }
    }
  }
}

export default Api
