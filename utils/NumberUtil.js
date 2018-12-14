export default {
  intCheck: value => {
    const num_check=/^[+-]?([0-9]*)[\.]?([0-9])?$/
    if(!num_check.test(value)) {
      return false
    }
    return true
  },
  floatCheck: value => {
    const num_check=/^[+-]?([0-9]*)[\.]?([0-9]*)?$/
    if(!num_check.test(value)) {
			return false
		}
		return true
  },
  eosAmountCheck: value => {
    if(!value)
      return false
      const check=/^([0-9]*)[\.]?([0-9]{0,4})?$/
    if(!check.test(value)) {
      return false
    }
    return true
  },
  chkNumber: event => {
    event = event || window.event
    const keyID = (event.which) ? event.which : event.keyCode;
    if(keyID === 69 || keyID === 101)
      event.preventDefault();
    
  },
}