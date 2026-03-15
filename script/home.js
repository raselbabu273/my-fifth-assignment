
const createElements = (arr) => {
    const colors = ["bg-red-200", "bg-green-200", "bg-blue-200"];
    const htmlElements = arr.map((el) => `<span class="bg-gray-100 rounded-full px-2 py-1">${el}</span>`);
    return htmlElements.join(' ');
};

const loadCard = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            displayCard(json.data);
        });
};

const buttons = document.querySelectorAll('.filter-btn');
buttons.forEach((button) => {
    button.addEventListener('click', function() {
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
const displayCard = (infos) => {
    const cardContainer = document.getElementById('card-container');


    infos.forEach((info) => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div id="card" class="shadow-md rounded-md h-100% border-t-4 border-neutral">
                <div class="border-b border-gray-300 py-5 space-y-4">
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
                <div class="p-5 space-y-4">
                    <p class="text-[#64748B]">#${info.id} ${info.author}</p>
                    <p class="text-[#64748B]">${info.updatedAt}</p>
                </div>
            </div>
        `;
        // <div class="text-red-500 bg-red-100 rounded-full px-2"><i class="fa-solid fa-bug"></i> Bug</div>
        //                 <div class="text-orange-400 bg-orange-100 rounded-full px-2"><i class="fa-regular fa-life-ring"></i>Help Wanted</div>
        cardContainer.append(cardDiv);
    });
};

loadCard();