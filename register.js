async function registerUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("../../users.json");
    const users = await response.json();
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert("This email is already registered. Please use a different email.");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);

    alert("Account created successfully!");
  } catch (error) {
    console.error("Error registering user:", error);
    alert("An error occurred while registering. Please try again later.");
  }
}
