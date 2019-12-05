export default {
  props: {
    value: Boolean,
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(dialog) {
        this.$emit('input', dialog);
      },
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit('close');
    },
  },
};
