"use strict";

/*
 * Animal Adoption Board
 * Button clicks change the animal data or the selected view, then redraw
 * the cards so the page reflects the user's choices.
 * EXTRA CREDIT: None.
 */

// ------------------------------------
// Animal Data
// ------------------------------------

const animals = [
	{ id: 1, name: "Luna", species: "cat", age: 3, adopted: false },
	{ id: 2, name: "Biscuit", species: "dog", age: 7, adopted: true },
	{ id: 3, name: "Pepper", species: "cat", age: 1, adopted: true },
	{ id: 4, name: "Moose", species: "dog", age: 5, adopted: false },
	{ id: 5, name: "Charly", species: "dog", age: 4, adopted: false },
	{ id: 6, name: "Bill", species: "cat", age: 0.5, adopted: true },
	{ id: 7, name: "Chompers", species: "rabbit", age: 0.5, adopted: false },
	{ id: 8, name: "Beowulf", species: "dog", age: 7, adopted: true },
];

// What the user currently wants to see. The page controls change these.
let activeFilter = "all";
let activeSort = "default";

// ------------------------------------
// Display Animals
// ------------------------------------

function displayAnimals(animalArray) {
	const animalList = document.querySelector("#animal-list");
	animalList.innerHTML = "";

	if (animalArray.length === 0) {
		const emptyMessage = document.createElement("p");
		emptyMessage.textContent = "There are no animals to show.";
		emptyMessage.classList.add("empty-message");
		animalList.appendChild(emptyMessage);
		return;
	}

	// Rebuild each card from the current data so its status and button agree.
	animalArray.forEach((animal) => {
		const card = document.createElement("div");
		card.classList.add("animal-card");
		if (animal.adopted) {
			card.classList.add("adopted");
		}

		const name = document.createElement("h3");
		name.textContent = animal.name;
		const species = document.createElement("p");
		species.textContent = "Species: " + animal.species;
		const age = document.createElement("p");
		age.textContent = "Age: " + animal.age + " years";
		const status = document.createElement("p");
		status.textContent = animal.adopted ? "Adopted" : "Available";
		const button = document.createElement("button");
		button.type = "button";
		button.textContent = animal.adopted ? "Return" : "Adopt";

		// This callback runs when the user clicks, not while the card is built.
		// Its closure remembers this animal, so it passes the right id later.
		button.addEventListener("click", () => {
			toggleAdoption(animal.id);
		});

		card.append(name, species, age, status, button);
		animalList.appendChild(card);
	});
}

// ------------------------------------
// Adopt or Return an Animal
// ------------------------------------

function toggleAdoption(animalId) {
	// Find by id because a card's position can change when the list is sorted.
	const animal = animals.find((animal) => animal.id === animalId);
	if (!animal) {
		return;
	}

	// Flipping the same value handles both adoption and return. Redrawing
	// keeps the card in sync with the data and the current filter.
	animal.adopted = !animal.adopted;
	updateDisplay();
}

// ------------------------------------
// Filter, Sort, and Update
// ------------------------------------

function updateDisplay() {
	// sort() changes its array. Sorting a copy preserves the shelter's
	// original order so the user can switch back to it later.
	let visibleAnimals = animals.slice();

	// Keep only animals that match the selected adoption status.
	if (activeFilter === "available") {
		visibleAnimals = visibleAnimals.filter((animal) => !animal.adopted);
	} else if (activeFilter === "adopted") {
		visibleAnimals = visibleAnimals.filter((animal) => animal.adopted);
	}

	if (activeSort === "name") {
		visibleAnimals.sort((a, b) => a.name.localeCompare(b.name));
	} else if (activeSort === "age") {
		visibleAnimals.sort((a, b) => a.age - b.age);
	}

	// Use the same redraw path after a data change or a control change.
	displayAnimals(visibleAnimals);
	updateCount();
}

// ------------------------------------
// Available Count
// ------------------------------------

function updateCount() {
	// Count the full shelter list so filtering cards does not change the total.
	const availableAnimals = animals.filter((animal) => !animal.adopted);
	const animalCount = document.querySelector("#animal-count");
	animalCount.textContent = availableAnimals.length + " of " + animals.length
		+ " animals are available for adoption.";
}

// ------------------------------------
// Page Controls
// ------------------------------------

const allButton = document.querySelector("#show-all");
const availableButton = document.querySelector("#show-available");
const adoptedButton = document.querySelector("#show-adopted");
const sortSelect = document.querySelector("#sort-animals");

// Save each choice before redrawing. Keeping filter and sort separately
// lets the user change one without losing the other.
allButton.addEventListener("click", () => {
	activeFilter = "all";
	updateDisplay();
});

availableButton.addEventListener("click", () => {
	activeFilter = "available";
	updateDisplay();
});

adoptedButton.addEventListener("click", () => {
	activeFilter = "adopted";
	updateDisplay();
});

sortSelect.addEventListener("change", () => {
	activeSort = sortSelect.value;
	updateDisplay();
});

// Display the original list and the count when the page first opens.
displayAnimals(animals);
updateCount();
