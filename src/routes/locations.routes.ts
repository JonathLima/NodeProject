import { response, Router } from 'express'
import knex from '../database/connection'

const locationsRouter: Router = Router()

locationsRouter.post('/', async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items

  } = req.body;

  const location: object = {
    image: "fake-image.jpg",
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  };

  const transaction = await knex.transaction()
  
  const newIds = await transaction('locations').insert(location);

  const location_id = newIds[0];

  const locationItems = items.map(async (item_id: number) => {

    const selectedItem = await transaction('items').where('id', item_id).first();

    if (!selectedItem) {
        return res.status(400).json({message: "Item not found!"})
      }
    return {
      item_id,
      location_id
    }
  })

  await transaction('locations_items').insert(locationItems)

  await transaction.commit();

  return res.json({
    id: location_id,
    ...location
  });
})

locationsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  
  const location = await knex('locations').where('id', id).first()

  if (!location) {
    return response.status(400).json({message: "Location not found!"})
  }

  const items = await knex('items')
    .join('locations_items', 'items.id', '=', 'locations_items.item_id')
    .where('locations_items.location_id', id)
    .select('items.title')

  return res.json({location, items})
})

export default locationsRouter;