document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let userName = document.getElementById("name_field").value;
    let budget = document.getElementById("budget").value;
    fetch("php_folder/createUser.php", {
        method: "POST",
        headers: {},
        body: `username=${userName}&budget=${budget}`,
    })
    .then((response) => {
        response.json();
    })
    .then((data) => {
        if (data.status === "success") {
            alert("User added successfully!");
            window.location.href = "money.html";
        } else {
            alert(`Failed to add user: ${data.message}`);
        }
    })
    .catch((error) => console.error("Error:", error));
    window.location.href = "money.html";
});
