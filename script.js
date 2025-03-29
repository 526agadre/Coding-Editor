// Function to switch between HTML, CSS, and JS tabs
function switchTab(tab) {
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    const jsEditor = document.getElementById('js-editor');
    
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tabBtn => {
      tabBtn.classList.remove('active');
    });
  
    // Hide all editors
    htmlEditor.classList.add('hidden');
    cssEditor.classList.add('hidden');
    jsEditor.classList.add('hidden');
  
    // Show the selected editor
    if (tab === 'html') {
      htmlEditor.classList.remove('hidden');
    } else if (tab === 'css') {
      cssEditor.classList.remove('hidden');
    } else if (tab === 'js') {
      jsEditor.classList.remove('hidden');
    }
  
    // Set the active tab
    document.querySelector(`.tab-btn.${tab}`).classList.add('active');
  }
  
  // Function to run the code and display the output in the iframe
  function runCode() {
    const htmlCode = document.getElementById('html-editor').value;
    const cssCode = document.getElementById('css-editor').value;
    const jsCode = document.getElementById('js-editor').value;
  
    const iframe = document.getElementById('output');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    
    // Create the HTML structure
    iframeDocument.open();
    iframeDocument.write(`
      <html>
        <head>
          <style>
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
          <script>
            ${jsCode}
          </script>
        </body>
      </html>
    `);
    iframeDocument.close();
  }
  
  // Save function to download the code as files
  function saveCode() {
    const htmlCode = document.getElementById('html-editor').value;
    const cssCode = document.getElementById('css-editor').value;
    const jsCode = document.getElementById('js-editor').value;
  
    const blobHtml = new Blob([htmlCode], { type: 'text/html' });
    const blobCss = new Blob([cssCode], { type: 'text/css' });
    const blobJs = new Blob([jsCode], { type: 'application/javascript' });
  
    const aHtml = document.createElement('a');
    const aCss = document.createElement('a');
    const aJs = document.createElement('a');
  
    aHtml.href = URL.createObjectURL(blobHtml);
    aHtml.download = 'index.html';
    aHtml.click();
  
    aCss.href = URL.createObjectURL(blobCss);
    aCss.download = 'style.css';
    aCss.click();
  
    aJs.href = URL.createObjectURL(blobJs);
    aJs.download = 'script.js';
    aJs.click();
  }
  
  // Open function to load code from files
  function openCode() {
    const htmlFile = document.createElement('input');
    htmlFile.type = 'file';
    htmlFile.accept = '.html';
    htmlFile.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById('html-editor').value = reader.result;
      };
      reader.readAsText(file);
    };
    htmlFile.click();
  }
  
  window.onload = function() {
    switchTab('html');
  };
  