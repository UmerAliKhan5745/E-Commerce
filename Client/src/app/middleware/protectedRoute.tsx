export const isAuthenticated = async () => {
  // Check if the user is authenticated
  // This could involve checking if a token is present in localStorage or making a request to the backend
  // For demonstration purposes, let's assume the user is authenticated if there is a token in localStorage
  const token = localStorage.getItem('Authorization');
  try {
    if (!token) {
      // Token is not present, handle unauthenticated state
      console.log('User is not authenticated');
      return false;
    }

    const response = await fetch("http://localhost:5000/api/auth/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({}),
    });

    // Check if the response status is 200 OK
    if (response.ok) {
      return true;
    } else {
      console.log("Authentication failed. Status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return false;
  }
};
