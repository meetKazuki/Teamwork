const extractParams = (fields) => {
  const keys = Object.keys(fields);
  let params = '';

  for (let index = 0; index < keys.length; index += 1) {
    const currentIndex = keys[index];
    const keyIndex = index + 1;
    params += `${currentIndex}=$${keyIndex}`;
    if (keyIndex !== keys.length) params += ' AND ';
  }
  return params;
};

export { extractParams };
