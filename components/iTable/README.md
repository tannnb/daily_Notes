1. 定义表格高度全屏
2. 自定义表头，循环输出整体表结构。
3. 表格内编辑（输入框和下拉选择框）。
4. 表格内自定义按钮和点击事件。
5. 每一列增加过滤函数。
6. 可格式化数字
7. 可勾选多页内的checkbox。
8.自定义排序函数，可按数字大小排序


#### 数据说明：
1.tableData：

```
 [
    {
      "bh": 1,
      "xmid": "5463562",
      "xmmc": "测试名称",
      "Nsrsbh": "325423523542352345",
      "dwmc": "测试单位名称",
      "yskze": "89787.66",
      "srze": "345345.35",
      "kcze": "56566.56",
      "zze": "345345",
      "zsfs_mc": "计算方式1",
      "xmxs": "在建项目"
    },
    {
      "bh": 1,
      "xmid": "5463562",
      "xmmc": "测试名称",
      "Nsrsbh": "325423523542352345",
      "dwmc": "测试单位名称",
      "yskze": "0.00",
      "srze": "345345.35",
      "kcze": "56566.56",
      "zze": "345345",
      "zsfs_mc": "计算方式1",
      "xmxs": "在建项目"
    }]
```
2.columns表头数组格式：

```
[
          {name:'',desc:'sel',width:'50',type:'selection'},
          {name:'编号',desc:'',width:'60',type:'index'},
          {name:'名称',desc:'xmmc',tooltip:true},
          {name:'计算金额',desc:'yskze',width:'150',click:true,url:'/xmtz/xmtzYskje',templet:function(d){return d.yskze=='0.00'?true:false}},
          {name:'计算价款',desc:'srze',width:'150',click:true,sortable:true,url:'/xmtz/xmtzFwjsjk'},
          {name:'计算税金',desc:'kcze',width:'150',style:'text-align:right;'},
          {name:'唯一标识',desc:'xmid',format:true,width:'150',edit:true,editType:'input',},
          {name:'计算方式',desc:'zsfs_mc',width:'150',edit:true,editType:'select',editSelOptions:[{label:'计算方式1',value:'计算方式1'},{label:'计算方式2',value:'计算方式2'}],style:'text-align:right;'},
          {name:'计算属性',desc:'xmxs',width:'150',style:'color:#409EFF;text-align:center;text-decoration: underline;'},
          {name:'操作',desc:'jhqsnd',width:'200',btns:[{name:'查看详情',btnType:'primary',clickType:'showXq'},{name:'编辑',btnType:'danger',clickType:'editXq'}]},
        ]
```
3.columns表头参数数目


```
name：'表头名称'，
desc：'字段名称'，
width:'单元格宽度',
click：'单元格是否可点击'，触发组件绑定函数 btnClickFunc，参数{clickType:clickType,row:row}
url：'点击后跳转的url'
sortable：'是否可排序'，
format：金额是否格式化，
fixed：固定列，
image: 图片
edit:是否可编辑，
editType：'编辑类型',['inpput','select']
editSelOptions:当编辑类型是select时的初始数据。
style：'单元格内数据样式'
btns:单元格内按钮，可多个。触发组件绑定函数 handleBtnClick，参数：{column:column,row:row,type:clickType}
     name：按钮名称，btnType:按钮样式，clickType:按钮事件标识。
templet:单元格是否可点击的判断函数，可进行复杂的函数判断。参数：本行数据row。

```
