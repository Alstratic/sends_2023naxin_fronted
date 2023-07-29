<template>
  <!-- 根据断点类型和宽度进行不同的布局和样式调整 -->
  <div>
    <p>窗口宽度: {{ width }}</p>
    <p>断点类型: {{ type }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    type() {
      if (this.windowWidth < 550) return 'xs';
      if (this.windowWidth >= 550 && this.windowWidth < 1200) return 'md';
      else return 'lg';
    },
    width() {
      return this.windowWidth;
    },
  },
  mounted() {
    // 窗口大小变化时更新 windowWidth 的值
    window.addEventListener('resize', this.onWidthChange);
  },
  beforeDestroy() {
    // 组件销毁前移除窗口大小变化事件监听器，防止内存泄漏
    window.removeEventListener('resize', this.onWidthChange);
  },
  methods: {
    onWidthChange() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>
