let allTasks = [];

async function loadTasks(){

    try{

        const response =
        await fetch("data.json");

        const data =
        await response.json();

        allTasks =
        data.tasks || [];

        updateStats();

        renderTasks(
            allTasks
        );
    }

    catch(error){

        console.error(
            error
        );

        document
        .getElementById(
            "tasks"
        )
        .innerHTML =

        `
        <div class="task">
        Failed To Load Data
        </div>
        `;
    }
}

function updateStats(){

    const total =
    allTasks.length;

    const active =

    allTasks.filter(
        t =>
        t.status ===
        "active"
    ).length;

    const completed =

    allTasks.filter(
        t =>
        t.status ===
        "completed"
    ).length;

    document
    .getElementById(
        "totalTasks"
    )
    .innerText =
    total;

    document
    .getElementById(
        "activeTasks"
    )
    .innerText =
    active;

    document
    .getElementById(
        "completedTasks"
    )
    .innerText =
    completed;
}

function renderSteps(steps){

    if(!steps){

        return "";
    }

    let groups = {};

    steps.forEach(step => {

        let date =
        "Pending";

        let time =
        "--:--";

        if(
            step.completed &&
            step.completed_dhaka
        ){

            date =
            step.completed_dhaka
            .substring(
                0,
                10
            );

            time =
            step.completed_dhaka
            .substring(
                11,
                16
            );
        }

        if(
            !groups[date]
        ){

            groups[date] = [];
        }

        groups[date]
        .push({

            time:
            time,

            title:
            step.title,

            completed:
            step.completed
        });
    });

    let html = '';

    Object.keys(groups)

    .forEach(date => {

        html +=

        `
        <div class="step-date">
        ${date}
        </div>
        `;

        groups[date]
        .forEach(item => {

            html +=

            `
            <div class="step-row">

                <span class="step-time">
                ${item.time}
                </span>

                <span class="
                ${
                item.completed
                ?
                'step-done'
                :
                'step-pending'
                }
                ">

                ${
                item.completed
                ?
                '✓'
                :
                '○'
                }

                ${item.title}

                </span>

            </div>
            `;
        });
    });

    return html;
}

function renderTasks(tasks){

    const container =
    document
    .getElementById(
        "tasks"
    );

    let html = '';

    tasks.forEach(task => {

        html +=

        `
        <div class="task">

        <div class="task-header">

        <div class="datetime">

        ${task.created_dhaka}
        : Dhaka

        <br>

        ${task.created_utc}
        : UTC

        </div>

        <div class="identity">

        Task ID :
        ${task.task_id}

        <br>

        Registry :
        ${task.registry}

        </div>

        </div>

        <span class="
        badge
        ${task.status}
        ">
        ${task.status}
        </span>

        <div class="title">
        ${task.heading}
        </div>

        <div class="description">
        ${task.description}
        </div>

        <div class="progress">

        <div
        class="progress-fill"
        style="
        width:
        ${task.progress.percentage}%;
        ">
        </div>

        </div>

        <div class="progress-info">

        Completed:
        ${task.progress.completed}

        |

        Remaining:
        ${task.progress.remaining}

        |

        ${task.progress.percentage}%

        </div>

        <div class="section">

        <div class="section-title">

        Steps

        </div>

        ${renderSteps(task.steps)}

        </div>

        </div>
        `;
    });

    container.innerHTML =
    html;
}

document
.getElementById(
    "search"
)
.addEventListener(
    "input",
    function(){

        const q =

        this.value
        .toLowerCase();

        const result =

        allTasks.filter(

            task =>

            JSON.stringify(task)
            .toLowerCase()

            .includes(q)
        );

        renderTasks(
            result
        );
    }
);

loadTasks();
