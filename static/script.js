const state = {
    timeframe: "daily",
    previous: {
        daily: "Yesterday",
        weekly: "Last Week",
        monthly: "Last Month",
    },
};

async function fetchData() {
    const res = await fetch("static/data.json");
    const data = await res.json();
    document
        .getElementById("task-container")
        .replaceChildren(...data.map((e) => taskElement(e)));
}

function taskElement(category) {
    const title = category.title.toLowerCase().replace(" ", "-");
    const counter = category.timeframes[state.timeframe];
    this.element = document.createElement("div");
    this.element.innerHTML = /*html*/ `
    <div class="task-card">
        <div class="card-bg ${title}-bg">
            <img src="images/icon-${title}.svg" alt="${category.title} icon"/>
        </div>
        <div class="card-info">
            <div class="card-header">
                <span class="header-title">${category.title}</span>
                <a href="#" class="header-menu"><img src="images/icon-ellipsis.svg"/></a>
            </div>
            <p class="tc-time">${counter.current}hrs</p>
            <p class="tc-previous">${state.previous[state.timeframe]} - ${
        counter.previous
    }hrs</p>

        </div>
    </div>
    `;
    return this.element;
}

const menuItems = document.querySelectorAll(".menu-option");
menuItems.forEach((btn) => {
    btn.addEventListener("click", () => {
        menuItems.forEach((btn) => btn.classList.remove("selected"));
        state.timeframe = btn.getAttribute("timeframe");
        btn.classList.add("selected");

        fetchData();
    });
});

fetchData();
