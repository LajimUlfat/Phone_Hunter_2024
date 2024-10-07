const loadPhone = async (inputFeildText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputFeildText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);

 // console.log(phones);
 
}



const displayPhones = phones => {
  // console.log(phones)
  const phoneContainer = document.getElementById('phone_container');
  //clear the search area after seaching something
  phoneContainer.textContent = '';

 

  //show all button
   const showallButtoncontainer = document.getElementById('allbuttoneContainer');
   if(phones.length>12){
    showallButtoncontainer.classList.remove('hidden')
   }
   else
   {
    showallButtoncontainer.classList.add('hidden')
   }
    //to show 9 phones
   phones = phones.slice(0,9);
   
  // console.log(phones);
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-base-100  shadow-xl`;
    phoneCard.innerHTML = `           
                <figure>
                  <img
                    src="${phone.image}"
                    alt="phones" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>${phone.slug}</p>
                  <h2><b>Price : 999$</b></h2>
                  <div class="card-actions justify-center">
                    <button onclick = "showDetailFunction('${phone.slug}')" class="btn btn-primary ">show Details</button>
                  </div>
                </div>
              </div>`;
    phoneContainer.appendChild(phoneCard);
    togglleLoadingSpinner(false);
  });
}

// search area,,,
const handleSearch = () =>{
const inputFeild = document.getElementById('input-text');
const inputFeildText = inputFeild.value ;

loadPhone(inputFeildText);
togglleLoadingSpinner(true);
inputFeild.value = '';



}

// loading spinner
const togglleLoadingSpinner = (isloading) =>{
  const spinerLoaddng = document.getElementById('loading-spinner')
  if(isloading)
  {
   spinerLoaddng.classList.remove('hidden');

  }
  else
  {
    spinerLoaddng.classList.add('hidden');

  }

  }


// show detail fuction
const showDetailFunction = async(id) =>{
  //console.log('show in the data',id);
  // load single phone data 
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetail(phone);
  }



// show all phone data in modal
const showPhoneDetail = (phone) =>{
  console.log(phone);
  const addingPhoneDetails = document.getElementById('add-phone-details');
  addingPhoneDetails.classList= ``;
  addingPhoneDetails.innerHTML = 
  `
  <img src="${phone.image}" alt="">
  <br>
  <h1><b>${phone.name}</b></h1>
   <p>Storage : <span> ${phone.mainFeatures.storage}</span></p>
  <p>Display Size :<span> ${phone.mainFeatures.displaySize}</span></p>
  <p>Chipset :<span>${phone.mainFeatures.chipSet}</span></p>
  <p>Relese Data :<span>${phone.releaseDate}</span></p>
  <p>GPS :<span>${phone.others.GPS}</span></p>

  `
  show_details_modal.showModal()
}

// loadPhone()