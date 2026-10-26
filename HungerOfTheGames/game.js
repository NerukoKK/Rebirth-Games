const DistrictCount = document.getElementById("dAmount");
const districtSettings = document.getElementById("districts");
const FinalizeButton = document.getElementById("finalize")


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function ResizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ResizeCanvas();

window.addEventListener("resize", ResizeCanvas);

let Map_SIZEX = canvas.width * 3
let Map_SIZEY = canvas.height * 3

let X_Limitations = Map_SIZEX
let Y_Limitations = Map_SIZEY

const Map_Image = new Image();
Map_Image.src = "Images/Map.jpe"

let Districts = [
    "Luxury",
    "Weapons",
    "Technology",
    "Fishing",
    "Energy",
    "Transportation",
    "Lumber",
    "Textiles",
    "Agriculture",
    "Livestock",
    "Food",
    "Mining",
    "Medicine",
    "Water",
    "Chemicals",
    "Communications"
]

let Traits = [
    "Brave",
    "Cocky",
    "Manipulative",
    "Observant",
    "Paranoid",
    "Patient"
]

let possibleWeapons = [
    {
        name: "Spear",
        rate: 1.2,
        damage: 12,
        type: "Hybrid",
        source: "Images/Spear.png"
    },
    {
        name: "Trident",
        rate: 1.3,
        damage: 13,
        type: "Melee",
        source: "Images/Trident.png"
    },
    {
        name: "Sword",
        rate: 1.1,
        damage: 14,
        type: "Melee",
        source: "Images/Sword.png"
    },
    {
        name: "Scythe",
        rate: 1.2,
        damage: 12,
        type: "Melee",
        source: "Images/Scythe.png"
    },
    {
        name: "Hatchet",
        rate: 0.9,
        damage: 8,
        type: "Melee",
        source: "Images/Hatchet.png"
    }
]

let Fallen = []
let Alliances = []
let alliancesDisabled = false
let FloatingText = []
let Trees = []
let Blood = []

let Spectating = false
let Player_Spectating = 0


let Characters = [
    "an old man",
    "their mother",
    "their father",
    "a sibling",
    "their friend",
    "their neighbor",
    "their teacher",
    "their crush",
    "their mentor",
    "their academic peer",
    "their younger cousin",
    "a pregnant lady",
    "a pacifist",
    "a martyr"
]

let Reasons = [
    "want to have fun",
    "felt their life was worthless",
    "got inspired by a family member",
    "want to prove themselves",
    "felt some type of fate calling for them",
    "find the games super competitive",
    "want to escape poverty",
    "desire lifelong fame",
    "want to secure food for their district",
    "were raised to fight",
    "want to gain personal glory",
    "were brainwashed by propoganda",
    "wanted the respect of their peers",
    "want to avenge a loved one",
    "want to rebel against the games",
    "want to die in a glorious way"
]

let Descriptions = [
    "Obnoxious",
    "Annoying",
    "Kind",
    "Cold-Hearted",
    "Intelligent",
    "Promising",
    "Timid",
    "Creative",
    "Curious",
    "Organized",
    "Disciplined",
    "Reliable",
    "Energetic",
    "Friendly",
    "Emotional",
    "Anxious",
    "Grumpy",
    "Fearless"
]

let Statements = [
    "LETS GO",
    "Are we serious?",
    "Can someone please volunteer instead?",
    "Whatever",
    "I'm winning for sure",
    "This can't be happening",
    "Mom! Dad! Help Me!",
    "Down with the Capitol!",
    "May the odds be never in your favor",
    "You think this is a game? You're all monsters",
    "I'll try to make you proud",
    "I knew it. I always knew it would be me",
    "Finally. My time has come",
    "I've been training my whole life for this"
]

function SetIntroduction(trait, name, d) {
    let char = Characters[Math.floor(Math.random() * Characters.length)]
    let reason = Reasons[Math.floor(Math.random() * Reasons.length)]
    let desc = Descriptions[Math.floor(Math.random() * Descriptions.length)]
    let state = Statements[Math.floor(Math.random() * Statements.length)]
    if (trait === "Brave") {
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                return `From District ${d}, ${name} was always seen as a ${desc} person to their peers. When asked about their current state, all ${name} said was "${state}". ${name} eventually found strength in fighting when they reminisced about ${char}, their ultimate motive is that they ${reason}.`
            case 1:
                return `A brave ${name} stepped up to the stage when ${char} got chosen as tribute. A courageous act, ${name} said "${state}" contradicting all doubt. The people of District ${d} state that ${name} is ${desc} but ${name} only participated because they ${reason}`
        }
    } else if (trait === "Patient") {
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                return `${name} has always been called patient, or ${desc}, but regardless they always felt calm. From district ${d}, ${name} was chosen and stated "${state}", ${char} is one of their pivotal figures in their life and ${name} fights because they ${reason}`
            case 1:
                return `The best way to describe ${name} is like a crocodile waiting for its snack. Others also describe ${name} as ${desc} but ${name} states they only hate on ${name} because of their motive that they ${reason}, ${char} is their only true supporter and ${name}'s last words were "${state}"`
        }
    } else if (trait === "Paranoid") {
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                return `From District ${d}, ${name} has always been known to question everything around them. Others describe ${name} as ${desc}, but ${name} insists that nobody can be trusted. Their only source of comfort was ${char}, and when asked why they volunteered, ${name} claimed they ${reason}. Their final words before entering the stage were, "${state}".`

            case 1:
                return `Nobody in District ${d} could ever understand ${name}'s constant suspicion of others. Even when praised for being ${desc}, ${name} believed everyone had hidden intentions. The only person they ever trusted was ${char}, but even that relationship had its doubts. When asked about the Games, ${name} simply stated "${state}" because they ${reason}.`
        }
    } else if (trait === "Manipulative") {
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                return `From District ${d}, ${name} was always known for getting what they wanted, regardless of the cost. Their peers described them as ${desc}, but few realized how carefully ${name} controlled those around them. Even ${char} had fallen victim to their charming words. When asked about the Games, ${name} smiled and claimed they ${reason}, before saying "${state}".`

            case 1:
                return `When ${name} stepped onto the stage in District ${d}, everyone knew something was different. Described as ${desc} by their peers, ${name} had a talent for making others believe whatever they wanted. Even their relationship with ${char} seemed carefully calculated. Asked about their chances of survival, ${name} replied "${state}", insisting they entered because they ${reason}.`
        }
    } else if (trait === "Cocky") {
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                return `From District ${d}, ${name} was notorious for their overwhelming confidence. Their peers called them ${desc}, but ${name} considered themselves far superior to everyone else. Even ${char} struggled to keep their ego in check. When asked about the Games, ${name} laughed and declared "${state}", claiming that they entered because they ${reason}.`

            case 1:
                return `The moment ${name} was chosen as tribute in District ${d}, they walked onto the stage without a hint of fear. Others described ${name} as ${desc}, though they preferred the word exceptional. With ${char} watching from the crowd, ${name} confidently announced "${state}", convinced that winning was inevitable because they ${reason}.`
        }
    } else if (trait === "Observant") {
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                return `People from District ${d} often underestimated ${name}, describing them as ${desc} without realizing how much they noticed. ${name} paid attention to every conversation, every expression, and every mistake. Even with ${char} by their side, nothing escaped their attention. When asked about the Games, ${name} calmly stated "${state}", explaining that they ${reason}.`

            case 1:
                return `Unlike most tributes, ${name} rarely spoke without a reason. From District ${d}, they were considered ${desc}, but their greatest strength was noticing what everyone else overlooked. ${char} had always admired this unusual ability. When questioned about entering the Games, ${name} glanced at the crowd and replied "${state}", revealing only that they ${reason}.`
        }
    }
}

// Already Stated
const IntroBG = new Image();
IntroBG.src = "Images/Introduction.jpg"

let Weaponry = []
let mouseX = 0
let mouseY = 0

let cameraX = 0
let cameraY = 0


document.addEventListener("mousemove", (event) => {
    mouseX = event.x
    mouseY = event.y
})


const keys = {}
document.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true
    if (keys["n"] && gameState === "Hunger Games") {
        gameSpeed = 1000
    }
    if (keys["b"] && gameState === "Hunger Games" && gameSpeed < 5000) {
        gameSpeed += 75
    }
    if (keys["m"] && gameState === "Hunger Games" && gameSpeed > 250) {
        gameSpeed -= 75
    }
    if (event.code === "Space" && CustomizedDone && gameState === "Introduction") {
        event.preventDefault();
        turn += 1

        velocity = 15
        if (turn === 2) {
            FX = canvas.width / 2 - canvas.height / 2
            SX = -canvas.height
            PlayAudio("Audios/TributeReveal.mp3")
        } else if (turn === 3) {
            FX = -canvas.height
            SX = canvas.width / 2 - canvas.height / 2
            PlayAudio("Audios/DistrictReveal.mp3")
        }
    }
    if (keys["v"] && gameState === "Hunger Games") {
        Spectating = !Spectating
    }
    if (keys["arrowleft"] && gameState === "Hunger Games") {
        let Alive = false
        while (!Alive) {
            if (Player_Spectating === 0) {
                Player_Spectating = Individuals.length - 1
            } else {
                Player_Spectating -= 1
            }
            if (Individuals[Player_Spectating].Health > 0) {
                Alive = true
            }
        }

    }
    if (keys["arrowright"] && gameState === "Hunger Games") {
        let Alive = false
        while (!Alive) {
            if (Player_Spectating === Individuals.length - 1) {
                Player_Spectating = 0
            } else {
                Player_Spectating += 1
            }
            if (Individuals[Player_Spectating].Health > 0) {
                Alive = true
            }
        }


    }
    if (keys[" "] && gameState === "Hunger Games" && !gameStart) {
        gameStart = true
    }

})
document.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false
})

Players = []
let Individuals = []
let CustomizedDone = false

Districts.sort(() => Math.random() - 0.5);
const StatSettings = {
    Speed: { min: 45, max: 99, value: 70 },
    Strength: { min: 25, max: 99, value: 60 },
    Durability: { min: 25, max: 99, value: 60 },
    IQ: { min: 40, max: 179, value: 100 },
    Awareness: { min: 25, max: 99, value: 60 },
    Confidence: { min: 10, max: 99, value: 50 },
    Aggressiveness: { min: 25, max: 99, value: 50 }
};


function ResetSettings(tAmount) {
    const savedSettings = {};

    // Save existing names, stat modes, and custom stats.
    for (const input of districtSettings.querySelectorAll(".tribute-name-input")) {
        const playerId = input.id;
        const modeInput = document.getElementById(`${playerId}_Mode`);
        const statValues = {};

        for (const [stat] of Object.entries(StatSettings)) {
            const statInput = document.getElementById(`${playerId}_${stat}`);
            if (statInput) {
                statValues[stat] = statInput.value;
            }
        }

        savedSettings[playerId] = {
            name: input.value,
            mode: modeInput ? modeInput.value : "random",
            stats: statValues
        };
    }

    districtSettings.innerHTML = "";

    for (let dist = 0; dist < tAmount; dist++) {
        districtSettings.innerHTML += `
            <h2>District ${dist + 1}: ${Districts[dist]}</h2>
        `;

        for (let plr = 0; plr < 2; plr++) {
            const playerId = `Player${dist + 1}_${plr + 1}`;
            const saved = savedSettings[playerId];

            const savedName = saved
                ? saved.name
                    .replace(/&/g, "&amp;")
                    .replace(/"/g, "&quot;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                : "";

            const mode = saved ? saved.mode : "random";

            districtSettings.innerHTML += `
                <div class="player-settings">
                    <h3>Player ${plr + 1}</h3>

                    <div class="settings">
                        <p>Name:</p>
                        <input
                            class="tribute-name-input"
                            id="${playerId}"
                            type="text"
                            placeholder="Enter name"
                            value="${savedName}"
                        >
                    </div>

                    <div class="settings">
                        <p>Stats:</p>
                        <select id="${playerId}_Mode" class="stat-mode">
                            <option value="random" ${mode === "random" ? "selected" : ""}>Random</option>
                            <option value="custom" ${mode === "custom" ? "selected" : ""}>Customize</option>
                        </select>
                    </div>

                    <div
                        id="${playerId}_CustomStats"
                        class="custom-stats"
                        style="display: ${mode === "custom" ? "block" : "none"};"
                    >
                        ${Object.entries(StatSettings).map(([stat, settings]) => {
                const value = saved && saved.stats[stat] !== undefined
                    ? saved.stats[stat]
                    : settings.value;

                return `
                                <div class="settings stat-setting">
                                    <label for="${playerId}_${stat}">${stat}:</label>
                                    <input
                                        id="${playerId}_${stat}"
                                        class="custom-stat-input"
                                        type="number"
                                        value="${value}"
                                    >
                                </div>
                            `;
            }).join("")}
                    </div>
                </div>
            `;
        }
    }
}


districtSettings.addEventListener("change", (event) => {
    if (!event.target.classList.contains("stat-mode")) return;

    const playerId = event.target.id.replace("_Mode", "");
    const customPanel = document.getElementById(
        `${playerId}_CustomStats`
    );

    customPanel.style.display =
        event.target.value === "custom" ? "block" : "none";
});

DistrictCount.addEventListener("change", () => {
    if (Number(DistrictCount.value) >= 2 && Number(DistrictCount.value) <= 16) {
        ResetSettings(Number(DistrictCount.value));
    }
});

FinalizeButton.addEventListener("click", () => {
    const nameInputs = districtSettings.querySelectorAll(
        ".tribute-name-input"
    );

    let done = [...nameInputs].every(
        input => input.value.trim() !== ""
    );

    const customInputs = districtSettings.querySelectorAll(
        ".stat-mode"
    );

    for (const mode of customInputs) {
        if (mode.value !== "custom") continue;

        const playerId = mode.id.replace("_Mode", "");
        const statInputs = document.querySelectorAll(
            `#${playerId}_CustomStats .custom-stat-input`
        );

        if (!done) break;
    }

    if (!done) {
        alert("Enter every player's name and check any custom stats.");
        return;
    }

    if (done) {
        CustomizedDone = true
        victorTribute = null;
        victoryStarted = false;
        victoryFade = 0;
        alliancesDisabled = false;
        Alliances.length = 0;
        Players.length = 0;
        Individuals.length = 0;
        document.getElementById("settingsScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";
        let index = 0

        for (let i = 0; i < 900; i++) {
            let edge_x = (canvas.width / 2 + cameraX) - (Map_SIZEX / 2)
            let edge_y = (canvas.height / 2 + cameraY) - (Map_SIZEY / 2)

            let new_x = edge_x + Math.random() * Map_SIZEX
            let new_y = edge_y + Math.random() * Map_SIZEY



            if (Math.sqrt(((canvas.width / 2 + cameraX) - new_x) ** 2 + ((canvas.height / 2 + cameraY) - new_y) ** 2) > canvas.height / 1.3) {
                const tree = new Image();
                tree.src = "Images/Bush.png"

                Trees.push({
                    img: tree,
                    x: new_x,
                    y: new_y,
                    SIZE: canvas.width / 10
                })
            }
        }

        let weaponAmount = Math.floor(Math.random() * 6) + Number(DistrictCount.value)
        for (let i = 0; i < weaponAmount; i++) {
            let center_x = canvas.width / 2
            let center_y = canvas.height / 2

            let division = 2 * Math.PI / weaponAmount

            let new_x = center_x + Math.cos(division * i) * (canvas.height / (Math.floor(Math.random() * 15) + 10))
            let new_y = center_y + Math.sin(division * i) * (canvas.height / (Math.floor(Math.random() * 15) + 10))

            let chosen_item = possibleWeapons[Math.floor(Math.random() * possibleWeapons.length)]

            const weapon = new Image();
            weapon.src = chosen_item.source

            Weaponry.push({
                img: weapon,
                x: new_x,
                y: new_y,
                SIZE: canvas.width / 75,
                Stats: chosen_item,
                Equipped: false,
                owner: undefined
            })
        }

        for (let i = 0; i < weaponAmount * 3; i++) {
            let edge_x = (canvas.width / 2 + cameraX) - (Map_SIZEX / 2)
            let edge_y = (canvas.height / 2 + cameraY) - (Map_SIZEY / 2)

            let new_x = edge_x + Math.random() * Map_SIZEX
            let new_y = edge_y + Math.random() * Map_SIZEY

            let chosen_item = possibleWeapons[Math.floor(Math.random() * possibleWeapons.length)]

            const weapon = new Image();
            weapon.src = chosen_item.source

            Weaponry.push({
                img: weapon,
                x: new_x,
                y: new_y,
                SIZE: canvas.width / 60,
                Stats: chosen_item,
                Equipped: false,
                owner: undefined
            })
        }

        for (let dist = 0; dist < Number(DistrictCount.value); dist++) {
            Players.push([])
            for (let plr = 0; plr < 2; plr++) {
                let n = document.getElementById(`Player${dist + 1}_${plr + 1}`).value
                let t = Traits[Math.floor(Math.random() * Traits.length)]

                const img = new Image();
                img.src = "Images/PlayerSprite.png"

                let center_x = canvas.width / 2
                let center_y = canvas.height / 2

                let division = 2 * Math.PI / (Number(DistrictCount.value) * 2)

                let new_x = center_x + Math.cos(division * index) * (canvas.height / 3)
                let new_y = center_y + Math.sin(division * index) * (canvas.height / 3)

                const playerId = `Player${dist + 1}_${plr + 1}`;

                const isCustom =
                    document.getElementById(`${playerId}_Mode`).value === "custom";

                function GetStat(stat, randomMin, randomMax) {
                    if (isCustom) {
                        return Number(
                            document.getElementById(`${playerId}_${stat}`).value
                        );
                    }

                    return Math.floor(
                        Math.random() * (randomMax - randomMin + 1)
                    ) + randomMin;
                }

                let Agg = GetStat("Aggressiveness", 25, 99);
                let Conf = GetStat("Confidence", 10, 99);

                let HP = GetStat("Durability", 25, 99);

                let Strength = GetStat("Strength", 25, 99);
                let Speed = GetStat("Speed", 45, 99);
                let Awareness = GetStat("Awareness", 25, 99);
                let IQ = GetStat("IQ", 40, 179);
                Players[dist].push({
                    name: n,
                    trait: t,
                    intro: SetIntroduction(t, n, dist + 1),
                    img: img,
                    x: new_x,
                    y: new_y,
                    SIZE: canvas.width / 60,
                    Aggressiveness: Agg,
                    Strength: Strength,
                    Speed: Speed,
                    Health: HP,
                    Durability: HP,
                    Awareness: Awareness,
                    IQ: IQ,
                    Confidence: Conf,
                    Desperation: Math.floor(
                        ((Conf * 0.25) + (Agg * 0.75)) / 2
                    ),
                    Action: "none",
                    actionPriority: 0,
                    Weapon: "none",
                    sight: undefined,
                    kb: 0,
                    kb_angle: 0,
                    cooldown: 0,
                    stun: 0,
                    strafe: 0,
                    direction: 0,
                    ruralAngle: 0,
                    escapeTime: 0,
                    kills: 0,
                    actionTime: 0,
                    dialogueTime: 0,
                    allianceTime: 0,
                    asked: [],
                    AI: -1,
                    realizationTime: 0,
                    currentTree: []
                })

                index += 1
            }
        }

        for (const District of Players) {
            for (const plr of District) {
                Individuals.push(plr)
            }
        }

        SetSceneImages()
        lastTime = performance.now();
        gameLoop()

    } else {
        console.log("Not done...");

    }
});

let gameState = "Introduction"
let victorTribute = null;
let victoryStarted = false;
let victoryFade = 0;
let gameStart = false
let DIndex = 0
let tick = 0
let turn = 1
let time = 10

let FX = canvas.width / 2 - canvas.height / 2
let SX = canvas.width / 2 - canvas.height / 2

let acceleration = 0.01
let flick = 0.00001
let velocity = 3


let First = new Image();
let Second = new Image();

function SetSceneImages() {
    FX = canvas.width
    SX = -canvas.height

    acceleration = 0.01
    velocity = 15


    First.src = `Images/${Players[DIndex][0].trait}.png`;
    Second.src = `Images/${Players[DIndex][1].trait}.png`;

    PlayAudio("Audios/TributeReveal.mp3")

}

function PlayAudio(name, vol = 1) {
    let Aud = new Audio(name)
    Aud.volume = vol
    Aud.play()
}

function WrapText(text, x, y, maxWidth, lineHeight) {
    ctx.fillStyle = "white"
    ctx.strokeStyle = "black"
    ctx.lineWidth = 3
    const words = text.split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";

        if (ctx.measureText(testLine).width > maxWidth && line !== "") {
            ctx.strokeText(line, x, y);
            ctx.fillText(line, x, y);

            line = words[i] + " ";
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    ctx.strokeText(line, x, y);
    ctx.fillText(line, x, y);
}

function Lerp(start, end, amount) {
    return start + (end - start) * amount;
}

function getDistance(target1, target2) {
    if (target1 && target2) {
        return Math.sqrt(((target1.x + target1.SIZE / 2) - (target2.x + target2.SIZE / 2)) ** 2 + ((target1.y + target1.SIZE / 2) - (target2.y + target2.SIZE / 2)) ** 2)
    } else {
        return false
    }
}

function closestFrom(target, group, dist) {
    let closest = []

    for (const item of group) {
        if (item != target) {
            let distance = Math.sqrt(((target.x + target.SIZE / 2) - (item.x + item.SIZE / 2)) ** 2 + ((target.y + target.SIZE / 2) - (item.y + item.SIZE / 2)) ** 2)
            if (distance < dist) {
                closest.push(item)
            }
        }
    }

    return closest
}

function objectsTouching(target1, target2) {
    let center_x = target1.x - target1.SIZE / 2
    let center_y = target1.y - target1.SIZE / 2
    if (
        center_x > target2.x &&
        center_x < target2.x + target2.SIZE &&
        center_y > target2.y &&
        center_y < target2.y + target2.SIZE
    ) {
        return true
    } else {
        return false
    }
}

function closestEntity(target) {
    let closest = undefined
    let min_distance = 10000000

    for (const dist of Players) {
        for (const plr of dist) {
            if (plr !== target && plr.Health > 0 && (target.AI === -1 || !Alliances[target.AI].members.includes(plr))) {
                let distance = Math.sqrt((target.x - plr.x) ** 2 + (target.y - plr.y) ** 2)
                if (distance < min_distance) {
                    min_distance = distance
                    closest = plr
                }
            }
        }
    }

    return closest
}


function closestDangerEntity(target) {
    let closest = undefined
    let min_distance = 10000000

    for (const dist of Players) {
        for (const plr of dist) {
            if (plr !== target && plr.Health > 0 && plr.Weapon != "none" && getDistance(plr, target) < plr.SIZE * 4 && (target.AI === -1 || !Alliances[target.AI].members.includes(plr))) {
                let distance = Math.sqrt((target.x - plr.x) ** 2 + (target.y - plr.y) ** 2)
                if (distance < min_distance) {
                    min_distance = distance
                    closest = plr
                }
            }
        }
    }

    return closest
}


function closestItem(target) {
    let closest = undefined
    let min_distance = 10000000

    for (const item of Weaponry) {
        if (!item.Equipped) {
            let distance = Math.sqrt((target.x - item.x) ** 2 + (target.y - item.y) ** 2)
            if (distance < min_distance) {
                min_distance = distance
                closest = item
            }
        }
    }

    return closest
}

function MouseHovering(sprite_x, sprite_y, sprite_sizex, sprite_sizey) {
    if (
        mouseX > sprite_x &&
        mouseX < sprite_x + sprite_sizex &&
        mouseY > sprite_y &&
        mouseY < sprite_y + sprite_sizey
    ) {
        return true
    } else {
        return false
    }
}


function changeAction(plr) {
    let visionRange = 100 + 700 * Math.pow(plr.Awareness / 100, 1.5)
    let closest = closestEntity(plr)
    let Braveness = (plr.Aggressiveness * 0.6) + (plr.Confidence * 0.25) + (plr.Desperation * 0.15)
    if (plr.Action === "none") {
        if (Braveness > Math.floor(Math.random() * 100)) {
            plr.Action = "loot"
            plr.actionPriority = 4
        } else {
            plr.Action = "escape"
            plr.actionPriority = 3
            plr.actionTime = 4

            plr.direction = Math.atan2((plr.y - canvas.height / 2 + cameraY), (plr.x - canvas.width / 2 + cameraX))
        }


    } else if (plr.Weapon != "none" && Braveness > Math.random() * 100 && closest && getDistance(closest, plr) < visionRange) {
        plr.Action = "hunt"
        plr.actionPriority = 5
        plr.sight = closest
    } else {
        plr.Action = "roam"
        plr.actionTime = 5
        plr.direction += Math.PI
        plr.ruralAngle = plr.direction
    }

}

function Hit(affected, affector) {
    affected.kb = 1
    affected.kb_angle = Math.atan2((affected.y - affector.y), (affected.x - affector.x)) + Math.PI / 2.5 * (Math.random() < 0.5 ? -1 : 1) + 1

    affector.cooldown = affector.Weapon.Stats.rate;
    affected.stun = 0.33;

    affected.Health -= affector.Weapon.Stats.damage * (affector.Strength / 60)

    for (let i = 0; i < Math.floor(Math.random() * 5) + 5; i++) {
        Blood.push({
            x: (affected.x + affected.SIZE / 2) - canvas.width / 240,
            y: (affected.y + affected.SIZE / 2) - canvas.width / 240,
            SIZE: canvas.width / 120,
            t: 1,
            angle: (Math.random() * 360) * (Math.PI / 180)
        })
    }

    if (affected.Health < 0) {

        PlayAudio("Audios/Cannon.mp3")

        affector.Confidence += 8
        Fallen.push({
            killer: affector.name,
            name: affected.name,
            y: canvas.height,
            t: 1
        })

        affector.kills += 1
        affected.Health = 0
        affected.stun = 0

        if (affected.Weapon != "none") {
            affected.Weapon.Equipped = false
            affected.Weapon.owner = undefined
        }

        let c = closestEntity(affector)
        if (c) {
            affector.sight = c
        }
        CheckEndgameAlliances();
    }

    let Screen_X = affected.x + cameraX;
    let Screen_Y = affected.y + cameraY;

    let Distance_From_Camera = Math.hypot(
        canvas.width / 2 - Screen_X,
        canvas.height / 2 - Screen_Y
    );

    let volume = Math.min(
        1,
        5 / Math.max(1, Distance_From_Camera)
    );


    PlayAudio("Audios/BladeImpact.mp3", volume);
}

function Dodge(affected, affector) {
    affected.kb = 1
    affected.kb_angle = Math.atan2((affector.y - affected.y), (affector.x - affected.x)) + Math.PI / 2.5 * (Math.random() < 0.5 ? -1 : 1)

    affector.cooldown = affector.Weapon.Stats.rate

    let Screen_X = affected.x + cameraX;
    let Screen_Y = affected.y + cameraY;

    let Distance_From_Camera = Math.hypot(
        canvas.width / 2 - Screen_X,
        canvas.height / 2 - Screen_Y
    );

    let volume = Math.min(
        1,
        8 / Math.max(1, Distance_From_Camera)
    );


    PlayAudio("Audios/BladeImpact.mp3", volume);
}

function Attack(plr, closest) {
    if (getDistance(closest, plr) < plr.SIZE) {
        if (plr.cooldown <= 0 && plr.stun <= 0 && closest.cooldown <= 0 && closest.stun <= 0 && plr.Weapon != "none" && closest.Weapon != "none") {
            let Player1_SpeedScore = Math.random() * plr.Speed
            let Player2_SpeedScore = Math.random() * closest.Speed

            if (Player1_SpeedScore > Player2_SpeedScore) {
                let UserAttack_Speed = (Math.random() * plr.Speed + Math.random() * plr.Strength) * 1.4
                let OtherDodge_Speed = (Math.random() * closest.Speed + Math.random() * closest.Awareness)
                if (UserAttack_Speed > OtherDodge_Speed) {
                    Hit(closest, plr)
                } else {
                    Dodge(closest, plr)
                }
            } else {
                let UserAttack_Speed = (Math.random() * closest.Speed + Math.random() * closest.Strength) * 1.4
                let OtherDodge_Speed = (Math.random() * plr.Speed + Math.random() * plr.Awareness)
                if (UserAttack_Speed > OtherDodge_Speed) {
                    Hit(plr, closest)
                } else {
                    Dodge(plr, closest)
                }
            }
        } else if (plr.cooldown <= 0 && plr.stun <= 0 && plr.Weapon != "none") {
            let UserAttack_Speed = (Math.random() * plr.Speed + Math.random() * plr.Strength) * 1.4
            let OtherDodge_Speed = (Math.random() * closest.Speed + Math.random() * closest.Awareness)
            if (UserAttack_Speed > OtherDodge_Speed) {
                Hit(closest, plr)
            } else {
                Dodge(closest, plr)
            }
        } else if (closest.cooldown <= 0 && closest.stun <= 0 && closest.Weapon != "none") {
            let UserAttack_Speed = (Math.random() * closest.Speed + Math.random() * closest.Strength) * 1.4
            let OtherDodge_Speed = (Math.random() * plr.Speed + Math.random() * plr.Awareness)
            if (UserAttack_Speed > OtherDodge_Speed) {
                Hit(plr, closest)
            } else {
                Dodge(plr, closest)
            }
        }
    }

}

function BreakAlliances() {
    for (const tribute of Individuals) {
        tribute.AI = -1;
    }

    Alliances.length = 0;
}

function CheckEndgameAlliances() {
    if (alliancesDisabled || Individuals.length === 0) return;

    const alive = Individuals.filter(tribute => tribute.Health > 0);

    const everyoneInOneAlliance =
        alive.length >= 2 &&
        alive[0].AI !== -1 &&
        alive.every(tribute => tribute.AI === alive[0].AI);

    if (alive.length <= 2 || everyoneInOneAlliance) {
        alliancesDisabled = true;
        BreakAlliances();
    }
}


function Alliance(plr, target) {
    if (alliancesDisabled) return;
    if (
        plr.allianceTime <= 0 && // Checks if player hasn't recently allied anyone
        !plr.asked.includes(target) && // Checks if the player hasn't tried allying this person before (once per person)
        target.AI === -1 && // Checks whether the other player has an Alliance
        (plr.Health * 2 > target.Health && target.Health * 2 > plr.Health) && // Checks if the players have similar healths, if not then its more beneficial to kill/die
        (
            plr.AI === -1 ||
            !Alliances[plr.AI].members.includes(target)
        )
    ) {
        plr.allianceTime = 2
        target.allianceTime = 2
        let benefit_score = (target.Speed * 0.35) + (target.Strength * 0.4) + (target.Durability * 0.25)
        let user_benefit = (plr.Speed * 0.23) + (plr.Strength * 0.23) + (plr.Durability * 0.23) + (plr.IQ * 0.3)
        let ask_chance = (plr.Confidence * 0.3) + (plr.IQ * 0.49) + (100 - plr.Aggressiveness) * 0.21
        let response = (target.Confidence * 0.12) + (target.IQ * 0.48) + ((100 - user_benefit) * 0.18) + (target.Aggressiveness * 0.22)

        if (benefit_score > Math.random() * 150) {
            plr.asked.push(target)
            if (ask_chance > response * 1.33) {
                FloatingText.push({
                    text: "ALLIANCE MADE",
                    x: canvas.width / 2,
                    y: canvas.height / 1.1,
                    t: 0.5,
                    yspeed: canvas.height / 1000,
                    tspeed: 0.001,
                    SIZE: canvas.height * 0.045,
                    color: "cyan"
                })
                Spectating = true
                Player_Spectating = Individuals.indexOf(plr)
                if (plr.AI === -1) {
                    Alliances.push({
                        members: [plr, target],
                        color: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
                    })
                    plr.AI = Alliances.length - 1
                    target.AI = Alliances.length - 1
                } else {
                    Alliances[plr.AI].members.push(target)
                    target.AI = plr.AI
                }
                plr.asked.push(target)
                plr.allianceTime = 10
                target.allianceTime = 10
            }
        }
    }
}

let lastTime = performance.now();
let fps = 0;

let gameSpeed = 1000

let currentText = ''

function gameLoop() {
    const currentTime = performance.now();

    const dt = (currentTime - lastTime) / gameSpeed;
    lastTime = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (gameState === "Introduction") {
        ctx.textAlign = 'center'
        ctx.font = `bold ${canvas.height * 0.052}px Monospace`;
        ctx.strokeStyle = "black"
        ctx.fillStyle = "white"

        ctx.drawImage(IntroBG, 0, 0, canvas.width, canvas.height)



        if (Second.complete && Second.naturalWidth > 0) {
            ctx.drawImage(Second, SX, 0, canvas.height, canvas.height);
        }

        ctx.fillText(Players[DIndex][1].name, SX + canvas.height / 2, canvas.height / 15)
        ctx.strokeText(Players[DIndex][1].name, SX + canvas.height / 2, canvas.height / 15)


        if (First.complete && First.naturalWidth > 0) {
            ctx.drawImage(First, FX, 0, canvas.height, canvas.height);
        }
        ctx.fillText(Players[DIndex][0].name, FX + canvas.height / 2, canvas.height / 15)
        ctx.strokeText(Players[DIndex][0].name, FX + canvas.height / 2, canvas.height / 15)

        // Keep the tribute description inside a dedicated area
        ctx.save();

        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = `bold ${Math.max(14, canvas.height * 0.022)}px Monospace`;
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;

        WrapText(
            currentText,
            canvas.width / 2,
            canvas.height * 0.64,
            canvas.width * 0.68,
            canvas.height * 0.032
        );

        ctx.restore();

        const amount = 1 - Math.exp(-3 * dt);
        if (turn === 1) {
            const characterSize = canvas.height;
            const target = canvas.width / 2 - characterSize / 2

            FX = Lerp(FX, target, amount);

            if (Math.abs(FX - target) < 1) {
                FX = target;
            }

            if (currentText != Players[DIndex][0].intro) {
                currentText = Players[DIndex][0].intro
            }
        } else if (turn === 2) {
            const characterSize = canvas.height;
            const target1 = -characterSize
            const target2 = canvas.width / 2 - characterSize / 2

            FX = Lerp(FX, target1, amount);
            SX = Lerp(SX, target2, amount)

            if (Math.abs(FX - target1) < 1 && Math.abs(SX - target2) < 1) {
                FX = target1;
                SX = target2
            }

            if (currentText != Players[DIndex][1].intro) {
                currentText = Players[DIndex][1].intro
            }
        } else if (turn === 3) {
            const characterSize = canvas.height;
            const target1 = (canvas.width / 2 - characterSize)
            const target2 = (canvas.width / 2)

            FX = Lerp(FX, target1, amount);
            SX = Lerp(SX, target2, amount)

            if (Math.abs(FX - target1) < 1 && Math.abs(SX - target2) < 1) {
                FX = target1;
                SX = target2
            }


            if (currentText != `DISTRICT ${DIndex + 1}`) {
                currentText = `DISTRICT ${DIndex + 1}`
            }
        } else if (turn === 4 && DIndex + 1 <= Players.length - 1) {
            DIndex += 1
            turn = 1
            SetSceneImages()
        } else {
            gameState = "Hunger Games"
            PlayAudio("Audios/Countdown.mp3")
            for (const dist of Players) {
                for (const plr of dist) {
                    changeAction(plr)
                }
            }
        }

        // Space-to-continue prompt
        ctx.save();

        const promptY = canvas.height * 0.94;
        const promptFont = Math.max(14, canvas.height * 0.022);

        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(
            0,
            canvas.height * 0.90,
            canvas.width,
            canvas.height * 0.08
        );

        ctx.font = `bold ${promptFont}px Monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFD166";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;

        ctx.strokeText("PRESS SPACE TO CONTINUE", canvas.width / 2, promptY);
        ctx.fillText("PRESS SPACE TO CONTINUE", canvas.width / 2, promptY);

        ctx.restore();
    } else if (gameState === "Hunger Games") {
        // Show the start instruction until the player begins
        const alive = Individuals.filter(p => p.Health > 0);
        const endgameDuel = alive.length === 2;

        if (endgameDuel) {
            for (const tribute of alive) {
                if (tribute.Weapon !== "none") {
                    tribute.Action = "hunt";
                    tribute.actionPriority = 5;

                    // Target the only other survivor.
                    tribute.sight = alive.find(other => other !== tribute);
                }
            }
        }

        if (alive.length === 1 && !victoryStarted) {
            victorTribute = alive[0];
            victoryStarted = true;
            victoryFade = 0;
        }
        CheckEndgameAlliances();
        ctx.drawImage(Map_Image, canvas.width / 2 - Map_SIZEX / 2 + cameraX, canvas.height / 2 - Map_SIZEY / 2 + cameraY, Map_SIZEX, Map_SIZEY)
        if (keys["w"]) {
            cameraY += canvas.width / 640
        }
        if (keys["s"]) {
            cameraY -= canvas.width / 640
        }
        if (keys["a"]) {
            cameraX += canvas.width / 640
        }
        if (keys["d"]) {
            cameraX -= canvas.width / 640
        }
        tick += dt
        for (const weapon of Weaponry) {
            if (weapon.owner) {
                ctx.save();

                // Find the weapon's center on the screen
                const x = weapon.x + cameraX;
                const y = weapon.y + cameraY;

                // Move the canvas origin to the weapon's center
                ctx.translate(x, y);

                // Rotate based on the player's angle (in radians)
                ctx.rotate(weapon.owner.angle);

                // Draw the weapon centered on the new origin
                ctx.drawImage(
                    weapon.img,
                    -weapon.SIZE / 2,
                    -weapon.SIZE / 2,
                    weapon.SIZE,
                    weapon.SIZE
                );

                ctx.restore();
            } else {
                for (const weapon of Weaponry) {
                    ctx.drawImage(weapon.img, weapon.x - weapon.SIZE / 2 + cameraX, weapon.y - weapon.SIZE / 2 + cameraY, weapon.SIZE, weapon.SIZE)
                }
            }
        }

        for (const item of Blood) {
            ctx.save()
            ctx.fillStyle = "red"
            ctx.globalAlpha = item.t
            ctx.fillRect(item.x + cameraX, item.y + cameraY, item.SIZE, item.SIZE)
            item.x += Math.cos(item.angle) * 0.35 * dt * 144
            item.y += Math.sin(item.angle) * 0.35 * dt * 144
            item.t -= 0.004 * dt * 144
            if (item.t - 0.001 <= 0) {
                Blood.splice(Blood.indexOf(item), 1)
            }
            ctx.restore()
        }

        for (const District of Players) {
            for (const plr of District) {
                ctx.fillStyle = "black"
                ctx.font = `bold ${canvas.height * 0.018}px Monospace`;

                ctx.save()
                ctx.globalAlpha = (plr.Health > 0) ? 1 : 0.1
                if (plr.stun > 0) {
                    ctx.globalAlpha = 0.35
                }

                ctx.fillStyle = "red"
                ctx.fillRect(plr.x - plr.SIZE + cameraX, plr.y - plr.SIZE * 1.1 + cameraY, plr.SIZE * 2, plr.SIZE / 5)
                ctx.fillStyle = "green"
                ctx.fillRect(plr.x - plr.SIZE + cameraX, plr.y - plr.SIZE * 1.1 + cameraY, plr.SIZE * 2 * (plr.Health / plr.Durability), plr.SIZE / 5)

                ctx.drawImage(plr.img, plr.x - plr.SIZE / 2 + cameraX, plr.y - plr.SIZE / 2 + cameraY, plr.SIZE, plr.SIZE)

                ctx.fillStyle = "black"
                if (plr.AI != -1) {
                    ctx.fillStyle = Alliances[plr.AI].color
                }
                ctx.fillText(plr.name, plr.x + cameraX, plr.y - plr.SIZE * 1.2 + cameraY)
                ctx.restore()


                if (MouseHovering(plr.x - plr.SIZE / 2 + cameraX, plr.y - plr.SIZE / 2 + cameraY, plr.SIZE, plr.SIZE)) {
                    let Fight_Score = (plr.Strength * 0.19) + (plr.Speed * 0.16) + (plr.Durability * 0.16) + (plr.Confidence * 0.27) + (plr.Aggressiveness * 0.22)
                    Fight_Score = Math.floor(Fight_Score)
                    ctx.fillText(`Fight_Score : ${Fight_Score} / 100`, mouseX, mouseY + plr.SIZE / 2.5)
                    ctx.fillText(`Awareness: ${plr.Awareness}`, mouseX, mouseY + plr.SIZE / 2.5 * 2)
                    ctx.fillText(`Aggressiveness: ${plr.Aggressiveness}`, mouseX, mouseY + plr.SIZE / 2.5 * 3)
                    ctx.fillText(`Kills : ${plr.kills}`, mouseX, mouseY + plr.SIZE / 2.5 * 4)
                    ctx.fillText(`Confidence : ${plr.Confidence}`, mouseX, mouseY + plr.SIZE / 2.5 * 5)
                    ctx.fillText(`IQ : ${plr.IQ}`, mouseX, mouseY + plr.SIZE / 2.5 * 6)
                    if (plr.Weapon != "none") {
                        ctx.fillText(`Weapon : ${plr.Weapon.Stats.name}`, mouseX, mouseY + plr.SIZE / 2.5 * 7)
                    }
                }

            }
        }


        for (const tree of Trees) {
            ctx.save()
            ctx.globalAlpha = 1
            for (const plr of Individuals) {
                for (const possible of plr.currentTree) {
                    if (possible === tree) {
                        ctx.globalAlpha = 0.2
                    }
                }
            }
            ctx.drawImage(tree.img, tree.x + cameraX, tree.y + cameraY, tree.SIZE, tree.SIZE)
            ctx.restore()
        }

        if (tick >= 1 && time > 0 && gameStart) {
            time -= 1
            tick = 0
            PlayAudio("Audios/Countdown.mp3")

            if (time === 0) {
                PlayAudio("Audios/Start.mp3", 0.5)
            }
        }

        if (time === 0) {
            for (const District of Players) {
                for (const plr of District) {
                    if (plr.Health > 0) {
                        let target_x = 0
                        let target_y = 0

                        let angle = 0
                        let closest = closestEntity(plr)
                        let anti_closest = closestDangerEntity(plr)
                        let item = closestItem(plr)
                        let tree_in_dist = closestFrom(plr, Trees, canvas.width / 15)
                        let visionRange = 100 + 700 * Math.pow(plr.Awareness / 100, 1.5)

                        plr.currentTree = []
                        if (tree_in_dist.length > 0) {
                            for (const tree of tree_in_dist) {
                                plr.currentTree.push(tree)
                            }
                        }

                        plr.x += Math.cos(plr.kb_angle) * plr.kb * dt * 144;
                        plr.y += Math.sin(plr.kb_angle) * plr.kb * dt * 144;

                        if (plr.Weapon != "none") {
                            plr.Weapon.x = plr.x + Math.cos(plr.direction + Math.PI / 2) * plr.SIZE / 2
                            plr.Weapon.y = plr.y + Math.sin(plr.direction + Math.PI / 2) * plr.SIZE / 2
                        }

                        plr.kb = Math.max(0, plr.kb - 1.44 * dt);

                        plr.cooldown = Math.max(0, plr.cooldown - dt);
                        plr.stun = Math.max(0, plr.stun - dt);
                        plr.escapeTime = Math.max(0, plr.escapeTime - dt);
                        plr.actionTime = Math.max(0, plr.actionTime - dt);
                        plr.allianceTime = Math.max(0, plr.allianceTime - dt);
                        plr.realizationTime = Math.max(0, plr.realizationTime - dt);

                        switch (plr.Action) {
                            case "loot": // Player Sees Weapon, what next?
                                if (plr.Weapon === "none" && item && getDistance(item, plr) < visionRange) {
                                    if (
                                        anti_closest &&
                                        (
                                            getDistance(anti_closest, plr) / anti_closest.Speed * 1.5
                                            < getDistance(plr, item) / plr.Speed
                                            ||
                                            getDistance(anti_closest, item) / anti_closest.Speed * 1.5
                                            < getDistance(plr, item) / plr.Speed
                                        )
                                    ) {
                                        let Escape_Score = plr.IQ * 0.6 + (100 - plr.Aggressiveness) * 0.4
                                        if (Math.random() * Escape_Score > Math.random() * 450) {
                                            plr.Action = "escape"
                                            plr.escapeTime = 2
                                            break
                                        }

                                    }
                                    target_x = item.x
                                    target_y = item.y

                                    angle = Math.atan2((target_y - plr.y), (target_x - plr.x))
                                    plr.direction = angle
                                    plr.x += Math.cos(angle) * (plr.Speed / 150) * dt * 144
                                    plr.y += Math.sin(angle) * (plr.Speed / 150) * dt * 144

                                    if (getDistance(plr, item) < item.SIZE) {
                                        item.Equipped = true
                                        item.owner = plr
                                        plr.Weapon = item
                                        changeAction(plr)
                                    }
                                } else {
                                    plr.Action = "roam"
                                }
                                break
                            case "escape":
                                if (item && plr.Weapon === "none") {
                                    if (getDistance(plr, item) < item.SIZE) {
                                        item.Equipped = true
                                        item.owner = plr
                                        plr.Weapon = item
                                        changeAction(plr)
                                    }
                                }

                                if (closest && getDistance(plr, closest) < visionRange / 1.5) {
                                    Alliance(plr, closest)
                                }

                                if (anti_closest) {
                                    let margin = plr.SIZE * 6;

                                    // Normal direction away from the pursuer
                                    let escapeX = plr.x - anti_closest.x;
                                    let escapeY = plr.y - anti_closest.y;

                                    // Normalize the escape direction
                                    let length = Math.hypot(escapeX, escapeY);
                                    escapeX /= length;
                                    escapeY /= length;

                                    // Border avoidance
                                    let avoidX = 0;
                                    let avoidY = 0;


                                    let MIDDLEX = canvas.width / 2;
                                    let MIDDLEY = canvas.height / 2;

                                    let LeftX = MIDDLEX - X_Limitations / 2;
                                    let RightX = MIDDLEX + X_Limitations / 2;

                                    let TopY = MIDDLEY - Y_Limitations / 2;
                                    let BottomY = MIDDLEY + Y_Limitations / 2;


                                    // Strength increases as the player gets closer to an edge
                                    if (plr.x < LeftX + margin) {
                                        avoidX += (margin - plr.x) / margin;
                                    }
                                    if (plr.x > RightX - margin) {
                                        avoidX -= (plr.x - (RightX - margin)) / margin;
                                    }
                                    if (plr.y < TopY + margin) {
                                        avoidY += (margin - plr.y) / margin;
                                    }
                                    if (plr.y > BottomY - margin) {
                                        avoidY -= (plr.y - (BottomY - margin)) / margin;
                                    }

                                    // Combine the two directions
                                    let moveX = escapeX + avoidX * 2;
                                    let moveY = escapeY + avoidY * 2;

                                    // Normalize final movement direction
                                    let moveLength = Math.hypot(moveX, moveY);
                                    moveX /= moveLength;
                                    moveY /= moveLength;

                                    angle = Math.atan2(moveY, moveX);

                                    plr.direction = -angle;


                                    plr.x += moveX * (plr.Speed / 150) * dt * 144;
                                    plr.y += moveY * (plr.Speed / 150) * dt * 144;

                                    let Fight_Score = (plr.Strength * 0.19) + (plr.Speed * 0.16) + (plr.Durability * 0.16) + (plr.Confidence * 0.27) + (plr.Aggressiveness * 0.22)
                                    let Enemy_Fight_Score = 0.45 * anti_closest.Strength + 0.25 * anti_closest.Speed + 0.3 * anti_closest.Durability

                                    let Flee_Score = 0.6 * (plr.Durability - plr.Health) + 0.4 * Enemy_Fight_Score
                                    if (Fight_Score > Flee_Score && plr.Weapon != "none" && plr.actionTime <= 0) {
                                        if (plr.IQ > Math.floor(Math.random() * 180)) {
                                            plr.Action = "hunt"
                                            break;
                                        }
                                    }


                                    if (getDistance(anti_closest, plr) > visionRange * 1.5) {
                                        if (plr.Weapon === "none" && plr.actionTime <= 0) {
                                            plr.Action = "loot"
                                        } else {
                                            plr.Action = "roam"
                                            plr.ruralAngle = plr.direction
                                            console.log("ROAM via Escaping")
                                        }
                                    }
                                } else {
                                    if (plr.Weapon === "none" && plr.actionTime <= 0) {
                                        plr.Action = "loot"
                                    } else {
                                        plr.Action = "roam"
                                        plr.ruralAngle = plr.direction
                                    }

                                }
                                break
                            case "hunt":
                                if (!plr.sight || plr.sight.Health <= 0 || (plr.AI != -1 && Alliances[plr.AI].members.includes(plr.sight))) {
                                    plr.sight = closestEntity(plr);
                                    if (!plr.sight) {
                                        plr.Action = "roam"
                                        plr.ruralAngle = plr.direction
                                    }
                                }

                                if (closest && getDistance(plr, closest) < visionRange / 1.5) {
                                    Alliance(plr, closest)
                                }



                                // Only hunt if a living target exists
                                if (plr.sight) {
                                    let temp_confidence = (plr.Confidence)
                                    if (plr.AI != -1) {
                                        for (const other of Alliances[plr.AI].members) {
                                            if (other != plr && getDistance(other && plr) < visionRange) {
                                                temp_confidence += 10
                                            }
                                        }
                                    }
                                    let Fight_Score = (plr.Strength * 0.19) + (plr.Speed * 0.16) + (plr.Durability * 0.16) + (temp_confidence * 0.27) + (plr.Aggressiveness * 0.22)
                                    let Enemy_Fight_Score = 0.45 * plr.sight.Strength + 0.25 * plr.sight.Speed + 0.3 * plr.sight.Durability

                                    let Flee_Score = 0.6 * (plr.Durability - plr.Health) + 0.4 * Enemy_Fight_Score
                                    if (
                                        !endgameDuel &&
                                        Flee_Score > Fight_Score &&
                                        plr.realizationTime <= 0 &&
                                        plr.sight.Weapon != "none"
                                    ) {
                                        if (plr.Awareness > Math.floor(Math.random() * 100)) {
                                            plr.Action = "escape"
                                            plr.escapeTime = 2
                                            break;
                                        } else {
                                            plr.realizationTime = (180 - plr.IQ) / 50
                                        }
                                    }

                                    let target = plr.sight;

                                    // Switch to a stronger opponent if appropriate
                                    if (
                                        closest &&
                                        closest !== plr.sight &&
                                        (
                                            closest.Strength > plr.sight.Strength * 1.3 ||
                                            getDistance(closest, plr) <
                                            getDistance(plr.sight, plr) * 0.65
                                        )
                                    ) {
                                        plr.sight = closest;
                                        target = closest;
                                    }

                                    target_x = target.x
                                    target_y = target.y

                                    angle = Math.atan2((target_y - plr.y), (target_x - plr.x))
                                    plr.direction = angle


                                    if (Math.floor(Math.random() * 450) === 1) {
                                        plr.strafe = Math.PI / 5 * (Math.random() < 0.5 ? -1 : 1)
                                    }

                                    const targetDistance = getDistance(target, plr);
                                    const attackDistance = plr.SIZE * 0.8;

                                    if (plr.stun <= 0 && plr.kb <= 0) {
                                        // Approach the target, but stop once close enough to attack.
                                        if (targetDistance > attackDistance) {
                                            plr.x += Math.cos(angle) * (plr.Speed / 150) * dt * 144;
                                            plr.y += Math.sin(angle) * (plr.Speed / 150) * dt * 144;
                                        }
                                    }
                                    if (getDistance(target, plr) > visionRange) {
                                        plr.Action = "roam"
                                        plr.ruralAngle = plr.direction
                                        console.log("ROAM via Too Far")
                                    }
                                    Attack(plr, target)

                                }
                                break
                            case "roam":
                                if (closest && getDistance(plr, closest) < visionRange / 1.5) {
                                    Alliance(plr, closest)
                                }


                                let MIDDLEX = canvas.width / 2;
                                let MIDDLEY = canvas.height / 2;

                                let LeftX = MIDDLEX - X_Limitations / 2;
                                let RightX = MIDDLEX + X_Limitations / 2;

                                let TopY = MIDDLEY - Y_Limitations / 2;
                                let BottomY = MIDDLEY + Y_Limitations / 2;


                                if (Math.floor(Math.random() * 200) === 1) {
                                    plr.direction = plr.ruralAngle + Math.PI / 5 * (Math.random() < 0.5 ? -1 : 1)
                                }

                                if (Math.abs(LeftX - plr.x) < plr.SIZE * 3 || Math.abs(RightX - plr.x) < plr.SIZE * 3 ||
                                    Math.abs(TopY - plr.y) < plr.SIZE * 3 || Math.abs(BottomY - plr.y) < plr.SIZE * 3) {
                                    plr.ruralAngle += Math.PI
                                    plr.direction = plr.ruralAngle + Math.PI / 5 * (Math.random() < 0.5 ? -1 : 1)

                                    let req = Math.atan2(
                                        canvas.height / 2 - plr.y,
                                        canvas.width / 2 - plr.x
                                    );
                                    plr.x += Math.cos(req) * 3
                                    plr.y += Math.sin(req) * 3
                                }

                                plr.x += Math.cos(plr.direction) * (plr.Speed / 150) * dt * 144
                                plr.y += Math.sin(plr.direction) * (plr.Speed / 150) * dt * 144


                                if (
                                    plr.escapeTime <= 0 &&
                                    plr.Weapon != "none" &&
                                    plr.Aggressiveness > Math.floor(Math.random() * 100) &&
                                    closest &&
                                    getDistance(closest, plr) < visionRange &&
                                    plr.actionTime <= 0
                                ) {
                                    plr.Action = "hunt";
                                    plr.actionPriority = 5;
                                    plr.sight = closest;
                                } else if (
                                    plr.escapeTime <= 0 &&
                                    closest &&
                                    getDistance(closest, plr) < visionRange
                                ) {
                                    plr.Action = "escape";
                                    plr.escapeTime = 2;
                                }

                                if (item && getDistance(item, plr) < visionRange && plr.actionTime <= 0 && plr.Weapon === "none") {
                                    plr.Action = "loot"
                                    plr.actionTime = 4
                                }

                                break;
                        }
                    }
                }
            }

            X_Limitations -= Map_SIZEX / 38000 * dt * 144
            Y_Limitations -= Map_SIZEY / 38000 * dt * 144


            for (const tribute of Fallen) {
                ctx.save()
                ctx.globalAlpha = tribute.t
                ctx.font = `bold ${canvas.height * 0.038}px Monospace`;
                ctx.fillText(`${tribute.killer} has killed ${tribute.name}`, canvas.width * 0.8, tribute.y)
                tribute.y -= canvas.height / 1200 * dt * 144
                tribute.t -= dt / 7

                if (tribute.t - 0.001 <= 0) {
                    Fallen.splice(Fallen.indexOf(tribute), 1)
                }
                ctx.restore()
            }
            for (const text of FloatingText) {
                ctx.save()
                ctx.globalAlpha = text.t
                ctx.font = `bold ${text.SIZE}px Monospace`
                ctx.fillStyle = text.color
                ctx.fillText(text.text, text.x, text.y)
                text.y -= text.yspeed * dt * 144
                text.t -= text.tspeed * dt * 144

                if (text.t - 0.001 <= 0) {
                    FloatingText.splice(FloatingText.indexOf(text), 1)
                }
                ctx.restore()
            }
            if (Spectating) {
                let RequiredCameraX = canvas.width / 2 - Individuals[Player_Spectating].x;
                let RequiredCameraY = canvas.height / 2 - Individuals[Player_Spectating].y;
                cameraX += (RequiredCameraX - cameraX) / 25 * dt * 144
                cameraY += (RequiredCameraY - cameraY) / 25 * dt * 144
                ctx.save()
                ctx.font = `bold ${canvas.height * 0.045}px Monospace`;
                ctx.fillText(`Spectating: ${Individuals[Player_Spectating].name}`, canvas.width / 2, canvas.height * 0.9)
                ctx.restore()
            }
            ctx.fillText(`Players Alive: ${Individuals.filter(plr => plr.Health > 0).length}`, canvas.width / 2, canvas.height / 30)
        }
        ctx.font = `bold ${canvas.height * 0.04}px Monospace`;
        ctx.fillText(`${Math.round(1000 / gameSpeed * 100) / 100}x Speed`, canvas.width / 15, canvas.height / 20)

        if (!gameStart) {
            console.log("Working")
            ctx.save();

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = `bold ${Math.max(20, canvas.height * 0.035)}px Monospace`;

            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 5;

            ctx.strokeText(
                "PRESS SPACE TO START THE HUNGER GAMES",
                canvas.width / 2,
                canvas.height * 0.85
            );

            ctx.fillText(
                "PRESS SPACE TO START THE HUNGER GAMES",
                canvas.width / 2,
                canvas.height * 0.85
            );

            ctx.restore();
        }

        ctx.save();

        const controlFontSize = Math.max(12, canvas.width * 0.012);
        const lineHeight = controlFontSize * 1.55;
        const panelWidth = Math.min(canvas.width * 0.34, 360);
        const panelHeight = lineHeight * 6 + 20;
        const panelX = 12;
        const panelY = canvas.height - panelHeight - 12;

        ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
        ctx.fillRect(panelX, panelY, panelWidth, panelHeight);

        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${controlFontSize}px Monospace`;
        ctx.fillText("CONTROLS", panelX + 10, panelY + 8);

        ctx.font = `${controlFontSize * 0.9}px Monospace`;

        const controls = [
            "W A S D - Move camera",
            "V - Toggle spectating",
            "Left / Right - Switch tribute",
            "B / M - Slow down / speed up",
            "N - Reset speed"
        ];

        controls.forEach((control, index) => {
            ctx.fillText(
                control,
                panelX + 10,
                panelY + 8 + lineHeight * (index + 1)
            );
        });

        ctx.restore();

        ctx.font = `bold ${canvas.height * 0.4}px Monospace`;
        if (time > 0) {
            ctx.save()
            ctx.globalAlpha = 0.5
            ctx.fillText(time, canvas.width / 2, canvas.height / 2)
            ctx.restore()
        }
    } else if (gameState === "Victory") {
        ctx.fillStyle = "#080808";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Gold title
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#e5bd64";
        ctx.font = `bold ${Math.max(32, canvas.height * 0.09)}px Monospace`;
        ctx.fillText("WINNER", cx, canvas.height * 0.16);

        // Decorative divider
        ctx.fillStyle = "#e5bd64";
        ctx.fillRect(canvas.width * 0.25, canvas.height * 0.25,
            canvas.width * 0.5, 2);

        if (victorTribute) {
            // Winner's actual game sprite
            const size = Math.min(canvas.height * 0.35, canvas.width * 0.3);

            if (victorTribute.img &&
                victorTribute.img.complete &&
                victorTribute.img.naturalWidth > 0) {
                ctx.drawImage(
                    victorTribute.img,
                    cx - size / 2,
                    cy - size / 1.9,
                    size,
                    size
                );
            }

            // Winner's name
            ctx.fillStyle = "white";
            ctx.font = `bold ${Math.max(22, canvas.height * 0.05)}px Monospace`;
            ctx.fillText(victorTribute.name, cx, canvas.height * 0.72);

            ctx.fillStyle = "#bdbdbd";
            ctx.font = `${Math.max(12, canvas.height * 0.022)}px Monospace`;
            ctx.fillText(
                "THE LAST TRIBUTE STANDING",
                cx,
                canvas.height * 0.82
            );
        }
    }


    if (victoryStarted && gameState === "Hunger Games") {
        gameSpeed = 1000
        victoryFade = Math.min(1, victoryFade + 0.025);

        ctx.save();
        ctx.globalAlpha = victoryFade;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        if (victoryFade >= 1) {
            gameState = "Victory";
            PlayAudio("Audios/GameEnd.mp3")
        }
    }


    requestAnimationFrame(gameLoop);
}