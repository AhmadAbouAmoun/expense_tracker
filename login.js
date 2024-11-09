document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let userName = document.getElementById("name_field").value;
    let budget = document.getElementById("budget").value;
    fetch("php_folder/createUser.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${userName}&budget=${budget}`,
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        if (data.status === "success") {
            localStorage.setItem("id", data.id);
            window.location.href = "money.html";
        } else {
            alert("Failed to add user: " + (data.message || "Unknown error"));
        }
    });
});
