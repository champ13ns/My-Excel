for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cell = document.querySelector(`.cell[rowid="${i}"][colid="${j}"]`); // UI cell grid
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [cell, cellProp] = activeCell(address);
            let enteredData = cell.innerText;
            if (enteredData == cellProp.value) return;
            cellProp.value = enteredData;
            removeChildFromParent(cellProp.formula)
            cellProp.formula = "";
            updateChildValue(address)
            cellProp.value = enteredData;
        })
    }

}
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", function(e) {
    let inputFormula = formulaBar.value;
    if (e.key === "Enter" && inputFormula) {
        let address = addressBar.value;
        let [cell, cellProp] = activeCell(address);
        let result = inputFormula.localeCompare(cellProp.formula)
        let tbp = cellProp.formula + "";
        console.log("20 ", inputFormula, " cellProp ", cellProp.formula)
        console.log("21 ", result)
        if (result == -1) removeChildFromParent(tbp);
        addChildToGraphComponent(inputFormula, address);
        let isCyclic = isGraphCyclic(graphComponentMatrix);
        if (isCyclic === true) {
            alert("Formula is cyclic!!");
            removeChildFromGraphComponent(inputFormula, address);
            return;
        }
        let evaluatedValue = evaluateFormula(inputFormula);
        setcellUIAndCellprop(evaluatedValue, inputFormula, address);
        addChildToParent(inputFormula);
        updateChildValue(address);
    }
})

function updateChildValue(parentAddress) {
    let [cell, cellProp] = activeCell(parentAddress);
    let children = cellProp.children;
    for (let i = 0; i < children.length; i++) {
        let [cell, childCellProp] = activeCell(children[i]);
        let childFormula = childCellProp.formula;
        let evaluatedValue = evaluateFormula(childFormula)
        setcellUIAndCellprop(evaluatedValue, childFormula, children[i]);
        updateChildValue(children[i]);
    }
}

function addChildToParent(inputFormula) {
    let address = addressBar.value;
    let encoded_formula = inputFormula.split(" ");
    for (let i = 0; i < encoded_formula.length; i++) {
        let asciiValue = encoded_formula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, ParentProp] = activeCell(encoded_formula[i]);
            ParentProp.children.push(address)
        }
    }
}

function removeChildFromParent(formula) {
    let address = addressBar.value;
    let encoded_formula = formula.split(" ");
    for (let i = 0; i < encoded_formula.length; i++) {
        let asciiValue = encoded_formula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, ParentProp] = activeCell(encoded_formula[i]);
            let idx = ParentProp.children.indexOf(address);
            ParentProp.children.splice(idx, 1);
        }
    }
}

function evaluateFormula(inputFormula) {
    let encoded_formula = inputFormula.split(" ");
    for (let i = 0; i < encoded_formula.length; i++) {
        if (encoded_formula[i].charCodeAt(0) >= 65 && encoded_formula[i].charCodeAt(0) <= 90) {
            let [cell, cellProp] = activeCell(encoded_formula[i]);
            encoded_formula[i] = cell.innerText;
        }
    }
    let decoded_formula = encoded_formula.join(" ")
    return eval(decoded_formula)
}

function setcellUIAndCellprop(evaluatedValue, formula, address) {
    let [cell, cellProp] = activeCell(address);
    cell.innerText = evaluatedValue;
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
    console.log(matrix)
}

function addChildToGraphComponent(formula, childAdress) {
    let [crid, ccid] = decode_rid_cid(childAdress);
    let encoded_formula = formula.split(" ");
    for (let i = 0; i < encoded_formula.length; i++) {
        let asciiValue = encoded_formula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [rid, cid] = decode_rid_cid(encoded_formula[i]);
            graphComponentMatrix[rid][cid].push([crid, ccid]);
        }
    }
}

function removeChildFromGraphComponent(inputFormula, childAdress) {
    let [crid, ccid] = decode_rid_cid(childAdress);
    let encoded_formula = inputFormula.split(" ");
    for (let i = 0; i < encoded_formula.length; i++) {
        let asciiValue = encoded_formula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [rid, cid] = decode_rid_cid(encoded_formula[i]);
            graphComponentMatrix[rid][cid].pop();
        }
    }
}