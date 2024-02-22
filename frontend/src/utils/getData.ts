import { v4 as uuid } from "uuid";

export async function sendOrderToBackend(
  data: any,
  items: any,
  totalCost: any,
  token: any
) {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
    method: "POST",
    headers: {
      Authorization: process.env.NEXT_PUBLIC_AUTHORIZATION_HEADER
        ? process.env.NEXT_PUBLIC_AUTHORIZATION_HEADER
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
