export const environment = {
    production: false,
  staging: false,
  development: true,
  googleClientId: '9743223130-32o74lt8ogae7irrprc6oheqv4jhhd2n.apps.googleusercontent.com',
  baseUrl: "https://localhost:7084/api",
  // imageUrl: "https://localhost:7290",
  //baseUrl: "https://uatapi.balanicustom.net/api/v1/",
  imageUrl: "https://uatapi.balanicustom.net",
  oauthConfig: {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin + '/redirect',
    clientId: '9743223130-32o74lt8ogae7irrprc6oheqv4jhhd2n.apps.googleusercontent.com',
    scope: 'openid profile email',
    oidc: false
  }
};
