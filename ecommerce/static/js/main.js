// Document Ready
$(document).ready(function() {
    // Initialize carousels
    $('.brand-carousel').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    $('.testimonial-carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Main carousel animation
    $('#mainCarousel').on('slide.bs.carousel', function () {
        $('.carousel-caption h5').removeClass('animate__fadeInDown');
        $('.carousel-caption p').removeClass('animate__fadeInUp');
    });

    $('#mainCarousel').on('slid.bs.carousel', function () {
        $('.carousel-caption h5').addClass('animate__fadeInDown');
        $('.carousel-caption p').addClass('animate__fadeInUp');
    });

    // Quick view modal
    $('.quick-view').click(function() {
        // In a real implementation, you would fetch product details via AJAX
        // Here we're just showing the modal with placeholder data
        $('#quickViewModal').modal('show');
    });

    // Product gallery thumbnail click
    $('.thumbnail-images .img-thumbnail').click(function() {
        $('.thumbnail-images .img-thumbnail').removeClass('active');
        $(this).addClass('active');
        var newSrc = $(this).attr('src');
        $('#mainImage').attr('src', newSrc);
    });

    // Color option selection
    $('.color-option').click(function() {
        $('.color-option').removeClass('active');
        $(this).addClass('active');
    });

    // Quantity buttons
    $('.quantity-btn.plus').click(function() {
        var input = $(this).siblings('.quantity-input');
        var value = parseInt(input.val());
        input.val(value + 1);
    });

    $('.quantity-btn.minus').click(function() {
        var input = $(this).siblings('.quantity-input');
        var value = parseInt(input.val());
        if (value > 1) {
            input.val(value - 1);
        }
    });

    // Tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            500,
            'linear'
        );
    });
});

// Cart functionality (cart.js)
var updateBtns = document.getElementsByClassName('update-cart')

for (i = 0; i < updateBtns.length; i++) {
    updateBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('productId:', productId, 'Action:', action)
        console.log('USER:', user)

        if (user == 'AnonymousUser'){
            console.log('User is not authenticated')
        }else{
            updateUserOrder(productId, action)
        }
    })
}

function updateUserOrder(productId, action){
    console.log('User is authenticated, sending data...')

    var url = '/update_item/'

    fetch(url, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        }, 
        body:JSON.stringify({'productId':productId, 'action':action})
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log('data:', data)
        location.reload()
    });
}