import { defineStore } from 'pinia'

export interface ContactMessage {
  id: string
  name: string
  email: string
  service: string
  message: string
  createdAt: string
  read: boolean
}

export const useContactStore = defineStore('contact', () => {
  const messages = ref<ContactMessage[]>([])

  const form = ref({
    name: '',
    email: '',
    service: 'The Atelier Facial',
    message: '',
  })

  const submitted = ref(false)
  const submitting = ref(false)

  async function submitContact() {
    submitting.value = true
    // Simulate async submit
    await new Promise(resolve => setTimeout(resolve, 600))
    messages.value.unshift({
      id: Date.now().toString(),
      name: form.value.name,
      email: form.value.email,
      service: form.value.service,
      message: form.value.message,
      createdAt: new Date().toISOString(),
      read: false,
    })
    form.value = { name: '', email: '', service: 'The Atelier Facial', message: '' }
    submitting.value = false
    submitted.value = true
  }

  function resetSubmitted() {
    submitted.value = false
  }

  return { messages, form, submitted, submitting, submitContact, resetSubmitted }
}, {
  persist: {
    pick: ['messages'],
  },
})
