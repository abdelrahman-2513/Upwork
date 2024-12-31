document.addEventListener("DOMContentLoaded", () => {
    const coupons = [
        {
            type: "Online Sales",
            discount: "% Off",
            price: "30%",
            description: "Last 48 HOURS Christmas Sale! Special Offer At Domino's Pizza: Any 2 Or More Medium 2-Topping Pizzas, Breads, Loaded Tots, Boneless Chicken, Pastas, Sandwiches, Salads, Or Desserts Only $7.99",
            code: "15151515"
        },
        {
            type: "Coupon Codes",
            discount: "$ Off",
            price: "$8.99",
            description: "Enjoy Any Oven Baked Sandwich For $8.99 While The Offer Lasts",
            code: "15058884"
        },
        {
            type: "Online Sales",
            discount: "% Off",
            price: "5%",
            description: "Christmas Flash SALE! Enjoy A 3-Piece Order Of Chocolate Lava Crunch Cakes...",
            code: "124578"
        }
    ];

    function renderCoupons(filteredCoupons) {
        couponContainer.innerHTML = "";
        filteredCoupons.forEach((coupon) => {
            const couponCard = document.createElement("div");
            couponCard.classList.add("coupon-card");

            couponCard.innerHTML = `
               <div class="price">
    ${coupon.discount === "% Off" ? `<span>OFF</span> <span>${coupon.price}</span>` : `<span>ONLY</span> <span>${coupon.price}</span>`}
</div>
<div class="mopile"> 
    
<div class="price">
    ${coupon.discount === "% Off" ? `<span>OFF</span> <span>${coupon.price}</span>` : `<span>ONLY</span> <span>${coupon.price}</span>`}
    </div>
            <div class="code-container">
            ${coupon.discount === "$ Off" ? `<div class="cover">
        <span class="cover-text">Show Code</span>
        <div class="scissors">✂️</div>
    </div>
    <button class="show-code" data-code=${coupon.code}>
        <span class="hidden-code">${coupon.code}</span>
    </button> `: `<div class="code-container"><button class="get-deal">Get Deal</button></div>`} 
   
</div>
</div>
<div class="divider"></div>
<div class="coupon-body">
    <div class="coupon-header">
        <span class="coupon-type">${coupon.type}</span>
        <span class="verified"><i class="fas fa-check-circle"></i> Verified</span>
        ${coupon.type === "Coupon Codes"
                    ? `<span class="staff-pick">⭐ Staff Pick</span>`
                    : ""
                }
    </div>
    <p>${coupon.description}</p>
</div>
${coupon.discount === "$ Off" ? `<div class="code-container">
    <div class="cover">
        <span class="cover-text">Show Code</span>
        <div class="scissors">✂️</div>
    </div>
    <button class="show-code" data-code=${coupon.code}>
        <span class="hidden-code">${coupon.code}</span>
    </button>
</div>` : `<div class="code-container"><button class="get-deal">Get Deal</button></div>`}

            `;
            couponContainer.appendChild(couponCard);
        });


        addShowCodeAnimation();
    }
    const couponContainer = document.querySelector(".main-content");
    const couponTypeFilters = document.querySelectorAll("input[name='couponType']");
    const discountTypeFilters = document.querySelectorAll("input[name='discountType']");
    const searchInput = document.querySelectorAll(".search-bar input");

    const searchIcon = document.getElementById('search-icon');
    const mobileSearchBar = document.getElementById('mobile-search-bar');
    const navBar = document.getElementById('nav-bar');






    function filterCoupons() {
        let filteredCoupons = coupons;

        const selectedCouponTypes = Array.from(couponTypeFilters)
            .filter(input => input.checked)
            .map(input => input.value);

        const selectedDiscountTypes = Array.from(discountTypeFilters)
            .filter(input => input.checked)
            .map(input => input.value);

        if (selectedCouponTypes.length > 0) {
            if (selectedCouponTypes.includes("all")) {
                return renderCoupons(coupons);

            }
            filteredCoupons = filteredCoupons.filter(coupon => selectedCouponTypes.includes(coupon.type));
        }

        if (selectedDiscountTypes.length > 0) {
            filteredCoupons = filteredCoupons.filter(coupon => selectedDiscountTypes.includes(coupon.discount));
        }


        renderCoupons(filteredCoupons);
    }

    function handleSearch(val) {
        let filteredCoupons = coupons;
        const searchQuery = val.toLowerCase();
        if (searchQuery) {
            filteredCoupons = filteredCoupons.filter(coupon =>
                coupon.description.toLowerCase().includes(searchQuery)
            );

        }
        console.log(filteredCoupons);
        console.log(searchQuery);
        renderCoupons(filteredCoupons);
    }

    console.log(searchInput)


    couponTypeFilters.forEach(input => input.addEventListener('change', filterCoupons));
    discountTypeFilters.forEach(input => input.addEventListener('change', filterCoupons));
    searchInput.forEach(input => input.addEventListener('input', () => handleSearch(input.value)));

    function addShowCodeAnimation() {
        const showCodeButtons = document.querySelectorAll(".show-code");
        showCodeButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const code = button.dataset.code;
                button.textContent = `Show ${code.slice(0, 2)}**`;
                button.style.position = "relative";
                button.style.transition = "0.3s ease-in-out";
                button.style.width = "80px";

                setTimeout(() => {
                    button.textContent = `Show ${code}`;
                    button.style.width = "auto";
                }, 1000);
            });
        });
    }


    renderCoupons(coupons);
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileBtns = document.getElementById('mobile-btns');

    searchIcon.addEventListener('click', () => {
        console.log('clicked');
        mobileSearchBar.classList.toggle('showen-search');
        mobileSearchBar.classList.toggle('hidden-search');
        if (mobileSearchBar.classList.contains('showen-search')) {
            searchIcon.classList.remove('fa-search');
            searchIcon.innerHTML = 'X';
        } else {
            searchIcon.classList.add('fa-search');
            searchIcon.innerHTML = '';
        }
    });
    menuToggle.addEventListener('click', () => {
        const isOpen = navBar.classList.toggle('hidden-bar');

        menuToggle.innerHTML = isOpen ? '&#9776;' : 'X';
    });

});
