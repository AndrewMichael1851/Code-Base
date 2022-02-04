function runCalculator() {
    let html = ``;
    let minorChildrenExist;
    let spouseOneIncome = document.getElementById("spouseOneIncome").value;
    let spouseTwoIncome = document.getElementById("spouseTwoIncome").value;
    let higherEarner;
    let lowerEarner;
    let approximateSpousalSupport;
    let approximatePendenteLiteChildren;
    let approximatePendenteLiteNoChildren;
    let approximatePendenteLiteDisplay;

    /* Sanitize */
    spouseOneIncome = parseInt(spouseOneIncome);
    spouseTwoIncome = parseInt(spouseTwoIncome);
    if (isNaN(spouseOneIncome) || isNaN(spouseTwoIncome)) {
        html = `
            <p>Error: Please input a valid integer.</p>
            <a class="button reload" href="javascript:window.location.reload(true)">Reload Calculator</a>
            `;
    } else {
        /* Determine if Minor Children Exist */
        if (document.getElementById("minorChildrenYes").checked) {
            minorChildrenExist = true;
        } else if (document.getElementById("minorChildrenNo").checked) {
            minorChildrenExist = false;
        } else {
            console.log("Error: Cannot determine if children exist.");
        }

        /* Determine the Higher Earner */
        if (spouseOneIncome == spouseTwoIncome) {
            html = `<p>No spousal support will be awareded in cases where the spouses earn the same amount.</p>`;
        } else if (spouseOneIncome > spouseTwoIncome) {
            higherEarner = spouseOneIncome;
            lowerEarner = spouseTwoIncome;
        } else if (spouseOneIncome < spouseTwoIncome) {
            higherEarner = spouseTwoIncome;
            lowerEarner = spouseOneIncome;
        } else {
            console.log("Error: Cannot determine higher earner.");
        }

        /* Determine the Approximate Amount of Pendente Lite Support */
        approximatePendenteLiteChildren = parseInt((((0.26) * higherEarner) - ((0.58) * lowerEarner)) / 12);
        approximatePendenteLiteNoChildren = parseInt((((0.27) * higherEarner) - ((0.50) * lowerEarner)) / 12);

        /* Determine the Approximate Amount of Ongoing Support Under Normal Rules */
        approximateSpousalSupport = parseInt((((3/10) * higherEarner) - ((1/2) * lowerEarner)) / 12);

        if (approximateSpousalSupport <= 0) {
            html = html + `<p>In this scenario, neither spouse will likely have to pay support to the other.</p>`
            approximateSpousalSupport = 0;
        }

        /* Display the Amount of Support */
        if (minorChildrenExist == true) {
            html = html + `<p>Approximate Pendente Lite Spousal Support During Divorce (Children): $${approximatePendenteLiteChildren}/Month</p>`;
        } else if (minorChildrenExist == false) {
            html = html + `<p>Approximate Pendente Lite Spousal Support During Divorce (No Children): $${approximatePendenteLiteNoChildren}/Month</p>`;
        } else {
            console.log("Error: Cannot determine if children exist.");
        }

        html = html + `
            <p>Approximate Ongoing Spousal Support after Divorce: $${approximateSpousalSupport}/Month</p>
            <a class="button reload" href="javascript:window.location.reload(true)">Reload Calculator</a>
            `;
        }

    /* Wrap Things Up */
    html = `<div class="content">` + html + `</div>`;
    document.querySelector('main').innerHTML = html;
    console.log(html);
    console.log(minorChildrenExist);
    console.log(spouseOneIncome);
    console.log(spouseTwoIncome);
}
