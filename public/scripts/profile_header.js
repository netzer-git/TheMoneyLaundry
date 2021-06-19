function show_profile_header_of_washer(tag, profile) {
    // profile_header = '<div class="row"><div class="col-6">';
    profile_header = '<div class="row"><div class="col-1"></div>';
    // profile_header += '<div class="col-3"><div class="profile_pic"><img class="rounded-circle-big" src=' + profile.data().imageUrl + '></div></div>';
    profile_header += '<div class="col-3"><div class="profile_pic"><img class="rounded-circle-big" src="../images/tal_e_pic.png"></div></div>';
    profile_header += '<div class="col-8"><div class="row"><div class="profile_pic">';
    profile_header += '<table class="table-search"><tr><h4>'+ profile.data().name +'</h4></tr></tr>';
    profile_header += '<tr><div class="description">'+profile.data().description +'</div></tr>';
    profile_header += '</table></div></div>';
    profile_header += '<div class="row">';
    profile_header += '<div class="col-7"><div class="location">'+profile.data().location_str+'</div></div>';   
    profile_header += '<div class="col-5"><div class="location"><img class="rating-star" src="../images/Star_yellow.png">'+ getRatingFromDoc(profile) + '</div></div>';       
    profile_header += '</div></div></div>';  
    profile_header += '<div class="row"><div class="col-2"></div><div class="col-10">'
    profile_header += '<img class="image-1" src="../images/laundry-room2.png"><img class="image-2" src="../images/folded-laundry1.png">'
    profile_header += '</div>';
    document.getElementById(tag).innerHTML = profile_header;               
}

function show_profile_header_of_user(tag, profile) {
        // profile_header = '<div class="row"><div class="col-6">';
        profile_header = '<div class="row"><div class="col-1"></div>';
        // profile_header += '<div class="col-3"><div class="profile_pic"><img class="rounded-circle-big" src=' + profile.data().imageUrl + '></div></div>';
        profile_header += '<div class="col-3"><div class="profile_pic"><img class="rounded-circle-big" src="../images/tal_e_pic.png"></div></div>';
        profile_header += '<div class="col-8"><div class="row"><div class="profile_pic">';
        profile_header += '<table class="table-search"><tr><h4>'+ profile.data().name +'</h4></tr></tr>';
        profile_header += '<tr><div class="description">'+profile.data().description +'</div></tr>';
        profile_header += '</table></div></div>';
        profile_header += '<div class="row">';
        profile_header += "<div class='col-7'><div class='location'>"+profile.data().location_str+"</div></div>";   
        profile_header += "<div class='col-5'><div class='location'><img class='rating-star' src='../images/Star_yellow.png'>"+ getRatingFromDoc(profile) + "</div></div>";       
        profile_header += '</div></div></div>';
        document.getElementById(tag).innerHTML = profile_header;  

}


async function load_profile_header_of_washer(washerID) {
    const washer_doc = await promiseWasherLoaderById(washerID);
    console.log(washer_doc);
    show_profile_header_of_washer("profile_header",washer_doc);
}

async function load_profile_header_of_user(userID) {
    const user_doc = await promiseUserLoaderById(userID);
    console.log(user_doc.data().name)
    show_profile_header_of_user("profile_header",user_doc);
}