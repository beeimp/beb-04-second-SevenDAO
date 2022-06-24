export const sampleUtil = async () => {
  try {
    const sampleRequest = await fetch('/sample');
    return sampleRequest.body;
  } catch (err) {
    console.error(err);
  }
};
