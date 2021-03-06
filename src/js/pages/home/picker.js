/* global weui, console */
const data = [
  {
    label: '飞机票',
    value: 0,
    children: [
      {
        label: '经济舱',
        value: 1
      },
      {
        label: '商务舱',
        value: 2
      }
    ]
  },
  {
    label: '火车票',
    value: 1,
    children: [
      {
        label: '卧铺',
        value: 1,
        disabled: true // 不可用
      },
      {
        label: '坐票',
        value: 2
      },
      {
        label: '站票',
        value: 3
      }
    ]
  },
  {
    label: '汽车票',
    value: 3,
    children: [
      {
        label: '快班',
        value: 1
      },
      {
        label: '普通',
        value: 2
      }
    ]
  }
]

export default {
  createPicker(onChangeCb, onConfirmCb) {
    weui.picker(data, {
      className: 'custom-classname',
      container: '#test-weui',
      defaultValue: [1, 3],
      onChange: function (result) {
        console.log(result)
        if (onChangeCb) {
          onChangeCb()
        }
      },
      onConfirm: function (result) {
        console.log(result)
        if (onConfirmCb) {
          onConfirmCb()
        }
      },
      id: 'doubleLinePicker'
    })
  }
}
