<template>
  <div class="add-car-container">
    <form @submit.prevent="addCar" class="car-form">
      <label for="year" class="form-label">Year:</label>
      <input
        type="number"
        v-model="newCar.year"
        required
        class="form-input"
        min="1886"  
        max="2024"  
      />

      <label for="price" class="form-label">Price:</label>
      <input
        type="number"
        v-model="newCar.price"
        required
        class="form-input"
        min="0" 
      />

      <label for="mileage" class="form-label">Mileage:</label>
      <input
        type="number"
        v-model="newCar.mileage"
        required
        class="form-input"
        min="0"
      />

      <label for="make" class="form-label">Make:</label>
      <input
        type="text"
        v-model="newCar.make"
        required
        class="form-input"
        pattern="[A-Za-z\s]+" 
      />

      <label for="model" class="form-label">Model:</label>
      <input
        type="text"
        v-model="newCar.model"
        required
        class="form-input"
        pattern="[A-Za-z0-9\s]+" 
      />

      <label for="vin" class="form-label">VIN:</label>
      <input
        type="text"
        v-model="newCar.vin"
        required
        class="form-input"
        pattern="[A-HJ-NPR-Z0-9]{17}" 
      />

      <label for="color" class="form-label">Color:</label>
      <input
        type="text"
        v-model="newCar.color"
        required
        class="form-input"
      />

      <label for="status" class="form-label">Status:</label>
      <select v-model="newCar.status" required class="form-select">
        <option>Available</option>
        <option>Sold</option>
      </select>

      <button type="submit" class="submit-btn">Add Car</button>
    </form>
  </div>
</template>

<script>
import carsData from './cars.json';

export default {
  data() {
    return {
      newCar: {
        year: null,
        price: null,
        mileage: null,
        make: '',
        model: '',
        vin: '',
        color: '',
        status: 'Available'
      },
      cars: carsData 
    };
  },
  methods: {
    async addCar() {
      if (this.isVinExists(this.newCar.vin)) {
        alert('A car with this VIN already exists.');
        return;
      }

      if (Array.isArray(this.cars)) {
        this.cars.push(this.newCar);
        await this.updateCars(this.cars);
        this.resetForm();
      } else {
        console.error('Expected an array but received:', this.cars);
      }
    },
    isVinExists(vin) {
      return this.cars.some(car => car.vin === vin);
    },
    async updateCars(cars) {
      try {
        const response = await fetch('http://localhost:3000/update-cars', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cars)
        });
        const data = await response.text();
        console.log('Server response:', data);
      } catch (error) {
        console.error('Error updating cars:', error);
      }
    },
    resetForm() {
      this.newCar = {
        year: null,
        price: null,
        mileage: null,
        make: '',
        model: '',
        vin: '',
        color: '',
        status: 'Available'
      };
    }
  }
};
</script>

<style scoped>

.add-car-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem;
  background: #f7f9fc; 
  border-radius: 12px;
  max-width: 700px;
  margin: 2rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.car-form {
  display: flex;
  flex-direction: column;
}

.form-label {
  color: #555;
  margin: 0.5rem 0 0.25rem;
  font-weight: 500;
  font-size: 1rem;
}

.form-input, .form-select {
  padding: 12px 15px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus, .form-select:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.2);
  outline: none;
}

.submit-btn {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 1.1rem;
  margin: 1rem 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #45a049;
  transform: scale(1.02);
}

.submit-btn:active {
  background-color: #388e3c;
  transform: scale(0.98);
}
</style>
