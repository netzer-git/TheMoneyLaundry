var block_num = 0;

async function get_order_block_of_user(order_doc) {
    // const washer_doc = await order_doc.data().washer.get();
    const washer_doc = await promiseWasherLoaderById(order_doc.data().washer);
    block = "";
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src='" + washer_doc.data().imageUrl + "' alt='profile_pic'> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>"+ washer_doc.data().name +"</th></tr>";
    var date = new Date(order_doc.data().due_to*1000);
    var formattedTime = date.getDate() + '/' + (date.getMonth()+1);
    if (date.getMinutes().toString().length <= 1) {
        var minutes = "0" +date.getMinutes();
    }
    else {
        var minutes = date.getMinutes();
    }
    var time = date.getHours()+ ":" +minutes;
    block += "<tr><td>"+ formattedTime + "</td><td>"+ order_doc.data().price +" &#8362</td></tr>"
    switch (order_doc.data().status) {
        case 'pending':
        case 'process':
            block += "</tr><th scope='col' colspan='2'>";
            block += "<div id='overlay' onclick='off()'>";
            block += "<div id='user_order'></div></div><div>";
            block += "<div><button onclick='display_order()' class='button1'> Details </button></div></th></tr>";
          break;
        case 'finished':
            if (window.location.pathname == "/html/welcome.html") {
                block += "</tr><th scope='col' colspan='2'><button id=block_num_" + block_num + " value='" + washer_doc.id + "' onclick= 'quick_place_order(block_num_" + block_num + ".value)' class='button1'> Order Again </button></th></tr>";
            }
            else if (order_doc.data().review_washer == "") {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Review </button></th></tr>";
            }
            else {
                block += "</tr><th scope='col' colspan='2'><button id = 'user_order' class='button1'> Watch Review </button><div id='myModal' class='modal'></th></tr>";
            }
        break;
    }
    block += "</table>";
    block += "</div>";
    block += "</div>";
    return block;
}

async function quick_place_order(washerID) {
    // var order_doc = await promiseOrderLoaderById(orderID);
    console.log(washerID);
    // var washerID = await promiseWasherLoaderById(washerID);
    sessionStorage.setItem("pressed_washer", washerID); // washer that pressed in page map_filter.html
    window.location.href = "../../html/user_flow/place_order.html";


}


async function insert_orders_blocks_of_user(tag, userID, status) {
    if (status == "process") {
        var all_orders = await promiseOrderArrayByUserIdAndStatus(userID, "processing");
    }
    else {
        var all_orders = await promiseOrderArrayByUserIdAndStatus(userID, status);
    }
    let all_blocks = "";
    var max_orders = Math.min(2, all_orders.length);
    if (window.location.pathname == "/html/welcome.html") {
        var max_orders = Math.min(3, all_orders.length);
    }
    for (var i = 0; i < max_orders; i++) {
        console.log("id of blocks: ", all_orders[i].id)
        all_blocks += await get_order_block_of_user(all_orders[i]);
    }
    
    document.getElementById(tag).innerHTML = all_blocks;
}


function display_order() {
    display_new_order_for_user('u3HAO6QZ6S9i3hUAO7pJ'); // cur_order
    document.getElementById("overlay").style.display = "block";
    // add_to_firebase_order_df(order123);
    // overlay thank you page
}

  
function off() {
    document.getElementById("overlay").style.display = "none";
  }


async function load_quick_welcome_page() {
    try {
        var userID = sessionStorage.getItem("connected_userID");
    }
    catch {
        return;
    }
    // await insert_orders_blocks_of_user("in_process_orders", userID, "process"); // function in order_blocks_user.js that insert all "pending+process" into div "in_process_orders"
    await insert_orders_blocks_of_user("finished_orders", userID, "finished"); // func 
}