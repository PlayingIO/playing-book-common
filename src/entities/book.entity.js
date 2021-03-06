const Entity = require('mostly-entity');
const fp = require('mostly-func');
const { BlobEntity, DocTypes } = require('playing-content-common');

const BookEntity = new Entity('Book', {
  file: { using: BlobEntity },
  files: { using: BlobEntity },
});

BookEntity.expose('metadata', (obj, options) => {
  obj.metadata = obj.metadata || {};

  const Types = options.DocTypes || DocTypes;

  if (Types[obj.type]) {
    obj.metadata.facets = Types[obj.type].facets;
    obj.metadata.packages = Types[obj.type].packages;
  }

  return fp.sortKeys(obj.metadata);
});

BookEntity.discard('_id');

module.exports = BookEntity.freeze();
