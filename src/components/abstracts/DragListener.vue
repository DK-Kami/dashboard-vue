<script>
export default {
  name: 'DragListener',
  render() {
    if (!this.$slots.default[0]) return;

    return (
      <div class="statistic-item">
        <div
          onMousedown={this.handleMousedown}
          onMouseup={this.handleMouseup}
          ref="statistic-item__content"
          class="cursor--grab"
        >
          {this.$slots.default[0]}
        </div>
      </div>
    );
  },
  methods: {
    handleMousedown(e) {
      if (e.which !== 1) return;
      const item = this.$refs['statistic-item__content'];
      item.classList.add('statistic-item--drag');
      item.classList.remove('cursor--grab');
      this.$emit('start-drag');
    },
    handleMouseup(e) {
      const item = this.$refs['statistic-item__content'];
      item.classList.remove('statistic-item--drag');
      item.classList.add('cursor--grab');
      this.$emit('end-drag');
    }
  },
};
</script>

<style>
  .statistic-item {
    background-color: black;
  }
  .statistic-item--drag {
    cursor: grabbing;
    opacity: .2;
  }
</style>
