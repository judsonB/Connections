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

const green = [
    ["Famous Landmarks", "Eiffel Tower, Statue of Liberty", "Great Wall of China", "Colosseum"],
    ["Words with Double Letters", "Dinner", "Supper", "Tomorrow", "Channel"],
    ["Synonyms", "Happy", "Joyful", "Glad", "Delighted"],
    ["Antonyms", "Hot", "Cold", "Big", "Small"],
    ["Words Rhyming with \"Cat\"", "Bat", "Mat", "Hat", "Chat"],
    ["Activities", "Running", "Swimming", "Jumping", "Dancing"],
    ["Countries", "France", "Spain", "Italy", "Germany"],
    ["Words Starting with \"S\"", "Sun", "Sky", "Smile", "Street"],
    ["Body of Water", "Ocean", "Lake", "River", "Sea"],
    ["Occupations", "Doctor", "Teacher", "Lawyer", "Nurse"]
];
const blue = [
    ["Fictional Characters", "Harry Potter", "Sherlock Holmes", "Romeo & Juliet", "Captain Ahab"],
    ["Mythological Creatures", "Dragon", "Unicorn", "Centaur", "Mermaid"],
    ["Words of Foreign Origin", "Karaoke", "Fiesta", "Deja Vu", "Matryoshka"],
    ["Words with Silent Letters", "Knee", "Gnome", "Castle", "Island"],
    ["Words Derived from Other Words", "Telephone", "Butterfly", "podcast", "Ebook"],
    ["Chemical Elements", "Oxygen", "Hydrogen", "Carbon", "Nitrogen"],
    ["Famous Works of Art", "Mona Lisa", "Starry Night", "The Scream", "Guernica"],
    ["Words with Multiple Meanings", "Fair", "Bat", "Pitch", "Right"],
    ["Literary Genres", "Poetry", "Novel", "Drama", "Non-Fiction"],
    ["Historical Events", "American Revolution", "World War II", "French Revolution", "Moon Landing"]
];
const purple = [
    ["____phobias", "Arachno", "Aiboh", "Acro", "Agora"],
    ["Words with Homophones", "There", "To", "Pear", "Write"],
    ["Famous Inventors", "Leonardo da Vinci", "Thomas Edison", "Marie Curie", "Alexander Graham Bell"],
    ["Words from Mythology", "Styx", "Elysium", "Valhalla", "Olympus"],
    ["Words with Prefixes", "Anti", "De", "Re", "Pre"],
    ["Words with Suffixes", "ment", "ion", "able", "ful"],
    ["Famous Playwrights", "William Shakespeare", "Arthur Miller", "Tennessee Williams", "August Wilson"],
    ["Literary Devices", "Simile", "Metaphor", "Symbolism", "Foreshadowing"],
    ["Philosophical Concepts", "Existentialism", "Stoicism", "Utilitarianism", "Nihilism"],
    ["Astronomical Objects", "Galaxy", "Nebula", "Black Hole", "Comet"],
];
//#endregion

//#region grab HTML Elements
const timeLeftBox = document.getElementById("timeLeft");
const mistakesLeftBox = document.getElementById("mistakesLeft");
const submitButton = document.getElementById("submit");
const deselectButton = document.getElementById("deselect");
const newGameButton = document.getElementById("newGame");
const itemList = document.getElementsByClassName("item");
const invalidBox = document.getElementById("invalidContainer");
const gameSetItems = document.getElementsByClassName("cat");
//#endregion

//#region Additional Variables
let gameSet = [];
let selectedList = [];
let time = 0;
let timer = null;
fadeOut = null;
//#endregion

//#region AddEventListeners
for (let index = 0; index < itemList.length; index++) {
    const element = itemList[index];
    element.addEventListener("click", touchItem);
}
submitButton.addEventListener("click", submit);
deselectButton.addEventListener("click", deselect);
newGameButton.addEventListener("click", newGame);
//#endregion

//Start a new game
newGame();

//#region Functions
/**
 * When a grid item is clicked, it needs to show as selected (turn black),
 * unless there are already 4 items selected, in which case it doesn't get selected.
 * If the item was already selected, it reverts back to the non-selected color.
 * @param {event} e the specific button clicked
 */
function touchItem(e)
{
    if(e.target.classList.contains("selected"))
    {
        const index = selectedList.indexOf(e.target.innerText);
        const x = selectedList.splice(index, 1);
        e.target.classList.toggle("selected");
    }
    else if(selectedList.length < 4)
    {
        selectedList.push(e.target.innerText);
        e.target.classList.toggle("selected");
    }
}
/**
 * Removes the "selected" class from all grid items.
 * @param {event} e the specific button clicked (in this case, it's always the
 *                  deselect button)
 */
function deselect(e)
{
    for (let index = 0; index < itemList.length; index++) {
        const element = itemList[index];
        if(element.classList.contains("selected"))
        {
            const index = selectedList.indexOf(element.innerText);
            const x = selectedList.splice(index, 1);
            element.classList.toggle("selected");
        }
    }
}

function getValidIndex()
{
    for(index = 0; index < gameSet.length; index++)
    {
        let currentSet = gameSet[index];
        let inList = true;
        //Starting @ 1 because 0 = category
        for(thisItem = 1; thisItem < currentSet.length && inList; thisItem++)
        {
            if(!selectedList.includes(currentSet[thisItem]))
            {
                inList = false;
            }
        }
        if (inList)
        {
            return index;
        }
    }
    return -1;
    
}
function setCategoryText(indexOfValidSet)
{
    let text = "<h2>"+gameSet[indexOfValidSet][0]+"</h2><p>"
    for(j = 1; j < gameSet[indexOfValidSet].length; j++)
    {
        text += gameSet[indexOfValidSet][j];
        if(j < gameSet[indexOfValidSet].length-1)
            text += ", ";
    }
    text += "</p>"
    gameSetItems[indexOfValidSet].innerHTML = text;
}
function submit(e)
{
    if(selectedList.length == 4)
    {
        indexOfValidSet = getValidIndex()
        if (indexOfValidSet != -1)
        {
            setCategoryText(indexOfValidSet);
            //show category
            gameSetItems[indexOfValidSet].style.display="block";
            //hide all selected items (because they were found)
            hideSelected()
            deselectButton.click();
            if(allFound())
            {
                clearInterval(timer);
                timer=null;
            }
        }
        else
        {
            invalidBox.style.opacity = 1;
            invalidBox.style.display = "block";
            setTimeout(waitToFade, 2000);
        }
    }
}
function hideSelected()
{
    for(i = 0; i < itemList.length; i++)
    {
        let item = itemList[i];
        if(item.classList.contains("selected"))
        {
            item.style.display = "none";
        }
    }
}
function allFound()
{
    for(index = 0; index < gameSetItems.length; index++)
    {
        if(gameSetItems[index].style.display == "none")
        {
            return false;
        }
    }
    return true;
}
function waitToFade()
{
    fadeOut = setInterval(fade, 50);
}
function fade()
{
    invalidBox.style.opacity = invalidBox.style.opacity - .05;
    if(invalidBox.style.opacity <= 0)
    {
        opacity = 0;
        invalidBox.style.display = "none";
        clearInterval(fadeOut);
        fadeout = null;
    }
}
function buildGameSet()
{
    gameSet = [
        random_val(yellow),
        random_val(green),
        random_val(blue),
        random_val(purple)
    ];
}
function hideCategories()
{
    for (let i = 0; i < gameSetItems.length; i++) 
    {
        gameSetItems[i].style.display = "none";
        gameSetItems[i].innerHTML = "";
    }
}
function twoDListToOneDList(list)
{
    let newList = [];
    for(i = 0; i < list.length; i++)
    {
        for(j = 1; j < list[i].length; j++)
        {
            newList.push(list[i][j]);
        }
    }
    return newList;
}
function shuffle(list)
{
    for(i = 0; i < list.length; i++)//Shuffle
    {
        for(j = 0; j < 5; j++)//Ensure more randomized...
        {
            //Swap 2 locations in the list
            let swapSpot = random_range(0, list.length -1);
            let temp = list[i];
            list[i] = list[swapSpot];
            list[swapSpot] = temp;
        }
    }
}
function newGame(e)
{
    //Hide Categories & set innerHTML to "";
    hideCategories();
    deselectButton.click();
    buildGameSet();
    //Add game sets to a single list (instead of a 2D list)
    let randomSet = twoDListToOneDList(gameSet);
    
    //Randomize/shuffle the set
    shuffle(randomSet);
    //Add random items to grid
    for (let i = 0; i < itemList.length; i++) 
    {
        const element = itemList[i];
        element.innerHTML = randomSet[i];
        element.style.display = "block";
        element.style.fontSize = 30 + 'px';
        //Ensure the font is small enough for the container
        resize_to_fit(element);
    }
    clearInterval(timer);
    time = 0;
    timer = setInterval(updateTime, 100);
}
function updateTime()
{
    time += .1;
    timeLeftBox.innerHTML = time.toFixed(1);
}
function random_range(low, high)
{
    let size = high - low + 1;
    return Math.floor(Math.random() * size) + low;
}
function random_val(list)
{
    let rand = random_range(0, list.length-1);
    return list[rand];
}
//Ensure the font is small enough for the container
function resize_to_fit(specificItem) 
{
    let fontSize = window.getComputedStyle(specificItem).fontSize;
    specificItem.style.fontSize = (parseFloat(fontSize) - 1) + 'px';
    if(specificItem.clientHeight < specificItem.scrollHeight || specificItem.clientWidth < specificItem.scrollWidth)
    {
        resize_to_fit(specificItem);
    }
}
//#endregion