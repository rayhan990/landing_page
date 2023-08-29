const checkEmail = (value) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value.trim());
}

const checkName = (value) => {
    const re = /^[a-z ,.'-]+$/i;
    return re.test(value.trim());
}

const validateForm = (data) => {
  return checkEmail(data.email) && checkName(data.name);
}


module.exports = {
  validateForm: validateForm
}