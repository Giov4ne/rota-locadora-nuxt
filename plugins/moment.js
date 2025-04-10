import moment from 'moment-timezone'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

export default ({ app }, inject) => {
  inject('moment', moment)
}