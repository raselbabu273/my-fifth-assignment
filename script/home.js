const loadCard = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        displayCard(json.data);
    });
}

const displayCard = (infos) => {
    const cardContainer = document.getElementById('card-container');

    infos.forEach(info => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        
        `;
    });
    
}
loadCard();