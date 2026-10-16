let allTasks = [];

fetch("data.json")
.then(response => response.json())
.then(data => {

    allTasks = data.tasks || [];

    updateStats(allTasks);

    renderTasks(allTasks);
});

function updateStats(tasks){

    document.getElementById("totalTasks")
    .textContent = tasks.length;

    document.getElementById("activeTasks")
    .textContent =
    tasks.filter(
        t => t.status === "active"
    ).length;

    document.getElementById("completedTasks")
    .textContent =
    tasks.filter(
        t => t.status === "completed"
    ).length;
}

function renderTasks(tasks){

    const container =
    document.getElementById("tasks");

    container.innerHTML = "";

    tasks.forEach(task => {

        const preview =
        task.description
        .substring(0,150) + "...";

        const notes =
        (task.notes || [])
        .map(note =>
            `<li>${note}</li>`
        )
        .join("");

        const steps =
        (task.steps || [])
        .map(step => `
            <li>
                ${step.completed ? "✅" : "⬜"}
                ${step.title}
            </li>
        `)
        .join("");

        container.innerHTML += `

        <div class="task-card">

            <div class="task-header">

                <h3>
                    ${task.heading}
                </h3>

                <span
                class="badge ${task.status}">
                    ${task.status}
                </span>

            </div>

            <div class="task-meta">

                ${task.task_id}
                <br>
                ${task.registry}

            </div>

            <p class="task-preview">

                ${preview}

            </p>

            <button
            class="expand-btn">

                View Details

            </button>

            <div class="task-details">

                <h4>
                    Overview
                </h4>

                <p>
                    ${task.description}
                </p>

                <h4>
                    Notes
                </h4>

                <ul>
                    ${notes}
                </ul>

                <h4>
                    Timeline Steps
                </h4>

                <ul>
                    ${steps}
                </ul>

                <h4>
                    Progress
                </h4>

                <p>

                    Completed:
                    ${task.progress.completed}

                    <br>

                    Remaining:
                    ${task.progress.remaining}

                    <br>

                    Progress:
                    ${task.progress.percentage}%

                </p>

            </div>

        </div>
        `;
    });

    attachExpandEvents();
}

function attachExpandEvents(){

    document
    .querySelectorAll(".expand-btn")
    .forEach(button => {

        button.onclick = () => {

            const details =
            button.nextElementSibling;

            details.classList.toggle(
                "show"
            );

            button.textContent =
            details.classList.contains(
                "show"
            )
            ? "Hide Details"
            : "View Details";
        };
    });
}

document
.getElementById("search")
.addEventListener(
"keyup",
function(){

    const keyword =
    this.value.toLowerCase();

    const filtered =
    allTasks.filter(task =>

        task.heading
        .toLowerCase()
        .includes(keyword)

        ||

        task.description
        .toLowerCase()
        .includes(keyword)

        ||

        task.registry
        .toLowerCase()
        .includes(keyword)

        ||

        task.task_id
        .toLowerCase()
        .includes(keyword)
    );

    renderTasks(filtered);
});
