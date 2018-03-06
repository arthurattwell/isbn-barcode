// This script uses https://github.com/lindell/JsBarcode
// to create a barcode of an ISBN, then lets you save that SVG.

// Thanks https://stackoverflow.com/a/46403589
function saveSVG(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Add the save button
function saveBarcode(isbn) {
	var saveDiv = document.getElementById('save');
	saveDiv.innerHTML = '<button type="button" onclick="saveSVG(barcode, \'' + isbn + '.svg\')">Save SVG</button>';
}

// Ask the user for the ISBN, and ask JsBarcode
// to make a barcode out of it.
function getISBN() {

    var isbn = prompt("Enter ISBN (no hyphens)", "978000000002");

	JsBarcode("#barcode")
	  .EAN13(isbn, {
	  	format: "EAN13",
	  	font: "Arimo, Arial, Helvetica",
	  	fontSize: 18,
	  	height: 85,
	  	textMargin: 0
	   })
	  .render();

	saveBarcode(isbn);

}

// When the page loads, run the getISBN function
window.onload = getISBN();
