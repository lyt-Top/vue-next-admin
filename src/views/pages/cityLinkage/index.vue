<template>
	<div class="city-linkage-container">
		<el-alert title="温馨提示：箭头问题为 `element plus，Cascader 级联选择器` 宽度设为 100%后自带bug" type="warning" :closable="false"> </el-alert>
		<el-card shadow="hover" header="1、三级联动（省市区）" class="mt15">
			<el-cascader
				v-model="threeLevelLinkage"
				:options="threeLevelLinkageList"
				:props="{ expandTrigger: 'hover', value: 'code', label: 'name' }"
				size="small"
				clearable
			>
			</el-cascader>
		</el-card>
		<el-card shadow="hover" header="2、分开联动" class="mt15">
			<el-form size="small" label-width="40px">
				<el-row :gutter="15">
					<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="mb15">
						<el-form-item label="省级">
							<el-select v-model="linkage.province" placeholder="请选择" size="small" clearable @change="onProvinceChange" class="w100">
								<el-option v-for="(v, k) in linkage.provinceList" :key="k" :label="v.name" :value="v.name"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="mb15">
						<el-form-item label="市级">
							<el-select v-model="linkage.city" placeholder="请选择" size="small" clearable @change="onCityChange" class="w100">
								<el-option v-for="(v, k) in linkage.cityList" :key="k" :label="v.name" :value="v.name"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
						<el-form-item label="区级">
							<el-select v-model="linkage.area" placeholder="请选择" size="small" clearable class="w100">
								<el-option v-for="(v, k) in linkage.areaList" :key="k" :label="v.name" :value="v.name"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, defineComponent } from 'vue';
import threeLevelLinkageJson from '/@/mock/threeLevelLinkage.json';
export default defineComponent({
	name: 'pagesCityLinkage',
	setup() {
		const state = reactive({
			threeLevelLinkage: '',
			threeLevelLinkageList: [],
			linkage: {
				province: '',
				city: '',
				area: '',
				provinceList: [], // 省
				cityList: [], // 市
				areaList: [], // 区
			},
		});
		// 初始化城市数据
		const initCityData = () => {
			state.threeLevelLinkageList = threeLevelLinkageJson;
			state.linkage.provinceList = threeLevelLinkageJson;
		};
		// 省下拉改变时
		const onProvinceChange = (name: string) => {
			state.linkage.city = '';
			state.linkage.area = '';
			state.linkage.cityList = [];
			state.linkage.areaList = [];
			state.linkage.provinceList.map((v: any) => {
				if (v.name === name) state.linkage.cityList = v.children;
			});
		};
		// 市下拉改变时
		const onCityChange = (name: string) => {
			state.linkage.area = '';
			state.linkage.areaList = [];
			state.linkage.cityList.map((v: any) => {
				if (v.name === name) state.linkage.areaList = v.children;
			});
		};
		// 页面加载时
		onMounted(() => {
			initCityData();
		});
		return {
			onProvinceChange,
			onCityChange,
			...toRefs(state),
		};
	},
});
</script>
