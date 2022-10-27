let slideIcon = $('#slideIcon');
let nav = $('#nav');
let navItems = $('.navItems li');
let down = $('.down *');
let byLetter = $('#byLetter');
let byName = $('#byName');
let topPosition = 60;
let showContainer = $('.showContainer');



//------------------------------------------------------------------------------------------------------//


// navigation function 
slideIcon.click(function () {

    let navWidth = nav.outerWidth();

    //close
    if (navWidth > 0) {
        nav.animate({ width: '0px' }, 500);
        slideIcon.removeClass('fa-xmark').addClass('fa-bars');
        navItems.css({ display: 'none', top: '70%' });
        down.css({ display: 'none' });

    }
    //open
    else {
        nav.animate({ width: '255px' }, 500);
        slideIcon.removeClass('fa-bars').addClass('fa-xmark');
        navItems.css({ display: 'block' });
        down.css({ display: 'block' });
        $('#search').animate({ top: `${0 + topPosition}px` }, 300);
        $('#category').animate({ top: `${50 + topPosition}px` }, 500);
        $('#area').animate({ top: `${100 + topPosition}px` }, 700);
        $('#ing').animate({ top: `${150 + topPosition}px` }, 900);
        $('#contact').animate({ top: `${200 + topPosition}px` }, 1100);
    }
})
//------------------------------------------------------------------------------------------------------//

// main page 
async function mainPage() {
    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let fetchBody = await fetchPromise.json();
    let meals = fetchBody.meals;
    showContainer.empty();
    display(meals);
}

mainPage();


// search by letter function 
byLetter.prop('maxlength', 1);

byLetter.keyup(async function () {
    let val = byLetter.val();
    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`);
    let fetchBody = await fetchPromise.json();
    let meals = fetchBody.meals;
    showContainer.empty();
    display(meals);

})


// search by name 
byName.keyup(async function () {
    let val = byName.val();
    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
    let fetchBody = await fetchPromise.json();
    let meals = fetchBody.meals;
    showContainer.empty();
    display(meals);
}
)


function display(meals) {
    if (meals != null) {
        for (let i of meals) {
            showContainer.append(`<div class="col-xl-3 col-md-4 col-sm-6 col-xs-12 p-3">

            <div class="w-100 position-relative top-0 start-0 dish rounded-2 overflow-hidden">

                <div class="dishShadow h-100 w-100 d-flex justify-content-center align-items-center ">
                
                    <div class="name text-center  text-white fs-3 fw-bold">${i.strMeal}</div>
                </div>
                <img src=${i.strMealThumb} class="w-100 rounded-2 " alt="">
            </div>
        </div>`
            )
        }

    }
}



$(document).on('mouseover', '.dish', function (e) {
    let shadow = e.target;
    shadow = $(shadow).parent().children().eq(0);
    $(shadow).animate({ top: '0px' }, 800);
});
$(document).on('mouseleave', '.dish', function (e) {
    let shadow = e.target;
    shadow = $(shadow).parent().children().eq(0);

    $(shadow).animate({ top: '100%' }, 500);
});



$(document).on('click', '.dish', async function (e) {
    let shadow = e.target;
    shadow = $(shadow).parent().children().eq(0).children();
    shadow = shadow.html();

    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${shadow}`);
    let fetchBody = await fetchPromise.json();
    let result = fetchBody.meals[0];
    showContainer.empty();





    // handel recipie part ------------------------------------------------//
    let ingredients = '';
    for (let i = 0; i < 20; i++) {
        let index1 = `strMeasure${i}`;
        let index2 = `strIngredient${i}`;
        if (result[index1] != "" && result[index2] != "") {
            ingredients += `<div class="p-2"><div class="recipie p-2 rounded-2">
        ${result[index1] + " " + result[index2]}
    </div></div>`
        }
        else {
            break;
        }
    }

    // handel tags part ------------------------------------------------//
    let tags = '';
    let arr = result.strTags;
    if (arr != null) {
        arr = arr.split(",");

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] != "") {
                tags += `<div class="tags p-2 rounded-2 mx-1">
        ${arr[i]}
    </div>`}
        }
    }



    // handel whole page ------------------------------------------------//
    let res = ` <div class=" col-lg-4 col-md-6 col-xs-12 p-3">
    <img src=${result.strMealThumb} class="col-12 rounded-2" alt="">
    <div class=" text-center fs-3 fw-bold">
        ${shadow}
    </div>
</div>
<div class="col-lg-8 col-md-6 col-xs-12 px-3 pb-3">
   <div>
     <h1>instructions</h1>
     <p>${result.strInstructions}</p>
    
     <div class="d-flex">
         <p class="me-1">Area: </p><span>${result.strArea}</span>
     </div>
     <div class="d-flex">
         <p class="me-1">category: </p><span>${result.strCategory}</span>
     </div>
     <h2>Recipes :</h2>
     <div class="d-flex flex-wrap col-12">
     ${ingredients}
     </div>
     <div class=" col-12 mb-2">
     <h2>tags:</h2>
     <div class="d-flex flex-wrap justify-content-start">
         ${tags}
     </div>
 </div>
    
     <a href=${result.strSource} class="btn btn-success">Source</a>
     <a href=${result.strYoutube} class="btn btn-danger">Youtube</a>
    
   </div>
</div>
</div>`


    showContainer.html(res);

})


$(document).on('mouseover', '.category', function (e) {
    let shadow = e.target;
    shadow = $(shadow).parent().children().eq(0);
    $(shadow).animate({ top: '0px' }, 800);
});
$(document).on('mouseleave', '.category', function (e) {
    let shadow = e.target;
    shadow = $(shadow).parent().children().eq(0);

    $(shadow).animate({ top: '100%' }, 500);
});

$(document).on('click', '.category', async function (e) {
    let shadow = e.target;
    shadow = $(shadow).parent().children().eq(0).children();
    shadow = shadow.html();

    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${shadow}`);
    let fetchBody = await fetchPromise.json();
    let result = fetchBody.meals;
    showContainer.empty();
    console.log(result);
    display(result);


})

$(document).on('click', '.area', async function (e) {
    let shadow = e.target;
    shadow = $(shadow).text();
    shadow=shadow.trim();
    console.log(shadow);
    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${shadow}`);
    let fetchBody = await fetchPromise.json();
    let result = fetchBody.meals;
    showContainer.empty();
    console.log(result);
    display(result);


})
function closeNav() {
    nav.animate({ width: '0px' }, 500);
    slideIcon.removeClass('fa-xmark').addClass('fa-bars');
    navItems.css({ display: 'none', top: '70%' });
    down.css({ display: 'none' });
}


// nav bar actions 

//search
$('#search').click(function () {
    $('.search').addClass(['d-flex', 'flex-wrap', 'justify-content-center']);
    showContainer.empty();
    closeNav();

})

// category

$('#category').click(async function () {
    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let fetchBody = await fetchPromise.json();
    let meals = fetchBody.categories;
    showContainer.empty();
    closeNav();
    categoryDisplay(meals);

});
function categoryDisplay(meals) {
    if (meals != null) {
        for (let i of meals) {
            showContainer.append(`<div class="col-xl-3 col-md-4 col-sm-6 col-xs-12 p-3">

            <div class="w-100 position-relative top-0 start-0 category rounded-2 overflow-hidden">

                <div class="categoryShadow h-100 w-100 d-flex justify-content-center align-items-center ">
                
                    <div class="name text-center  text-white fs-3 fw-bold">${i.strCategory}</div>
                </div>
                <img src=${i.strCategoryThumb} class="w-100 rounded-2 " alt="">
            </div>
        </div>`
            )
        }

    }
}


//Area

$('#area').click(async function () {
    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let fetchBody = await fetchPromise.json();
    let meals = fetchBody.meals;
    showContainer.empty(); 
    console.log(fetchBody);
    closeNav();
   
    AreaDisplay(meals);

})

function AreaDisplay(meals) {
    if (meals != null) {
        for (let i of meals) {
            showContainer.append(`<div class="col-xl-3 col-md-4 col-sm-6 col-xs-12 p-3">
            <div class="w-100 position-relative top-0 start-0  rounded-2 overflow-hidden p-2 area">
                    ${i.strArea}
            </div>
        </div>`
            )
        }

    }

}