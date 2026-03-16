const iconMap = {
    bug: "<i class='fa-solid fa-bug'></i>",
    "help wanted": "<i class='fa-solid fa-life-ring'></i>",
    enhancement: `<i class="fa-solid fa-wand-magic-sparkles"></i>`,
    documentation: `<i class="fa-solid fa-briefcase"></i>`,
    "good first issue": `<i class="fa-solid fa-thumbs-up"></i>`
};

const bgColors = {
    bug: "btn btn-soft btn-error",
    "help wanted": "btn btn-soft btn-warning",
    enhancement: "btn btn-soft btn-success",
    documentation: "btn btn-soft btn-info",
    "good first issue": "btn btn-soft btn-accent"
}

const createElements = (arr) => {
    const htmlElements = arr.map((el) => {
        const icon = iconMap[el.toLowerCase()];
        const bgColor = bgColors[el.toLowerCase()];
        return `
        <span id="labels" class="${bgColor} text-[11px] font-semibold rounded-full px-3 py-1 flex items-center gap-1 uppercase"><span>${icon}</span>${el}</span>
        `;
    });
    return htmlElements.join(' ');
};

// ---------Fetch All Issue card---------
let allIssues = [];
const loadCard = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
    allIssues = data.data;
    displayCard(allIssues);
};

// ---------Issue Card Details---------
const loadIssueDetail = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((details) => {
            console.log(details.data);

            displayIssueDetails(details.data);
        });
};

// ---------Active Buttons---------
const buttons = document.querySelectorAll('.filter-btn');
const items = document.querySelector('.issues');
buttons.forEach((button) => {
    button.addEventListener('click', function () {
        buttons.forEach((btn) => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// {
//     "id": 2,
//     "title": "Add dark mode support",
//     "description": "Users are requesting a dark mode option. This would improve accessibility and user experience.",
//     "status": "open",
//     "labels": [
//         "enhancement",
//         "good first issue"
//     ],
//     "priority": "medium",
//     "author": "sarah_dev",
//     "assignee": "",
//     "createdAt": "2024-01-14T14:20:00Z",
//     "updatedAt": "2024-01-16T09:15:00Z"
// }
// ---------Display Modal---------
const displayIssueDetails = (detail) => {
    const detailsContainer = document.getElementById('details-container');

    detailsContainer.innerHTML = `
        <div class="rounded-md p-4">
            <div class="text-2xl font-bold">${detail.title}</div>

            <div class="px-5">
                <div>${detail.status}</div>
                <div></div>
                <div>Opened by ${detail.author}</div>
                <div></div>
                <div>${detail.createdAt.split("T")[0].split("-").reverse().join("-")}</div>
            </div>

            <div class="flex gap-3">
                ${createElements(detail.labels)}
            </div>

            <p class="text-xs text-[#64748B]">${detail.description}</p>
                
            <div class="">
                <div>
                    <p>Assignee:</p>
                    <p>${detail.author}</p>
                </div>
                <div>
                    <p>Priority:</p>
                    <p>${detail.priority}</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('word_modal').showModal();

};


// ---------Display All Issue card---------
const displayCard = (infos) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    const issueCount = document.getElementById("issue-count");

    // issue card number
    issueCount.innerText = infos.length;

    infos.forEach((info) => {
        const cardDiv = document.createElement('div');

        // Priority Color Set
        const priorityColors = {
            high: "btn btn-soft btn-error",
            medium: "btn btn-soft btn-warning",
            low: "btn btn-soft"
        };
        const priority = info.priority;
        const colorClass = priorityColors[priority.toLowerCase()];

        // Border color
        const borderColor = info.status === "open" ? "border-green-600" : "border-purple-600";

        cardDiv.innerHTML = `
        <div onclick="loadIssueDetail(${info.id})" id="issue-card" class="shadow-md rounded-md border-t-5 h-[27rem] ${borderColor} hover:cursor-pointer active:-translate-y-1 transition">
                <div class="border-b border-gray-300 py-8 space-y-4">
                    <div class="flex justify-between items-center px-5">
                        <div><img src="./assets/Open-Status.png" alt=""></div>
                        <div class="${colorClass} px-3 rounded-full uppercase">${info.priority}</div>
                    </div>
                    <div class="px-5">
                        <h2 class="text-xl font-bold my-2">${info.title}</h2>
                        <p class="text-xs text-[#64748B]">${info.description}</p>
                    </div>
                    <div class="flex gap-2 px-5">
                        ${createElements(info.labels)}
                    </div>
                </div>
                <div class="p-4 space-y-4">
                    <p class="text-[#64748B] uppercase">Author: ${info.author}</p>
                    <p class="text-[#64748B]">Created: ${info.createdAt.split("T")[0].split("-").reverse().join("-")}</p>
                    <p class="text-[#64748B]">Updated: ${info.updatedAt.split("T")[0].split("-").reverse().join("-")}</p>
                </div>
            </div>
        `;

        cardContainer.append(cardDiv);
    });
};

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

allBtn.addEventListener("click", () => {
    displayCard(allIssues);
});

openBtn.addEventListener("click", () => {
    const openIssues = allIssues.filter(issue => issue.status === "open")
    displayCard(openIssues);
});

closedBtn.addEventListener("click", () => {
    const closedIssues = allIssues.filter(issue => issue.status === "closed")
    displayCard(closedIssues);
});



loadCard();