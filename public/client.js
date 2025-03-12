let fishArr = [];
let filteredFishArr = [];

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded, calling getFish()..."); // Debugging: Ensure the script runs after the DOM is loaded
  await getFish();
});

document.getElementById("result").addEventListener("click", ({ target }) => {
  const fishId = target.dataset.fishId;
  if (target.classList.contains("toggleUpdateFish")) handleToggleUpdateFish(fishId);
  else if (target.classList.contains("updateFishButton")) updateFish(fishId);
  else if (target.classList.contains("deleteFishButton")) deleteFish(fishId);
});

document.getElementById("addFish").addEventListener("submit", addFish);
document.getElementById("fish-search").addEventListener("input", filterFish);

async function getFish() {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Loading...";
  
  try {
    console.log("Fetching fish data from API..."); // Debugging: Track API call
    const response = await fetch("http://localhost:3000/api/fish");
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    
    fishArr = await response.json();
    filteredFishArr = [...fishArr];
    console.log("Fish data received:", fishArr); // Debugging: Verify data received
    displayFish();
  } catch (error) {
    console.error("Error fetching fish data:", error); // Debugging: Log errors
    resultElement.textContent = `Error: ${error.message}`;
  }
}

function displayFish() {
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = "";
  filteredFishArr.forEach(fish => resultElement.appendChild(createFishCard(fish)));
}

function createFishCard(fish) {
  const card = document.createElement("div");
  card.classList.add("fish-card");
  
  card.innerHTML = `
    <h3>${fish.Name}</h3>
    <p><strong>Sell Price:</strong> ${fish.Sell}</p>
    <p><strong>Shadow Size:</strong> ${fish.Shadow}</p>
    <p><strong>Location:</strong> ${fish.Where}</p>
    <button type="button" class="toggleUpdateFish" data-fish-id="${fish.Id}">Update Fish</button>
    <form class="updateFishForm" data-fish-id="${fish.Id}" style="display: none;">
      ${createFormInputs(fish)}
      <button type="button" class="updateFishButton" data-fish-id="${fish.Id}">Submit</button>
    </form>
    <button type="button" class="deleteFishButton" data-fish-id="${fish.Id}">Delete Fish</button>
  `;
  
  return card;
}

function createFormInputs(fish) {
  return ["Name", "Sell", "Shadow", "Where"].map(field => `
    <div class="form-input">
      <label for="update${field}-${fish.Id}">${field}</label>
      <input type="${field === "Sell" ? "number" : "text"}" id="update${field}-${fish.Id}" class="update${field}" value="${fish[field]}" required>
    </div>
  `).join("");
}

function handleToggleUpdateFish(fishId) {
  const updateForm = document.querySelector(`.updateFishForm[data-fish-id="${fishId}"]`);
  if (updateForm) updateForm.style.display = updateForm.style.display === "none" ? "block" : "none";
}

async function updateFish(fishId) {
  const form = document.querySelector(`.updateFishForm[data-fish-id="${fishId}"]`);
  if (!form) return alert("Form not found!");
  
  const { Name, Sell, Shadow, Where } = getFormValues(form);
  if ([Name, Sell, Shadow, Where].some(field => !field)) return alert("All fields are required!");
  
  try {
    console.log("Updating fish with ID:", fishId); // Debugging: Log update action
    const response = await fetch("http://localhost:3000/api/fish", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Id: fishId, Name, Sell, Shadow, Where })
    });
    
    if (!response.ok) throw new Error((await response.json()).error || "Failed to update fish.");
    alert("Fish updated successfully!");
    getFish();
  } catch (error) {
    console.error("Error updating fish:", error); // Debugging: Log errors
    alert(`Error updating fish: ${error.message}`);
  }
}

async function deleteFish(fishId) {
  if (!window.confirm("Are you sure you want to delete this fish?")) return;
  
  try {
    console.log("Deleting fish with ID:", fishId); // Debugging: Log delete action
    const response = await fetch("http://localhost:3000/api/fish", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Id: fishId })
    });
    
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    alert("Fish deleted successfully!");
    getFish();
  } catch (error) {
    console.error("Error deleting fish:", error); // Debugging: Log errors
    alert(`Error deleting fish: ${error.message}`);
  }
}

function getFormValues(form) {
  return Object.fromEntries(
    ["Name", "Sell", "Shadow", "Where"].map(field => [field, form.querySelector(`.update${field}`).value])
  );
}

function filterFish() {
  const query = document.getElementById("fish-search-input").value.toLowerCase();
  console.log("Filtering fish by query:", query); // Debugging: Log search query
  filteredFishArr = query ? fishArr.filter(fish => fish.Name.toLowerCase().includes(query)) : fishArr;
  displayFish();
}


