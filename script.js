/* =========================
   CARTCOMPARE - SCRIPT.JS
   ========================= */
/* ---------- DEMO PRODUCT DATA ---------- */
/*
   अभी ये demo prices हैं.
   बाद में इन्हें हमारे BACKEND/API से
   automatically प्राप्त किया जाएगा.
*/
const products = [
    {
        id: 1,
        name: "Tomato",
        quantity: "1 kg",
        emoji: "🍅",
        platforms: [
            {
                name: "Zepto",
                price: 38,
                url: "https://www.zepto.com/"
            },
            {
                name: "Blinkit",
                price: 41,
                url: "https://blinkit.com/"
            },
            {
                name: "Zomato",
                price: 40,
                url: "https://www.zomato.com/"
            },
            {
                name: "Instamart",
                price: 43,
                url: "https://www.swiggy.com/instamart"
            }
        ]
    },
    {
        id: 2,
        name: "Onion",
        quantity: "1 kg",
        emoji: "🧅",
        platforms: [
            {
                name: "Zepto",
                price: 39,
                url: "https://www.zepto.com/"
            },
            {
                name: "Blinkit",
                price: 42,
                url: "https://blinkit.com/"
            },
            {
                name: "Zomato",
                price: 44,
                url: "https://www.zomato.com/"
            },
            {
                name: "Instamart",
                price: 45,
                url: "https://www.swiggy.com/instamart"
            }
        ]
    },
    {
        id: 3,
        name: "Milk",
        quantity: "1 litre",
        emoji: "🥛",
        platforms: [
            {
                name: "Zepto",
                price: 64,
                url: "https://www.zepto.com/"
            },
            {
                name: "Blinkit",
                price: 62,
                url: "https://blinkit.com/"
            },
            {
                name: "Zomato",
                price: 60,
                url: "https://www.zomato.com/"
            },
            {
                name: "Instamart",
                price: 59,
                url: "https://www.swiggy.com/instamart"
            }
        ]
    },
    {
        id: 4,
        name: "Bread",
        quantity: "1 pack",
        emoji: "🍞",
        platforms: [
            {
                name: "Zepto",
                price: 42,
                url: "https://www.zepto.com/"
            },
            {
                name: "Blinkit",
                price: 45,
                url: "https://blinkit.com/"
            },
            {
                name: "Zomato",
                price: 44,
                url: "https://www.zomato.com/"
            },
            {
                name: "Instamart",
                price: 46,
                url: "https://www.swiggy.com/instamart"
            }
        ]
    },
    {
        id: 5,
        name: "Eggs",
        quantity: "12 pieces",
        emoji: "🥚",
        platforms: [
            {
                name: "Zepto",
                price: 82,
                url: "https://www.zepto.com/"
            },
            {
                name: "Blinkit",
                price: 78,
                url: "https://blinkit.com/"
            },
            {
                name: "Zomato",
                price: 76,
                url: "https://www.zomato.com/"
            },
            {
                name: "Instamart",
                price: 75,
                url: "https://www.swiggy.com/instamart"
            }
        ]
    },
    {
        id: 6,
        name: "Coriander",
        quantity: "1 bunch",
        emoji: "🌿",
        platforms: [
            {
                name: "Zepto",
                price: 20,
                url: "https://www.zepto.com/"
            },
            {
                name: "Blinkit",
                price: 22,
                url: "https://blinkit.com/"
            },
            {
                name: "Zomato",
                price: 18,
                url: "https://www.zomato.com/"
            },
            {
                name: "Instamart",
                price: 21,
                url: "https://www.swiggy.com/instamart"
            }
        ]
    }
];
/* ---------- CART ---------- */
let cart = [];
/* ---------- SEARCH PRODUCT ---------- */
function searchProduct() {
    const input = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();
    const resultsContainer =
        document.getElementById("productResults");
    const resultText =
        document.getElementById("resultText");
    resultsContainer.innerHTML = "";
    if (input === "") {
        resultText.textContent =
            "Please search for a product.";
        return;
    }
    /*
       Simple search.
       Example:
       "tomato"
       "tomato 1 kg"
       "milk"
    */
    const matchedProducts = products.filter(product => {
        const searchableText =
            (
                product.name +
                " " +
                product.quantity
            ).toLowerCase();
        return searchableText.includes(input)
            || input.includes(product.name.toLowerCase());
    });
    if (matchedProducts.length === 0) {
        resultText.textContent =
            "No product found.";
        resultsContainer.innerHTML = `
            <div class="empty-cart">
                Sorry, we couldn't find that product.
            </div>
        `;
        return;
    }
    resultText.textContent =
        `${matchedProducts.length} product found`;
    matchedProducts.forEach(product => {
        resultsContainer.innerHTML +=
            createProductCard(product);
    });
}
/* ---------- CREATE PRODUCT CARD ---------- */
function createProductCard(product) {
    /*
       Find cheapest platform
    */
    const cheapestPlatform =
        product.platforms.reduce(
            (lowest, current) =>
                current.price < lowest.price
                    ? current
                    : lowest
        );
    /*
       Create platform rows
    */
    const platformRows =
        product.platforms.map(platform => {
            const isCheapest =
                platform.name ===
                cheapestPlatform.name;
            return `
                <div class="platform-row
                    ${isCheapest ? "cheapest" : ""}">
                    <div class="platform-info">
                        <div class="platform-logo">
                            ${platform.name
                                .substring(0, 2)
                                .toUpperCase()}
                        </div>
                        <div>
                            <div class="platform-name">
                                ${platform.name}
                                ${
                                    isCheapest
                                        ? `<span class="best-price">
                                            LOWEST
                                           </span>`
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div class="platform-price">
                        ₹${platform.price}
                    </div>
                </div>
            `;
        }).join("");
    return `
        <div class="product-card">
            <div class="product-header">
                <div class="product-image">
                    ${product.emoji}
                </div>
                <div>
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-quantity">
                        ${product.quantity}
                    </div>
                </div>
            </div>
            ${platformRows}
            <button
                class="buy-button"
                onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
}
/* ---------- ADD TO CART ---------- */
function addToCart(productId) {
    const product =
        products.find(
            product => product.id === productId
        );
    if (!product) {
        return;
    }
    /*
       Prevent duplicate products
    */
    const alreadyExists =
        cart.some(
            item => item.id === productId
        );
    if (alreadyExists) {
        alert(
            `${product.name} is already in your basket.`
        );
        return;
    }
    cart.push(product);
    updateCart();
    /*
       Automatically scroll to cart
    */
    document
        .getElementById("cartSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}
/* ---------- UPDATE CART ---------- */
function updateCart() {
    const cartItems =
        document.getElementById("cartItems");
    const cartCount =
        document.getElementById("cartCount");
    const cartTotal =
        document.getElementById("cartTotal");
    const cartSummary =
        document.getElementById("cartSummary");
    /*
       Update cart count
    */
    cartCount.textContent =
        cart.length;
    /*
       Empty cart
    */
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Your basket is empty.
            </p>
        `;
        cartTotal.textContent = "₹0";
        cartSummary.innerHTML = "";
        return;
    }
    /*
       Create cart items
    */
    cartItems.innerHTML =
        cart.map(product => {
            const cheapest =
                product.platforms.reduce(
                    (lowest, current) =>
                        current.price < lowest.price
                            ? current
                            : lowest
                );
            return `
                <div class="cart-item">
                    <div>
                        <div class="cart-item-name">
                            ${product.emoji}
                            ${product.name}
                            (${product.quantity})
                        </div>
                        <div class="cart-item-platform">
                            Cheapest:
                            ${cheapest.name}
                        </div>
                    </div>
                    <div class="cart-item-price">
                        ₹${cheapest.price}
                    </div>
                </div>
            `;
        }).join("");
    /*
       Calculate total
    */
    const total =
        cart.reduce((sum, product) => {
            const cheapest =
                product.platforms.reduce(
                    (lowest, current) =>
                        current.price < lowest.price
                            ? current
                            : lowest
                );
            return sum + cheapest.price;
        }, 0);
    cartTotal.textContent =
        `₹${total}`;
    /*
       Find cheapest platform
       for the entire basket
    */
    const platformTotals = {};
    cart.forEach(product => {
        product.platforms.forEach(platform => {
            if (!platformTotals[platform.name]) {
                platformTotals[platform.name] = 0;
            }
            platformTotals[platform.name] +=
                platform.price;
        });
    });
    /*
       Find cheapest single platform
    */
    let cheapestSinglePlatform = null;
    let cheapestSingleTotal = Infinity;
    Object.entries(platformTotals)
        .forEach(([platform, total]) => {
            if (total < cheapestSingleTotal) {
                cheapestSingleTotal = total;
                cheapestSinglePlatform =
                    platform;
            }
        });
    /*
       Display summary
    */
    cartSummary.innerHTML = `
        <div class="summary-row">
            <span>
                Cheapest individual prices
            </span>
            <strong>
                ₹${total}
            </strong>
        </div>
        <div class="summary-row">
            <span>
                Cheapest single platform
            </span>
            <strong>
                ${cheapestSinglePlatform}
                — ₹${cheapestSingleTotal}
            </strong>
        </div>
        <div class="summary-row total">
            <span>
                Best basket estimate
            </span>
            <span>
                ₹${total}
            </span>
        </div>
        <button
            class="buy-button"
            onclick="buyCheapestPlatform()">
            Buy Now
        </button>
    `;
}
/* ---------- OPEN CART ---------- */
function openCart() {
    document
        .getElementById("cartSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}
/* ---------- BUY NOW ---------- */
function buyCheapestPlatform() {
    if (cart.length === 0) {
        alert(
            "Please add products to your basket first."
        );
        return;
    }
    /*
       Determine the platform with
       the lowest total price.
       IMPORTANT:
       This is only demo logic.
       Later this will be replaced by
       our real backend optimization engine.
    */
    const platformTotals = {};
    cart.forEach(product => {
        product.platforms.forEach(platform => {
            if (!platformTotals[platform.name]) {
                platformTotals[platform.name] = 0;
            }
            platformTotals[platform.name] +=
                platform.price;
        });
    });
    let bestPlatform = null;
    let bestTotal = Infinity;
    Object.entries(platformTotals)
        .forEach(([platform, total]) => {
            if (total < bestTotal) {
                bestTotal = total;
                bestPlatform =
                    platform;
            }
        });
    /*
       Find platform URL
    */
    const platformData =
        cart[0].platforms.find(
            platform =>
                platform.name === bestPlatform
        );
    if (!platformData) {
        alert(
            "Platform link is not available."
        );
        return;
    }
    /*
       Confirm before redirect
    */
    const confirmed =
        confirm(
            `Your cheapest single-platform option is ${bestPlatform} at approximately ₹${bestTotal}.\n\nContinue to ${bestPlatform}?`
        );
    if (!confirmed) {
        return;
    }
    /*
       Redirect to external platform
    */
    window.open(
        platformData.url,
        "_blank"
    );
}
/* ---------- INITIAL LOAD ---------- */
updateCart();
