
const createElements = (arr) => {
    const colors = ["bg-red-200", "bg-green-200", "bg-blue-200"];
    const htmlElements = arr.map((el) => `<span class="btn btn-soft text-[12px] uppercase bg-gray-100 rounded-full px-3 py-1">${el}</span>`);
    return htmlElements.join(' ');
};
let allIssues = [];
// Fetch All Issue card
const loadCard = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
    allIssues = data.data;
    displayCard(allIssues);
};

// ---------Active Buttons--------
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
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }
// Display All Issue card
const displayCard = (infos) => {
    const cardContainer = document.getElementById('card-container');
    const issueCount = document.getElementById("issue-count");
    cardContainer.innerHTML = "";

    // issue card number
    issueCount.innerText = infos.length;

    infos.forEach((info) => {
        const cardDiv = document.createElement('div');

        // Border color
        const borderColor = info.status === "open" ? "border-green-600" : "border-purple-600";
        cardDiv.innerHTML = `
        <div id="issue-card" class="shadow-md rounded-md border-t-5 h-[27rem] max-sm:h-[33rem] ${borderColor}">
                <div class="border-b border-gray-300 py-8 space-y-4">
                    <div class="flex justify-between items-center px-5">
                        <div><img src="./assets/Open-Status.png" alt=""></div>
                        <div class="bg-gray-300 px-3 rounded-full">${info.priority}</div>
                    </div>
                    <div class="px-5">
                        <h2 class="font-semibold my-2">${info.title}</h2>
                        <p class="text-xs text-[#64748B]">${info.description}</p>
                    </div>
                    <div class="flex gap-2 px-5">
                        ${createElements(info.labels)}
                    </div>
                </div>
                <div class="p-4 space-y-4">
                    <p class="text-[#64748B]">#${info.id} ${info.author}</p>
                    <p class="text-[#64748B]">Updated: ${info.updatedAt}</p>
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