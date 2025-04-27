document.addEventListener('DOMContentLoaded', () => {
    loadHighlights();
  });
  
  function loadHighlights() {
    chrome.storage.local.get(['highlights'], (result) => {
      const highlightList = document.getElementById('highlight-list');
      highlightList.innerHTML = '';  // Clear any previous highlights
  
      const highlights = result.highlights || [];  // Get saved highlights (empty array if none)
      
      if (highlights.length === 0) {
        highlightList.innerHTML = '<p>No saved highlights found.</p>';  // If no highlights, show a message
      } else {
        highlights.forEach((item, index) => {
          const div = document.createElement('div');
          div.className = 'highlight-item';
  
          const text = document.createElement('span');
          text.innerText = item.text;  // Display the plain text
  
          const deleteButton = document.createElement('button');
          deleteButton.innerText = '🗑️';  // Trash icon or "Delete"
          deleteButton.style.marginLeft = '10px';
          deleteButton.style.cursor = 'pointer';
          deleteButton.onclick = () => deleteHighlight(index);
  
          div.appendChild(text);
          div.appendChild(deleteButton);  // Append the delete button
          highlightList.appendChild(div);
        });
      }
    });
  }
  
  function deleteHighlight(index) {
    chrome.storage.local.get(['highlights'], (result) => {
      const highlights = result.highlights || [];
      highlights.splice(index, 1);  // Remove the highlight at the given index
  
      chrome.storage.local.set({ highlights }, () => {
        console.log(`Highlight at index ${index} deleted.`);
        loadHighlights();  // Refresh the list after deletion
      });
    });
  }
  