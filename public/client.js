// Writing a function to communicate with our local server

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

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    resultElement.innerHTML = "";
    data.forEach(fish => {
      const card = document.createElement("div");
      card.classList.add("fish-card");

      card.innerHTML = `
        <h3>${fish.Name}</h3>
        <p><strong>Sell Price:</strong> ${fish.Sell}</p>
        <p><strong>Shadow Size:</strong> ${fish.Shadow}</p>
        <p><strong>Location:</strong> ${fish.Where}</p>
      `;

      resultElement.appendChild(card);
    });
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
};

// const updateMessage = async () => {
//   const resultElement = document.getElementById("result");
//   resultElement.textContent = "Loading...";

//   try {
//     const response = await fetch(`/api/messages`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ message: "The message has been updated" }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
//   } catch (error) {
//     resultElement.textContent = `Error: ${error.message}`;
//   }
// };

document
  .getElementById("callFish")
  .addEventListener("click", getFish);

  document
  .getElementById("add-msg-btn")
  .addEventListener("click", postMessage);

  document
  .getElementById("update-msg-btn")
  .addEventListener("click", updateMessage);

// To begin try adding another button to use the postMessage function
