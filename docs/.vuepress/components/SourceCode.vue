<!-- SourceCode.vue -->
<template>
  <div class="snippet">
    <div class="snippet-info">
      <span class="language" v-text="lang" />
      <button
        title="Copy snippet"
        type="button"
        class="copy"
        @click="onClick"
        v-text="copied ? 'Copied!' : 'Copy'"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    async onClick() {
      const element = this.$slots.default[0].elm;
      try {
        await navigator.clipboard.writeText(
          element.innerText || element.textContent
        );
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 5000);
      } catch (err) {
        alert('Could not copy text: ', err);
      }
    }
  },

  props: {
    lang: {
      type: String,
      required: false
    }
  },

  data: function() {
    return {
      copied: false
    };
  }
};
</script>

<style lang="scss" scoped>
.snippet {
  position: relative;

  .snippet-info {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;

    > .copy {
      border: none;
      z-index: 9;
      color: #fff;
      padding: 6px 0;
      border-bottom-left-radius: 6px;
      border-top-right-radius: 6px;
      font-family: inherit;
      font-size: 1rem;

      min-width: 84px;
      text-align: center;
      cursor: pointer;

      background-color: #78b06428;
      color: #ebedf3 !important;
      &:hover {
        background-color: #78b06475;
      }
      &:focus-visible {
        box-shadow: 0 0 0 3px #78b06475;
        outline: none;
      }
      @media screen and(max-width: 419px) {
        margin-right: -1.5rem;
      }
    }

    > .language {
      padding: 6px 0;
      margin-right: 8px;
      z-index: 3;
      font-size: 0.75rem;
      color: #fff6;
    }
  }
}
</style>
