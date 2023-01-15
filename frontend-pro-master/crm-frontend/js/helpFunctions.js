// функция рендеринга таблицы
export function rendering(list, property = 'id', direction) {
  return list.sort(function(firstItem, secondItem) {
    if((!direction == true ? firstItem[property] < secondItem[property] : firstItem[property] > secondItem[property]))
    return -1
  }) 
}

// функция проверки на соответствие знаков кирилице
export function validateLangName(name) {
  return /^[\u0400-\u04FF ]+$/.test(name)
}

export function validateOnEmpty(name) {
  return Boolean(name.trim().length)
}

// функция перевода 1 символа в заглавную букву
export function firstLetterToUpperCase(name) {
  let correctName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  return correctName
}

// функция изменения значений селекта
export function selectChoice(mainOption, option) {
  let text = mainOption.textContent
  let value = mainOption.getAttribute('value')
  mainOption.textContent = option.textContent
  mainOption.setAttribute('value', option.getAttribute('value'))
  option.textContent = text
  option.setAttribute('value', value)
}

// функция получения корректного отображения даты
export function getCurrentDate(dateValue) {
  const date = new Date(dateValue),
        day = date.getDate() < 10 ?
        '0' + (date.getDate()):
        date.getDate(),
        month = date.getMonth() + 1 < 10 ?
                '0' + (date.getMonth() + 1):
                date.getMonth() + 1,
        year = date.getFullYear(),
        hours = date.getHours(),
        minutes = date.getMinutes() + 1 < 10 ?
                  '0' + (date.getMinutes() + 1):
                  date.getMinutes() + 1,
        data = {
          setFullDate: `${day}.${month}.${year}`,
          setFullTime: `${hours}:${minutes}`
        }
  return data
}

// функция присвоение и отрисовки иконки контакта
export function printContactsIcons(contactsList, tableTd, icons) {
  const contactsCountToPrint = 3
  let contactListToHide = []
  for (let i = 0; i < contactsList.length; i++) {
    if(i <= contactsCountToPrint) {
      const $contactIcon = document.createElement('button')
      $contactIcon.setAttribute('class', 'contact__btn')
      if(contactsList[i].type == 'phone') {
        $contactIcon.innerHTML = icons.phoneIcon
      } else if (contactsList[i].type == 'email') {
        $contactIcon.innerHTML = icons.emailIcon
      } else if (contactsList[i].type == 'twitter') {
        $contactIcon.innerHTML = icons.twitterIcon
      } else if (contactsList[i].type == 'fb') {
        $contactIcon.innerHTML = icons.fbIcon
      } else if (contactsList[i].type == 'vk') {
        $contactIcon.innerHTML = icons.vkIcon
      } else if (contactsList[i].type == 'telegram') {
        $contactIcon.innerHTML = icons.telegramIcon
      }
      tableTd.append($contactIcon)
      // tooltip
      let tooltip = document.createElement('div')
      let tooltipContactType = document.createElement('span')
      let tooltipContactValue = document.createElement('a')
      tooltip.setAttribute('class', 'contact__tooltip')
      tooltipContactType.setAttribute('class', 'tooltip__type')
      tooltipContactValue.setAttribute('class', 'tooltip__value')
      tooltipContactType.innerHTML = contactsList[i].type + ': '
      tooltipContactValue.innerHTML = contactsList[i].value
      tooltip.append(tooltipContactType)
      tooltip.append(tooltipContactValue)
      $contactIcon.append(tooltip)
    } else {
      contactListToHide.push(contactsList[i])
    }    
  }

  // скрытие контактов
  if(contactListToHide.length > 0) {
    const $contactsHidden = document.createElement('button')
    $contactsHidden.setAttribute('class', 'contact__hidden-icon')
    $contactsHidden.innerHTML = '+' + contactListToHide.length
    tableTd.append($contactsHidden)

    // расскрытие скрытых контактов
    $contactsHidden.addEventListener('click', () => {
      for (let i = 0; i < contactListToHide.length; i++) {
        const $contactIcon = document.createElement('button')
        $contactIcon.setAttribute('class', 'contact__btn')
        if(contactListToHide[i].type == 'phone') {
          $contactIcon.innerHTML = icons.phoneIcon
        } else if (contactListToHide[i].type == 'email') {
          $contactIcon.innerHTML = icons.emailIcon
        } else if (contactListToHide[i].type == 'twitter') {
          $contactIcon.innerHTML = icons.twitterIcon
        } else if (contactListToHide[i].type == 'fb') {
          $contactIcon.innerHTML = icons.fbIcon
        } else if (contactListToHide[i].type == 'vk') {
          $contactIcon.innerHTML = icons.vkIcon
        } else if (contactListToHide[i].type == 'telegram') {
          $contactIcon.innerHTML = icons.telegramIcon
        }
        tableTd.prepend($contactIcon)
        $contactsHidden.remove()
        // tooltip
        let tooltip = document.createElement('div')
        let tooltipContactType = document.createElement('span')
        let tooltipContactValue = document.createElement('a')
        tooltip.setAttribute('class', 'contact__tooltip')
        tooltipContactType.setAttribute('class', 'tooltip__type')
        tooltipContactValue.setAttribute('class', 'tooltip__value')
        tooltipContactType.innerHTML = contactListToHide[i].type + ': '
        tooltipContactValue.innerHTML = contactListToHide[i].value
        tooltip.append(tooltipContactType)
        tooltip.append(tooltipContactValue)
        $contactIcon.append(tooltip)
      }
    })
  }
}

