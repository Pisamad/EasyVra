import { Vra } from 'app/vra'

/**
 * VraCatalogItems class
 * @param {string} tenantName
 *
 * - list [catalogItem-id] = VraCatalogItem instance
 */
export async function VraCatalogItems (tenantName) {
  let obj = new _VraCatalogItems(tenantName)
  await obj.update()
  return obj
}

class _VraCatalogItems {
  constructor (tenantName) {
    this.list = {}
    this.tenant = tenantName
  }

  async update () {
    try {
      let res = await Vra.get(this.tenant, `catalog-service/api/consumer/entitledCatalogItems`)
      res.content.map(catalogItem => {
        let cItem = {
          item: new VraCatalogItem(catalogItem.catalogItem),
          entitled: catalogItem.entitledOrganizations.map(org => new VraEntitledItem(org))
        }
        if (cItem.entitled.length > 0) {
          cItem.tenantRef = cItem.entitled[0].tenantRef
          cItem.tenantLabel = cItem.entitled[0].tenantLabel
          this.list[catalogItem.catalogItem.id] = cItem
        }
      })
    } catch (err) {
      // Nothing
    }
  }
}

/**
 * CatalogItem object :
 * - obj : initial object from VRA api
 * - id
 * - name
 * - description
 */
export class VraCatalogItem {
  constructor (catalogItem) {
    // this.obj = catalogItem
    Object.assign(this, {
      id: catalogItem.id,
      name: catalogItem.name,
      description: catalogItem.description,
      tenant: catalogItem.tenant
    })
  }
}

/**
 * CatalogItem object :
 * - obj : initial object from VRA api
 * - id
 * - name
 * - description
 */
export class VraEntitledItem {
  constructor (org) {
    // this.obj = catalogItem
    Object.assign(this, org)
  }
}
