fetch(FILE_PATH)
	.then((res) => res.json())
	.then((data) => {
		const accordion = document.getElementById("Accordion");

		data.forEach((topic, index) => {
			const topicId = `collapse${index}`;

			let sectionsHtml = topic.sections
				.map((section) => {
					let heading = section.heading ? `<h6 class="text-uppercase">${section.heading}</h6>` : "";
					let para = section.paragraph
						? `<p>${section.paragraph.replace(
								/`(.*?)`/g,
								"<code>$1</code>"
						  )}</p>`
						: "";

					let list = "";
					if (section.list) {
						list = section.list
							.map((item) => {
								const formatted = item.replace(/`(.*?)`/g, "<code>$1</code>");
								return `<li>${formatted}</li>`;
							})
							.join("");
						list = `<ul>${list}</ul>`;
					}

					let codes = "";
					if (section.codes) {
						codes = section.codes
							.map((item) => `<pre><code>${item}</code></pre>`)
							.join("");
					}

					let table = "";
					if (section.table) {
						const headers = section.table.headers
							.map((h) => `<th>${h}</th>`)
							.join("");

						const rows = section.table.rows
							.map(
								(row) =>
									`<tr>${row
										.map((cell) => {
											const td = cell.replace(/`(.*?)`/g, "<code>$1</code>");
											return `<td>${td}</td>`;
										})
										.join("")}
                                    </tr>`
							)
							.join("");

						table = `<table class="table table-bordered">
                                <thead><tr>${headers}</tr></thead>
                                <tbody>${rows}</tbody>
                            </table>`;
					}

					return `${heading}${para}${list}${codes}${table}`;
				})
				.join("");

			accordion.insertAdjacentHTML(
				"beforeend",
				`<div class="accordion-item">
                    <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button collapsed text-uppercase fw-bold" type="button" data-bs-toggle="collapse"
                        data-bs-target="#${topicId}">
                        <i>0${index + 1}</i>&nbsp;- ${topic.title}
                        </button>
                    </h2>
                    <div id="${topicId}" class="accordion-collapse collapse" data-bs-parent="#Accordion">
                        <div class="accordion-body">
                        ${sectionsHtml}
                        </div>
                    </div>
                </div>`
			);
		});
	})
	.catch((err) => console.error("Failed to load Data:", err));
