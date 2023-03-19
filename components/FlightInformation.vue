<template>
  <div class="flight-info-form">
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="flight-number">Flight Number *</label>
        <input id="flight-number" :value="flightNumber" type="text" required />
      </div>
      <div class="input-group">
        <label for="airline">Airline *</label>
        <input id="airline" :value="airline" type="text" required />
      </div>
      <div class="input-group">
        <label for="landing-time">Scheduled Landing Time *</label>
        <input
          id="landing-time"
          :value="landingTime"
          type="datetime-local"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  flightNumber: {
    type: String,
    required: true,
  },
  airline: {
    type: String,
    required: true,
  },
  landingTime: {
    type: String,
    required: true,
  },
})

const submitForm = () => {
  console.log('Form')
}

const emit = defineEmits(['submit'])
</script>

<style scoped>
.flight-info-form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  background-color: #2b2b2b;
  font-family: Arial, sans-serif;
}

.input-group {
  margin-bottom: 1rem;
}

.flight-info-form label {
  display: block;
  font-weight: bold;
  color: #8a6642;
  margin-bottom: 0.25rem;
}

.flight-info-form input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #8a6642;
  border-radius: 4px;
  background-color: #f7f2ee;
  color: #674d32;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.flight-info-form input:focus {
  border-color: #a57c52;
  box-shadow: 0 0 0 3px rgba(165, 124, 82, 0.2);
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #a57c52;
  color: #f7f2ee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #8a6642;
}
</style>
