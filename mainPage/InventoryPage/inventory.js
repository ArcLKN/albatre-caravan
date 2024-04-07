document.addEventListener("DOMContentLoaded", function() {
    const healthList = document.getElementById("health-list");
    const weaponList = document.getElementById("weapon-list");
    const armorList = document.getElementById("armor-list");
    
    //declared items to test
    const inventoryItems = [
        { 
            name: "Health Potion",
            type: "Health",
            quantity: 3,
            value: 10,
            imgFile: "health_potion.png",
            description: "Restores health when consumed",
            rarity: "Common"
        },
        { 
            name: "Sword",
            type: "Weapon",
            quantity: 1,
            value: 50,
            imgFile: "sword.png",
            description: "A basic sword for melee combat",
            rarity: "Epic"
        },
        { 
            name: "Armor",
            type: "Armor",
            quantity: 1,
            value: 100,
            imgFile: "armor.png",
            description: "Protective armor for defense",
            rarity: "Legendary"
        },
        { 
            name: "Magic Elixir",
            type: "Health",
            quantity: 2,
            value: 20,
            imgFile: "magic_elixir.png",
            description: "Grants temporary magical abilities",
            rarity: "Rare"
        },
        { 
            name: "Shield",
            type: "Armor",
            quantity: 1,
            value: 80,
            imgFile: "shield.png",
            description: "Provides additional defense against attacks",
            rarity: "Common"
        },
        { 
            name: "Bow",
            type: "Weapon",
            quantity: 2,
            value: 60,
            imgFile: "bow.png",
            description: "Ranged weapon for precise attacks",
            rarity: "Epic"
        }
    ];

    function renderInventory() {
        healthList.innerHTML = '';
        weaponList.innerHTML = '';
        armorList.innerHTML = '';

        inventoryItems.forEach(item => {
            const li = document.createElement("li");
            li.classList.add('inventory-item');

            // Apply rarity class based on item rarity
            switch (item.rarity.toLowerCase()) {
                case "common":
                    li.classList.add('rarity-common');
                    break;
                case "rare":
                    li.classList.add('rarity-rare');
                    break;
                case "legendary":
                    li.classList.add('rarity-legendary');
                    break;
                case "epic":
                    li.classList.add('rarity-epic');
                    break;
                default:
                    li.classList.add('rarity-common'); // Default to common rarity
                    break;
            }

            const img = document.createElement("img");
            img.src = item.imgFile;
            img.alt = item.name;
            img.title = item.name;
            li.appendChild(img);

            const itemDetails = document.createElement("div");
            itemDetails.classList.add('item-details');

            const itemName = document.createElement("h3");
            itemName.textContent = item.name;
            itemDetails.appendChild(itemName);

            const valueQuantity = document.createElement("p");
            valueQuantity.textContent = `Value: ${item.value} | Quantity: ${item.quantity}`;
            valueQuantity.classList.add('value-quantity');
            itemDetails.appendChild(valueQuantity);

            const description = document.createElement("p");
            description.textContent = item.description;
            description.classList.add('description');
            itemDetails.appendChild(description);

            li.appendChild(itemDetails);

            switch (item.type) {
                case "Health":
                    healthList.appendChild(li);
                    break;
                case "Weapon":
                    weaponList.appendChild(li);
                    break;
                case "Armor":
                    armorList.appendChild(li);
                    break;
                default:
                    break;
            }

            // Show description on hover
            li.addEventListener("mouseenter", () => {
                description.style.display = 'block';
            });

            li.addEventListener("mouseleave", () => {
                description.style.display = 'none';
            });
        });
    }

    renderInventory(); // Initial render of inventory
});

//adds dropdown at the top to filter by item type
document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('item-type-select');
    const groups = document.querySelectorAll('.inventory-group');

    selectElement.addEventListener('change', function(event) {
        const selectedValue = event.target.value;

        groups.forEach(group => {
            if (selectedValue === 'all') {
                group.style.display = 'block'; // Show all groups
            } else {
                const groupId = group.getAttribute('id');
                if (groupId === `${selectedValue}-group`) {
                    group.style.display = 'block'; // Show selected group
                } else {
                    group.style.display = 'none'; // Hide other groups
                }
            }
        });
    });
});
