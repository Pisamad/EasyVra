import axios from 'axios'
// import { VraSubtenants } from 'app/vraSubtenants'

export const Vra = {
  tenants: {},

  async init (tenant, username, password) {
    try {
      let res = await axios.post('https://' + store.state.Config.vraUrl + '/identity/api/tokens',
        { username, password, tenant }
      )
      this.tenants[tenant] = res.data
      console.log(res)
      /*
      // Store subtenants info also
      res = await Vra.get(tenant, `identity/api/tenants/${tenant}/subtenants`)
      this.tenants[tenant].subtenants = (await VraSubtenants(tenant)).list
      */
    } catch (err) {
      console.error(err)
    }
  },

  async get (tenant, target) {
    try {
      if (this.tenants[tenant] === undefined) {
        await store.dispatch('configCheck')
      }

      let res = await axios.get('https://' + store.state.Config.vraUrl + '/' + target, {
        headers: { Authorization: 'Bearer ' + this.tenants[tenant].id }
      })
      console.log(res)
      return res.data
    } catch (err) {
      throw err
    }
  }
}
