
// @todo: функция показать ошибки валидации

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

// @todo: функция скрыть ошибки валидации

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// @todo: функция проверки валидности формы

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// @todo: функция проверки если хотябы один из инпутов формы не валиден

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
   });
 }

 // @todo: функция активации кнопки сохранения

 const toggleSubmitButtonState = (inputList, popupButton, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    popupButton.disabled = true;
    popupButton.classList.add(validationConfig.inactiveButtonClass);
  } else {
    popupButton.disabled = false;
    popupButton.classList.remove(validationConfig.inactiveButtonClass);
  };
}

 // @todo: функция очищает ошибки валидации формы и делает кнопку неактивной

export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const popupButton = formElement.querySelector(validationConfig.submitButtonSelector);
 
  toggleSubmitButtonState(inputList, popupButton, validationConfig);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
}    

// @todo: функция обработки валидности форм

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const popupButton = formElement.querySelector(validationConfig.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleSubmitButtonState(inputList, popupButton, validationConfig);
      });
    });
  });
}

