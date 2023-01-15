// функции взаимодействия с сервером
import {url} from './config.js'
// получение списка клиентов с сервера
export async function getClientsList() {
  let response = await fetch(url + 'clients')
  let data = await response.json()
  return data
}

export async function createClient(data) {
  const response = await fetch(url + 'clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      surname: data.surname,
      lastName: data.lastName,
      contacts: data.contacts
    })
  })
}

export async function updateClient(id, data) {
  const response = await fetch(url + 'clients/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      surname: data.surname,
      lastName: data.lastName,
      contacts: data.contacts
    })
  })
}

export async function getClient(id) {
  const response = await fetch(url + 'clients/' + id)
  let clientData = await response.json()
  return clientData
}

export async function deleteClient(id) {
  const response = await fetch(url + 'clients/' + id, {
    method: 'DELETE'
  }) 
}