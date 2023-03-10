
function showInputError (formElement, inputElement, errorMessage, object) {
    const inputFormError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(object.inputErrorClass);
    inputFormError.classList.add(object.errorClass);
    inputFormError.textContent = errorMessage;
}

function hideInputError (formElement, inputElement, object) {
    inputElement.classList.remove(object.inputErrorClass);
    const inputFormError = formElement.querySelector(`.${inputElement.id}-error`);
    inputFormError.classList.remove(object.errorClass);
    inputFormError.classList.remove(object.errorClass);
    inputFormError.textContent = '';
}

function checkInputValidity (formElement, inputElement, object) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, object);
    } else {
        hideInputError(formElement, inputElement, object);
    }
}

function hasInvalidInput (inputList) {
    return inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState (inputList, buttonElement, object) {
    if(hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(object.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(object.inactiveButtonClass);
    }
}

function buttonDisabled (formElement, object) {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    const buttonElement = formElement.querySelector(object.submitButtonSelector);

    inputList.forEach(function (inputElement) {
        hideInputError(formElement, inputElement, object);
    })
    toggleButtonState(inputList, buttonElement, object);
}


function setEventListeners (formElement, object) {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, object);

    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, object);
            toggleButtonState(inputList, buttonElement, object);
        })
    })
}

function enableValidation (object) {
    const formList = Array.from(document.querySelectorAll(object.formSelector));
    
    formList.forEach(function (formElement) {
        formElement.addEventListener('submit', function (event) {
            event.preventDefault();
        })  
        setEventListeners(formElement, object);
    }) 
}


const formObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

enableValidation(formObject);

// const formProfile = document.querySelector('#popup__form-profile');
// const formAddPhoto = document.querySelector('#popup__form-add-photo');
// const inputFormProfile = formProfile.querySelector('.popup__input');
// const inputFormAddPhoto = formAddPhoto.querySelector('.popup__input');
// const inputFormProfileError = formProfile.querySelector(`.${inputFormProfile.id}-error`);
// const inputFormAddPhotoError = formAddPhoto.querySelector(`.${inputFormProfile.id}-error`);
// const buttonProfile = formProfile.querySelector('.popup__button-save');


// function showInputError (formElement, inputElement, errorMessage) {
//     const inputFormError = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add('popup__input_type_error');
//     inputFormError.classList.add('popup__input-error_active');
//     inputFormError.textContent = errorMessage;
// }

// function hideInputError (formElement, inputElement) {
//     inputElement.classList.remove('popup__input_type_error');
//     const inputFormError = formElement.querySelector(`.${inputElement.id}-error`);
//     inputFormError.classList.remove('popup__input-error_active');
//     inputFormError.classList.remove('popup__input-error_active');
//     inputFormError.textContent = '';
// }

// function checkInputValidity (formElement, inputElement) {
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage);
//     } else {
//         hideInputError(formElement, inputElement);
//     }
// }

// function hasInvalidInput (inputList) {
//     return inputList.some(function (inputElement) {
//         return !inputElement.validity.valid;
//     })
// }

// function toggleButtonState (inputList, buttonElement) {
//     if(hasInvalidInput(inputList)) {
//         buttonElement.classList.add('popup__button-save_inactive');
//         buttonElement.setAttribute('disabled', true);
//     } else {
//         buttonElement.classList.remove('popup__button-save_inactive');
//         buttonElement.removeAttribute('disabled', true);
//     }
// }


// function setEventListeners (formElement) {
//     const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//     const buttonElement = Array.from(formElement.querySelectorAll('.popup__button-save'));
    
//     buttonElement.forEach(function (button) {
//         toggleButtonState(inputList, button);
//     })

//     inputList.forEach(function (inputElement) {
//         inputElement.addEventListener('input', function () {
//             checkInputValidity(formElement, inputElement);
//             buttonElement.forEach(function (button) {
//                 toggleButtonState(inputList, button);
//             })
//         })
//     })
// }

// function enableValidation () {
//     const formList = Array.from(document.querySelectorAll('.popup__form'));

//     formList.forEach(function (formElement) {
//         formElement.addEventListener('submit', function (event) {
//             event.preventDefault();
//         })  
//         setEventListeners(formElement);
//     }) 
// }

// enableValidation(formProfile, inputFormProfile, inputFormProfileError);
// enableValidation(formAddPhoto, inputFormAddPhoto, inputFormAddPhotoError);