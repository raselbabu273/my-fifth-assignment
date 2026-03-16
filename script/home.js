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

// ---------Loading Setup---------
const manageSpinner = (status) => {
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('card-container').classList.add('hidden');
    }
    else{
        document.getElementById('card-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
};


// ---------Fetch All Issue card---------
let allIssues = [];
const loadCard = async () => {
    manageSpinner(true);
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


// ---------Display Modal---------
const displayIssueDetails = (detail) => {
    const detailsContainer = document.getElementById('details-container');

    // Priority Color Set
    const priorityColors = {
        high: "text-[14px] text-white bg-red-600 px-4 rounded-full",
        medium: "text-[14px] text-white bg-yellow-500 px-4 rounded-full",
        low: "text-[14px] text-white bg-gray-400 px-4 rounded-full"
    };
    const priority = detail.priority;
    const colorClass = priorityColors[priority.toLowerCase()];

    detailsContainer.innerHTML = `
        <div class="rounded-md mb-10 p-4">
            <div class="text-2xl font-bold">${detail.title}</div>

            <div class="flex items-center gap-3 my-5">
                <div>${detail.status === 'open' ? `<span class="text-[14px] text-white bg-green-600 px-3 py-1 rounded-full">Opened</span>` : `<span class="text-[14px] text-white bg-red-600 px-3 py-1 rounded-full">Closed</span>`}</div>
                <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div class="text-[13px] text-[#64748B]">Opened by <span class="uppercase">${detail.author.replace("_", " ")}</span></div>
                <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div class="text-[13px] text-[#64748B]">${detail.createdAt.split("T")[0].split("-").reverse().join("-")}</div>
            </div>

            <div class="flex gap-3 my-4">
                ${createElements(detail.labels)}
            </div>

            <p class="text-[#64748B] my-5">${detail.description}</p>
                
            <div class="flex justify-between items-center bg-sky-50 p-4 my-5 rounded-md">
                <div class="space-y-2">
                    <p>Assignee:</p>
                    <p class="uppercase">${detail.author.replace("_", " ")}</p>
                </div>
                <div class="pr-8 md:pr-30 space-y-2">
                    <p>Priority:</p>
                    <p class="text-[13px] uppercase ${colorClass}">${detail.priority}</p>
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
            high: "text-[14px] font-semibold text-red-600 bg-red-200 px-4 py-1 rounded-full",
            medium: "text-[14px] font-semibold text-yellow-600 bg-yellow-200 px-4 py-1 rounded-full",
            low: "text-[14px] font-semibold text-gray-600 bg-gray-200 px-4 py-1 rounded-full"
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
                    <p class="text-[#64748B]">Author: <span class="uppercase">${info.author.replace("_", " ")}</span></p>
                    <p class="text-[#64748B]">Created: ${info.createdAt.split("T")[0].split("-").reverse().join("-")}</p>
                    <p class="text-[#64748B]">Updated: ${info.updatedAt.split("T")[0].split("-").reverse().join("-")}</p>
                </div>
            </div>
        `;

        cardContainer.append(cardDiv);
        manageSpinner(false);
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


document.getElementById('btn-search').addEventListener('click', () => {
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);

            const allWords = data.data;
            const filterWords = allWords.filter((word) => word.title.toLowerCase().includes(searchValue)
            );

            displayCard(filterWords);

            input.value = "";
        });
});