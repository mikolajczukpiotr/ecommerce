import { v4 as uuid } from "uuid";

export async function sendOrderToBackend(
  data: any,
  items: any,
  totalCost: any,
  token: any
) {
  return await fetch(`http://localhost:1337/api/orders`, {
    method: "POST",
    headers: {
      Authorization: process.env.AUTHORIZATION_HEADER
        ? process.env.AUTHORIZATION_HEADER
        : "",
    },
    body: JSON.stringify({
      email: data.email,
      orderId: uuid(),
      paymentInfo: null,
      products: items,
      address: data.address,
      name: data.firstName,
      transactionId: uuid(),
      amount: totalCost,
      token: token?.token?.id,
    }),
  });
}
