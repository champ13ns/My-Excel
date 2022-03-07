// Two way binding is used in this part (we will store the changes made in UI and store them at the 2-d matrix)
let matrix = [];
let rows = 100;
let cols = 26;

for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < 26; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: 14,
            fontColor: "#000000",
            BGcolor: "#000000",
            value: "",
            formula: "",
            children: []
        };
        sheetRow.push(cellProp);
    }
    matrix.push(sheetRow);
}


let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let left_align = alignment[0];
let center_align = alignment[1];
let right_align = alignment[2];
let fontSizeProp = document.querySelector(".font-size-prop");
let fontFamilyProp = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");

let activeCellProp = "#d1d8e0";
let inactiveCellProp = "#ecf0f1";
left_align.style.backgroundColor = activeCellProp;


//Application of two way binding
bold.addEventListener("click", function(e) {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.bold = !cellProp.bold //data change
    cell.style.fontWeight = cellProp.bold == true ? "bold" : "normal"; // UI change
    bold.style.backgroundColor = (cellProp.bold == true) ? activeCellProp : inactiveCellProp; // change on the bold button.

})

italic.addEventListener("click", function(e) {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.italic = !cellProp.italic; //data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // UI change
    italic.style.backgroundColor = cellProp.italic ? activeCellProp : inactiveCellProp;
})

underline.addEventListener("click", function(e) {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.underline = !cellProp.underline; //data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // UI change
    underline.style.backgroundColor = cellProp.underline ? activeCellProp : inactiveCellProp;
})
fontSizeProp.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.fontSize = fontSizeProp.value;
    fontSizeProp.value = cellProp.fontSize;
    cell.style.fontSize = cellProp.fontSize + "px";
})

fontFamilyProp.addEventListener("change", e => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.fontFamily = fontFamilyProp.value;
    fontFamilyProp.value = cellProp.fontFamily;
    cell.style.fontFamily = cellProp.fontFamily;
})

fontColor.addEventListener("change", e => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
})
BGcolor.addEventListener("change", e => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.BGcolor = BGcolor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
})
alignment.forEach(alignElement => {
    alignElement.addEventListener("click", function(e) {
        let address = addressBar.value;
        let [cell, cellProp] = activeCell(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;
        cell.style.textAlign = cellProp.alignment;
        switch (alignValue) {
            case "left":
                left_align.style.backgroundColor = activeCellProp;
                right_align.style.backgroundColor = inactiveCellProp;
                center_align.style.backgroundColor = inactiveCellProp;
                break;
            case "right":
                left_align.style.backgroundColor = inactiveCellProp;
                right_align.style.backgroundColor = activeCellProp;
                cellProp.alignment = "right";
                center_align.style.backgroundColor = inactiveCellProp;
                break;
            case "center":
                left_align.style.backgroundColor = inactiveCellProp;
                right_align.style.backgroundColor = inactiveCellProp;
                center_align.style.backgroundColor = activeCellProp;
                cellProp.alignment = "center";
                break;
        }
    })
})

for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 26; j++) {
        // let cell = document.querySelector(`.cell[rowid="${i}"][colid"=${j}"]`);
        let cell = document.querySelector(`.cell[rowid="${i}"][colid="${j}"]`); // UI cell grid
        let cellProp = matrix[i][j];
        cell.addEventListener("click", function(e) {
            // changes are made on the UI buttons.
            bold.style.backgroundColor = (cellProp.bold == true) ? activeCellProp : inactiveCellProp;
            italic.style.backgroundColor = (cellProp.italic == true) ? activeCellProp : inactiveCellProp;
            underline.style.backgroundColor = (cellProp.underline == true) ? activeCellProp : inactiveCellProp;
            fontSizeProp.value = cellProp.fontSize;
            fontFamilyProp.value = cellProp.fontFamily;
            fontColor.value = cellProp.fontColor;
            BGcolor.value = cellProp.BGcolor;
            switch (cellProp.alignment) {
                case "left":
                    left_align.style.backgroundColor = activeCellProp;
                    right_align.style.backgroundColor = inactiveCellProp;
                    center_align.style.backgroundColor = inactiveCellProp;
                    break;
                case "right":
                    left_align.style.backgroundColor = inactiveCellProp;
                    right_align.style.backgroundColor = activeCellProp;
                    center_align.style.backgroundColor = inactiveCellProp;
                    break;
                case "center":
                    left_align.style.backgroundColor = inactiveCellProp;
                    right_align.style.backgroundColor = inactiveCellProp;
                    center_align.style.backgroundColor = activeCellProp;
                    break;
            }
            let formulaBar = document.querySelector(".formula-bar");
            formulaBar.value = cellProp.formula;
            cell.value = cellProp.value;
        })
    }
}

// function to find the rowid,colid of the active cell
function activeCell(address) {
    let [rId, cId] = decode_rid_cid(address);
    let cell = document.querySelector(`.cell[rowid="${rId}"][colid="${cId}"]`); // UI cell grid
    let cellProp = matrix[rId][cId]; // Storage object inside matrix[][].
    return [cell, cellProp];
}


//function to decode rid,cid from address-bar
function decode_rid_cid(address) {
    // "address-> A13"
    let rId = Number(address.slice(1) - 1);
    let cId = Number(address.charCodeAt(0)) - 65;
    return [rId, cId];
}