let reactant1 = null;
let reactant2 = null;

const r1Box = document.getElementById('r1-box');
const r1Name = document.getElementById('r1-name');

const r2Box = document.getElementById('r2-box');
const r2Name = document.getElementById('r2-name');

const productBox = document.getElementById('product-box');
const productName = document.getElementById('product-name');
const yieldText = document.getElementById('yield-text');
const statusMsg = document.getElementById('status-msg');

const exampleCells = document.querySelectorAll('.example-cell');

// 반응 데이터 (productImg 경로를 본인이 가진 파일명으로 맞춰야 합니다)
const reactionDatabase = {
    "H2+O2": { 
        name: "Water (H2O)", 
        img: "https://placehold.co/150x150/blue/white?text=H2O", // images/H2O.png 로 변경하세요
        yield: "98%" 
    },
    "O2+H2": { 
        name: "Water (H2O)", 
        img: "https://placehold.co/150x150/blue/white?text=H2O", 
        yield: "98%" 
    },
    "Na+Cl2": { 
        name: "Salt (NaCl)", 
        img: "https://placehold.co/150x150/white/black?text=NaCl", 
        yield: "100%" 
    },
    "Cl2+Na": { 
        name: "Salt (NaCl)", 
        img: "https://placehold.co/150x150/white/black?text=NaCl", 
        yield: "100%" 
    }
    // 여기에 더 많은 반응 추가 가능
};

exampleCells.forEach(cell => {
    cell.addEventListener('click', () => {
        const chemKey = cell.getAttribute('data-chem');
        const imgSrc = cell.querySelector('img').src;
        const nameText = cell.querySelector('.example-name').innerText;

        if (!reactant1) {
            reactant1 = chemKey;
            r1Box.innerHTML = `<img src="${imgSrc}">`;
            r1Name.innerText = nameText; // 이름 변경 (Empty -> Hydrogen)
            r1Name.style.color = "#4fffaa"; // 선택되면 밝은 형광색으로 강조
            statusMsg.innerText = "Select one more reactant...";
        } else if (!reactant2) {
            reactant2 = chemKey;
            r2Box.innerHTML = `<img src="${imgSrc}">`;
            r2Name.innerText = nameText; // 이름 변경
            r2Name.style.color = "#4fffaa";
            
            predictReaction();
        } else {
            resetSimulation();
            reactant1 = chemKey;
            r1Box.innerHTML = `<img src="${imgSrc}">`;
            r1Name.innerText = nameText;
            r1Name.style.color = "#4fffaa";
        }
    });
});

function predictReaction() {
    statusMsg.innerText = "Analyzing reaction...";
    const key = reactant1 + "+" + reactant2;
    const result = reactionDatabase[key];

    if (result) {
        productBox.innerHTML = `<img src="${result.img}">`;
        productName.innerText = result.name;
        productName.style.color = "#c58bff"; // 결과는 보라색
        yieldText.innerText = result.yield;
        statusMsg.innerText = "Reaction Successful!";
    } else {
        productBox.innerText = "X";
        productName.innerText = "No Reaction";
        productName.style.color = "#aaa";
        yieldText.innerText = "0%";
        statusMsg.innerText = "No known reaction.";
    }
}

function resetSimulation() {
    reactant1 = null;
    reactant2 = null;

    r1Box.innerHTML = "";
    r2Box.innerHTML = "";
    productBox.innerHTML = "?";

    r1Name.innerText = "Empty";
    r2Name.innerText = "Empty";
    productName.innerText = "Unknown";
    
    // 색깔 원상복구
    r1Name.style.color = "#ffffff";
    r2Name.style.color = "#ffffff";
    productName.style.color = "#ffffff";

    yieldText.innerText = "0%";
    statusMsg.innerText = "Waiting for input...";
}