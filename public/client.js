const getFish = async () => {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Loading...";

  try {
    const response = await fetch(`http://localhost:3000/api/fish`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    displayFish(data);
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
};

const displayFish = (fishList) => {
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = ""; // Clear previous results

  fishList.forEach((fish) => {
    const card = createFishCard(fish);
    resultElement.appendChild(card);
  });
};

const createFishCard = (fish) => {
  const card = document.createElement("div");
  card.classList.add("fish-card");

  console.log(fish);

  card.innerHTML = `
    <h3>${fish.Name}</h3>
    <p><strong>Sell Price:</strong> ${fish.Sell}</p>
    <p><strong>Shadow Size:</strong> ${fish.Shadow}</p>
    <p><strong>Location:</strong> ${fish.Where}</p>
    <button type="button" class="toggleUpdateFish" data-fish-id="${fish.Id}">Update Fish</button>
    <form class="updateFishForm" data-fish-id="${fish.Id}" style="display: none;">
      <input type="text" class="updateName" value="${fish.Name}" required>
      <input type="number" class="updateSell" value="${fish.Sell}" required>
      <input type="text" class="updateShadow" value="${fish.Shadow}" required>
      <input type="text" class="updateWhere" value="${fish.Where}" required>
      <button type="button" class="updateFishButton" data-fish-id="${fish.Id}">Update Fish</button>
    </form>
    <button type="button" class="deleteFishButton" data-fish-id="${fish.Id}">Delete Fish</button> <!-- Add delete button -->
  `;

  return card;
};

const handleToggleUpdateFish = (fishId) => {
  console.log(fishId);
  const updateForm = document.querySelector(`.updateFishForm[data-fish-id="${fishId}"]`);
  if (updateForm) {
    updateForm.style.display = updateForm.style.display === "none" ? "block" : "none";
  }
};

const updateFish = async (fishId) => {
  const form = document.querySelector(`.updateFishForm[data-fish-id="${fishId}"]`);

  if (!form) return alert("Form not found!");

  // Get form values
  const { name, sell, shadow, location } = getFormValues(form);
  if (hasEmptyFields(name, sell, shadow, location)) return alert("All fields are required!");

  try {
    const response = await fetch(`http://localhost:3000/api/fish`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Id: fishId, Name: name, Sell: sell, Shadow: shadow, Where: location }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update fish.");

    alert("Fish updated successfully!");
    getFish(); // Refresh the fish list after update
  } catch (error) {
    alert(`Error updating fish: ${error.message}`);
  }
};

const deleteFish = async (fishId) => {

  const confirmed = window.confirm("Are you sure you want to delete this fish?");

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/fish`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Id: fishId }),
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    getFish();
    alert("Fish deleted successfully!");
  } catch (error) {
    alert(`Error deleting fish: ${error.message}`);
  }
};

const getFormValues = (form) => {
  return {
    name: form.querySelector(".updateName").value,
    sell: form.querySelector(".updateSell").value,
    shadow: form.querySelector(".updateShadow").value,
    location: form.querySelector(".updateWhere").value,
  };
};

const hasEmptyFields = (...fields) => {
  return fields.some((field) => !field);
};

document.getElementById("result").addEventListener("click", (event) => {
  const { target } = event;

  if (target.classList.contains("toggleUpdateFish")) {
    handleToggleUpdateFish(target.dataset.fishId);
  } else if (target.classList.contains("updateFishButton")) {
    updateFish(target.dataset.fishId);
  } else if (target.classList.contains("deleteFishButton")) {
    const fishId = target.dataset.fishId;
    deleteFish(fishId);
  }
});

document.getElementById("callFish").addEventListener("click", getFish);
document.getElementById("addFish").addEventListener("submit", addFish);
