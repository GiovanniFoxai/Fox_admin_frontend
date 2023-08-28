// $(document).ready(function(){

//     $('#nav-menu-close-btn').click(function(){
//         $('#menu-container').removeClass("mobile-slide");
//         $('#menu-container').addClass("menu_width_zero");
//     });

//     $('#main_menu_active').click(function(){
//         $('#menu-container').toggleClass("mobile-slide");
//     });

//     $('#open_side_bar').click(function(){
//         $('#menu-container').toggleClass("mobile-slide");
//     });

//     $("#profile_btn").click(function(){
//         $("#profile_option").toggleClass("displaybox")
//     });

//     $("#openbox").click(function(){
//         $("#openbox_data").toggleClass("displaybox")
//     });

//     $("#open_drop_down_btn").click(function(){
//         $("#close_drop_down_btn").toggleClass("displaybox")
//     });

//     $("#filter_btn").click(function(){
//         $("#filterbox").toggleClass("show");
//         $("#openbox").css({"display":"none"});
//         $("#filter_btn").css({"display":"none"});
//     });

//     $("#cross_icon").click(function(){
//         $("#filterbox").removeClass("show");
//         $("#openbox").css({"display":"block"});
//         $("#filter_btn").css({"display":"block"});
//     });

//     $("#open_pop_btn").click(function(){
//         $("#open_pop_close").toggleClass("displaybox")
//     });
// });

// Commone Function for toggle class on an element
function toggleClass(elementId, className) {
    const element = document.getElementById(elementId);
    element.classList.toggle(className);
  }
  
  // Menu event handlers Start Here
  document.getElementById('nav-menu-close-btn').addEventListener('click', function(){
      document.getElementById('menu-container').classList.remove("mobile-slide");
      document.getElementById('menu-container').classList.add("menu_width_zero");
  });
  
  document.getElementById('main_menu_active').addEventListener('click', function(){
      toggleClass('menu-container','mobile-slide');
  });
  
  document.getElementById('open_side_bar').addEventListener('click', function(){
      toggleClass('menu-container','mobile-slide');
  });
  
  // Menu event handlers End Here
  
  // Profile Toggle Start Here
  document.getElementById("profile_btn").addEventListener('click', function(){
      toggleClass('profile_option','displaybox');
  });
  
  
  document.getElementById("openbox").addEventListener('click', function(){
      toggleClass('openbox_data','displaybox');
  });
  
  document.getElementById("open_drop_down_btn").addEventListener('click', function(){
      toggleClass('close_drop_down_btn','displaybox');
  });
  
  document.getElementById("filter_btn").addEventListener('click', function(){
      toggleClass('filterbox','show');
      document.getElementById("openbox").style.display = "none";
      document.getElementById("filter_btn").style.display = "none";
  });
  
  document.getElementById("cross_icon").addEventListener('click', function(){
      document.getElementById("filterbox").classList.remove("show");
      document.getElementById("openbox").style.display ="block";
      document.getElementById("filter_btn").style.display ="block";
  });
  
function rangeSlide(value) {
    document.getElementById('rangeValue').innerHTML = value;
}
function rangeSlides(value) {
    document.getElementById('rangeValues').innerHTML = value;
}
function rangeSlidess(value) {
    document.getElementById('rangeValuess').innerHTML = value;
}
function rangeSlidesss(value) {
    document.getElementById('rangeValuesss').innerHTML = value;
}