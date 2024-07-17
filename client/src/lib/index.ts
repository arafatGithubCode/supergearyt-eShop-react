export const getData = async (endPoint: string) => {
  try {
    const response = await fetch(endPoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Data fetching error" + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error while fetching data", error);
    throw error;
  }
};
