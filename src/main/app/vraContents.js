import { Vra } from 'app/vra'
import yaml from 'js-yaml'

/**
 * VraContents class
 * @param {string} tenantName
 *
 * - list [content-id] = VraContent instance
 */
export async function VraContents (tenantName) {
  let obj = new _VraContents(tenantName)
  await obj.update()
  return obj
}

class _VraContents {
  constructor (tenantName) {
    this.list = {}
    this.tenant = tenantName
  }

  async update () {
    let res = await Vra.get(this.tenant, `content-management-service/api/contents`)
    res.content.map(async content => {
      this.list[content.id] = content // new VraContent(content)
      this.list[content.id].data = yaml.safeLoad(await this.data(content.id)) // new VraContent(content)
    })
  }

  async data (contentId) {
    let res = await Vra.get(this.tenant, `content-management-service/api/contents/${contentId}/data`)
    return res
  }
}
