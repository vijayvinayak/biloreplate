async function initServices(services = []) {
  return Promise.all(
    services.map(async (service) => {
      await service.init();
      return service;
    })
  );
}

module.exports = initServices;
