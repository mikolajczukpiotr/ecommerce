"use strict";
const Stripe = require("stripe");
// @ts-ignore
const stripe = new Stripe(
  "sk_test_51OUwGBLmHZc9lLCcJjdlem9HTFNhqaTBXp0xn02r4TcVpxaXyOHGoJ5LjR6rxHyyoW6lHdFW6xyYV8zcmMykopFm00NtC03eTg",
  { apiVersion: "2020-08-27" }
);

/**
 *  order controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    let params = JSON.parse(ctx.request.body);
    try {
      // Charge the customer
      await stripe.charges.create({
        amount: params.amount,
        currency: "PLN",
        description: `Order ${new Date()} by ${params.email}`,
        source: params.token,
      });

      // Create the order
      const entity = await strapi.service("api::order.order").create({
        data: {
          email: params.email,
          orderId: params.orderId,
          paymentInfo: "nulfdl",
          products: params.products,
          address: params.address,
          name: params.name,
          transactionId: params.transactionId,
          amount: params.amount,
          source: "stripe",
          customer: params.customer,
          status: "received",
        },
      });
      // Update the available sizes
      await Promise.all(
        params.products.map(async (product) => {
          const productEntity = await strapi.entityService.findOne(
            "api::product.product",
            product.product.id,
            {
              populate: ["availableSizes"],
            }
          );
          if (productEntity) {
            await strapi
              .service("api::product.product")
              .update(productEntity.id, {
                data: {
                  availableSizes: {
                    ...productEntity.availableSizes,
                    [product.product.attributes.size]:
                      productEntity.availableSizes[
                        product.product.attributes.size
                      ] - product.quantity,
                  },
                },
              });
          }
        })
      );
      const emailTemplate = {
        subject: "Welcome <%= user.name %>",
        text: `Welcome to mywebsite.fr!
          Your account is now linked with: <%= user.email %>.`,
        html: `<h1>Welcome to mywebsite.fr!</h1>
          <p>Your account is now linked with: <%= user.email %>.<p>`,
      };

      await strapi.plugins["email"].services.email.sendTemplatedEmail(
        {
          to: params.email,
        },
        emailTemplate,
        {
          user: params,
        }
      );

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    } catch (err) {
      // return 500 error
      ctx.response.status = 500;
      return { error: err.message };
    }
  },
}));
