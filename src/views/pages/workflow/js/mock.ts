// 左侧菜单导航数据
export const leftNavList = [
	{
		title: '工作流',
		icon: 'iconfont icon-shouye',
		isOpen: true,
		id: '1',
		children: [
			{
				icon: 'iconfont icon-gongju',
				name: '引擎',
				id: '11',
				form: [
					{
						type: 'input',
						label: '客户姓名',
						prop: 'name',
						placeholder: '请输入客户姓名',
						required: true,
						disabled: false,
					},
					{
						type: 'select',
						label: '性别',
						prop: 'sex',
						placeholder: '请选择性别',
						required: true,
						disabled: false,
						options: [
							{
								value: '0',
								label: '女',
							},
							{
								value: '1',
								label: '男',
							},
						],
					},
					{
						type: 'input',
						label: '员工编号',
						prop: 'number',
						placeholder: '请输入员工编号',
						required: true,
						disabled: false,
					},
					{
						type: 'input',
						label: '办公电话',
						prop: 'mobile',
						placeholder: '请输入办公电话',
						required: true,
						disabled: false,
					},
					{
						type: 'select',
						label: '权限分配',
						prop: 'role',
						placeholder: '请选择性别',
						required: true,
						disabled: false,
						options: [
							{
								value: '0',
								label: '编辑权限',
							},
							{
								value: '1',
								label: '删除权限',
							},
						],
					},
					{
						type: 'checkbox',
						label: '模块选择',
						prop: 'module',
						placeholder: '请选择模块',
						required: true,
						disabled: false,
					},
				],
			},
			{
				icon: 'iconfont icon-shouye_dongtaihui',
				name: '模版',
				id: '12',
				form: [
					{
						type: 'input',
						label: '等级',
						prop: 'grade',
						placeholder: '请输入等级',
						required: true,
						disabled: false,
					},
					{
						type: 'input',
						label: '登记密码',
						prop: 'password',
						placeholder: '请输入登记密码',
						required: true,
						disabled: false,
					},
				],
			},
			{
				icon: 'iconfont icon-zhongduancanshuchaxun',
				name: '名称',
				id: '13',
				form: [
					{
						type: 'input',
						label: '数据表',
						prop: 'dataSheet',
						placeholder: '请输入数据表',
						required: true,
						disabled: false,
					},
					{
						type: 'input',
						label: '字段配置',
						prop: 'field',
						placeholder: '请输入字段配置',
						required: true,
						disabled: false,
					},
				],
			},
			{
				icon: 'iconfont icon-zhongduancanshu',
				name: '版本',
				id: '14',
				form: [
					{
						type: 'input',
						label: '发布模板',
						prop: 'publish',
						placeholder: '请输入发布模板',
						required: true,
						disabled: false,
					},
				],
			},
			{
				icon: 'iconfont icon-bolangnengshiyanchang',
				name: '建模',
				id: '15',
				form: [
					{
						type: 'input',
						label: '内容模板',
						prop: 'content',
						placeholder: '请输入内容模板',
						required: true,
						disabled: false,
					},
				],
			},
			{
				icon: 'iconfont icon-xingqiu',
				name: '节点',
				id: '16',
				form: [
					{
						type: 'input',
						label: '活动名称6',
						prop: 'name16',
					},
				],
			},
		],
	},
	{
		title: '流程',
		isOpen: true,
		icon: 'iconfont icon-caijian',
		id: '2',
		children: [
			{
				icon: 'iconfont icon-fuwenben',
				name: '实例',
				id: '21',
				form: [
					{
						type: 'input',
						label: '活动名称7',
						prop: 'name21',
					},
				],
			},
			{
				icon: 'iconfont icon-fuwenbenkuang',
				name: '轨迹',
				id: '22',
				form: [
					{
						type: 'input',
						label: '活动名称8',
						prop: 'name22',
					},
				],
			},
			{
				icon: 'iconfont icon-shangchuan',
				name: '数据',
				id: '23',
				form: [
					{
						type: 'input',
						label: '活动名称9',
						prop: 'name23',
					},
				],
			},
		],
	},
	{
		title: '任务',
		isOpen: true,
		icon: 'iconfont icon-shuju',
		id: '3',
		children: [
			{
				icon: 'iconfont icon-icon-',
				name: '参与人',
				id: '31',
				form: [
					{
						type: 'input',
						label: '活动名称1',
						prop: 'name31',
					},
				],
			},
			{
				icon: 'iconfont icon-gerenzhongxin',
				name: '执行人',
				id: '32',
				form: [
					{
						type: 'input',
						label: '活动名称2',
						prop: 'name32',
					},
				],
			},
			{
				icon: 'iconfont icon-fangkuang',
				name: '工单',
				id: '33',
				form: [
					{
						type: 'input',
						label: '活动名称3',
						prop: 'name33',
					},
				],
			},
		],
	},
];
