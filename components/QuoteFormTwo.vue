<script setup lang="ts">
import { useMessage, useLoadingBar } from 'naive-ui'
import { VueTelInput } from 'vue-tel-input'
import { sha256 } from 'js-sha256'
import { useUserStore } from '~/stores/useUserStore'
import { useQuoteStore } from '~/stores/useQuoteStore'
import { ref, useTrpc, isAirport, useFetch, useQuery } from '#imports'
import { storeToRefs } from 'pinia'
import { useGtm } from '@gtm-support/vue-gtm'
import type { FormValue } from '~/utils/formUtils'
import type { Place } from '~/schema/placeSchema'
import type { Ref, WatchCallback } from 'vue'
import type { FormInst, FormRules, SelectOption } from 'naive-ui'

const formRef = ref<FormInst | null>(null)
const loading: Ref<boolean> = ref(false)
const quoteStore = useQuoteStore()
const userStore = useUserStore()
const { user_id } = storeToRefs(userStore)

const message = useMessage()
const loadingBar = useLoadingBar()

const { data: vehicle } = await useTrpc().vehicle.get.useQuery()
const { data: service } = await useTrpc().service.get.useQuery()
const { data: lineItem } = await useTrpc().lineItem.get.useQuery()
const { data: salesTax } = await useTrpc().salesTax.get.useQuery()

const vehicleOptions = computed(() => {
  return computeVehicleOptions(vehicle.value)
})
const serviceOptions = computed(() => {
  return computeServiceOptions(service.value)
})
const hoursOptions = computed(() => {
  return computeHoursOptions()
})

const route = useRoute()
const gtmValues = route.query

const formValue: Ref<FormValue> = ref({
  id: user_id.value,
  first_name: '',
  last_name: '',
  email_address: '',
  phone_number: '',
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
  vehicle_number: null,
  service_number: null,
  is_round_trip: false,
  is_hourly: false,
  vehicle: null,
  service: null,
  line_items: lineItem,
  sales_tax: salesTax,
})
formValue.value.service = computed(() => {
  return getServiceTypeByNumber(service.value, formValue.value.service_number!)
})
formValue.value.vehicle = computed(() => {
  return getVehicleTypeByNumber(vehicle.value, formValue.value.vehicle_number!)
})

const maxPassengers = computed(() => {
  const vehicleType = vehicleOptions.value.find(
    (type: SelectOption) => type.value === formValue.value.vehicle_number
  )
  return vehicleType ? vehicleType.max_passengers : 3
})

const passengerOptions = computed(() => {
  return computePassengerOptions(maxPassengers?.value as number)
})

watch(
  () => formValue.value.vehicle_number,
  () => {
    formValue.value.selected_passengers = null
  }
)
const isDisabled = ref(true)
watch(
  () => formValue.value.service,
  () => {
    if (formValue.value.service.is_hourly) {
      isDisabled.value = false
    } else {
      isDisabled.value = true
      formValue.value.selected_hours = null
    }
  }
)

const rules: FormRules = {
  pickup_date: {
    type: 'string',
    required: true,
    message: 'Please enter a pickup date',
    trigger: ['blur'],
  },
  pickup_time: {
    type: 'string',
    required: true,
    message: 'Please enter a pickup time',
    trigger: ['blur'],
  },
  return_date: {
    type: 'number',
    required: false,
    message: 'Please enter a drop off date',
    trigger: ['blur'],
  },
  return_time: {
    type: 'number',
    required: false,
    message: 'Please enter a drop off time',
    trigger: ['blur'],
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
  vehicle_number: {
    type: 'number',
    trigger: ['blur', 'change'],
    required: true,
    message: 'Please select a vehicle type',
  },
  service_number: {
    type: 'number',
    message: 'Please select a service type',
    trigger: ['blur', 'change'],
    required: true,
  },
  first_name: {
    required: true,
    message: 'First name is required',
    trigger: ['blur'],
  },
  last_name: {
    required: true,
    message: 'Last name is required',
    trigger: ['blur'],
  },
  email_address: {
    required: true,
    message: 'Please enter a valid email',
    trigger: ['blur'],
  },
  phone_number: {
    required: true,
    message: 'Phone number is required',
    trigger: ['blur'],
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
    formValue.value.service_number = fromAirportServiceType
  } else if (isDestinationAirport) {
    formValue.value.service_number = toAirportServiceType
  } else {
    formValue.value.service_number = null
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

const gtm = useGtm()
const gclidCookie = useCookie('gclid')
const tags = useRuntimeConfig().public

function triggerEvent(quoteTotal: number) {
  gtm?.trackEvent({
    event: 'submitQuote',
    event_category: 'Quote',
    event_label: 'Request Quote',
    value: quoteTotal,
    send_to: tags.GA4_SEND_TO,
    conversion: tags.G_ADS_QUOTE_SUBMIT_CONVERSION,
    conversion_label: tags.G_ADS_QUOTE_SUBMIT_CONVERSION_LABEL,
    gclid: gclidCookie.value,
    non_interaction: false,
  })
}

function setEnhancedTracking(
  email: string,
  phone: string,
  quoteNumber: number,
  userId: string
) {
  const formattedPhoneNumber: string = phone.replace(/\s+/g, '')
  const hashedEmail = sha256(email)
  const hashedPhone = sha256(formattedPhoneNumber)

  gtm?.trackEvent({
    set: 'user_data',
    email: [hashedEmail],
    phone_number: [hashedPhone],
  })

  gtm?.trackEvent({
    set: 'quote_number',
    quote_number: quoteNumber,
  })

  gtm?.trackEvent({
    set: 'user_id',
    user_id: userId,
  })
}

async function onSubmit() {
  try {
    loading.value = true
    const quoteData = await useTrpc().quote.postQuote.mutate(formValue.value)
    setTimeout(async () => {
      setEnhancedTracking(
        formValue.value.email_address,
        formValue.value.phone_number,
        quoteData.quote_number,
        user_id.value
      )
      triggerEvent(quoteData.quote_total)
      await navigateTo({
        path: '/cart',
        query: { quote_number: quoteData.quote_number },
      })
    }, 500)
  } catch (e) {
    setTimeout(() => {
      console.log('error', e)
    }, 500)
  } finally {
    loading.value = false
    loadingBar.finish()
  }
}

async function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault()
  try {
    const errors = await formRef.value?.validate()
    console.log('[VALIDATION]:formRef')
    if (errors) {
      console.log(errors)
      message.error('Please correct the errors on the form')
    } else {
      loadingBar.start()
      await onSubmit()
      message.success(
        'You will receive a copy of the quote to the email address provided'
      )
    }
  } catch (error) {
    console.error('Error during form validation:', error)
    message.error('An error occurred. Please try again.')
  } finally {
    loadingBar.finish()
  }
}

function disablePreviousDate(ts: number) {
  return ts < new Date().getTime() - 24 * 60 * 60 * 1000
}
</script>

<template>
  <n-config-provider>
    <n-grid :cols="1" responsive="self">
      <n-grid-item :span="1">
        <div
          class="border-1 rounded border border-white bg-black p-4 sm:mx-auto sm:w-full sm:max-w-2xl sm:overflow-hidden sm:rounded-lg"
        >
          <h2 class="mb-4 mt-2 text-center text-3xl uppercase text-white">
            Instant Quote
          </h2>
          <n-form
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
            id="quote_form"
          >
            <n-grid :x-gap="12" :cols="4" item-responsive>
              <n-form-item-gi
                :show-label="false"
                label="Pickup Location"
                :span="4"
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
                :span="4"
                label="Drop-off Location"
                path="destination"
              >
                <InputPlacesAutocompleteDark
                  name="destination"
                  @change="handleChangeDestination"
                  placeholder="Enter Drop-off Location...."
                />
              </n-form-item-gi>
              <n-form-item-gi
                path="pickup_date"
                :span="2"
                :show-label="false"
                label="Pickup Date"
              >
                <n-date-picker
                  v-model:formatted-value="formValue.pickup_date"
                  type="date"
                  placeholder="Select Pickup Date..."
                  :default-value="Date.now()"
                  :is-date-disabled="disablePreviousDate"
                  value-format="PPP"
                  input-readonly
                />
              </n-form-item-gi>
              <n-form-item-gi
                path="pickup_time"
                :span="2"
                :show-label="false"
                label="Pickup Date and Time"
              >
                <n-space justify="space-between">
                  <n-time-picker
                    v-model:formatted-value="formValue.pickup_time"
                    format="h:mm a"
                    :clearable="true"
                    use12-hours
                    value-format="p"
                    input-readonly
                  />
                  <n-switch
                    v-if="false"
                    v-model:value="formValue.is_round_trip"
                  >
                    <template #checked> Round</template>
                    <template #unchecked> One Way</template>
                  </n-switch>
                </n-space>
              </n-form-item-gi>
            </n-grid>
            <n-collapse-transition v-if="false" :show="formValue.is_round_trip">
              <n-grid :cols="2" item-responsive :x-gap="12">
                <n-form-item-gi
                  :span="1"
                  :show-label="false"
                  label="Return Date"
                  path="dateTime.return_date"
                >
                  <n-date-picker
                    v-model:value="formValue.return_date"
                    type="date"
                    placeholder="Select Return Date"
                    :default-value="Date.now()"
                    :is-date-disabled="disablePreviousDate"
                    input-readonly
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="1"
                  :show-label="false"
                  label="Return Time"
                  path="dateTime.return_time"
                >
                  <n-time-picker
                    v-model:value="formValue.return_time"
                    format="h:mm a"
                    :clearable="true"
                    use12-hours
                    input-readonly
                  />
                </n-form-item-gi>
              </n-grid>
            </n-collapse-transition>
            <n-grid :cols="2" item-responsive :x-gap="12">
              <n-form-item-gi
                span="0:2 500:1"
                :show-label="false"
                label="Service Type"
                path="service_number"
              >
                <n-select
                  v-model:value="formValue.service_number"
                  :options="serviceOptions"
                  placeholder="Select Service Type..."
                  :input-props="{
                    id: 'service_type',
                  }"
                />
              </n-form-item-gi>

              <n-form-item-gi
                span="0:2 500:1"
                :show-label="false"
                label="Vehicle Type"
                path="vehicle_number"
              >
                <n-select
                  v-model:value="formValue.vehicle_number"
                  :options="vehicleOptions"
                  placeholder="Select Vehicle Type..."
                  :input-props="{
                    id: 'vehicle_type',
                  }"
                />
              </n-form-item-gi>

              <n-form-item-gi
                span="0:2 500:1"
                :show-label="false"
                label="Passengers"
                path="selected_passengers"
              >
                <n-select
                  v-model:value="formValue.selected_passengers"
                  :options="passengerOptions as SelectOption[]"
                  placeholder="Select Passengers..."
                  :input-props="{
                    id: 'passengers',
                  }"
                />
              </n-form-item-gi>

              <n-form-item-gi
                span="0:2 500:1"
                :show-label="false"
                label="Hours"
                path="selected_hours"
              >
                <n-select
                  v-model:value="formValue.selected_hours"
                  :options="hoursOptions"
                  placeholder="For Hourly Service..."
                  :disabled="isDisabled"
                  :input-props="{
                    id: 'hours',
                  }"
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                label="First Name"
                path="first_name"
                span="0:2 500:1"
              >
                <n-input
                  v-model:value="formValue.first_name"
                  placeholder="Enter First Name..."
                  :input-props="{
                    id: 'first_name',
                    type: 'text',
                  }"
                />
              </n-form-item-gi>

              <n-form-item-gi
                span="0:2 500:1"
                :show-label="false"
                label="Last Name"
                path="last_name"
              >
                <n-input
                  v-model:value="formValue.last_name"
                  placeholder="Enter Last Name..."
                  :input-props="{
                    id: 'last_name',
                    type: 'text',
                  }"
                />
              </n-form-item-gi>

              <n-form-item-gi
                span="0:2 500:1"
                :show-label="false"
                label="Email Address"
                path="email_address"
              >
                <n-input
                  v-model:value="formValue.email_address"
                  placeholder="Enter Email Address..."
                  :input-props="{
                    id: 'email_address',
                    type: 'email',
                  }"
                />
              </n-form-item-gi>

              <n-form-item-gi
                span="0:2 500:1"
                path="phone_number"
                :show-label="false"
                label="Phone Number"
              >
                <VueTelInput
                  v-model="formValue.phone_number"
                  :dropdown-options="dropdownOptions"
                  :input-options="inputOptions"
                  aria-label="phone input"
                  id="phone_number"
                />
              </n-form-item-gi>
            </n-grid>
            <n-button
              style="
                width: 100%;
                text-transform: uppercase;
                background-color: #b91c1c;
              "
              :loading="loading"
              @click="handleValidateButtonClick"
              size="large"
              color="#b91c1c"
              >Get Prices & Availability</n-button
            >
          </n-form>
        </div>
      </n-grid-item>
      <!--      <n-grid-item>-->
      <!--        <pre class="text-white">{{ formValue }}</pre>-->
      <!--      </n-grid-item>-->
    </n-grid>
  </n-config-provider>
</template>
