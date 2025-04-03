const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault(); // Prevent the form from submitting and refreshing the page

  clearUI(); // Clear the previous QR code if any
  const url = document.getElementById("url").value; // Get the URL from the input field
  const size = document.getElementById("size").value; // Get the size from the input field

  if (url === "") {
    alert("Please enter a URL"); // Alert if the input is empty
  } else {
    showSpinner(); // Show the spinner while generating the QR code
    setTimeout(() => {
      hideSpinner(); // Hide the spinner after a short delay (to simulate loading)
      generateQRCode(url, size); // Call the function to generate the QR code
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src; // Select the generated QR code image
        createSaveBtn(saveUrl); // Create the save button with the image URL
      }, 50); // Allow time for the QR code to be generated before showing the save button
    }, 1000); // Adjust the timeout as needed
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url, // The URL to encode in the QR code
    width: size, // Width of the QR code
    height: size, // Height of the QR code
    colorDark: "#000000", // Dark color for the QR code
    colorLight: "#ffffff", // Light color for the background
    correctLevel: QRCode.CorrectLevel.H, // Error correction level (H is the highest)
  });
}; // Create a new QRCode instance

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block"; // Show the spinner when generating QR code
};
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none"; // Show the spinner when generating QR code
};

const clearUI = () => {
  qr.innerHTML = ""; // Clear the QR code container
  const saveLink = document.getElementById("save-link"); // Select the save button if it exists
  if (saveLink) {
    saveLink.remove(); // Remove the save button if it exists (to prevent duplicates)
  }
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a"); // Create an anchor element for the download link
  link.id = "save-link"; // Set an ID for the link (optional)
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-5"; // Add classes for styling
  link.href = saveUrl; // Set the href attribute to the URL for downloading the QR code image
  link.download = "qrcode.png"; // Set the download attribute to specify the filename for saving
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link); // Append the link to the QR code container (or any other container you prefer)
};

hideSpinner(); // Hide the spinner initially
form.addEventListener("submit", onGenerateSubmit);
