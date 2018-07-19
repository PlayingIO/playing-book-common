const Entity = require('mostly-entity');
const fp = require('mostly-func');
const { BlobEntity, DocTypes } = require('playing-content-common');

const ChapterEntity = new Entity('Chapter', {
  file: { using: BlobEntity },
  files: { using: BlobEntity },
});

ChapterEntity.expose('metadata', (obj, options) => {
  obj.metadata = obj.metadata || {};

  const Types = options.DocTypes || DocTypes;

  if (Types[obj.type]) {
    obj.metadata.facets = Types[obj.type].facets;
    obj.metadata.packages = Types[obj.type].packages;
  }

  return fp.sortKeys(obj.metadata);
});

ChapterEntity.discard('_id');

module.exports = ChapterEntity.freeze();
