const config = {
  server: { port: 3001, secret: 'shoppingSuperSecret' },
  database: { storage: './shopping.sqlite', dialect: 'sqlite' },
  frontendUrls: {
    emailConfirmation: 'http://localhost:3001/confirmEmail',
    passwordReset: 'http://localhost:3001/resetPassword'
  }
};
export default config;