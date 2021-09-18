<template>
	<div class="loading">
		<div class="part1"></div>
		<div class="part2"></div>
		<div class="part3"></div>
	</div>
</template>

<script>
	export default {
        name: "CircleSpinner"
    };
</script>

<style scoped>
.loading {
  line-height: 0;
  margin: 100px auto 0;
  text-align: center;
  animation: rotate 0.7s linear infinite;
  width: 48px;
  border-radius: 50%;
}

.loading > div {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.loading .part1 {
  animation: move-min 0.7s ease-in-out infinite;
  border-left: 1px solid #73c7d5;
}

.loading .part2 {
  background-color: #73c7d5;
}

.loading .part3 {
  animation: move-plus 0.7s ease-in-out infinite;
  border-right: 1px solid #73c7d5;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes move-min {
  50% {
    transform: translate(8px) scale(1.2);
  }
}

@keyframes move-plus {
  50% {
    transform: translate(-8px) scale(1.2);
  }
}
</style>