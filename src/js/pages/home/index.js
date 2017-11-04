/* global console */
import axios from 'axios'
import html from './template.html'
import { Toast } from 'mint-ui'

export default {
  template: html,
  data() {
    return {
      title: "i'm home page",
      activeIndex: 0,
      getDataMsg: ''
    }
  },
  methods: {
    getData() {
      axios.get('/user')
        .then((response) => {
          console.log(typeof response, response, response.retmsg)
          this.getDataMsg = response.retmsg
        })
        .catch((error) => {
          console.log(error)
        })
    },
    callMintUiToast() {
      Toast({
        message: '提示',
        position: 'bottom',
        duration: 5000
      })
    }
  },
  mounted() {
    console.info('-----------22--------')
  }
}
