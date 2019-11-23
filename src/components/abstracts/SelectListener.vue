<script>
export default {
  name: 'SelectListener',
  render() {
    if (!this.$slots.default[0]) return;

    return (
      <div class="statistic-item">
        <div
          onClick={this.handleClick}
          ref="statistic-item__content"
          class="cursor--pointer"
        >
          {this.$slots.default[0]}
        </div>
      </div>
    );
  },
  methods: {
    handleClick(e) {
      if (e.which !== 1) return;
      const item = this.$refs['statistic-item__content'];
      item.classList.add('statistic-item--drag');
      this.$emit('select');

      setTimeout(() => {
        item.classList.remove('statistic-item--drag');
      }, 100);
    },
  },
};
</script>

<style>
  .statistic-item {
    background-color: black;
  }
  .statistic-item--drag {
    opacity: .8;
  }
</style>
