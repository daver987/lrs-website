<script setup lang="ts">
import {
  FormInst,
  useMessage,
  FormRules,
  darkTheme,
  useLoadingBar,
} from 'naive-ui'
import { WatchCallback } from 'vue'
import { VueTelInput } from 'vue-tel-input'
import { Vehicle } from '~/schema/vehicleSchema'
import { Service } from '~/schema/serviceSchema'
import { LineItem } from '~/schema/lineItemSchema'
import { SalesTax } from '~/schema/salexTaxSchema'
import { Place, placeSchema } from '~/schema/placeSchema'
import { Conversion } from '~/schema/conversionSchema'
import { useGtm } from '@gtm-support/vue-gtm'
import { useDataStore } from '~/stores/useDataStore'
import { useUserStore } from '~/stores/useUserStore'
import { useQuoteStore } from '~/stores/useQuoteStore'
import { Quote } from '~/server/api/quote.get'
import { storeToRefs } from 'pinia'
import {
  buildPassengerOptions,
  buildHoursOptions,
  Option,
} from '~/composables/useBuildOptions'

interface FormValue {
  user_id: string
  first_name: string | null
  last_name: string | null
  email_address: string | null
  phone_number: string | null
  conversion: any
  origin: Place
  destination: Place
  pickup_date: number | null
  pickup_time: number | null
  return_date: number | null
  return_time: number | null
  selected_hours: number | null
  selected_passengers: number | null
  is_hourly: boolean
  vehicle_id: number | null
  service_id: number | null
  is_round_trip: boolean
  vehicle: Vehicle[]
  service: Service[]
  line_items: LineItem[]
  sales_tax: SalesTax[]
}

const quoteStore = useQuoteStore()
const userStore = useUserStore()
const { user_id } = storeToRefs(userStore)

const dataStore = useDataStore()
const { vehicleTypes, serviceTypes, lineItems, salesTaxes } =
  storeToRefs(dataStore)

const [vehicleTypesRes, serviceTypesRes, lineItemsRes, salesTaxesRes] =
  await Promise.all([
    useFetch<Vehicle[] | undefined>('/api/vehicles'),
    useFetch<Service[] | undefined>('/api/services'),
    useFetch<LineItem[] | undefined>('/api/items'),
    useFetch<SalesTax[] | undefined>('/api/salestax'),
  ])
//@ts-ignore
vehicleTypes.value = vehicleTypesRes?.data || []
//@ts-ignore
serviceTypes.value = serviceTypesRes?.data || []
//@ts-ignore
lineItems.value = lineItemsRes?.data || []
//@ts-ignore
salesTaxes.value = salesTaxesRes?.data || []

dataStore.setVehicleTypes(vehicleTypes.value)
dataStore.setServiceTypes(serviceTypes.value)
dataStore.setLineItems(lineItems.value)
dataStore.setSalesTaxes(salesTaxes.value)

const serviceTypeOptions = serviceTypes
const vehicleTypeOptions = vehicleTypes

const hoursOptions = buildHoursOptions()
const maxPassengers = computed<number>(() => {
  const vehicleType = vehicleTypeOptions.value.find(
    (type: Option) => type.value === formValue.value.vehicle_id
  )
  formValue.value.selected_passengers = null
  return vehicleType ? vehicleType.max_passengers : 3
})

const passengerOptions = computed(() =>
  buildPassengerOptions(maxPassengers.value)
)

const route = useRoute()
const gtmValues: Conversion = route.query as Conversion

const gtm = useGtm()
//Todo enable tag manager
function triggerEvent() {
  gtm?.trackEvent({
    event: 'submitQuote',
    category: 'Request quote',
    action: 'click',
    label: 'Request Quote',
    value: 1,
    noninteraction: false,
  })
}

const formValue: Ref<FormValue> = ref({
  user_id: user_id.value,
  first_name: null,
  last_name: null,
  email_address: null,
  phone_number: null,
  conversion: {
    ...gtmValues,
  },
  origin: {} as Place,
  destination: {} as Place,
  pickup_date: null,
  pickup_time: null,
  return_date: null,
  return_time: null,
  selected_hours: null,
  selected_passengers: null,
  is_hourly: computed(() => {
    return formValue.value.service_id === 4
  }),
  vehicle_id: null,
  service_id: null,
  is_round_trip: false,
  vehicle: vehicleTypes.value,
  service: serviceTypes.value,
  line_items: lineItems.value,
  sales_tax: salesTaxes.value,
})

const rules: FormRules = {
  pickup_date: {
    type: 'number',
    required: true,
    message: 'Please enter a pickup date',
    trigger: ['blur'],
  },
  pickup_time: {
    type: 'number',
    required: true,
    message: 'Please enter a pickup time',
    trigger: 'blur',
  },
  return_date: {
    type: 'number',
    required: false,
    message: 'Please enter a drop off date',
    trigger: 'blur',
  },
  return_time: {
    type: 'number',
    required: false,
    message: 'Please enter a drop off time',
    trigger: 'blur',
  },
  selected_hours: {
    type: 'number',
    required: false,
    message: 'Please enter in the amount of hours',
    trigger: ['blur', 'change'],
  },
  selected_passengers: {
    type: 'number',
    message: 'Passengers is required',
    trigger: ['blur', 'change'],
    required: true,
  },
  vehicle_id: {
    type: 'number',
    trigger: ['blur', 'change'],
    required: true,
    message: 'Please select a vehicle type',
  },
  service_id: {
    type: 'number',
    message: 'Please select a service type',
    trigger: ['blur', 'change'],
    required: true,
  },
  first_name: {
    required: true,
    message: 'First name is required',
    trigger: 'blur',
  },
  last_name: {
    required: true,
    message: 'Last name is required',
    trigger: 'blur',
  },
  email_address: {
    required: true,
    message: 'Email is required',
    trigger: 'blur',
  },
  phone_number: {
    required: true,
    message: 'Phone number is required',
    trigger: 'blur',
  },
}

const inputOptions = ref({
  id: 'phone_number',
  showDialCode: true,
  name: 'phone_number',
  type: 'tel',
  ariaDescribedby: 'name',
  ariaLabeledBy: 'placeholder',
  placeholder: 'Enter Phone Number...',
})
const dropdownOptions = ref({
  showDialCodeInSelection: false,
  showFlags: true,
  showSearchBox: false,
  showDialCodeInList: true,
})

function isAirport(place?: Place): boolean {
  if (!place) {
    return false
  }
  try {
    return placeSchema.parse(place).types.includes('airport')
  } catch (error) {
    return false
  }
}

const handleFormValueChange: WatchCallback<
  [typeof formValue.value.origin, typeof formValue.value.destination]
> = ([origin, destination]) => {
  if (!origin || !destination) {
    return
  }

  const isOriginAirport = isAirport(origin)
  const isDestinationAirport = isAirport(destination)
  const fromAirportServiceType = 3
  const toAirportServiceType = 2

  if (isOriginAirport) {
    formValue.value.service_id = fromAirportServiceType
  } else if (isDestinationAirport) {
    formValue.value.service_id = toAirportServiceType
  } else {
    formValue.value.service_id = null
  }
}

watch(
  [() => formValue.value.origin, () => formValue.value.destination],
  handleFormValueChange,
  {
    deep: true,
  }
)

const handleChangeOrigin = (evt: Place) => {
  formValue.value.origin = evt
}

const handleChangeDestination = (evt: Place) => {
  formValue.value.destination = evt
}

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const loading = ref(false)
const loadingBar = useLoadingBar()

async function onSubmit() {
  try {
    loading.value = true
    userStore.setFullName(formValue.value.first_name, formValue.value.last_name)
    const { data: quoteData } = await useFetch('/api/quote', {
      method: 'POST',
      body: formValue.value,
    })
    console.log('Returned Quote:', quoteData.value)

    setTimeout(async () => {
      quoteStore.setQuote(quoteData.value as Quote)
      console.log('Routed quote Data', quoteStore.quote)
      loadingBar.finish()
      // Navigate to checkout page
      await navigateTo(`/cart`)
      loading.value = false
    }, 500)
  } catch (e) {
    setTimeout(() => {
      loading.value = false
      console.log('error')
    }, 500)
  }
}

function handleValidateButtonClick(e: MouseEvent) {
  loadingBar.start()
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (errors) {
      console.log(errors)
      message.error('Please correct the errors on the form')
    } else {
      await onSubmit()
      message.success(
        'You will receive a copy of the quote to the email address provided'
      )
    }
  })
}

const disablePreviousDate = (ts: number) => ts < Date.now()
</script>

<template>
  <NConfigProvider :theme="darkTheme">
    <n-grid :cols="1">
      <n-grid-item :span="1">
        <div
          class="border-1 rounded border border-white bg-black p-4 sm:mx-auto sm:w-full sm:max-w-2xl sm:overflow-hidden sm:rounded-lg"
        >
          <h2 class="mt-2 mb-4 text-center text-3xl uppercase text-white">
            Instant Quote
          </h2>
          <n-form
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
          >
            <n-grid :cols="24" :x-gap="12">
              <n-form-item-gi
                :show-label="false"
                label="Pickup Location"
                :span="24"
                path="origin"
              >
                <InputPlacesAutocompleteDark
                  @change="handleChangeOrigin"
                  name="origin"
                  placeholder="Enter Pickup Location...."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                :span="24"
                label="Dropoff Location"
                path="destination"
              >
                <InputPlacesAutocompleteDark
                  name="destination"
                  @change="handleChangeDestination"
                  placeholder="Enter Dropoff Location...."
                />
              </n-form-item-gi>
              <n-form-item-gi
                path="pickup_date"
                :span="12"
                :show-label="false"
                label="Pickup Date"
              >
                <n-date-picker
                  v-model:value="formValue.pickup_date"
                  type="date"
                  placeholder="Select Pickup Date..."
                  :default-value="Date.now()"
                  :is-date-disabled="disablePreviousDate"
                />
              </n-form-item-gi>
              <n-form-item-gi
                path="pickup_time"
                :span="12"
                :show-label="false"
                label="Pickup Date and Time"
              >
                <n-space justify="space-between">
                  <n-time-picker
                    v-model:value="formValue.pickup_time"
                    format="h:mm a"
                    :clearable="true"
                  />
                  <n-switch v-model:value="formValue.is_round_trip">
                    <template #checked> Round</template>
                    <template #unchecked> One Way</template>
                  </n-switch>
                </n-space>
              </n-form-item-gi>
            </n-grid>
            <n-collapse-transition :show="formValue.is_round_trip">
              <n-grid :cols="24" :x-gap="12">
                <n-form-item-gi
                  :span="12"
                  :show-label="false"
                  label="Return Date"
                  path="dateTime.return_date"
                >
                  <n-date-picker
                    v-model:value="formValue.return_date"
                    type="date"
                    placeholder="Select Return Date"
                    :default-value="Date.now()"
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="12"
                  :show-label="false"
                  label="Return Time"
                  path="dateTime.return_time"
                >
                  <n-time-picker
                    v-model:value="formValue.return_time"
                    format="h:mm a"
                    :clearable="true"
                  />
                </n-form-item-gi>
              </n-grid>
            </n-collapse-transition>
            <n-grid :cols="24" :x-gap="12">
              <n-form-item-gi
                :span="12"
                :show-label="false"
                label="Service Type"
                path="service_id"
              >
                <n-select
                  v-model:value="formValue.service_id"
                  :options="serviceTypeOptions"
                  placeholder="Select Service Type..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :span="12"
                :show-label="false"
                label="Vehicle Type"
                path="vehicle_id"
              >
                <n-select
                  v-model:value="formValue.vehicle_id"
                  :options="vehicleTypeOptions"
                  placeholder="Select Vehicle Type..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :span="12"
                :show-label="false"
                label="Passengers"
                path="selected_passengers"
              >
                <n-select
                  v-model:value="formValue.selected_passengers"
                  :options="passengerOptions"
                  placeholder="Select Passengers..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :span="12"
                :show-label="false"
                label="Hours"
                path="selected_hours"
              >
                <n-select
                  v-model:value="formValue.selected_hours"
                  :options="hoursOptions"
                  placeholder="For Hourly Service..."
                  :disabled="!formValue.is_hourly"
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                label="First Name"
                path="first_name"
                :span="12"
              >
                <n-input
                  v-model:value="formValue.first_name"
                  placeholder="Enter First Name..."
                  :show-label="false"
                  label="Phone Number"
                />
              </n-form-item-gi>

              <n-form-item-gi
                :span="12"
                :show-label="false"
                label="Last Name"
                path="last_name"
              >
                <n-input
                  v-model:value="formValue.last_name"
                  placeholder="Enter Last Name..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :span="12"
                :show-label="false"
                label="Email Address"
                path="email_address"
              >
                <n-input
                  v-model:value="formValue.email_address"
                  placeholder="Enter Email Address..."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :span="12"
                path="phone_number"
                :show-label="false"
                label="Phone Number"
              >
                <VueTelInput
                  v-model="formValue.phone_number"
                  :dropdown-options="dropdownOptions"
                  :input-options="inputOptions"
                  aria-label="phone input"
                />
              </n-form-item-gi>
            </n-grid>
            <button
              id="submit_button"
              class="inline-flex w-full items-center rounded border border-transparent bg-red-600 px-4 py-2 text-sm font-medium uppercase text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              :loading="loading"
              @click="handleValidateButtonClick"
            >
              <span class="mx-auto self-center">{{
                loading ? 'Processing.....' : 'Get Prices & Availability'
              }}</span>
            </button>
          </n-form>
        </div>
      </n-grid-item>
    </n-grid>
  </NConfigProvider>
</template>
