const getPosition = options => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Unable to get location.');
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export { getPosition };
