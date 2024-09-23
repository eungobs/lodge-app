const paypal = require('@paypal/checkout-server-sdk');

let clientId = 'ASNwgov526rNaLUTBU4urBdL17hcFL0FVgKgXdbSvidNwwN3_eCdNAbzwmSK5JIAL11UM5D-0YJj6EfD';
let clientSecret = 'ENUZPOyP_fvGUOxCNW333OGioKUdHvAxsEHeIbKUm8kTY4adkD-9cU4AD1eD5ZUhekz0z5FLjsduluG7';

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

function environment() {
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

module.exports = { client };
