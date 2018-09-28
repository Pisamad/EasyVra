import { Vra } from 'app/vra'

/**
 * VraSubtenants class
 * @param {string} tenantName
 *
 * - list [subtenant-id] = VraSubtenant instance
 */
export async function VraSubtenants (tenantName) {
  let obj = new _VraSubtenants(tenantName)
  await obj.update()
  return obj
}

class _VraSubtenants {
  constructor (tenantName) {
    this.list = {}
    this.tenant = tenantName
  }

  async update () {
    let res = await Vra.get(this.tenant, `identity/api/tenants/${this.tenant}/subtenants`)
    res.content.map(subtenant => {
      console.log(subtenant)
      this.list[subtenant.id] = new VraSubtenant(subtenant)
    })
    console.log(this.list)
    console.log(res)
  }
}

/**
 * Subtenant object :
 * - obj : initial object from VRA api
 * - id
 * - name
 * - description
 * - tenant
 * - properties[]
 *    - key, value, [encrypted], [prompt-user]
 * - machine-prefix
 * - ad-container
 */
export class VraSubtenant {
  constructor (subtenant) {
    // this.obj = subtenant
    Object.assign(this, {
      id: subtenant.id,
      name: subtenant.name,
      description: subtenant.description,
      tenant: subtenant.tenant
    })
    this.properties = []
    subtenant.extensionData.entries.forEach(entry => {
      let res = {key: entry.key}
      if (entry.value.type === 'complex') {
        entry.value.values.entries.map(v => {
          res[v.key] = v.value.value
        })
      } else {
        res.value = entry.value.value
      }
      if (res.key.startsWith('iaas-')) {
        this[res.key.slice(5)] = res.value
      } else {
        this.properties.push(res)
      }
    })
  }
}
