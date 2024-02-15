async function validateForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("./users.json");
    const users = await response.json();

    console.log(users);

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      window.location.href = "./home.html";
      return true;
    } else {
      alert("Invalid email or password. Please try again.");
      return false;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("An error occurred. Please try again later.");
    return false;
  }
}
