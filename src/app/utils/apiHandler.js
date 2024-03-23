export default async function handler(url, method, body) {
  try {
    const baseUrl = "http://localhost:3002";

    // Conditionally include the body only when it's provided and the method is not 'GET' or 'DELETE
    const requestOptions = {
      method: `${method}`,
      headers: {},
      body:
        method !== ("GET" || "DELETE") && body
          ? JSON.stringify(body)
          : undefined,
    };

    const response = await fetch(`${baseUrl}${url}`, requestOptions);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw for further handling
  }
}
