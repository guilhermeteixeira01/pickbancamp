const maps = [
    { name: "Mirage", img: "assets/img/mapas/mirage.jpg" },
    { name: "Inferno", img: "assets/img/mapas/inferno.jpeg" },
    { name: "Nuke", img: "assets/img/mapas/nuke.avif" },
    { name: "Overpass", img: "assets/img/mapas/overpass.webp" },
    { name: "Ancient", img: "assets/img/mapas/ancient.jpg" },
    { name: "Dust 2", img: "assets/img/mapas/dust2.jpg" },
    { name: "Train", img: "assets/img/mapas/train.jpg" },
    { name: "Anubis", img: "assets/img/mapas/anubis.jpg", disabled: true },
    { name: "Vertigo", img: "assets/img/mapas/vertigo.webp", disabled: true },
];

let bans = [];
let turn = 0;
const totalBans = 6;

const mapPool = document.getElementById("mapPool");
const status = document.getElementById("status");

const banSound = new Audio("assets/sounds/ban.mp3");
const pickSound = new Audio("assets/sounds/pick.mp3");

function renderMaps() {
    mapPool.innerHTML = "";

    maps.forEach(map => {
        const card = document.createElement("div");
        card.className = "map-card";

        const isDisabled = map.disabled;
        const isBanned = bans.includes(map.name);
        const isPicked = !isDisabled && bans.length === totalBans && !isBanned &&
            (maps.find(m => !bans.includes(m.name) && !m.disabled)?.name === map.name);

        if (isDisabled) {
            card.classList.add("disabled");
        } else if (isBanned) {
            card.classList.add("banned");
        } else if (isPicked) {
            card.classList.add("picked");
        } else {
            card.classList.add("waiting");
            card.onclick = () => banMap(map.name);
        }

        const img = document.createElement("img");
        img.src = map.img;
        img.alt = map.name;

        const name = document.createElement("div");
        name.className = "map-name";
        name.innerText = map.name;

        card.appendChild(img);
        card.appendChild(name);

        mapPool.appendChild(card);
    });
}


function banMap(mapName) {
    const map = maps.find(m => m.name === mapName);
    if (!map || map.disabled) return;

    if (bans.includes(mapName) || bans.length >= totalBans) return;

    bans.push(mapName);
    turn++;

    banSound.currentTime = 0;
    banSound.play();

    if (bans.length === totalBans) {
        const remaining = maps.find(m => !bans.includes(m.name) && !m.disabled);

        pickSound.currentTime = 0;
        pickSound.play();

        status.innerHTML = `Mapa escolhido: <span class="picked-name">${remaining.name}</span>`;
    } else {
        status.innerText = `Escolha do ${turn % 2 === 0 ? "Time A" : "Time B"}`;
    }

    renderMaps();
}

renderMaps();
