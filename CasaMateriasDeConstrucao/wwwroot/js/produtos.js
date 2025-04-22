const priceRange = document.getElementById('priceRange');
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        
        priceRange.addEventListener('input', function() {
            maxPrice.value = this.value;
        });
        
        maxPrice.addEventListener('input', function() {
            if (parseInt(this.value) > 1000) {
                this.value = 1000;
            }
            priceRange.value = this.value;
        });
        
        minPrice.addEventListener('input', function() {
            if (parseInt(this.value) < 0) {
                this.value = 0;
            }
        });