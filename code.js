//#region Lists
const yellow = [
    ["Body Parts", "Head", "Arm", "Leg", "Finger"],
    ["Colors", "Red", "Blue", "Green", "Yellow"],
    ["Numbers", "One", "Two", "Three", "Four"],
    ["Fruits", "Apple", "Orange", "Banana", "Grape"],
    ["Furniture", "Chair", "Table", "Bed", "Sofa"],
    ["Vehicles", "Car", "Truck", "Bus", "Bicycle"],
    ["Animals", "Dog", "Cat", "Horse", "Bird"],
    ["Seasons", "Spring", "Summer", "Fall", "Winter"],
    ["Clothing", "Shirt", "Pants", "Shoes", "Hat"],
    ["Instruments", "Guitar", "Piano", "Drum", "Violin"]   
];
/*
Green (Medium)
Famous Landmarks: Eiffel Tower, Statue of Liberty, Great Wall of China, Colosseum
Words with Double Letters: Dinner, Supper, Tomorrow, Channel
Synonyms: Happy, Joyful, Glad, Delighted
Antonyms: Hot, Cold, Big, Small
Words Rhyming with "Cat": Bat, Mat, Hat, Chat
Activities: Running, Swimming, Jumping, Dancing
Countries: France, Spain, Italy, Germany
Words Starting with "S": Sun, Sky, Smile, Street
Body of Water: Ocean, Lake, River, Sea
Occupations: Doctor, Teacher, Lawyer, Nurse
Blue (Hard)

Fictional Characters: Harry Potter, Sherlock Holmes, Romeo & Juliet, Captain Ahab
Mythological Creatures: Dragon, Unicorn, Centaur, Mermaid
Words of Foreign Origin: Karaoke (Japanese), Fiesta (Spanish), Deja Vu (French), Matryoshka (Russian)
Words with Silent Letters: Knee, Gnome, Castle, Island
Words Derived from Other Words: Telephone (Tele + Phone), Butterfly (Butter + Fly)
Chemical Elements: Oxygen, Hydrogen, Carbon, Nitrogen
Famous Works of Art: Mona Lisa, Starry Night, The Scream, Guernica
Words with Multiple Meanings: Fair (adjective & noun), Bat (noun & verb)
Literary Genres: Poetry, Novel, Drama, Non-Fiction
Historical Events: American Revolution, World War II, French Revolution, Moon Landing
Purple (Very Hard)

Phobias: Arachnophobia (Spiders), Claustrophobia (Enclosed Spaces), Acrophobia (Heights), Agoraphobia (Open Spaces)
Words with Homophones: There (They're), To (Too, Two), Pear (Pair), Write (Right)
Famous Inventors: Leonardo da Vinci, Thomas Edison, Marie Curie, Alexander Graham Bell
Words from Mythology: Styx (River in the Underworld), Elysium (Greek Paradise), Valhalla (Norse Paradise), Olympus (Greek Home of Gods)
Words with Prefixes: Anti- (Opposite), De- (Remove), Re- (Do Again), Pre- (Before)
Words with Suffixes: -ment (Act of), -ion (State of Being), -able (Can Be), -ful (Full Of)
Famous Playwrights: William Shakespeare, Arthur Miller, Tennessee Williams, August Wilson
Literary Devices: Simile (Comparison using like/as), Metaphor (Direct Comparison), Symbolism (Represents Something Else), Foreshadowing (Hint of Future Events)
Philosophical Concepts: Existentialism, Stoicism, Utilitarianism, Nihilism
Astronomical Objects: Galaxy, Nebula, Black Hole, Comet*/
//#endregion

//#region grab HTML Elements
const timeLeftBox = document.getElementById("timeLeft");
const mistakesLeftBox = document.getElementById("mistakesLeft");
const submitButton = document.getElementById("submit");
const deselectButton = document.getElementById("deselect");
const newGameButton = document.getElementById("newGame");
const itemList = document.getElementsByClassName("item");
//#endregion

//#region Additional Variables
let selectedList = [];
//#endregion

//#region AddEventListeners
for (let index = 0; index < itemList.length; index++) {
    const element = itemList[index];
    element.addEventListener("click", touchItem);
    
}
//#endregion

//#region Functions
function touchItem(e)
{
    if(e.target.classList.contains("selected"))
    {
        const index = selectedList.indexOf(e.target.innerText);
        const x = selectedList.splice(index, 1);
        console.log(`Removing: ${x}`);
        e.target.classList.toggle("selected");
    }
    else if(selectedList.length < 4)
    {
        selectedList.push(e.target.innerText);
        e.target.classList.toggle("selected");
    }
    
    console.log(selectedList)
}
//#endregion