Component({
  properties: {
    slotKey: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    },
    icon: {
      type: String,
      value: ''
    },
    selected: {
      type: Object,
      value: null
    },
    warning: {
      type: String,
      value: ''
    },
    warningSeverity: {
      type: String,
      value: ''
    }
  },
  methods: {
    onTap() {
      this.triggerEvent('select', { slotKey: this.data.slotKey })
    },
    onRemove() {
      this.triggerEvent('remove', { slotKey: this.data.slotKey })
    }
  }
})
