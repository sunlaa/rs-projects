let json = `[
    {
      "name": "Irish coffee",
      "image": "images/coffee-1.svg",
      "description": "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
      "price": "7.00",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Kahlua coffee",
      "image": "images/coffee-2.svg",
      "description": "Classic coffee with milk and Kahlua liqueur under a cap of frothed milk",
      "price": "7.00",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Honey raf",
      "image": "images/coffee-3.svg",
      "description": "Espresso with frothed milk, cream and aromatic honey",
      "price": "5.50",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Ice cappuccino",
      "image": "images/coffee-4.svg",
      "description": "Cappuccino with soft thick foam in summer version with ice",
      "price": "5.00",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Espresso",
      "image": "images/coffee-5.svg",
      "description": "Classic black coffee",
      "price": "4.50",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Latte",
      "image": "images/coffee-6.svg",
      "description": "Espresso coffee with the addition of steamed milk and dense milk foam",
      "price": "5.50",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Latte macchiato",
      "image": "images/coffee-7.svg",
      "description": "Espresso with frothed milk and chocolate",
      "price": "5.50",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Coffee with cognac",
      "image": "images/coffee-8.svg",
      "description": "Fragrant black coffee with cognac and whipped cream",
      "price": "6.50",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Moroccan",
      "image": "images/tea-1.svg",
      "description": "Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint",
      "price": "4.50",
      "category": "tea",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Lemon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Ginger",
      "image": "images/tea-2.svg",
      "description": "Original black tea with fresh ginger, lemon and honey",
      "price": "5.00",
      "category": "tea",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Lemon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Cranberry",
      "image": "images/tea-3.svg",
      "description": "Invigorating black tea with cranberry and honey",
      "price": "5.00",
      "category": "tea",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Lemon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Sea buckthorn",
      "image": "images/tea-4.svg",
      "description": "Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon",
      "price": "5.50",
      "category": "tea",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Lemon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Marble cheesecake",
      "image": "images/dessert-1.svg",
      "description": "Philadelphia cheese with lemon zest on a light sponge cake and red currant jam",
      "price": "3.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Red velvet",
      "image": "images/dessert-2.svg",
      "description": "Layer cake with cream cheese frosting",
      "price": "4.00",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Cheesecakes",
      "image": "images/dessert-3.svg",
      "description": "Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar",
      "price": "4.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Creme brulee",
      "image": "images/dessert-4.svg",
      "description": "Delicate creamy dessert in a caramel basket with wild berries",
      "price": "4.00",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Pancakes",
      "image": "images/dessert-5.svg",
      "description": "Tender pancakes with strawberry jam and fresh strawberries",
      "price": "4.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Honey cake",
      "image": "images/dessert-6.svg",
      "description": "Classic honey cake with delicate custard",
      "price": "4.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Chocolate cake",
      "image": "images/dessert-7.svg",
      "description": "Cake with hot chocolate filling and nuts with dried apricots",
      "price": "5.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "name": "Black forest",
      "image": "images/dessert-8.svg",
      "description": "A combination of thin sponge cake with cherry jam and light chocolate mousse",
      "price": "6.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    }
  ]`

  export default json;