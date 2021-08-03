export const schemaOptions = {
  toObject: {
    transform: function (doc, ret, game) {
      delete ret.__v;
    }
  }
};