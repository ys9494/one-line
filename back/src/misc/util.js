function sanitizeObject(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined) {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}

function buildResponse(data, errorMessage) {
  return {
    error: errorMessage ?? null,
    data,
  };
}

module.exports = {
  sanitizeObject,
  buildResponse,
};
