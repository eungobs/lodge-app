const paypal = require('@paypal/checkout-server-sdk');

let clientId = 'AepxcLkjvQxrO_yFCMMYjGvlyhvUPUCpwwEqKUQrQ9kRxRZDCE04sICzVnpXNEgdsD3IPqN34wS8agjC';
let clientSecret = 'EOVzlnGNATyKU_oX9tKsWpjSYskaxX72iZhYrAEdd7AflukZAG2W948bbGme3WxF_8lh9JOPcHL8vqLF';

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

function environment() {
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

module.exports = { client };

