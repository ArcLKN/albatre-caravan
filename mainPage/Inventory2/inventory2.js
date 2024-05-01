
    const inventoryItems = [
        { 
            name: "Health Potion",
            type: "Health",
            quantity: 3,
            value: 10,
            imgFile: "sword.jpeg",
            description: "Restores health when consumed",
            rarity: "Common",
            assignedTo:"timmy"
        },
        { 
            name: "Sword",
            type: "Weapon",
            quantity: 1,
            value: 50,
            imgFile: "sword.jpeg",
            description: "A basic sword for melee combat",
            rarity: "Epic",
            assignedTo:"jesus, joanne"
        },
        { 
            name: "Armor",
            type: "Armor",
            quantity: 1,
            value: 100,
            imgFile: "Pablo.jpg",
            description: "Protective armor for defense",
            rarity: "Legendary",
            assignedTo:"hassan"
        },
        { 
            name: "Magic Elixir",
            type: "Health",
            quantity: 2,
            value: 20,
            imgFile: "Pablo.jpg",
            description: "Grants temporary magical abilities",
            rarity: "Rare",
            assignedTo:""
        },
        { 
            name: "Shield",
            type: "Armor",
            quantity: 1,
            value: 80,
            imgFile: "sword.jpeg",
            description: "Provides additional defense against attacks",
            rarity: "Common",
            assignedTo:""
        },
        { 
            name: "Bow",
            type: "Weapon",
            quantity: 2,
            value: 60,
            imgFile: "sword.jpeg",
            description: "Ranged weapon for precise attacks",
            rarity: "Epic",
            assignedTo:""
        }
    ];//this js will generate the itemboxes for each item
    //filters out items based on selected type before generating the item list
    function renderItems(filterType = 'all') {
        const itemList = document.getElementById('item-list');
        itemList.innerHTML = ''; // Clear previous items

        inventoryItems.forEach(item => {
            if (filterType === 'all' || item.type === filterType) {
                //creates the itembox
                const itemElement = document.createElement('div');
                //harvests rarity variable to assign color later
                itemElement.className = `inventory-item rarity-${item.rarity.toLowerCase()}`;
                
                //adds item img to the grid item card
                const imgElement = document.createElement('img');
                imgElement.src = item.imgFile;
                imgElement.alt = item.name;
                itemElement.appendChild(imgElement);

                //adds title
                const titleElement = document.createElement('div');
                titleElement.className = 'item-title';
                titleElement.textContent = item.name;
                itemElement.appendChild(titleElement);

                //adds the info button for each item
                //there is probably a better way to do this but idk
                const infoImg = document.createElement('img');
                infoImg.src = "info.png"; 
                infoImg.alt = "Info";
                infoImg.className = 'info-img';
                itemElement.appendChild(infoImg);
                
                //creates extra info element that is presented during hover
                const extraInfoElement = document.createElement('div');
                extraInfoElement.className = 'extra-info';
                //this line formats the info presented during hover
                //added the assigned to element to the extra info, the spacing needs to be fixed
                extraInfoElement.innerHTML = `Type: ${item.type}<br>Description: ${item.description}<br>Quantity: ${item.quantity}<br>Value: ${item.value}<br>Assigned To:${item.assignedTo}`;
                itemElement.appendChild(extraInfoElement);

                //removes title,img,info button during hover over info button
                infoImg.addEventListener('mouseenter', () => {
                    infoImg.style.display = 'none';
                    extraInfoElement.style.display = 'block';
                    titleElement.style.display='none';
                    imgElement.style.display='none';
                    
                });
                //redisplayes the title img,info button after hover, while hiding extra info
                infoImg.addEventListener('mouseleave', () => {
                    infoImg.style.display = 'block';
                    extraInfoElement.style.display = 'none';
                    titleElement.style.display='block';
                    imgElement.style.display='block';
                    
                });

                itemList.appendChild(itemElement);
            }
        });
    }

    // item filter 
    const filterSelect = document.getElementById('item-type-filter');
    filterSelect.addEventListener('change', function() {
        const selectedType = this.value;
        renderItems(selectedType);
    });

    renderItems(); //renders all items
