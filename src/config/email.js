module.exports = {
  provider: {
    // your provider name directly or from ENV var
    service: 'SendGrid',
    // auth data always from ENV vars
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD,
    },
  },
  // defaults to be passed to nodemailer's emails
  defaults: {
    from: 'Cambalache <contact@cambalache.com>',
  },
};
