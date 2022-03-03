 rows = 100;
 col = 26;
 let addressColCont = document.querySelector(".address-col-cont");
 let addressRowCont = document.querySelector(".address-row-cont");
 let addressBar = document.querySelector(".address-bar");
 for (let i = 1; i <= rows; i++) {
     let div = document.createElement("div");
     div.setAttribute("class", "address-col");
     div.innerText = i;
     addressColCont.appendChild(div);
 }
 for (let i = 1; i <= col; i++) {
     let div = document.createElement("div");
     div.setAttribute("class", "address-row");
     div.innerText = String.fromCharCode(i + 64);
     addressRowCont.appendChild(div);
 }
 let cellsCont = document.querySelector(".cells-cont");

 for (let i = 1; i <= 100; i++) {
     let rowCont = document.createElement("rowCont");
     rowCont.setAttribute("class", "row-cont")
     for (let j = 1; j <= 26; j++) {
         let cell = document.createElement("cell");
         cell.setAttribute("class", "cell");
         cell.setAttribute("contenteditable", "true")
         cell.setAttribute("rowId", i - 1);
         cell.setAttribute("colId", j - 1);
         cell.setAttribute("spellcheck", "false")
         rowCont.appendChild(cell);
         ListenerForAddressBarDisplay(cell, i, j)
     }
     cellsCont.appendChild(rowCont)
 }

 function ListenerForAddressBarDisplay(cell, i, j) {
     cell.addEventListener("click", function() {
         let rowId = i;
         let colID = String.fromCharCode(64 + j);
         addressBar.value = colID + rowId;
     })
 }
 // by default click on the first cell
 let firstCell = document.querySelector(".cell");
 firstCell.click();