export const checkVersionRequest = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return '1.5.0';
};

export const usbService = {
  checkVersionRequest,
};

export default usbService;
