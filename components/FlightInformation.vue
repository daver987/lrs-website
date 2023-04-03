<script setup lang="ts">
// import { FormInst, useMessage, FormRules, useLoadingBar } from 'naive-ui'
// import { WatchCallback } from 'vue'
// import { ref, computed } from '#imports'
// import { VueTelInput } from 'vue-tel-input'
// import { Place, placeSchema } from '~/schema/placeSchema'
// import type { QuoteForm } from '~/schema/QuoteFormSchema'
// import { useDataStore } from '~/stores/useDataStore'
// import { useUserStore } from '~/stores/useUserStore'
// import { storeToRefs } from 'pinia'
// import {
//   buildPassengerOptions,
//   buildHoursOptions,
//   Option,
// } from '~/composables/useBuildOptions'
// import { useQuery } from '@tanstack/vue-query'
// import { ChatCompletionResponseMessage } from 'openai'
// import { format } from 'date-fns'
//
// const formRef = ref<FormInst | null>(null)
// const loading = ref(false)
// const userStore = useUserStore()
// const dataStore = useDataStore()
// const { user_id } = storeToRefs(userStore)
// const { vehicleTypes, serviceTypes, lineItems, salesTaxes } =
//   storeToRefs(dataStore)
// const message = useMessage()
// const loadingBar = useLoadingBar()
//
// const serviceTypeFetch = () => useTrpc().service.get.query()
// const vehicleTypeFetch = () => useTrpc().vehicle.get.query()
// const lineItemsFetch = () => useTrpc().lineItem.get.query()
// const salesTaxesFetch = () => useTrpc().salesTax.get.query()
//
// const { data: service, suspense: serviceSuspense } = await useQuery({
//   queryKey: ['services'],
//   queryFn: serviceTypeFetch,
// })
// await serviceSuspense()
// const { data: vehicle, suspense: vehicleSuspense } = await useQuery({
//   queryKey: ['vehicles'],
//   queryFn: vehicleTypeFetch,
// })
// await vehicleSuspense()
// const { data: lineItem, suspense: salesTaxSuspense } = await useQuery({
//   queryKey: ['lineItems'],
//   queryFn: lineItemsFetch,
// })
// await salesTaxSuspense()
// const { data: salesTax, suspense: lineItemsSuspense } = await useQuery({
//   queryKey: ['taxes'],
//   queryFn: salesTaxesFetch,
// })
// await lineItemsSuspense()
//
// dataStore.setVehicleTypes(vehicle.value!)
// dataStore.setServiceTypes(service.value!)
// dataStore.setLineItems(lineItem.value!)
// dataStore.setSalesTaxes(salesTax.value!)
//
// const hoursOptions = buildHoursOptions()
// const maxPassengers = computed<number>(() => {
//   const vehicleType = vehicle.value!.find(
//     (type: Option) => type.value === formValue.value.vehicle_number
//   )
//   formValue.value.selected_passengers = null
//   return vehicleType ? vehicleType.max_passengers : 3
// })
//
// const passengerOptions = computed(() =>
//   buildPassengerOptions(maxPassengers.value)
// )
//
// const route = useRoute()
// const gtmValues = route.query
//
// //Todo enable tag manager
// // function triggerEvent() {
// //   gtm?.trackEvent({
// //     event: 'submitQuote',
// //     category: 'Request quote',
// //     action: 'click',
// //     label: 'Request Quote',
// //     value: 1,
// //     noninteraction: false,
// //   })
// // }
//
// // const formValue: Ref<QuoteForm> = ref({
// //   id: user_id.value,
// //   first_name: '',
// //   last_name: '',
// //   email_address: '',
// //   phone_number: '',
// //   conversion: {
// //     ...gtmValues,
// //   },
// //   origin: {} as Place,
// //   destination: {} as Place,
// //   pickup_date: null,
// //   pickup_time: null,
// //   return_date: null,
// //   return_time: null,
// //   selected_hours: null,
// //   selected_passengers: null,
// //   is_hourly: computed(() => {
// //     return formValue.value.service_number === 4
// //   }),
// //   vehicle_number: null,
// //   service_number: null,
// //   return_service_number: computed(() => {
// //     return formValue.value.service_number === 2
// //       ? 3
// //       : formValue.value.service_number
// //   }),
// //   is_round_trip: false,
// //   vehicle: vehicleTypes.value,
// //   service: serviceTypes.value,
// //   line_items: lineItems.value,
// //   sales_tax: salesTaxes.value,
// // })
//
// const formValueTwo = ref({
//   first_name: '',
//   last_name: '',
//   name: computed(() => {
//     return `${formValueTwo.value.first_name} ${formValueTwo.value.last_name}`
//   }),
//   origin: {} as Place,
//   pickupAddress: computed(() => {
//     return formValueTwo.value.origin.formattedLocationName
//   }),
//   destination: {} as Place,
//   dropOffAddress: computed(() => {
//     return formValueTwo.value.destination.formattedLocationName
//   }),
//   dateTime: computed(() => {
//     return format(
//       new Date(formValueTwo.value.dateTimestamp),
//       'MMMM d, y h:mm a'
//     )
//   }),
//   dateTimestamp: null,
//   price: 234.68,
//   quote_number: 4568,
// })
//
// const rules: FormRules = {
//   pickup_date: {
//     type: 'number',
//     required: true,
//     message: 'Please enter a pickup date',
//     trigger: ['blur'],
//   },
//   pickup_time: {
//     type: 'number',
//     required: true,
//     message: 'Please enter a pickup time',
//     trigger: 'blur',
//   },
//   return_date: {
//     type: 'number',
//     required: false,
//     message: 'Please enter a drop off date',
//     trigger: 'blur',
//   },
//   return_time: {
//     type: 'number',
//     required: false,
//     message: 'Please enter a drop off time',
//     trigger: 'blur',
//   },
//   selected_hours: {
//     type: 'number',
//     required: false,
//     message: 'Please enter in the amount of hours',
//     trigger: ['blur', 'change'],
//   },
//   selected_passengers: {
//     type: 'number',
//     message: 'Passengers is required',
//     trigger: ['blur', 'change'],
//     required: true,
//   },
//   vehicle_number: {
//     type: 'number',
//     trigger: ['blur', 'change'],
//     required: true,
//     message: 'Please select a vehicle type',
//   },
//   service_number: {
//     type: 'number',
//     message: 'Please select a service type',
//     trigger: ['blur', 'change'],
//     required: true,
//   },
//   first_name: {
//     required: true,
//     message: 'First name is required',
//     trigger: 'blur',
//   },
//   last_name: {
//     required: true,
//     message: 'Last name is required',
//     trigger: 'blur',
//   },
//   email_address: {
//     required: true,
//     message: 'Email is required',
//     trigger: 'blur',
//   },
//   phone_number: {
//     required: true,
//     message: 'Phone number is required',
//     trigger: 'blur',
//   },
// }
//
// const inputOptions = ref({
//   id: 'phone_number',
//   showDialCode: true,
//   name: 'phone_number',
//   type: 'tel',
//   ariaDescribedby: 'name',
//   ariaLabeledBy: 'placeholder',
//   placeholder: 'Enter Phone Number...',
// })
// const dropdownOptions = ref({
//   showDialCodeInSelection: false,
//   showFlags: true,
//   showSearchBox: false,
//   showDialCodeInList: true,
// })
//
// function isAirport(place?: Place): boolean {
//   if (!place) {
//     return false
//   }
//   try {
//     return placeSchema.parse(place).types.includes('airport')
//   } catch (error) {
//     return false
//   }
// }
//
// const handleFormValueChange: WatchCallback<
//   [typeof formValue.value.origin, typeof formValue.value.destination]
// > = ([origin, destination]) => {
//   if (!origin || !destination) {
//     return
//   }
//
//   const isOriginAirport = isAirport(origin)
//   const isDestinationAirport = isAirport(destination)
//   const fromAirportServiceType = 3
//   const toAirportServiceType = 2
//
//   if (isOriginAirport) {
//     formValue.value.service_number = fromAirportServiceType
//   } else if (isDestinationAirport) {
//     formValue.value.service_number = toAirportServiceType
//   } else {
//     formValue.value.service_number = null
//   }
// }
//
// watch(
//   [() => formValueTwo.value.origin, () => formValueTwo.value.destination],
//   handleFormValueChange,
//   {
//     deep: true,
//   }
// )
//
// const handleChangeOrigin = (evt: Place) => {
//   formValueTwo.value.origin = evt
// }
//
// const handleChangeDestination = (evt: Place) => {
//   formValueTwo.value.destination = evt
// }
// const data = ref<ChatCompletionResponseMessage | undefined>(undefined)
// const subject = ref('')
// const body = ref('')
// const to = ref('')
//
// function cleanJSON(jsonString: string) {
//   const cleanedString = jsonString.replace(/,\s*([\]}])/g, '$1')
//   return JSON.parse(cleanedString)
// }
// async function onSubmit() {
//   try {
//     loading.value = true
//     console.log('Quote Values Before Submission', formValueTwo.value)
//     const emailData = await useTrpc().openai.getTextMessage.mutate(
//       formValueTwo.value
//     )
//     console.log('Returned Email:', emailData)
//     data.value = emailData.choices[0].message
//
//     // const formattedMessage = emailData.choices[0].message!.content
//     // const message = computed(() => {
//     //   try {
//     //     return superjson.parse(formattedMessage)
//     //   } catch (error) {
//     //     console.error('Error parsing JSON:', error)
//     //     return {}
//     //   }
//     // })
//     // subject.value = message.value?.subject
//     body.value = emailData.choices[0].message as unknown as string
//     // to.value = message.value?.to
//   } catch (e) {
//     setTimeout(() => {
//       console.log('error', e)
//     }, 500)
//   } finally {
//     loading.value = false
//     loadingBar.finish()
//   }
// }
//
// function handleValidateButtonClick(e: MouseEvent) {
//   e.preventDefault()
//   formRef.value?.validate(async (errors) => {
//     if (errors) {
//       console.log(errors)
//       message.error('Please correct the errors on the form')
//     } else {
//       loadingBar.start()
//       await onSubmit()
//       message.success(
//         'You will receive a copy of the quote to the email address provided'
//       )
//     }
//   })
// }
//
// //calculating the start date on the calendar component
// function disablePreviousDate(ts: number) {
//   return ts < new Date().getTime() - 24 * 60 * 60 * 1000
// }
</script>

<template>
  <!--  <n-layout style="min-height: 100dvh">-->
  <!--    <n-layout-content style="padding: 1.5rem">-->
  <!--      <n-grid :cols="2">-->
  <!--        <n-grid-item :span="1">-->
  <!--          <n-grid :cols="1" responsive="self">-->
  <!--            <n-grid-item :span="1">-->
  <!--              <div-->
  <!--                class="border-1 rounded border border-white bg-black p-4 sm:mx-auto sm:w-full sm:max-w-2xl sm:overflow-hidden sm:rounded-lg"-->
  <!--              >-->
  <!--                <h2 class="mb-4 mt-2 text-center text-3xl uppercase text-white">-->
  <!--                  Instant Quote-->
  <!--                </h2>-->
  <!--                <n-form ref="formRef" :label-width="80" :model="formValueTwo">-->
  <!--                  <n-grid :x-gap="12" :cols="4" item-responsive>-->
  <!--                    <n-form-item-gi-->
  <!--                      :show-label="false"-->
  <!--                      label="Pickup Location"-->
  <!--                      :span="4"-->
  <!--                      path="origin"-->
  <!--                    >-->
  <!--                      <InputPlacesAutocompleteDark-->
  <!--                        @change="handleChangeOrigin"-->
  <!--                        name="origin"-->
  <!--                        placeholder="Enter Pickup Location...."-->
  <!--                      />-->
  <!--                    </n-form-item-gi>-->

  <!--                    <n-form-item-gi-->
  <!--                      :show-label="false"-->
  <!--                      :span="4"-->
  <!--                      label="Drop-off Location"-->
  <!--                      path="destination"-->
  <!--                    >-->
  <!--                      <InputPlacesAutocompleteDark-->
  <!--                        name="destination"-->
  <!--                        @change="handleChangeDestination"-->
  <!--                        placeholder="Enter Drop-off Location...."-->
  <!--                      />-->
  <!--                    </n-form-item-gi>-->
  <!--                    <n-form-item-gi-->
  <!--                      path="pickup_date_time"-->
  <!--                      :span="2"-->
  <!--                      :show-label="false"-->
  <!--                      label="Pickup Date"-->
  <!--                    >-->
  <!--                      <n-date-picker-->
  <!--                        v-model:value="formValueTwo.dateTimestamp"-->
  <!--                        type="datetime"-->
  <!--                        placeholder="Select Pickup Date and Time..."-->
  <!--                        :default-value="Date.now()"-->
  <!--                        :is-date-disabled="disablePreviousDate"-->
  <!--                      />-->
  <!--                    </n-form-item-gi>-->
  <!--                    <n-form-item-gi-->
  <!--                      path="pickup_time"-->
  <!--                      :span="2"-->
  <!--                      :show-label="false"-->
  <!--                      label="Pickup Date and Time"-->
  <!--                    >-->
  <!--                      <n-space justify="space-between">-->
  <!--                        <n-time-picker-->
  <!--                          v-model:value="formValue.pickup_time"-->
  <!--                          format="h:mm a"-->
  <!--                          :clearable="true"-->
  <!--                          use12-hours-->
  <!--                        />-->
  <!--                        <n-switch-->
  <!--                          v-if="false"-->
  <!--                          v-model:value="formValue.is_round_trip"-->
  <!--                        >-->
  <!--                          <template #checked> Round</template>-->
  <!--                          <template #unchecked> One Way</template>-->
  <!--                        </n-switch>-->
  <!--                      </n-space>-->
  <!--                    </n-form-item-gi>-->
  <!--                  </n-grid>-->
  <!--                  <n-collapse-transition-->
  <!--                    v-if="false"-->
  <!--                    :show="formValue.is_round_trip"-->
  <!--                  >-->
  <!--                    <n-grid :cols="2" item-responsive :x-gap="12">-->
  <!--                      <n-form-item-gi-->
  <!--                        :span="1"-->
  <!--                        :show-label="false"-->
  <!--                        label="Return Date"-->
  <!--                        path="dateTime.return_date"-->
  <!--                      >-->
  <!--                        <n-date-picker-->
  <!--                          v-model:value="formValue.return_date"-->
  <!--                          type="date"-->
  <!--                          placeholder="Select Return Date"-->
  <!--                          :default-value="Date.now()"-->
  <!--                          :is-date-disabled="disablePreviousDate"-->
  <!--                        />-->
  <!--                      </n-form-item-gi>-->
  <!--                      <n-form-item-gi-->
  <!--                        :span="1"-->
  <!--                        :show-label="false"-->
  <!--                        label="Return Time"-->
  <!--                        path="dateTime.return_time"-->
  <!--                      >-->
  <!--                        <n-time-picker-->
  <!--                          v-model:value="formValue.return_time"-->
  <!--                          format="h:mm a"-->
  <!--                          :clearable="true"-->
  <!--                          use12-hours-->
  <!--                        />-->
  <!--                      </n-form-item-gi>-->
  <!--                    </n-grid>-->
  <!--                  </n-collapse-transition>-->
  <!--                  <n-grid :cols="2" item-responsive :x-gap="12">-->
  <!--                    <n-form-item-gi-->
  <!--                      span="0:2 500:1"-->
  <!--                      :show-label="false"-->
  <!--                      label="Service Type"-->
  <!--                      path="service_number"-->
  <!--                    >-->
  <!--                      <n-select-->
  <!--                        v-model:value="formValue.service_number"-->
  <!--                        :options="service"-->
  <!--                        placeholder="Select Service Type..."-->
  <!--                      />-->
  <!--                    </n-form-item-gi>-->

  <!--                    <n-form-item-gi-->
  <!--                      span="0:2 500:1"-->
  <!--                      :show-label="false"-->
  <!--                      label="Vehicle Type"-->
  <!--                      path="vehicle_number"-->
  <!--                    >-->
  <!--                      <n-select-->
  <!--                        v-model:value="formValue.vehicle_number"-->
  <!--                        :options="vehicle"-->
  <!--                        placeholder="Select Vehicle Type..."-->
  <!--                      />-->
  <!--                    </n-form-item-gi>-->

  <!--                    <n-form-item-gi-->
  <!--                      span="0:2 500:1"-->
  <!--                      :show-label="false"-->
  <!--                      label="Passengers"-->
  <!--                      path="selected_passengers"-->
  <!--                    >-->
  <!--                      <n-select-->
  <!--                        v-model:value="formValue.selected_passengers"-->
  <!--                        :options="passengerOptions"-->
  <!--                        placeholder="Select Passengers..."-->
  <!--                      />-->
  <!--                    </n-form-item-gi>-->

  <!--                    <n-form-item-gi-->
  <!--                      span="0:2 500:1"-->
  <!--                      :show-label="false"-->
  <!--                      label="Hours"-->
  <!--                      path="selected_hours"-->
  <!--                    >-->
  <!--                      <n-select-->
  <!--                        v-model:value="formValue.selected_hours"-->
  <!--                        :options="hoursOptions"-->
  <!--                        placeholder="For Hourly Service..."-->
  <!--                        :disabled="!formValue.is_hourly"-->
  <!--                      />-->
  <!--                    </n-form-item-gi>-->

  <!--                    <n-form-item-gi-->
  <!--                      :show-label="false"-->
  <!--                      label="First Name"-->
  <!--                      path="first_name"-->
  <!--                      span="0:2 500:1"-->
  <!--                    >-->
  <!--                      <n-input-->
  <!--                        v-model:value="formValueTwo.first_name"-->
  <!--                        placeholder="Enter First Name..."-->
  <!--                        :show-label="false"-->
  <!--                        label="Phone Number"-->
  <!--                      />-->
  <!--                    </n-form-item-gi>-->

  <!--                    <n-form-item-gi-->
  <!--                      span="0:2 500:1"-->
  <!--                      :show-label="false"-->
  <!--                      label="Last Name"-->
  <!--                      path="last_name"-->
  <!--                    >-->
  <!--                      <n-input-->
  <!--                        v-model:value="formValueTwo.last_name"-->
  <!--                        placeholder="Enter Last Name..."-->
  <!--                      />-->
  <!--                    </n-form-item-gi>-->

  <!--                    <n-form-item-gi-->
  <!--                      span="0:2 500:1"-->
  <!--                      :show-label="false"-->
  <!--                      label="Email Address"-->
  <!--                      path="email_address"-->
  <!--                    >-->
  <!--                      <n-input-->
  <!--                        v-model:value="formValue.email_address"-->
  <!--                        placeholder="Enter Email Address..."-->
  <!--                      />-->
  <!--                    </n-form-item-gi>-->

  <!--                    <n-form-item-gi-->
  <!--                      span="0:2 500:1"-->
  <!--                      path="phone_number"-->
  <!--                      :show-label="false"-->
  <!--                      label="Phone Number"-->
  <!--                    >-->
  <!--                      <VueTelInput-->
  <!--                        v-model="formValue.phone_number"-->
  <!--                        :dropdown-options="dropdownOptions"-->
  <!--                        :input-options="inputOptions"-->
  <!--                        aria-label="phone input"-->
  <!--                      />-->
  <!--                    </n-form-item-gi>-->
  <!--                  </n-grid>-->
  <!--                  <n-button-->
  <!--                    style="-->
  <!--                      width: 100%;-->
  <!--                      text-transform: uppercase;-->
  <!--                      background-color: #b91c1c;-->
  <!--                    "-->
  <!--                    :loading="loading"-->
  <!--                    @click="onSubmit"-->
  <!--                    size="large"-->
  <!--                    color="#b91c1c"-->
  <!--                    >Submit Request</n-button-->
  <!--                  >-->
  <!--                </n-form>-->
  <!--              </div>-->
  <!--            </n-grid-item>-->
  <!--          </n-grid>-->
  <!--        </n-grid-item>-->
  <!--        <n-grid-item :span="1">-->
  <!--          <n-card title="Email Response">-->
  <!--            <n-h2>{{ to }}</n-h2>-->
  <!--            <n-h3>Subject: {{ subject }}</n-h3>-->
  <!--            &lt;!&ndash;            <span v-html="body"></span>&ndash;&gt;-->
  <!--            <n-p style="white-space: pre-wrap">Body: {{ body.content }}</n-p>-->
  <!--          </n-card>-->
  <!--          <n-card title="Response and Test Data">-->
  <!--            <pre>Data:{{ data ? data.content : '' }}</pre>-->
  <!--            &lt;!&ndash;            <pre>Form Data:{{ formValueTwo }}</pre>&ndash;&gt;-->
  <!--          </n-card>-->
  <!--        </n-grid-item>-->
  <!--      </n-grid>-->
  <!--    </n-layout-content>-->
  <!--  </n-layout>-->
</template>
