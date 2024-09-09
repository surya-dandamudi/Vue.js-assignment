<template>
  <div class="car-inventory">
    <div class="toggle-buttons">
      <button @click="toggleSearch" class="toggle-btn">Search</button>
      <button @click="toggleFilter" class="toggle-btn">Filters</button>
    </div>

    <div v-if="showSearch" class="search-container">
      <div class="search-section">
        <div class="search-group">
          <label for="make" class="search-label">Make:</label>
          <input id="make" v-model="searchMake" placeholder="Search by make" class="search-input" />

          <label for="model" class="search-label">Model:</label>
          <input id="model" v-model="searchModel" placeholder="Search by model" class="search-input" />

          <label for="color" class="search-label">Color:</label>
          <input id="color" v-model="searchColor" placeholder="Search by color" class="search-input" />

          <label for="vin" class="search-label">VIN:</label>
          <input id="vin" v-model="searchVin" placeholder="Search by VIN" class="search-input" />
        </div>
      </div>
    </div>

    <div v-if="showFilter" class="filter-container">
      <div class="filter-section">
        <div class="filter-group">
          <label for="minYear" class="filter-label">Min Year:</label>
          <input type="number" v-model.number="minYear" placeholder="e.g., 2015" class="filter-input" />

          <label for="maxYear" class="filter-label">Max Year:</label>
          <input type="number" v-model.number="maxYear" placeholder="e.g., 2020" class="filter-input" />

          <label for="maxMileage" class="filter-label">Max Mileage (km):</label>
          <input type="number" v-model.number="maxMileage" placeholder="e.g., 100000" class="filter-input" />
        </div>
      </div>
    </div>

    <div class="cars-container">
      <ul class="car-list">
        <li v-for="car in filteredCars" :key="car.vin" class="car-item">
          <div class="car-details">
            <div class="car-header">
              <span class="car-make-model">{{ car.make }} {{ car.model }}</span>
              <span v-if="car.status === 'Sold'" class="car-status">Sold</span>
            </div>
            <div class="car-info">
              <p><strong>Year:</strong> {{ car.year }}</p>
              <p><strong>Color:</strong> {{ car.color }}</p>
              <p><strong>Mileage:</strong> {{ car.mileage }} km</p>
              <p><strong>Price:</strong> ${{ car.price }}</p>
              <p><strong>VIN:</strong> {{ car.vin }}</p>
            </div>
          </div>
          <div class="action-buttons">
            <button v-if="car.status === 'Available'" @click="markAsSold(car)" class="mark-btn">Mark as Sold</button>
            <button v-if="car.status === 'Sold'" @click="markAsAvailable(car)" class="mark-btn">Mark as Available</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import carsData from './cars.json';

export default {
  data() {
    return {
      cars: carsData,
      searchMake: '',
      searchModel: '',
      searchColor: '',
      searchVin: '',
      minYear: null,
      maxYear: null,
      maxMileage: null,
      showSearch: false,
      showFilter: false,
    };
  },
  computed: {
    filteredCars() {
      return this.cars.filter((car) => {
        const matchesMake = car.make.toLowerCase().includes(this.searchMake.toLowerCase());
        const matchesModel = car.model.toLowerCase().includes(this.searchModel.toLowerCase());
        const matchesColor = car.color.toLowerCase().includes(this.searchColor.toLowerCase());
        const matchesVin = car.vin.toLowerCase().includes(this.searchVin.toLowerCase());

        const matchesSearch =
          (this.searchMake === '' || matchesMake) &&
          (this.searchModel === '' || matchesModel) &&
          (this.searchColor === '' || matchesColor) &&
          (this.searchVin === '' || matchesVin);

        const matchesYear =
          (this.minYear ? car.year >= this.minYear : true) &&
          (this.maxYear ? car.year <= this.maxYear : true);

        const matchesMileage = this.maxMileage ? car.mileage <= this.maxMileage : true;

        return matchesSearch && matchesYear && matchesMileage;
      });
    },
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) this.showFilter = false; 
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
      if (this.showFilter) this.showSearch = false; 
    },
    markAsSold(car) {
      car.status = 'Sold';
      this.updateJsonInLocalStorage(this.cars);
      this.updateJsonFileOnServer(this.cars);
    },
    markAsAvailable(car) {
      car.status = 'Available';
      this.updateLocalStorage(this.cars);
      this.updateServer(this.cars);
    },
    getCarsFromLocalStorage() {
      const cars = localStorage.getItem('carsInventory');
      return cars ? JSON.parse(cars) : null;
    },
    updateLocalStorage(updatedCars) {
      localStorage.setItem('carsInventory', JSON.stringify(updatedCars));
      console.log('Inventory updated successfully in localStorage');
    },
    updateServer(updatedCars) {
      fetch('http://localhost:3000/update-cars', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCars),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log('File updated successfully on server:', data);
        })
        .catch((error) => {
          console.error('Error updating file on server:', error);
        });
    },
  },
};
</script>

<style scoped>
.car-inventory {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 30px;
  border-radius: 10px;
  max-width: 900px;
  margin: 20px auto;
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.toggle-btn {
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  margin: 0 10px;
}

.toggle-btn:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.search-container,
.filter-container {
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  margin-left:20px;
  width:90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.filter-group {
  flex: 1;
  min-width: 250px;
}

.search-input,
.filter-input {
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  margin-top: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus,
.filter-input:focus {
  border-color: #80bdff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.search-label,
.filter-label {
  font-size: 14px;
  color: black;
  margin-bottom: 8px;
  display: block;
  font-weight: 600;
}

.cars-container {
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.car-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.car-item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.car-item:hover {
  transform: translateY(-5px);
}

.car-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.car-header {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.car-make-model {
  margin-right: 15px;
}

.car-status {
  font-size: 14px;
  font-weight: 600;
  color: #dc3545;
}



.car-info {
  font-size: 14px;
  color: black;
}

.action-buttons {
  margin-top: 20px;
  display:flex;
  justify-content: center;
}

.mark-btn {
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.mark-btn.sold {
  background-color: #dc3545;
}

.mark-btn:hover {
  background-color: #0056b3;
}

.mark-btn.sold:hover {
  background-color: #c82333;
}
</style>
