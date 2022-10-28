let slideIcon = $('#slideIcon');
let nav = $('#nav');
let navItems = $('.navItems li');
let down = $('.down *');
let byLetter = $('#byLetter');
let byName = $('#byName');
let topPosition = 60;
let showContainer = $('.showContainer');
let searchbar = $('.search');



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

//display of search 
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
    if (shadow == undefined) {
        shadow = $(e.target).text();
    }

    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${shadow}`);
    let fetchBody = await fetchPromise.json();
    let result = fetchBody.meals[0];
    extras();




    // handel recipie part ------------------------------------------------//
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
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


    let noSource;
    if (result.strSource != "") {
        noSource = 'Source';
    } else {
        noSource = 'No Source avaiable'
    }

    let noYoutube;
    if (result.strYoutube != "") {
        noYoutube = 'Youtube';
    } else {
        noYoutube = 'No Youtube avaiable'
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
    
 
     <a href="${result.strSource}" class="btn btn-success">${noSource}</a>
     <a href="${result.strYoutube}" class="btn btn-danger">${noYoutube}</a>
    
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
    if (shadow == undefined) {
        shadow = $(e.target).text();
    }
    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${shadow}`);
    let fetchBody = await fetchPromise.json();
    let result = fetchBody.meals;
    showContainer.empty();

    display(result);


})

$(document).on('click', '.area', async function (e) {
    let shadow = e.target;
    shadow = $(shadow).text();
    shadow = shadow.trim();

    if (shadow == '') {
        shadow = $(e.target).parent().text();
        shadow = shadow.trim();
        if (shadow == '') {
            shadow = $(e.target).parent().parent().text();
            shadow = shadow.trim();
        }
    }

    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${shadow}`);
    let fetchBody = await fetchPromise.json();
    let result = fetchBody.meals;
    showContainer.empty();

    display(result);


})
$(document).on('click', '.ing', async function (e) {
    let shadow = e.target;
    shadow = $(shadow).parent().children().eq(1).text();
    console.log(shadow);

    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${shadow}`);
    let fetchBody = await fetchPromise.json();
    let result = fetchBody.meals;
    showContainer.empty();

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
    searchbar.removeClass('d-none')
    searchbar.addClass(['d-flex', 'flex-wrap', 'justify-content-center']);
    showContainer.empty();
    closeNav();

})

// category

$('#category').click(async function () {
    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let fetchBody = await fetchPromise.json();
    let meals = fetchBody.categories;
    extras();
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
    extras();
    AreaDisplay(meals);

})

function AreaDisplay(meals) {
    if (meals != null) {
        for (let i of meals) {
            showContainer.append(`
            <div class="col-xl-3 col-md-4 col-sm-6 col-sm-12 col-xs-12 p-3">
            <div class="w-100 position-relative top-0 start-0  rounded-2 overflow-hidden p-2 area text-center fs-3 fw-light">
            <div>
            <i class="fa-solid fa-earth-americas  fs-1 "></i>
            </div>
                    ${i.strArea}

            </div>
            </div>`
            )
        }

    }

}

$('#ing').click(async function () {
    let fetchPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let fetchBody = await fetchPromise.json();
    let meals = fetchBody.meals;
    extras();
    IngDisplay(meals);


})
function IngDisplay(meals) {
    if (meals != null) {
        for (let i of meals) {
            if (i.strDescription != null) {
                showContainer.append(`<div class="col-xl-3 col-md-4 col-sm-6 col-xs-12 p-3 d-flex align-items-stretch">

            <div class="w-100 position-relative top-0 start-0 ing rounded-2  text-center py-4">
                <div class="d-flex flex-column align-items-center">
                    <div>
                        <i class="fa-solid fa-lemon"></i>
                    </div>
                    <div class="d-flex">
                        <i class="fa-solid fa-seedling"></i>
                        <i class="fa-solid fa-wheat-awn"></i>
                    </div>
                </div>
                <div class="fs-3 ingName my-2">${i.strIngredient}</div>
                <div class="fw-light">
                    ${i.strDescription}
                </div>
            </div>
        </div>`
                )
            }
        }

    }

}

$('#contact').click(function () {
    extras();
    showContainer.html(`<div class="container pt-5 text-center px-5">
    <h1>Contact Us</h1>
    <div class="d-flex flex-wrap p-5 form justify-content-center ">

        <div class="col-md-6 col-sm-12 col-xs-12 p-2">
            <input type="text" name="name" id="userName" placeholder="Your user name "
                class="text-center form-control   " required>
            <!-- <div class="alert alert-danger m-0 p-2">
                ay haga
            </div> -->
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12 p-2">
            <input type="email" name="name" id="userEmail" placeholder="Enter Email"
                class="text-center form-control" required>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12 p-2">
            <input type="number" name="name" id="userPhone" placeholder="Enter Phone number"
                class="text-center form-control" required>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12 p-2">
            <input type="number" name="name" id="userAge" placeholder="Enter Age"
                class="text-center form-control" required>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12 p-2">
            <input type="password" name="name" id="userPass" placeholder="Enter Password"
                class="text-center form-control" required>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12 p-2">
            <input type="password" name="name" id="userConfirm" placeholder="Enter RePassword"
                class="text-center form-control" required>
        </div>

        <button class="btn btn-success mt-5 disabled" >submit</button>
    </div>

</div>`)

})


function extras() {
    showContainer.empty();
    closeNav();
    searchbar.removeClass(['d-flex', 'flex-wrap', 'justify-content-center'])
    searchbar.addClass('d-none');
}


//-----------------------------------------------------------------------------------------------------------------------------------------------//

// validation part
let returnflag;
let flag = [false, false, false, false, false, false];

function testInput(reg, val, message, iput) {
    iput = `#${iput}`;
    if (!(reg.test(val))) {
        if ($(iput).next().length == 0) {
            $(iput).after(`<div class='alert alert-danger m-0 p-2 fw-light'>
       ${message}
   </div>`)

        }
        returnflag = false;
    } else {
        if (!($(iput).next().length == 0)) {
            $(iput).next().remove();
        }
        returnflag = true;
    }
    return returnflag;
}

function enableSubmit(btn) {

    if (flag[0] && flag[1] && flag[2] && flag[3] && flag[4] && flag[5]) {
        btn.removeClass('disabled');
    } else {
        btn.addClass('disabled');
    }
}
$(document).on('keyup , blur', '#userName', function () {
    let val = $('#userName').val();
    let regex = new RegExp('^[a-zA-Z\ ]+$');
    flag[0] = testInput(regex, val, 'Special Characters and Numbers not allowed', 'userName');
    let btn = $('#userName').parent().parent().children().last()

    enableSubmit(btn);
})

$(document).on('keyup , blur', '#userEmail', function () {
    let val = $('#userEmail').val();
    let regex = new RegExp('^[a-zA-Z0-9]{1,}(@){1}[a-zA-Z]{1,}(\.){1}[a-zA-Z]{2,}');
    flag[1] = testInput(regex, val, 'Enter valid email. *Ex: xxx@yyy.zzz', 'userEmail');
    let btn = $('#userName').parent().parent().children().last()

    enableSubmit(btn);
})


$(document).on('keyup , blur', '#userPhone', function () {
    let val = $('#userPhone').val();
    let regex = new RegExp('^(01)[1250]{1}[0-9]{8}');
    flag[2] = testInput(regex, val, 'Enter valid Phone Number start of 01 (1 or 2 or 5 or 0) followed by 8 number', 'userPhone');
    let btn = $('#userName').parent().parent().children().last()

    enableSubmit(btn);
})

$(document).on('keyup , blur', '#userAge', function () {
    let val = $('#userAge').val();
    let regex = new RegExp('^[0-9]{1,2}$|(100)$');
    flag[3] = testInput(regex, val, 'Enter valid Age', 'userAge');
    let btn = $('#userName').parent().parent().children().last()

    enableSubmit(btn);
})

let check;
$(document).on('keyup , blur', '#userPass', function () {
    let val = $('#userPass').val();
    check = val;
    let regex = new RegExp('(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
    flag[4] = testInput(regex, val, 'Enter valid password *Minimum eight characters, at least one Capital letter and one number', 'userPass');
    let btn = $('#userName').parent().parent().children().last()
    enableSubmit(btn);
})

$(document).on('keyup , blur', '#userConfirm', function () {
    let val = $('#userConfirm').val();
    let regex = new RegExp(`(${check})$`);
    flag[5] = testInput(regex, val, 'Enter valid Repassword', 'userConfirm');
    let btn = $('#userName').parent().parent().children().last()
    enableSubmit(btn);
})

