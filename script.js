const pinInput = document.getElementById("pincode");
const findButton = document.getElementById("btn");
const responseContainer = document.getElementById("response-btn");

const BASE_URL = "https://api.postalpincode.in/pincode";

function getOffice(postoffice) {
    if (postoffice && postoffice.length > 0) {
        return postoffice[0].Block || "Block name not available";
    }
    return "No block data available.";
}

async function getData(pin) {
    try {
        const response = await fetch(`${BASE_URL}/${pin}`);
        const data = await response.json();

        responseContainer.innerHTML = "";

        if (data[0].Status === "Success") {
            const postOffices = data[0].PostOffice;

            if (postOffices && postOffices.length > 0) {
                const blockOffice = getOffice(postOffices);

                
                responseContainer.innerHTML = `
                    <h3>Results for PIN Code: ${pin}</h3>
                    <p>Block Name: ${blockOffice}</p>
                `;
            } else {
                responseContainer.innerHTML = '<p class="error-message">No post office data available for this PIN code.</p>';
            }
        } else {
            responseContainer.innerHTML = '<p class="error-message">No data found for the entered PIN code.</p>';
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        responseContainer.innerHTML = '<p class="error-message">An error occurred while fetching data. Please try again later.</p>';
    }
}

findButton.addEventListener("click", () => {
    const pin = pinInput.value.trim();
    if (pin.length === 6 && /^\d+$/.test(pin)) { 
        getData(pin);
    } else {
        responseContainer.innerHTML = '<p class="error-message">Please enter a valid 6-digit PIN code.</p>';
    }
});
