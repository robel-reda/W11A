/*
W11A - JavaScript Cookies Assignment
FreshBite Food Store
*/

// Store three food objects in an array.
// Each object has a name, description, and image_url.

const foods = [
{
name: "Classic Pizza",
description: "A delicious pizza topped with cheese, tomato sauce, and fresh ingredients.",
image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
},
{
name: "Beef Burger",
description: "A juicy burger served with fresh lettuce, tomato, and a soft bun.",
image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
},
{
name: "Garden Salad",
description: "A refreshing mix of green vegetables and colorful, healthy ingredients.",
image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
}
];

// Read a cookie using its name.
function getCookie(name) {

```
const cookies = document.cookie.split("; ");

for (const cookie of cookies) {

    const separator = cookie.indexOf("=");

    const cookieName = cookie.substring(0, separator);
    const cookieValue = cookie.substring(separator + 1);

    if (cookieName === name) {
        return decodeURIComponent(cookieValue);
    }
}

return null;
```

}

// Add a food item to the user's selection.
function selectFood(index) {

```
// Read the selection cookie.
const savedSelection = getCookie("selection");

let selectedFoods = [];

// Convert the saved JSON text into an array.
if (savedSelection !== null) {

    try {

        selectedFoods = JSON.parse(savedSelection);

        // Support a cookie containing a single object.
        if (!Array.isArray(selectedFoods)) {
            selectedFoods = [selectedFoods];
        }

    } catch (error) {

        selectedFoods = [];

    }
}

// Find the food selected by the user.
const chosenFood = foods[index];

// Check whether the food is already selected.
const alreadySelected = selectedFoods.some(
    food => food.name === chosenFood.name
);

// Add the food only if it is not already selected.
if (!alreadySelected) {
    selectedFoods.push(chosenFood);
}

// Convert the array into JSON text.
const cookieValue = encodeURIComponent(
    JSON.stringify(selectedFoods)
);

// Save the JSON text in the selection cookie.
document.cookie = "selection=" + cookieValue +
    "; max-age=86400; path=/; SameSite=Lax";

// Display a message on the home page.
const message = document.getElementById("message");

if (alreadySelected) {

    message.textContent =
        chosenFood.name + " is already in your selection.";

} else {

    message.textContent =
        chosenFood.name + " was added successfully!";

}

// Display the selected foods in the console.
console.log("Selected foods:", selectedFoods);
```

}

// Run this section only on the selection page.
if (window.location.pathname.endsWith("selection.html")) {

```
const container = document.getElementById("selection-container");

// Read the selection cookie.
const savedSelection = getCookie("selection");

// Check whether the cookie exists.
if (savedSelection === null) {

    showEmptySelection();

} else {

    try {

        // Convert the JSON text into JavaScript data.
        let selectedFoods = JSON.parse(savedSelection);

        // Support a single object or an array of objects.
        if (!Array.isArray(selectedFoods)) {
            selectedFoods = [selectedFoods];
        }

        // Display a message if the array is empty.
        if (selectedFoods.length === 0) {

            showEmptySelection();

        } else {

            displayFoods(selectedFoods);

        }

    } catch (error) {

        container.textContent =
            "Your selection could not be read. Please choose your foods again.";

    }
}
```

}

// Display a message when the user has no saved foods.
function showEmptySelection() {

```
const container = document.getElementById("selection-container");

container.innerHTML = `
    <div class="empty-message">
        <h2>Your selection is empty!</h2>
        <p>Please visit the home page to choose your favorite foods.</p>
        <a class="home-link" href="index.html">Choose Food</a>
    </div>
`;
```

}

// Display every selected food as a card.
function displayFoods(selectedFoods) {

```
const container = document.getElementById("selection-container");

// Clear the old cards before displaying the updated selection.
container.innerHTML = "";

selectedFoods.forEach(function (food, index) {

    // Create a food card.
    const card = document.createElement("article");

    card.className = "food-card";

    // Create the food image.
    const image = document.createElement("img");

    image.src = food.image_url;
    image.alt = food.name;

    // Create the food name.
    const heading = document.createElement("h2");

    heading.textContent = food.name;

    // Create the food description.
    const description = document.createElement("p");

    description.textContent = food.description;

    // Create a Delete button.
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete Food";
    deleteButton.className = "delete-button";

    // Remove the food when the button is clicked.
    deleteButton.addEventListener("click", function () {

        // Remove one food from the array.
        selectedFoods.splice(index, 1);

        // Save the updated array in the cookie.
        document.cookie = "selection=" +
            encodeURIComponent(JSON.stringify(selectedFoods)) +
            "; max-age=86400; path=/; SameSite=Lax";

        // Update the page after deleting the food.
        if (selectedFoods.length === 0) {

            showEmptySelection();

        } else {

            displayFoods(selectedFoods);

        }
    });

    // Add the image, name, description, and button to the card.
    card.appendChild(image);
    card.appendChild(heading);
    card.appendChild(description);
    card.appendChild(deleteButton);

    // Add the completed card to the selection page.
    container.appendChild(card);

});
```

}
