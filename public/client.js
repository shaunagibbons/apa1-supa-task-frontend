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
    data.forEach((fish) => {
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

const addFish = async (event) => {
  event.preventDefault();
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Loading...";

  const fish = {
    Name: document.getElementById("Name").value,
    Sell: document.getElementById("Sell").value,
    Shadow: document.getElementById("Shadow").value,
    Where: document.getElementById("Where").value,
  };

  try {
    const response = await fetch(`http://localhost:3000/api/fish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fish)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
};

const getMessages = async () => {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Loading...";

  try {
    const response = await fetch(`/api/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
};

const postMessage = async () => {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Loading...";

  try {
    const response = await fetch(`/api/new_message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "If you can see this POST is working :)",
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
};

document.getElementById("callFish").addEventListener("click", getFish);
document.getElementById("addFish").addEventListener("click", addFish);
