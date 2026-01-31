const stripe_sky = 'pk_test_51Nk8Y4F0B89ncn3xWB6ZN3GsbVIVL7Jqfa3jxtIOpPkKHcleHZw4EMPJKd4cRwm34ZARBeYmAWwu3VxyYL1gb6OT00UKNSvfvb'
const mode = process.env.REACT_APP_MODE;

let app_url, api_url;

if (mode === 'production') {
  app_url = 'https://e-commerce-store-client-frontend-hgjpax9ks-adhit-voras-projects.vercel.app';
  api_url = 'https://e-commerce-store-backend-2rgq.onrender.com';
} else {
  app_url = 'http://localhost:3000';
  api_url = 'http://localhost:5000';
}

export {
    app_url,
    api_url,
    stripe_sky
}