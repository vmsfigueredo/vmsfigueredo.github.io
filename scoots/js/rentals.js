db.get().then(db => {
    console.log(db);
    db.vehicles.map(vehicle => {
        const vehiclesTable = document.querySelector("#vehicles");
        // Create all Elements
        const tr = document.createElement("tr");
        const viTd = document.createElement("td");
        const viImg = document.createElement("img");
        const vnTd = document.createElement("td");
        const mcTd = document.createElement("td");
        const rqTd = document.createElement("td");
        const rhdTd = document.createElement("td");
        const whdTd = document.createElement("td");
        const rfdTd = document.createElement("td");
        const wfdTd = document.createElement("td");

        // Add attributes

        viImg.setAttribute("src", `images/vehicles/${vehicle.image}`);

        // Insert Elements

        viTd.appendChild(viImg);

        // Insert text in all elements
        vnTd.appendChild(document.createTextNode(vehicle.name));
        mcTd.appendChild(document.createTextNode(vehicle.max_people));
        rqTd.appendChild(document.createTextNode(vehicle.requirements ? `${db.requirements.join(", ")}, ${vehicle.requirements.join(", ")}` : db.requirements.join(", ")));
        rhdTd.appendChild(document.createTextNode(`$${vehicle.prices['reservation']['half-day']}`))
        whdTd.appendChild(document.createTextNode(`$${vehicle.prices['walk-in']['half-day']}`))
        rfdTd.appendChild(document.createTextNode(`$${vehicle.prices['reservation']['full-day']}`))
        wfdTd.appendChild(document.createTextNode(`$${vehicle.prices['walk-in']['full-day']}`))
        
        // insert all elements into tr
        tr.appendChild(viTd);
        tr.appendChild(vnTd);
        tr.appendChild(mcTd);
        tr.appendChild(rqTd);
        tr.appendChild(rhdTd);
        tr.appendChild(whdTd);
        tr.appendChild(rfdTd);
        tr.appendChild(wfdTd);

        // insert tr to table;
        vehiclesTable.appendChild(tr);
    });
})