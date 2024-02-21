module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "divensek@wp.pl",
        defaultReplyTo: "divensek@wp.pl",
      },
    },
  },
});
