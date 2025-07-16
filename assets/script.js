// Include the head
fetch("includes/head.html")
	.then((res) => res.text())
	.then((data) => {
		document.head.innerHTML += data;
	})
	.catch((err) => console.error("Error loading head:", err));

// Include the navbar
fetch("includes/navbar.html")
	.then((res) => res.text())
	.then((data) => {
		document.getElementById("navbar-container").innerHTML = data;

		// Highlight the active link
		const currentPage = location.pathname.split("/").pop();
		const cleanedPage = currentPage.replace("-qa", "");

		const navLinks = document.querySelectorAll(".nav-link");
		navLinks.forEach((link) => {
			if (link.getAttribute("href") === cleanedPage) {
				link.classList.add("active");
			}
		});
	})
	.catch((err) => console.error("Error loading navbar:", err));

// Search
const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", function () {
	const query = this.value.toLowerCase();

	document
		.querySelectorAll("#Accordion .accordion-item")
		.forEach((item) => {
			const button = item.querySelector("button.accordion-button");
			const heading = item.querySelector("h6");

			const buttonText = button?.textContent.toLowerCase() || "";
			const headingText = heading?.textContent.toLowerCase() || "";

			const matches = buttonText.includes(query) || headingText.includes(query);
			item.style.display = matches ? "" : "none";
		});
});
