<template>
	<div class="waterfall-container layout-pd">
		<el-card shadow="hover" header="瀑布屏（布局一）" class="mb15">
			<div class="waterfall-first">
				<div class="waterfall-first-item" v-for="v in 30" :key="v" v-waves>
					<div class="w100 h100 flex">
						<span class="flex-margin">{{ v }}</span>
					</div>
				</div>
			</div>
		</el-card>
		<el-card shadow="hover" header="瀑布屏（布局二）">
			<div class="waterfall-last">
				<div class="waterfall-last-item" v-for="v in 30" :key="v" v-waves="'light'">
					<div class="w100 h100 flex">
						<span class="flex-margin">{{ v }}</span>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="pagesWaterfall">
// 此处需有内容（注释也得），否则缓存将失败
</script>

<style scoped lang="scss">
.waterfall-container {
	.waterfall-first {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(188px, 1fr));
		grid-gap: 0.25em;
		grid-auto-flow: row dense;
		grid-auto-rows: 20px;
		.waterfall-first-item {
			width: 100%;
			background: var(--el-color-primary);
			color: var(--el-color-white);
			transition: all 0.3s ease;
			border-radius: 3px;
			&:nth-of-type(3n + 1) {
				grid-row: auto / span 5;
			}
			&:nth-of-type(3n + 2) {
				grid-row: auto / span 6;
			}
			&:nth-of-type(3n + 3) {
				grid-row: auto / span 8;
			}
			&:hover {
				box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
				transition: all 0.3s ease;
				cursor: pointer;
			}
		}
	}
	.waterfall-last {
		display: grid;
		grid-gap: 0.25em;
		grid-auto-flow: row dense;
		grid-auto-rows: minmax(188px, 20vmin);
		grid-template-columns: 1fr;
		.waterfall-last-item {
			height: 100%;
			background: var(--el-color-primary);
			color: var(--el-color-white);
			transition: all 0.3s ease;
			border-radius: 3px;
			&:hover {
				box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
				transition: all 0.3s ease;
				cursor: pointer;
			}
		}
	}
	@media (min-width: 576px) {
		.waterfall-last {
			grid-template-columns: repeat(7, 1fr);
			.waterfall-last-item {
				&:nth-of-type(9n + 9) {
					grid-column: auto / span 2;
				}
				&:nth-of-type(9n + 8) {
					grid-column: auto / span 2;
				}
				&:nth-of-type(9n + 7) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(9n + 6) {
					grid-column: auto / span 2;
				}
				&:nth-of-type(9n + 5) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(9n + 4) {
					grid-column: auto / span 2;
				}
				&:nth-of-type(9n + 3) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(9n + 2) {
					grid-column: auto / span 2;
				}
				&:nth-of-type(9n + 1) {
					grid-column: auto / span 2;
				}
			}
		}
	}
	@media (min-width: 576px) and (min-width: 1024px) {
		.waterfall-last {
			grid-template-columns: repeat(14, 1fr);
			.waterfall-last-item {
				&:nth-of-type(15n + 15) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 14) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 13) {
					grid-column: auto / span 2;
				}
				&:nth-of-type(15n + 12) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 11) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 10) {
					grid-column: auto / span 2;
				}
				&:nth-of-type(15n + 9) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 8) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 7) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 6) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 5) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 4) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 3) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 2) {
					grid-column: auto / span 3;
				}
				&:nth-of-type(15n + 1) {
					grid-column: auto / span 2;
				}
			}
		}
	}
}
</style>
