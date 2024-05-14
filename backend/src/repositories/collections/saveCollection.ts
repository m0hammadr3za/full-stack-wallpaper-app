import { Collection } from '@src/models/collectionModel';
import getCollectionsCollection from './getCollectionsCollection';

const saveCollection = async (collection: Collection) => {
  const collectionsCollection = await getCollectionsCollection();
  const result = await collectionsCollection.insertOne(collection);

  const savedCollection = { _id: result.insertedId, ...collection };
  return savedCollection;
};

export default saveCollection;