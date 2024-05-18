const carsView = (cars) => `
<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${cars.Car_name}</h5>
        <div class="card-body">
          <ul class="list-group">
               <li class="list-group-item">Origin: ${cars.Origin}</li>
                <li class="list-group-item">Brand: ${cars.Brand}</li>
                <li class="list-group-item">Horsepower: ${cars.Horsepower}</li>
                <li class="list-group-item">Cylinders: ${cars.Cylinders}</li>
                <li class="list-group-item">Year made: ${cars.Year_made}</li>
                <li class="list-group-item">Engine: ${cars.Engine}</li>
                <li class="list-group-item">Electric: ${cars.Electric}</li>
          </ul>
        </div>
      </div>
 </div>
`;


const handleClick = async () => {
    const searchCarsVal = document.querySelector("#searchInput").value;
    const carsDomRef = document.querySelector('#carsItems')

    try {

        const ref = await fetch(`/api/searched-cars/?search=${searchCarsVal}`);
        const searchResults = await ref.json();
        let carsHtml = [];
        searchResults.forEach(cars => {
            carsHtml.push(carsView(cars));
        });
        carsDomRef.innerHTML = carsHtml.join("");
    } catch (e) {
        console.log(e);
        console.log('could not search api');
    }

}
