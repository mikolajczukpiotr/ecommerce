export const validateForm = (data: any, token: any) => {
  if (data.address === "") {
    return { message: "Address is required" };
  }
  if (data.city === "") {
    return { message: "City is required" };
  }
  if (data.state === "") {
    return { message: "State is required" };
  }
  if (token?.error) {
    return { message: token.error.message };
  }
  return null;
};
