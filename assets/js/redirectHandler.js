/**
 * Redirects to a specified location after a timeout.
 *
 * @param {string|number} [location='/'] - The location to redirect to. Defaults to '/'.
 * If a number is provided, it will be used as the timeout value instead.
 * @param {number} [timeout=1000] - The timeout value in milliseconds. Defaults to 1000.
 * @returns {Promise<void>} A promise that resolves after the redirect.
 *
 */
const redirectHandler = async (location = '/', timeout = 1000) => {
  if (typeof location === 'number') [location, timeout] = ['/', location];
  console.warn(`Redirecting to ${location} in ${timeout / 1000} seconds...`);
  return new Promise((resolve) => setTimeout(resolve, timeout))
    .then(() => (window.location.href = location))
    .catch((e) => console.error('Redirect Failed: ' + e));
};
