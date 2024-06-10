fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                display_cards(data);
            })
            .catch(err => error(err));

function error(err){
    alert(`There is a problem with the ${err}`)
}



let total_cost = 0.0 ;
let count = 0;

function update_total(){
    document.getElementById("total").innerHTML = total_cost.toFixed(2);
    update_count();
}
function update_count(){
    document.getElementById("count").innerHTML = count;
}


function display_cards(data){
    const cards= document.getElementById("cards");
    cards.innerHTML="";
    data.forEach(element => {
        // console.log(element.title);
        div = document.createElement("div");
        div.classList.add("user_card");
        div.innerHTML = `
        <div>
        
        <p>${element.id}</p>
        <img src=${element.image} alt="images" class="img-pro">
        </div>
        <div class="card_info_background">
        <h2>${element.title.slice(0, 12)}</h2>
        <h4>${element.category}</h4>
        <h4>Rating: ${element.rating.rate} / 5 <br> rated by ${element.rating.count}</h4>
        <h2>$${element.price}</h2>
        <button onclick="detail(${element.id})">Details</button>
        <button onclick= "add_to_cart('${element.price}','${element.title}','${element.image}')">Add to cart </button>
        
        
        </div>
        
        `;
        cards.appendChild(div);
    });

}

function add_to_cart(price,title,img){
    count+=1;
const cards= document.getElementById("carted-cards");
    div = document.createElement("div");
        div.classList.add("cart_card");
        div.innerHTML = `
        
        <img src=${img} alt="images" class="img-cart">
        <h6>$${price}</h6>
        <h6>$${title.slice(0,12)}</h6>
        
        `;
        cards.appendChild(div);
        total_cost+=Number(price);
        update_total();

}





function detail(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
            const modalBody = document.querySelector(".modal-body");
            const modalTitle = document.querySelector('#productModalLabel');
            modalTitle.innerText = data.title;
            modalBody.innerHTML = `
                <img src="${data.image}" alt="${data.title}" style="max-width: 100%;">
                <p>Category: ${data.category}</p>
                <p>Rating: ${data.rating.rate} / 5 (${data.rating.count} ratings)</p>
                <p>Price: $${data.price}</p>
                <p>Description: ${data.description}</p>
            `;

            // Show the modal
            const productModal = new bootstrap.Modal(document.getElementById('productModal'));
            productModal.show();
        })
        .catch(err => console.error('Error fetching product details:', err));
}
