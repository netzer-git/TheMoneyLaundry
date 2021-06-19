

var washer_machine_pic;
var washer_laundry_pic;
var washer_profile_pic;
var washer_location_str;
var washer_machine_type;
var washer_description;
var washer_commitment; //// add bar
var washer_properties;
var washer_phone_number;
var washer_capacity; /////add netzer
var washer_year_purchased; //// add netzer


function save_location() {
    var city = document.getElementById("city").value;
    var street = document.getElementById("street").value;
    var number = document.getElementById("number").value;
    washer_location_str = street + " " + number + ", " + city;
}

function save_phone_number() {
    washer_phone_number = document.getElementById("phone").value;
}

function save_commit() {
    washer_commitment = document.getElementById("commit").value;
}

function save_laundry_details() {
    washer_machine_type = document.getElementById("mudule").value;
    washer_capacity = document.getElementById("capacity").value;
    washer_year_purchased = document.getElementById("purchasing_year").value;
}

function save_description() {
    washer_description = document.getElementById("washer_description").value;
}

function save_profile_pic(event) {
    if (event != null) {
        washer_profile_pic = event.target.files[0];
        // document.getElementById("checkmark").innerHTML = "<i class='bi bi-check'></i>";
    }
}

function save_laundry_pic(event) {
    if (event != null) {
        washer_laundry_pic = event.target.files[0];
        // document.getElementById("checkmark").innerHTML = "<i class='bi bi-check'></i>";
    }
}

function save_machine_pic(event) {
    if (event != null) {
        washer_machine_pic = event.target.files[0];
        // document.getElementById("checkmark").innerHTML = "<i class='bi bi-check'></i>";
    }
}

function save_special_service()  
{  
    washer_properties = document.getElementsByName("special_serve").value;  
}  


async function create_washer() {
    try {
    profile_pic_url = await saveImageToUser(washer_profile_pic);
    }
    catch {
        profile_pic_url = null
    }
    if (profile_pic_url == null || washer_location_str == null || washer_phone_number == null || washer_description == null
        || washer_capacity == null || washer_machine_type == null || washer_year_purchased == null) {
        alert("PLEASE FILL ALL FIELDS");
        return;
    }
    // profile_pic_url = "";
    try {
        first_pic = await saveImageToUser(washer_laundry_pic)
    }
    catch {
        first_pic = ""
    }
    try {
        second_pic = await saveImageToUser(washer_machine_pic)
    }
    catch {
        second_pic = ""
    }
    pics_url =[first_pic, second_pic];
    new_washer = {
        name: getUserDisplayName(),
        imageUrl: profile_pic_url,
        washer_pics: pics_url,
        location_str: washer_location_str,
        machine_type: washer_machine_type,
        description: washer_description,
        commitment: washer_commitment,
        properties: washer_properties,
        phone: washer_phone_number,
        capacity: washer_capacity,
        year_purchsed: washer_year_purchased,
    }
    console.log(new_washer);
    await createNewWasher(new_washer);
    // window.location.href = "../html/washer-profile.html";
}


function display_washer_name() {
    document.getElementById("washer_name").innerHTML = getUserDisplayName();
}