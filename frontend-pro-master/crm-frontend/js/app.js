// приложение
import { icons, contactsSelects } from "./data.js"
import { getClientsList, deleteClient, createClient, updateClient, getClient } from './api.js'
import { rendering, validateLangName, validateOnEmpty, firstLetterToUpperCase, selectChoice, getCurrentDate, printContactsIcons } from './helpFunctions.js'

// создание popap
const popap = createPopap()
// создание элементов страницы
const app = createMainSiteElements()

// получение элемнта таблица
const table = app.$tBody

// создание анимации загрузки
const loading = createLoadingAnimation()
table.innerHTML = ''
table.append(loading)

// получение данных о клиентах с API
let clientsData = {
  clients: await getClientsList(),
  direction: true
}

let clients,
    direction

if(clientsData.clients) {
  table.innerHTML = ''
  // лист клиентов
  clients = clientsData.clients,
  // направление рендеринга 
  direction = clientsData.direction
  // заполнение таблицы 
  fillTable(table, clients, printClient)
}

class ClientData {
  constructor(surname, name, lastName, contacts) {
    this.surname = surname
    this.name = name
    this.lastName = lastName
    this.contacts = contacts
  }
}
class ContactData {
  constructor(type, value) {
    this.type = type
    this.value = value
  }
}

export function createMainSiteElements() {
  const $header = document.createElement('header'),
        $headerContainer = document.createElement('div'),
        $iconLink = document.createElement('a'),
        $search = document.createElement('input'),
        $main = document.createElement('main'),
        $mainContainer = document.createElement('div'),
        $title = document.createElement('h2'),
        $table = document.createElement('table'),
        $tHead = document.createElement('thead'),
        $trHead = document.createElement('tr'),
        $th1 = document.createElement('th'),
        $th2 = document.createElement('th'),
        $th3 = document.createElement('th'),
        $th4 = document.createElement('th'),
        $th5 = document.createElement('th'),
        $th6 = document.createElement('th'),
        $th1btn = document.createElement('button'),
        $th2btn = document.createElement('button'),
        $th3btn = document.createElement('button'),
        $th4btn = document.createElement('button'),
        $th5btn = document.createElement('button'),
        $th6btn = document.createElement('button'),
        $arrowIcon1 = document.createElement('div'),
        $arrowIcon2 = document.createElement('div'),
        $arrowIcon3 = document.createElement('div'),
        $arrowIcon4 = document.createElement('div'),
        $tBody = document.createElement('tbody'),
        $addClientBtn = document.createElement('button'),
        $addClientText =document.createElement('span')


  $headerContainer.setAttribute('class', 'container')
  $headerContainer.classList.add('header__container')
  $mainContainer.setAttribute('class', 'container')
  $mainContainer.classList.add('main__container')
  $iconLink.setAttribute('class', 'header__link')
  $iconLink.innerHTML = icons.logo
  $iconLink.setAttribute('alt', 'логотип компании')
  $iconLink.setAttribute('href', 'index.html')
  $search.setAttribute('class', 'form-control')
  $search.setAttribute('type', 'text')
  $search.setAttribute('placeholder', 'Введите запрос')
  $title.setAttribute('class', 'title')
  $title.textContent = 'Клиенты'
  $table.setAttribute('class', 'table-light')
  $table.classList.add('table')
  $th1.setAttribute('scope', 'col')
  $th2.setAttribute('scope', 'col')
  $th3.setAttribute('scope', 'col')
  $th4.setAttribute('scope', 'col')
  $th5.setAttribute('scope', 'col')
  $th6.setAttribute('scope', 'col')
  $th1.setAttribute('class', 'table__title')
  $th2.setAttribute('class', 'table__title')
  $th3.setAttribute('class', 'table__title')
  $th4.setAttribute('class', 'table__title')
  $th5.setAttribute('class', 'table__title')
  $th6.setAttribute('class', 'table__title')
  $th1btn.setAttribute('class', 'btn')
  $th2btn.setAttribute('class', 'btn')
  $th3btn.setAttribute('class', 'btn')
  $th4btn.setAttribute('class', 'btn')
  $th5btn.setAttribute('class', 'btn')
  $th6btn.setAttribute('class', 'btn')
  $arrowIcon1.setAttribute('class', 'arrow-icon')
  $arrowIcon2.setAttribute('class', 'arrow-icon')
  $arrowIcon3.setAttribute('class', 'arrow-icon')
  $arrowIcon4.setAttribute('class', 'arrow-icon')
  $th5btn.disabled = true
  $th6btn.disabled = true
  $th1btn.classList.add('btn-light')
  $th2btn.classList.add('btn-light')
  $th3btn.classList.add('btn-light')
  $th4btn.classList.add('btn-light')
  $th5btn.classList.add('btn-light')
  $th6btn.classList.add('btn-light')
  $th1btn.classList.add('table__btn')
  $th2btn.classList.add('table__btn')
  $th3btn.classList.add('table__btn')
  $th4btn.classList.add('table__btn')
  $th5btn.classList.add('table__btn')
  $th6btn.classList.add('table__btn')
  $th1btn.textContent = 'ID'
  $th2btn.textContent = 'Фамилия Имя Отчество'
  $th3btn.textContent = 'Дата и время создания'
  $th4btn.textContent = 'Последние изменения'
  $th5btn.textContent = 'Контакты'
  $th6btn.textContent = 'Действия'
  $arrowIcon1.innerHTML = icons.arrowIcon
  $arrowIcon2.innerHTML = icons.arrowIcon
  $arrowIcon3.innerHTML = icons.arrowIcon
  $arrowIcon4.innerHTML = icons.arrowIcon
  $tBody.setAttribute('id', 'table__list')
  $addClientBtn.setAttribute('class', 'btn')
  $addClientBtn.classList.add('btn-secondary')
  $addClientBtn.classList.add('btn-add-clients')
  $addClientText.setAttribute('class', 'btn-add-clients__text')
  $addClientBtn.innerHTML = icons.addClientIcon
  $addClientText.textContent = 'Добавить клиента'

  // поиск клиента
  $search.addEventListener('input', () => {
    $tBody.innerHTML = ''
    $tBody.append(loading)
    let setTimeoutId = null
    setTimeoutId = setTimeout(searchClients, 600, $search.value.toLowerCase())
  })

  function searchClients(value) {
    let currentClients = []
    clients.forEach(client => {
      const clientData = `${client.id} ${client.surname} ${client.name} ${client.lastName}`
      if(clientData.toLowerCase().indexOf(value) > -1) {
        currentClients.push(client)
      }
    })
    if(currentClients.length > 0) {
      $tBody.innerHTML = ''
      fillTable($tBody, currentClients, printClient)
    } else {
      $tBody.innerHTML = ''
      const $noClientsMessage = document.createElement('p')
      $noClientsMessage.innerHTML = 'По данному запросу клиентов не найдено или обновите параметры поиска'
      $noClientsMessage.setAttribute('class', 'no-clients-message')
      $tBody.append($noClientsMessage)
    }
  }
  
  // рендеринг таблицы
  // по id
  $th1btn.addEventListener('click', () => {
    if(clients) {
      $tBody.innerHTML = ''
      direction = !direction
      if(direction) {
        $arrowIcon1.classList.add('arrow-icon--active')
      } else {
        $arrowIcon1.classList.remove('arrow-icon--active')
      }
      fillTable(table, rendering(clients, 'id', direction), printClient)
    } 
  })

  // по фамилии
  $th2btn.addEventListener('click', () => {
    if(clients) {
      $tBody.innerHTML = ''
      direction = !direction
      if(direction) {
        $arrowIcon2.classList.add('arrow-icon--active')
      } else {
        $arrowIcon2.classList.remove('arrow-icon--active')
      }
      fillTable(table, rendering(clients, 'surname', direction), printClient)
    }  
  })

  // по дате создания
  $th3btn.addEventListener('click', () => {
    if(clients) {
      $tBody.innerHTML = ''
      direction = !direction
      if(direction) {
        $arrowIcon3.classList.add('arrow-icon--active')
      } else {
        $arrowIcon3.classList.remove('arrow-icon--active')
      }
      fillTable(table, rendering(clients, 'createdAt', direction), printClient)
    }
  })

  // по дате изменения
  $th4btn.addEventListener('click', () => {
    if(clients) {
      $tBody.innerHTML = ''
      direction = !direction
      if(direction) {
        $arrowIcon4.classList.add('arrow-icon--active')
      } else {
        $arrowIcon4.classList.remove('arrow-icon--active')
      }
      fillTable(table, rendering(clients, 'updatedAt', direction), printClient)
    }
  })

  // создание popap на добавления клиента
  $addClientBtn.addEventListener('click', () => {
    popap.$popapBlock.textContent = ''
    fillPopapAddClient(popap.$popapBlock, async function() {
      popap.$popapBg.deactive()
      if(clients) {
        table.textContent = ''
        clients = await getClientsList()
        fillTable(table, clients, printClient)
      } else {
        table.textContent = ''
        table.append(loading)
      }
    })
    popap.$popapBg.active()
  })

  $header.append($headerContainer)
  $headerContainer.append($iconLink)
  $headerContainer.append($search)
  $mainContainer.append($title)
  $main.append($mainContainer)
  $th1btn.append($arrowIcon1)
  $th2btn.append($arrowIcon2)
  $th3btn.append($arrowIcon3)
  $th4btn.append($arrowIcon4)
  $th1.append($th1btn)
  $th2.append($th2btn)
  $th3.append($th3btn)
  $th4.append($th4btn)
  $th5.append($th5btn)
  $th6.append($th6btn)
  $trHead.append($th1)
  $trHead.append($th2)
  $trHead.append($th3)
  $trHead.append($th4)
  $trHead.append($th5)
  $trHead.append($th6)
  $tHead.append($trHead)
  $table.append($tHead)
  $table.append($tBody)
  $mainContainer.append($table)
  $addClientBtn.append($addClientText)
  $mainContainer.append($addClientBtn)

  document.body.append($header)
  document.body.append($main)

  return {
    $search,
    $tBody,
    $addClientBtn
  }
}

// функция отрисовки строк значений таблицы
export function printClient(client) {
  const $clientTR = document.createElement('tr'),
        $idTD = document.createElement('td'),
        $fioTD = document.createElement('td'),
        $createTD = document.createElement('td'),
        $dateCreate = document.createElement('span'), 
        $timeCreate = document.createElement('span'),
        $updateTD = document.createElement('td'),
        $dateUpdate = document.createElement('span'), 
        $timeUpdate = document.createElement('span'),
        $contacts = document.createElement('td'),
        $doTD = document.createElement('td'),
        $btnsBlock = document.createElement('div'),
        $btnUpdate = document.createElement('button'),
        $btnDelete = document.createElement('button'),
        $btnUpdateText = document.createElement('span'),
        $btnDeleteText = document.createElement('span')

  $clientTR.setAttribute('class', 'table-light')
  $idTD.setAttribute('class', 'table-light')
  $fioTD.setAttribute('class', 'table-light') 
  $createTD.setAttribute('class', 'table-light')
  $createTD.classList.add('createTd')
  $dateCreate.setAttribute('class', 'createTd__date')
  $timeCreate.setAttribute('class', 'createTd__time')
  $contacts.setAttribute('class', 'contacts-td')
  $updateTD.setAttribute('class', 'table-light')
  $dateUpdate.setAttribute('class', 'updateTd__date')
  $timeUpdate.setAttribute('class', 'updateTd__time')   
  
  // присвоение и отрисовки иконки контакта
  printContactsIcons(client.contacts, $contacts, icons)
  
  $doTD.setAttribute('class', 'table-light')
  $doTD.classList.add('do-td')
  $btnsBlock.setAttribute('class', 'btns-block')
  $btnDelete.setAttribute('class', 'btn')       
  $btnDelete.classList.add('btn', 'btn-light')
  $btnDelete.classList.add('btn', 'btn-delete-clients')
  $btnDeleteText.setAttribute('class', 'btn-delete-clients__text') 
  $btnUpdate.setAttribute('class', 'btn')       
  $btnUpdate.classList.add('btn', 'btn-light')  
  $btnUpdate.classList.add('btn', 'btn-update-clients')
  $btnUpdateText.setAttribute('class', 'btn-update-clients__text') 
  $btnUpdate.innerHTML = icons.aditIcon
  $btnDelete.innerHTML = icons.cancelIcon
  
  $idTD.textContent = client.id
  $fioTD.textContent = client.surname + ' ' + client.name + ' ' + client.lastName       
  $dateCreate.textContent = getCurrentDate(client.createdAt).setFullDate
  $timeCreate.textContent = getCurrentDate(client.createdAt).setFullTime
  $dateUpdate.textContent = getCurrentDate(client.updatedAt).setFullDate
  $timeUpdate.textContent = getCurrentDate(client.updatedAt).setFullTime
 
  $btnUpdateText.textContent = 'Изменить'
  $btnDeleteText.textContent = 'Удалить'

  // изменение клиента
  $btnUpdate.addEventListener('click', () => {
    popap.$popapBlock.textContent = ''
    fillPopapUpdateClient(popap.$popapBlock, async function() {
      popap.$popapBg.deactive()
      clients = await getClientsList()
      if(clients) {
        table.textContent = ''
        fillTable(table, clients, printClient)
      } else {
        table.textContent = ''
        table.append(loading)
      }
    }, client.id)
    popap.$popapBg.active()
  })

  // удаление клиента
  $btnDelete.addEventListener('click', () => {
    popap.$popapBlock.textContent = ''
    fillPopapDeleteClient(popap.$popapBlock, async function() {
      $clientTR.remove()
      await deleteClient(client.id)
      clients = await getClientsList()
      popap.$popapBg.deactive()
    })
    popap.$popapBg.active()
  })

  $clientTR.append($idTD)
  $clientTR.append($fioTD)
  $createTD.append($dateCreate)
  $createTD.append($timeCreate) 
  $clientTR.append($createTD)
  $updateTD.append($dateUpdate)
  $updateTD.append($timeUpdate)  
  $clientTR.append($updateTD)
  $clientTR.append($contacts)
  $btnUpdate.append($btnUpdateText)
  $btnDelete.append($btnDeleteText) 
  $btnsBlock.append($btnUpdate) 
  $btnsBlock.append($btnDelete)
  $doTD.append($btnsBlock)  
  $clientTR.append($doTD) 

  return $clientTR
}

// функция заполнения таблицы
export function fillTable(table, clients, printClient) {
  for (const client of clients) {
    table.append(printClient(client))
  }
}

// функция создания popap для добавления клиента
export function createPopap() {
  const $popapBg = document.createElement('div'),
        $popapWindow = document.createElement('div'),
        $popapBlock = document.createElement('div'),      
        $popapCancel = document.createElement('a'),
        $popapClose = document.createElement('button')
  
  $popapBg.setAttribute('class', 'popap-bg')
  $popapWindow.setAttribute('class', 'popap')
  
  $popapCancel.setAttribute('class', 'popap__cansel-link')
  $popapCancel.textContent = 'Отмена'
  $popapClose.setAttribute('class', 'popap__close')
  $popapClose.classList.add('class', 'btn-close')
  
  // активация popap
  $popapBg.active = function() {
    $popapBg.classList.add('popap-bg--active')
    $popapWindow.classList.add('popap--active')
    document.body.classList.add('body-popap-active')
    $popapWindow.style.overflow = 'auto'
  }
  // деактивация popap
  $popapBg.deactive = function() {
    $popapBg.classList.remove('popap-bg--active')
    $popapWindow.classList.remove('popap--active')
    document.body.classList.remove('body-popap-active')
    $popapWindow.style.overflow = 'hidden'
  }

  // закрытие popap
  $popapClose.addEventListener('click', () => {
    $popapBg.deactive() 
  })
  $popapCancel.addEventListener('click', () => {
    $popapBg.deactive() 
  })
  document.addEventListener('click', (e) => {
    if(e.target === $popapBg) {
      $popapBg.deactive() 
    }
  })
  window.onkeydown = function(e) {
    if (e.key == 'Escape') {
      $popapBg.deactive() 
    }
  }


  $popapWindow.append($popapBlock)
  $popapWindow.append($popapCancel)
  $popapWindow.append($popapClose)
  $popapBg.append($popapWindow)

  document.body.append($popapBg)

  return {
    $popapBg,
    $popapBlock
  }
}

// функция заполнения popap формой создания клиента
export async function fillPopapAddClient(popap, closePopap) {
  const $popapTitle = document.createElement('h3'),
        $popapForm = document.createElement('form'),
        $popapInputs = document.createElement('div'),
        $popapSurnameLabel = document.createElement('label'),
        $popapInputSurname = document.createElement('input'),
        $popapPlaceHolderSurn = document.createElement('span'),
        $popapNameLabel = document.createElement('label'),
        $popapInputName = document.createElement('input'),
        $popapPlaceHolderName = document.createElement('span'),
        $popapLastnameLabel = document.createElement('label'),
        $popapInputLastname = document.createElement('input'),
        $popapPlaceHolderLastname = document.createElement('span'),
        $popapContacts = document.createElement('div'),
        $popapAddContactBtn = document.createElement('button'),
        $popapAddContactText = document.createElement('span'),
        $errorMessageLang = document.createElement('p'),
        $errorMessageEmpty = document.createElement('p'),
        $errorMessageNoContact = document.createElement('p'),
        $popapBtnSave = document.createElement('button')
        
  $popapTitle.setAttribute('class', 'popap__title')
  $popapForm.setAttribute('class', 'popap__form')
  $popapTitle.textContent = 'Новый клиент'
  $popapInputs.setAttribute('class', 'popap__inputs')
  $popapSurnameLabel.setAttribute('class', 'popap__label')
  $popapNameLabel.setAttribute('class', 'popap__label')
  $popapLastnameLabel.setAttribute('class', 'popap__label') 
  $popapInputSurname.setAttribute('class', 'popap__input')
  $popapInputSurname.setAttribute('type', 'text')
  $popapInputName.setAttribute('class', 'popap__input')
  $popapInputName.setAttribute('type', 'text')
  $popapInputLastname.setAttribute('class', 'popap__input')
  $popapInputLastname.setAttribute('type', 'text')
  $popapPlaceHolderSurn.textContent = 'Фамилия'
  $popapPlaceHolderName.textContent = 'Имя'
  $popapPlaceHolderLastname.textContent = 'Отчество'
  $popapPlaceHolderSurn.setAttribute('class', 'popap__placeholder-surname')
  $popapPlaceHolderName.setAttribute('class', 'popap__placeholder-name')
  $popapPlaceHolderLastname.setAttribute('class', 'popap__placeholder-lastname')
  $popapAddContactBtn.innerHTML = icons.addContactIcon
  $popapContacts.setAttribute('class', 'popap__contacts')
  $popapAddContactBtn.setAttribute('class', 'btn')
  $popapAddContactBtn.classList.add('btn-light')
  $popapAddContactBtn.classList.add('popap__add-contact-btn')
  $popapAddContactText.textContent = 'Добавить контакт'
  $popapAddContactText.setAttribute('class', 'popap__add-contact-text')
  $errorMessageLang.setAttribute('class', 'error-message1')
  $errorMessageLang.textContent = `Пожалуйста, введите имя на кирилице 'А-я' `
  $errorMessageEmpty.setAttribute('class', 'error-message2')
  $errorMessageEmpty.textContent = `Пожалуйста, внесите данные во все обязательные поля *`
  $errorMessageNoContact.setAttribute('class', 'error-message3')
  $errorMessageNoContact.textContent = `Пожалуйста, введите данные хотя бы одного контакта`
  $popapBtnSave.setAttribute('class', 'btn')
  $popapBtnSave.classList.add('btn-secondary')
  $popapBtnSave.classList.add('btn-save')
  $popapBtnSave.textContent = 'Сохранить'

  // скрытие и появление * в input и бордер error валидации
  $popapInputSurname.addEventListener('input', () => {
    if($popapInputSurname.value) {
      $popapPlaceHolderSurn.classList.add('popap__placeholder--deactive')
      $errorMessageLang.classList.remove('error-message--active')
      $errorMessageEmpty.classList.remove('error-message--active')
      $popapInputSurname.classList.remove('error')
    } else {
      $popapPlaceHolderSurn.classList.remove('popap__placeholder--deactive')
    }
  })
  
  $popapInputName.addEventListener('input', () => {
    if($popapInputName.value) {
      $popapPlaceHolderName.classList.add('popap__placeholder--deactive')
      $errorMessageLang.classList.remove('error-message--active')
      $errorMessageEmpty.classList.remove('error-message--active')
      $popapInputName.classList.remove('error')
    } else {
      $popapPlaceHolderName.classList.remove('popap__placeholder--deactive')
    }
  })

  $popapInputLastname.addEventListener('input', () => {
    if($popapInputLastname.value) {
      $popapPlaceHolderLastname.classList.add('popap__placeholder--deactive')
      $errorMessageLang.classList.remove('error-message--active')
      $popapInputLastname.classList.remove('error')
    } else {
      $popapPlaceHolderLastname.classList.remove('popap__placeholder--deactive')
    }
  })

    // функция создания формы добавления контакта    
    function createAddContactForm() {
      const $contactsBlock = document.createElement('div'),
            $selectContact = document.createElement('div'),
            $selectHeader = document.createElement('div'),
            $selectCurrent = document.createElement('span'),
            $selectIcon = document.createElement('div'),
            $selectBody = document.createElement('div'),
            $option1 = document.createElement('div'),
            $option2 = document.createElement('div'),
            $option3 = document.createElement('div'),
            $option4 = document.createElement('div'),
            $contactInput = document.createElement('input'),
            $contactBtnDelete = document.createElement('button')
      
      $contactsBlock.setAttribute('class', 'contact-block')
      $selectContact.setAttribute('class', 'select')     
      $selectHeader.setAttribute('class', 'select__header')
      $selectIcon.innerHTML = icons.selectIcon
      $selectCurrent.setAttribute('class', 'select__current')
      $option1.setAttribute('class', 'select__option')
      $option2.setAttribute('class', 'select__option')
      $option3.setAttribute('class', 'select__option')
      $option4.setAttribute('class', 'select__option')
      $selectBody.setAttribute('class', 'select__body')
      $selectBody.active = () => {
        $selectBody.classList.add('select__body--active')
      }
      $selectBody.deactive = () => {
        $selectBody.classList.remove('select__body--active')
      }
      $selectIcon.setAttribute('class', 'select__icon')
      $selectCurrent.setAttribute('value', 'phone')
      $option1.setAttribute('value', 'phone')
      $option2.setAttribute('value', 'email')
      $option3.setAttribute('value', 'vk')
      $option4.setAttribute('value', 'telegram')
      $selectCurrent.textContent = 'Телефон'
      $option1.textContent = 'Доп. телефон'
      $option2.textContent = 'Email'
      $option3.textContent = 'vk'
      $option4.textContent = 'telegram'
      $contactInput.setAttribute('class', 'contact-input')
      $contactInput.addEventListener('input', () => {
        $contactInput.classList.remove('contact-input--error')
        $errorMessageNoContact.classList.remove('error-message--active')
      })
      $contactBtnDelete.innerHTML = icons.deleteContactIcon
      $contactBtnDelete.setAttribute('class', 'contact-delete-btn')
      $contactBtnDelete.classList.add('btn')
  
      // функции селекта
      $selectHeader.addEventListener('click', () => {
        $selectBody.classList.toggle('select__body--active')
        $selectIcon.classList.toggle('select__icon--active')
      })
  
      $contactBtnDelete.addEventListener('click', () => {
        $contactsBlock.remove()
      })
  
      // изменение значений селекта
      $option1.addEventListener('click', () => {
        selectChoice($selectCurrent, $option1)
        $selectBody.deactive()
        $selectIcon.classList.remove('select__icon--active')
      })
      $option2.addEventListener('click', () => {
        selectChoice($selectCurrent, $option2)
        $selectBody.deactive()
        $selectIcon.classList.remove('select__icon--active')
      })
      $option3.addEventListener('click', () => {
        selectChoice($selectCurrent, $option3)
        $selectBody.deactive()
        $selectIcon.classList.remove('select__icon--active')
      })
      $option4.addEventListener('click', () => {
        selectChoice($selectCurrent, $option4)
        $selectBody.deactive()
        $selectIcon.classList.remove('select__icon--active')
      })
  
  
      $selectHeader.append($selectCurrent)
      $selectHeader.append($selectIcon)
      $selectContact.append($selectHeader)
      $selectBody.append($option1)
      $selectBody.append($option2)
      $selectBody.append($option3)
      $selectBody.append($option4)
      $selectContact.append($selectBody)
      $contactsBlock.append($selectContact)
      $contactsBlock.append($contactInput)
      $contactsBlock.append($contactBtnDelete)

      // обьект форма добавления контакта
      let contactBlock = {
        $selectCurrent,
        $contactInput
      } 
      
      return {
        $contactsBlock,
        $selectBody,
        contactBlock
      }  
    }

    // массив форм добавления контактов
    let contactsBlocksArray = []
    
    // добавление формы контакта в DOM
    $popapAddContactBtn.addEventListener('click', (e) => {
      e.preventDefault()
      $errorMessageNoContact.classList.remove('error-message--active')
      $popapAddContactBtn.classList.remove('popap__add-contact-btn--error')
      let contact= createAddContactForm()
      contactsBlocksArray.push(contact.contactBlock)
      $popapAddContactBtn.insertAdjacentElement('beforeBegin', contact.$contactsBlock)
    })

     // создание клиента
  $popapForm.addEventListener('submit', async function(e) {
    e.preventDefault()
    if(!$popapInputSurname.value || !validateOnEmpty($popapInputSurname.value)) {
      $popapInputSurname.classList.add('error')
      $errorMessageEmpty.classList.add('error-message--active')
      return
    } else if(!$popapInputName.value || !validateOnEmpty($popapInputName.value)) {
      $popapInputName.classList.add('error')
      $errorMessageEmpty.classList.add('error-message--active')
      return
    } else if(!validateLangName($popapInputSurname.value)) {
      $errorMessageLang.classList.add('error-message--active')
      $popapInputSurname.classList.add('error')
      return
    } else if(!validateLangName($popapInputName.value)) {
      $errorMessageLang.classList.add('error-message--active')
      $popapInputName.classList.add('error')
      return
    } else if($popapInputLastname.value) {
      if(!validateLangName($popapInputLastname.value)) {
        $errorMessageLang.classList.add('error-message--active')
        $popapInputLastname.classList.add('error')
        return
      } 
    }
    
    // массив контактов
    let contacts = []
    for(const contactBlock of contactsBlocksArray) {
      if(!contactBlock.$contactInput.value || !validateOnEmpty(contactBlock.$contactInput.value)) {
        contactBlock.$contactInput.classList.add('contact-input--error')
        $errorMessageNoContact.classList.add('error-message--active')
        return
      }
      let contactData = new ContactData(contactBlock.$selectCurrent.getAttribute('value'), contactBlock.$contactInput.value)
      contacts.push(contactData)
    }

    // проверка на отсутствие контактов
    if(contacts.length < 1) {
      $errorMessageNoContact.classList.add('error-message--active')
      $popapAddContactBtn.classList.add('popap__add-contact-btn--error')
      return
    }


    // создание нового клиента
    let client = new ClientData(firstLetterToUpperCase($popapInputSurname.value), firstLetterToUpperCase($popapInputName.value), firstLetterToUpperCase($popapInputLastname.value), contacts)
    await createClient(client)
    $popapInputSurname.value = ''
    $popapInputName.value = ''
    $popapInputLastname.value = ''
    // закрыть popap
    closePopap()
  })

  $popapSurnameLabel.append($popapInputSurname)
  $popapSurnameLabel.append($popapPlaceHolderSurn)
  $popapNameLabel.append($popapInputName)
  $popapNameLabel.append($popapPlaceHolderName)
  $popapLastnameLabel.append($popapInputLastname)
  $popapLastnameLabel.append($popapPlaceHolderLastname)
  $popapInputs.append($popapSurnameLabel)
  $popapInputs.append($popapNameLabel)
  $popapInputs.append($popapLastnameLabel)
  $popapAddContactBtn.append($popapAddContactText)
  $popapForm.append($popapInputs)
  $popapContacts.append($popapAddContactBtn)
  $popapForm.append($popapContacts)
  $popapForm.append($errorMessageEmpty)
  $popapForm.append($errorMessageLang)
  $popapForm.append($errorMessageNoContact)
  $popapForm.append($popapBtnSave)
  popap.append($popapTitle)
  popap.append($popapForm)
}

// функция заполнения popap формой изменения клиента
export async function fillPopapUpdateClient(popap, closePopap, id) {

  // получение данных клиента
  let clientData = await getClient(id)

  // варианты селекта контактов
  // const contactsSelects = [
  //   {text: 'Телефон', value: 'phone'}, {text: 'Email', value: 'email'}, {text: 'Доп. телефон', value: 'phone'}, {text: 'vk', value: 'vk'}, {text: 'telegram', value: 'telegram'}
  // ]

  const $popapHeader = document.createElement('div'),
        $popapTitle = document.createElement('h3'),
        $popapId = document.createElement('span'),
        $popapForm = document.createElement('form'),
        $popapInputs = document.createElement('div'),
        $popapSurnameLabel = document.createElement('label'),
        $popapInputSurname = document.createElement('input'),
        $popapPlaceHolderSurn = document.createElement('span'),
        $popapNameLabel = document.createElement('label'),
        $popapInputName = document.createElement('input'),
        $popapPlaceHolderName = document.createElement('span'),
        $popapLastnameLabel = document.createElement('label'),
        $popapInputLastname = document.createElement('input'),
        $popapPlaceHolderLastname = document.createElement('span'),
        $popapContacts = document.createElement('div'),
        $popapAddContactBtn = document.createElement('button'),
        $popapAddContactText = document.createElement('span'),
        $errorMessageLang = document.createElement('p'),
        $errorMessageEmpty = document.createElement('p'),
        $errorMessageNoContact = document.createElement('p'),
        $popapBtnSave = document.createElement('button')
  
  $popapHeader.setAttribute('class', 'popap__header')      
  $popapTitle.setAttribute('class', 'popap__title')
  $popapId.setAttribute('class', 'popap__id')
  $popapForm.setAttribute('class', 'popap__form')
  $popapTitle.textContent = 'Изменить данные'
  $popapId.textContent = 'ID: ' + id
  $popapInputs.setAttribute('class', 'popap__inputs')
  $popapSurnameLabel.setAttribute('class', 'popap__label')
  $popapNameLabel.setAttribute('class', 'popap__label')
  $popapLastnameLabel.setAttribute('class', 'popap__label') 
  $popapInputSurname.setAttribute('class', 'popap__input')
  $popapInputName.setAttribute('class', 'popap__input')
  $popapInputLastname.setAttribute('class', 'popap__input')
  $popapInputSurname.value = clientData.surname
  $popapInputName.value = clientData.name
  $popapInputLastname.value = clientData.lastName
  $popapPlaceHolderSurn.textContent = 'Фамилия'
  $popapPlaceHolderName.textContent = 'Имя'
  $popapPlaceHolderLastname.textContent = 'Отчество'
  $popapPlaceHolderSurn.setAttribute('class', 'popap__placeholder-surname')
  $popapPlaceHolderName.setAttribute('class', 'popap__placeholder-name')
  $popapPlaceHolderLastname.setAttribute('class', 'popap__placeholder-lastname')
  $popapAddContactBtn.innerHTML = icons.addContactIcon
  $popapContacts.setAttribute('class', 'popap__contacts')
  $popapAddContactBtn.setAttribute('class', 'btn')
  $popapAddContactBtn.classList.add('btn-light')
  $popapAddContactBtn.classList.add('popap__add-contact-btn')
  $popapAddContactText.textContent = 'Добавить контакт'
  $popapAddContactText.setAttribute('class', 'popap__add-contact-text')
  $errorMessageLang.setAttribute('class', 'error-message1')
  $errorMessageLang.textContent = `Пожалуйста, введите имя на кирилице 'А-я' `
  $errorMessageEmpty.setAttribute('class', 'error-message2')
  $errorMessageEmpty.textContent = `Пожалуйста, внесите данные во все обязательные поля *`
  $errorMessageNoContact.setAttribute('class', 'error-message3')
  $errorMessageNoContact.textContent = `Пожалуйста, введите данные хотя бы одного контакта`
  $popapBtnSave.setAttribute('class', 'btn')
  $popapBtnSave.classList.add('btn-secondary')
  $popapBtnSave.classList.add('btn-save')
  $popapBtnSave.textContent = 'Сохранить'

  // анимация placeholders
  if($popapInputSurname.value) {
    $popapPlaceHolderSurn.classList.add('popap__placeholder--deactive')
  } else {
    $popapPlaceHolderSurn.classList.remove('popap__placeholder--deactive')
  }

  if($popapInputName.value) {
    $popapPlaceHolderName.classList.add('popap__placeholder--deactive')
  } else {
    $popapPlaceHolderName.classList.remove('popap__placeholder--deactive')
  }

  if($popapInputLastname.value) {
    $popapPlaceHolderLastname.classList.add('popap__placeholder--deactive')
  } else {
    $popapPlaceHolderLastname.classList.remove('popap__placeholder--deactive')
  }
  

  // скрытие и появление * в input и бордер error валидации
  $popapInputSurname.addEventListener('input', () => {
    if($popapInputSurname.value) {
      $popapPlaceHolderSurn.classList.add('popap__placeholder--deactive')
      $errorMessageLang.classList.remove('error-message--active')
      $errorMessageEmpty.classList.remove('error-message--active')
      $popapInputSurname.classList.remove('error')
    } else {
      $popapPlaceHolderSurn.classList.remove('popap__placeholder--deactive')
    }
  })

  $popapInputName.addEventListener('input', () => {
    if($popapInputName.value) {
      $popapPlaceHolderName.classList.add('popap__placeholder--deactive')
      $errorMessageLang.classList.remove('error-message--active')
      $errorMessageEmpty.classList.remove('error-message--active')
      $popapInputName.classList.remove('error')
    } else {
      $popapPlaceHolderName.classList.remove('popap__placeholder--deactive')
    }
  })

  $popapInputLastname.addEventListener('input', () => {
    if($popapInputLastname.value) {
      $popapPlaceHolderLastname.classList.add('popap__placeholder--deactive')
      $errorMessageLang.classList.remove('error-message--active')
      $popapInputLastname.classList.remove('error')
    } else {
      $popapPlaceHolderLastname.classList.remove('popap__placeholder--deactive')
    }
  })

  // функция создания формы добавления контакта    
  function createAddContactForm() {
    const $contactsBlock = document.createElement('div'),
          $selectContact = document.createElement('div'),
          $selectHeader = document.createElement('div'),
          $selectCurrent = document.createElement('span'),
          $selectIcon = document.createElement('div'),
          $selectBody = document.createElement('div'),
          $option1 = document.createElement('div'),
          $option2 = document.createElement('div'),
          $option3 = document.createElement('div'),
          $option4 = document.createElement('div'),
          $contactInput = document.createElement('input'),
          $contactBtnDelete = document.createElement('button')
    
    $contactsBlock.setAttribute('class', 'contact-block')
    $selectContact.setAttribute('class', 'select')     
    $selectHeader.setAttribute('class', 'select__header')
    $selectIcon.innerHTML = icons.selectIcon
    $selectCurrent.setAttribute('class', 'select__current')
    $option1.setAttribute('class', 'select__option')
    $option2.setAttribute('class', 'select__option')
    $option3.setAttribute('class', 'select__option')
    $option4.setAttribute('class', 'select__option')
    $selectBody.setAttribute('class', 'select__body')
    $selectBody.active = () => {
      $selectBody.classList.add('select__body--active')
    }
    $selectBody.deactive = () => {
      $selectBody.classList.remove('select__body--active')
    }
    $selectIcon.setAttribute('class', 'select__icon')
    $selectCurrent.setAttribute('value', 'phone')
    $option1.setAttribute('value', 'phone')
    $option2.setAttribute('value', 'email')
    $option3.setAttribute('value', 'vk')
    $option4.setAttribute('value', 'telegram')
    $selectCurrent.textContent = 'Телефон'
    $option1.textContent = 'Доп. телефон'
    $option2.textContent = 'Email'
    $option3.textContent = 'vk'
    $option4.textContent = 'telegram'
    $contactInput.setAttribute('class', 'contact-input')
    $contactInput.addEventListener('input', () => {
      $contactInput.classList.remove('contact-input--error')
      $errorMessageNoContact.classList.remove('error-message--active')
    })
    $contactBtnDelete.innerHTML = icons.deleteContactIcon
    $contactBtnDelete.setAttribute('class', 'contact-delete-btn')
    $contactBtnDelete.classList.add('btn')

    // функции селекта
    $selectHeader.addEventListener('click', () => {
      $selectBody.classList.toggle('select__body--active')
      $selectIcon.classList.toggle('select__icon--active')
    })

    $contactBtnDelete.addEventListener('click', () => {
      $contactsBlock.remove()
    })

    $option1.addEventListener('click', () => {
      selectChoice($selectCurrent, $option1)
      $selectBody.deactive()
      $selectIcon.classList.remove('select__icon--active')
    })
    $option2.addEventListener('click', () => {
      selectChoice($selectCurrent, $option2)
      $selectBody.deactive()
      $selectIcon.classList.remove('select__icon--active')
    })
    $option3.addEventListener('click', () => {
      selectChoice($selectCurrent, $option3)
      $selectBody.deactive()
      $selectIcon.classList.remove('select__icon--active')
    })
    $option4.addEventListener('click', () => {
      selectChoice($selectCurrent, $option4)
      $selectBody.deactive()
      $selectIcon.classList.remove('select__icon--active')
    })


    $selectHeader.append($selectCurrent)
    $selectHeader.append($selectIcon)
    $selectContact.append($selectHeader)
    $selectBody.append($option1)
    $selectBody.append($option2)
    $selectBody.append($option3)
    $selectBody.append($option4)
    $selectContact.append($selectBody)
    $contactsBlock.append($selectContact)
    $contactsBlock.append($contactInput)
    $contactsBlock.append($contactBtnDelete)

    // обьект форма добавления контакта
    let contactBlock = {
      $selectCurrent,
      $contactInput,
      $contactBtnDelete
    } 
    
    return {
      $contactsBlock,
      $selectBody,
      contactBlock
    }  
  }

  // массив форм добавления контактов
  let contactsBlocksArray = []
  
  // добавление формы контакта в DOM
  $popapAddContactBtn.addEventListener('click', (e) => {
    e.preventDefault()
    $errorMessageNoContact.classList.remove('error-message--active')
    $popapAddContactBtn.classList.remove('popap__add-contact-btn--error')
    let contact= createAddContactForm()
    contactsBlocksArray.push(contact.contactBlock)
    $popapAddContactBtn.insertAdjacentElement('beforeBegin', contact.$contactsBlock)
  })

  // отрисовка текущих контактов контактов
  for(let i = 0; i < clientData.contacts.length; i++) {
    let contact = createAddContactForm()
    for(let j = 0; j < contactsSelects.length; j++) {
      if(clientData.contacts[i].type === contactsSelects[j].value) {
        contact.contactBlock.$selectCurrent.textContent = contactsSelects[j].text
        contact.contactBlock.$selectCurrent.setAttribute('value', contactsSelects[j].value)
      }
    }
    contact.contactBlock.$contactInput.value = clientData.contacts[i].value
    contactsBlocksArray.push(contact.contactBlock)
    $popapContacts.prepend(contact.$contactsBlock)
  }

  // удаление контакта
  for(let i = 0; i < contactsBlocksArray.length; i++) {
    contactsBlocksArray[i].$contactBtnDelete.addEventListener('click', () => {
      contactsBlocksArray.splice(i, 1)
    })
  }

  // измененение данных клиента
  $popapForm.addEventListener('submit', async function(e) {
    e.preventDefault()
    if(!$popapInputSurname.value || !validateOnEmpty($popapInputSurname.value)) {
      $popapInputSurname.classList.add('error')
      $errorMessageEmpty.classList.add('error-message--active')
      return
    } else if(!$popapInputName.value || !validateOnEmpty($popapInputName.value)) {
      $popapInputName.classList.add('error')
      $errorMessageEmpty.classList.add('error-message--active')
      return
    } else if(!validateLangName($popapInputSurname.value)) {
      $errorMessageLang.classList.add('error-message--active')
      $popapInputSurname.classList.add('error')
      return
    } else if(!validateLangName($popapInputName.value)) {
      $errorMessageLang.classList.add('error-message--active')
      $popapInputName.classList.add('error')
      return
    } else if($popapInputLastname.value) {
      if(!validateLangName($popapInputLastname.value)) {
        $errorMessageLang.classList.add('error-message--active')
        $popapInputLastname.classList.add('error')
        return
      } 
    }

    let contacts = []
    for(const contactBlock of contactsBlocksArray) {
      if(!contactBlock.$contactInput.value || !validateOnEmpty(contactBlock.$contactInput.value)) {
        contactBlock.$contactInput.classList.add('contact-input--error')
        $errorMessageNoContact.classList.add('error-message--active')
        return
      }
      let contactData = new ContactData(contactBlock.$selectCurrent.getAttribute('value'), contactBlock.$contactInput.value)
      contacts.push(contactData)
    }

    // проверка на отсутствие контактов
    if(contacts.length < 1) {
      $errorMessageNoContact.classList.add('error-message--active')
      $popapAddContactBtn.classList.add('popap__add-contact-btn--error')
      return
    }

    let client = new ClientData(firstLetterToUpperCase($popapInputSurname.value), firstLetterToUpperCase($popapInputName.value), firstLetterToUpperCase($popapInputLastname.value), contacts)
    await updateClient(id, client)
    $popapInputSurname.value = ''
    $popapInputName.value = ''
    $popapInputLastname.value = ''
    // закрыть popap
    closePopap()
  })

  $popapSurnameLabel.append($popapInputSurname)
  $popapSurnameLabel.append($popapPlaceHolderSurn)
  $popapNameLabel.append($popapInputName)
  $popapNameLabel.append($popapPlaceHolderName)
  $popapLastnameLabel.append($popapInputLastname)
  $popapLastnameLabel.append($popapPlaceHolderLastname)
  $popapInputs.append($popapSurnameLabel)
  $popapInputs.append($popapNameLabel)
  $popapInputs.append($popapLastnameLabel)
  $popapAddContactBtn.append($popapAddContactText)
  $popapForm.append($popapInputs)
  $popapContacts.append($popapAddContactBtn)
  $popapForm.append($popapContacts)
  $popapForm.append($errorMessageEmpty)
  $popapForm.append($errorMessageLang)
  $popapForm.append($errorMessageNoContact)
  $popapForm.append($popapBtnSave)
  $popapHeader.append($popapTitle)
  $popapHeader.append($popapId)
  popap.append($popapHeader)
  popap.append($popapForm)
}

// функция заполнения popap на удаление клиента
export function fillPopapDeleteClient(popap, deleteClient) {
  const $popapDeleteBlock = document.createElement('div'),
        $popapTitle = document.createElement('h3'),
        $popapQuastion = document.createElement('p'),
        $popapBtnDelete = document.createElement('button')
  
  $popapDeleteBlock.setAttribute('class', 'popap-delete__container')      
  $popapTitle.setAttribute('class', 'popap-delete__title')
  $popapTitle.textContent = 'Удалить клиента'
  $popapQuastion.setAttribute('class', 'popap-delete__quastion')
  $popapQuastion.textContent = 'Вы действительно хотите удалить данного клиента?'
  $popapBtnDelete.setAttribute('class', 'btn')
  $popapBtnDelete.classList.add('btn-secondary')
  $popapBtnDelete.classList.add('btn-delete')
  $popapBtnDelete.textContent = 'Удалить'

  $popapBtnDelete.addEventListener('click', function() {
    deleteClient()
  })

  $popapDeleteBlock.append($popapTitle)
  $popapDeleteBlock.append($popapQuastion)
  $popapDeleteBlock.append($popapBtnDelete)
  popap.append($popapDeleteBlock)
}

export function createLoadingAnimation() {
  const $loadingBlock = document.createElement('div')
  const $loadingIcon1 = document.createElement('div')
  const $loadingIcon2 = document.createElement('div')
  const $loadingIcon3 = document.createElement('div')
  $loadingBlock.classList.add('loader')
  $loadingIcon1.classList.add('inner', 'one')
  $loadingIcon2.classList.add('inner', 'two')
  $loadingIcon3.classList.add('inner', 'three')
  $loadingBlock.append($loadingIcon1)
  $loadingBlock.append($loadingIcon2)
  $loadingBlock.append($loadingIcon3)
  return $loadingBlock
}








