// Load App Bridge script dynamically to comply with CSP
const script = document.createElement('script');
script.src = 'https://cdn.shopify.com/shopifycloud/checkout-web/assets/app-bridge-checkout.js';
script.async = true;
document.head.appendChild(script);