let popup;

document.addEventListener('mouseup', (e) => {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText.length > 0) {
    
    showSavePopup(e.pageX, e.pageY, selectedText); // Show the popup
  }
});

function showSavePopup(x, y, text) {
  removePopup(); // Remove any existing popup before showing a new one

  // Create the popup element
  popup = document.createElement('div');
  popup.id = 'highlight-save-popup';
  popup.innerText = 'Save Highlight?';
  popup.style.position = 'absolute';  // Positioning the popup absolutely
  popup.style.top = `${y + window.scrollY}px`;  // Adjust top position with page scroll
  popup.style.left = `${x + window.scrollX}px`;  // Adjust left position with page scroll
  popup.style.background = '#f0f0f0';  // Basic background color
  popup.style.border = '1px solid #ccc';  // Border style
  popup.style.padding = '5px';
  popup.style.cursor = 'pointer';  // Make it look clickable
  
  // Handle the click event to save the highlight
  popup.onclick = () => saveHighlight(text);

  // Append the popup to the body
  document.body.appendChild(popup);
}

function removePopup() {
  if (popup) {
    popup.remove(); // Remove the popup if it exists
    popup = null;
  }
}

function saveHighlight(text) {
  
  // Access chrome.storage.local and save the highlight
  chrome.storage.local.get(['highlights'], (result) => {
    const highlights = result.highlights || [];  // Get existing highlights, or initialize empty array
    highlights.push({ text });  // Save only the selected text

    chrome.storage.local.set({ highlights }, () => {
      console.log("Saved highlights: ", highlights);  // Debugging: Log highlights after saving
    });
  });

  removePopup(); // Remove the popup after saving
}
