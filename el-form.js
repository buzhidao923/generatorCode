let existDrawer = '%fillmenu&name=existDrawer&default=true&opt=true&opt=false&isCheck=1%';
let existFormInline = '%fillmenu&name=existFormInline&default=false&opt=true&opt=false&isCheck=1%';
let existTable = '%fillmenu&name=existTable&default=false&opt=true&opt=false&isCheck=1%';



let componentsName = '%filltext&name=componentName%'; let argumentsName = '%filltext&name=componentNumber%';let placeHolderName = '%filltext&name=remarkName%';
let tableColumnArgumentsName = '%filltext&name=tableColumnArgumentsName%';let tableColumnPlaceHolderName = '%filltext&name=tableColumnPlaceHolderName%';

let json = `%cv%`;
if(json != ''){
    let jsonArray = json.split('\n');
    if(jsonArray.length == 5){
        componentsName = jsonArray[0];
        argumentsName = jsonArray[1];
        placeHolderName = jsonArray[2];
        tableColumnArgumentsName = jsonArray[3];
        tableColumnPlaceHolderName = jsonArray[4];
    }
    if(jsonArray.length >= 0 && jsonArray.length < 4){
        console.log("解析错误",jsonArray.length);
    }
}
let el_form_type = [];
let el_form_value = [];
let el_form_place_holder = [];
let el_table_column_value = [];
let el_table_column_place_holder = [];
let separator = ['|' , ',' , ' '];
for(let i = 0 ; i < separator.length  ; i++){
    el_form_type = componentsName.split(separator[i]);
    if(el_form_type.length > 2 ){
        break;
    }
}
for(let i = 0 ; i < separator.length  ; i++){
    el_form_value = argumentsName.split(separator[i]);
    if(el_form_value.length > 2 ){
        break;
    }
}
for(let i = 0 ; i < separator.length  ; i++){
    el_form_place_holder = placeHolderName.split(separator[i]);
    if(el_form_place_holder.length > 2 ){
        break;
    }
}
for(let i = 0 ; i < separator.length  ; i++){
    el_table_column_value = tableColumnArgumentsName.split(separator[i]);
    if(el_table_column_value.length > 2 ){
        break;
    }
}
for(let i = 0 ; i < separator.length  ; i++){
    el_table_column_place_holder = tableColumnPlaceHolderName.split(separator[i]);
    if(el_table_column_place_holder.length > 2 ){
        break;
    }
}
if(existDrawer === 'true'){
    existDrawer = true;
}else{
    existDrawer = false;
}
if(existFormInline === 'true'){
    existFormInline = true;
}else{
    existFormInline = false;
}
if(existTable === 'true'){
    existTable = true;
}else{
    existTable = false;
}

/*********************              dom渲染              *********************/
//template
let template_left = '<template>\n'
let app_container_left = '<div class=\"app-container\">\n'
let app_container_right = '</div>\n'
let template_right = '<\/template>\n'

//drawer
let el_drawer_form_css = "drawer-base-style-info";
if(existFormInline){
    el_drawer_form_css = ""
}
let el_drawer_left = `<Drawer :title=\"title\" :drawer-show=\"open\" @drawer-close=\"cancel\" :close-on-click-modal=\"false\" append-to-body>\n`;
let el_drawer_base_info_css_left = `<div class=\"drawer-base-info ${el_drawer_form_css}\">\n`;
let el_drawer_base_info_css_right = `<\/div>\n`;
let el_drawer_right = '<\/Drawer>\n'

//关闭
let bottom_button = '<div class=\"drawer-base-foot drawer-base-foot__right\">\n'+
'<el-button type=\"primary\" @click=\"submitForm\">确 定<\/el-button>\n'+
'<el-button @click=\"cancel\">取 消<\/el-button>\n'+
'<\/div>\n';

//el-form
let el_form_inline = ' :inline=\"true\" ';
let el_form_label_width = ` label-width=\"150px\" `;
if(! existFormInline){
    el_form_inline = "";
}
if(existFormInline){
    el_form_label_width = "";
}
let el_form_left = `<el-form :model=\"queryForm\" ref=\"queryForm\"${el_form_inline}${el_form_label_width}@submit.native.prevent>\n`
let el_form_right = '<\/el-form>\n';
let el_form_item_left = 
'<el-form-item label=\"日期\" prop=\"propValue\">\n';
let el_form_item_right = '<\/el-form-item>\n';
let el_form_item_selectAndReset =
`<el-form-item>
    <el-button type=\"primary\" icon=\"el-icon-search\" @click=\"handlerQuery\">搜索<\/el-button>
    <el-button icon=\"el-icon-refresh\" @click=\"resetQuery\">重置<\/el-button>
<\/el-form-item>`

//el-table
let el_table_left = '<el-table v-loading=\"tableLoading\" :data=\"queryList\" @selection-change=\"handleSelectionChange\" stripe border>\n'
let el_table_right = '<\/el-table>\n'

//el-table-column
let el_table_column = 
'<el-table-column label=\"名字\"  align=\"center\" show-overflow-tooltip>\n'+
'<template slot-scope=\"scope\">\n'+
'content<\/template>\n '+
'<\/el-table-column>\n'
let el_table_selection = '<el-table-column type=\"selection\" width=\"55\" align=\"center\" show-overflow-tooltip \/>\n'
let el_table_serial_number = '<span>{{ (queryForm.pageNum - 1) * queryForm.pageSize + scope.$index + 1}}<\/span>\n';
let el_table_operator = 
'<el-table-column align=\"center\" class-name=\"small-padding fixed-width\" label=\"操作\">\n'+
'<template slot-scope=\"scope\">\n'+
'<el-button @click=\"handleView(scope.row)\" icon=\"el-icon-view\" size=\"mini\" type=\"text\"\n'+
'v-hasPermi=\"[\'包:类:view\']\">查看<\/el-button>\n'+
'<el-button @click=\"handleUpdate(scope.row)\" icon=\"el-icon-edit\" size=\"mini\" type=\"text\"\n'+
'v-hasPermi=\"[\'包:类:edit\']\">修改<\/el-button>\n'+
'<el-button @click=\"handleDelete(scope.row)\" icon=\"el-icon-delete\" size=\"mini\" type=\"text\"\n'+
'v-hasPermi=\"[\'包:类:delete\']\">删除<\/el-button>\n'+
'<\/template>\n'+
'<\/el-table-column>\n';
let el_table_column_span = 
'<!--,{ name: \'parseDict\', treeOptions: searchValueOptions, isTreePathFullName: true, dictType: \'xzqh\' }-->\n'+
'<!--,\'parseTime\'-->\n'+
'<span>{{ wordProcess(scope.row.searchValue\n'+
', \'notDisplayNull\') }}<\/span>\n';

//pagination
let el_pagination = '<pagination v-show=\"total > 0\" :total=\"total\" :page.sync=\"queryForm.pageNum\" :limit.sync=\"queryForm.pageSize\" @pagination=\"getList\" \/>\n'

//设置最小宽度
let setInputPlaceholderMinWidth = 'v-setInputPlaceholderMinWidth';
//rowAndCol
let el_row_left = "<el-row>\n";
let el_col_left = "<el-col :span=\"12\">\n";
let el_col_right = "<\/el-col>\n";
let el_row_right = "<\/el-row>\n";
if(existFormInline){
    el_row_left = "";
    el_col_left = "";
    el_col_right = "";
    el_row_right = "";
}
if(!existFormInline){
    el_form_item_selectAndReset = "";
}
if(!existDrawer){
    el_drawer_left = "";
    el_drawer_right = "";
    bottom_button = "";
}

//form_type
let type_input = new Map();
//input
let input_word_limit = ' maxlength="200" show-word-limit ';
if(!(existDrawer && !existFormInline)){
    input_word_limit = "";
}
let input = `<el-input v-model=\"queryForm.searchValue\" placeholder=\"请输入日期\" clearable @keyup.enter.native=\"handlerQuery\"  ${input_word_limit} ${setInputPlaceholderMinWidth} \/>\n`;
type_input.set("el-input",input);
type_input.set("input",input);

//select
let select =
"<el-select v-model=\"queryForm.searchValue\" :clearable=\"true\" placeholder=\"请选择日期\" @keyup.enter.native=\"handlerQuery\">\n"+
"<el-option v-for=\"dict in searchValueOptions\" :key=\"dict.eid\" :label=\"dict.mc\" :value=\"dict.wybh\" \/>\n"+
"<\/el-select>\n";
type_input.set("el-select",select);
type_input.set("select",select);

//行政区划area
let area = '<xzqh v-model=\"queryForm.searchValue\" placeholder=\"请选择日期\" @keyup.enter.native=\"handlerQuery\" :xzqhOptions.sync=\"xzqhOptions\" clearable isDefaultValue \/>';
type_input.set('area',area);
type_input.set('xzqh',area);

//date-time
let dateTime = '<date-time v-model=\"queryForm.sj\" placeholder=\"请选择日期\" type=\"date\"><\/date-time>\n';
let dateRange = 
'<date-time :startTime.sync=\"queryForm.jcStartTime\" :endTime.sync=\"queryForm.jcEndTime\" range\n'+
'type=\"date\"\n'+
'@keyup.enter.native=\"handlerQuery\" />\n';
type_input.set("el-date-time",dateTime);
type_input.set("date-time",dateTime);
type_input.set("date",dateTime);
type_input.set("time",dateTime);
type_input.set("date-range",dateRange);

//cascader
let cascader = 
`<el-cascader v-model=\"queryForm.searchValue\" placeholder=\"请选择日期\" :props=\"{ emitPath: false, checkStrictly: true, value: \'wybh\', label: \'mc\' }\" @keyup.enter.native=\"handleQuery\" clearable :options=\"searchValueTreeOptions\" \/>`
type_input.set("cascader",cascader);
type_input.set("el-cascader",cascader);

let out_put = "";
out_put += template_left + app_container_left;
out_put += el_drawer_left;
out_put += el_drawer_base_info_css_left;

//form-dom
out_put += el_form_left + el_row_left;
for(let i = 0; i < el_form_type.length; i++){
    let el_form_type_temp = type_input.get(el_form_type[i]);
    el_form_type_temp = el_form_type_temp.replace(/searchValue/g,el_form_value[i]);
    el_form_type_temp = el_form_type_temp.replace(/日期/g,el_form_place_holder[i]);
    let el_form_item_left_temp = el_form_item_left;
    el_form_item_left_temp = el_form_item_left_temp.replace(/propValue/g,el_form_value[i]);
    el_form_item_left_temp = el_form_item_left_temp.replace(/日期/g,el_form_place_holder[i]);
    out_put += el_col_left; 
    out_put += '  '+ el_form_item_left_temp;
    out_put +='    ' +  el_form_type_temp;
    out_put +='  '+  el_form_item_right;
    out_put += el_col_right;
}
out_put += el_form_item_selectAndReset;
out_put += el_row_right +  el_form_right;

//table-dom
if(existTable){
    out_put += el_table_left;
    out_put += el_table_selection;
    let el_table_column_number = el_table_column;
    el_table_column_number = el_table_column_number.replace("content",el_table_serial_number);
    el_table_column_number = el_table_column_number.replace("名字",'序号');
    out_put += el_table_column_number;
    for(let i = 0; i < el_table_column_value.length; i++){
        let el_table_column_temp = el_table_column;
        el_table_column_temp = el_table_column_temp.replace("content",el_table_column_span);
        el_table_column_temp = el_table_column_temp.replace("名字",el_table_column_place_holder[i]);
        el_table_column_temp = el_table_column_temp.replace(/searchValue/g,el_table_column_value[i]);
        out_put += el_table_column_temp;
    }
    out_put += el_table_operator;
    out_put += el_table_right;
    out_put += el_pagination;
}
out_put += el_drawer_base_info_css_right;
out_put += bottom_button;
out_put += el_drawer_right;
out_put += app_container_right + template_right;


/*********************              script              *********************/
//结尾拼接逗号
let script_query_form_content = 
`//每页个数
pageNum:1,
//当前页码
pageSize:10,\n`;
//结尾拼接逗号
let script_options_content = "";
//手动注入res("成功")  , 结尾拼接逗号
let script_options_get_dict_content = "";
//结尾拼接逗号
let script_options_formatter_function_content = "";
//组件名字
let script_name_comtent = "";
//drawer_data容器
let script_data_drawer_content = "";
//drawer_method容器
let script_method_drawer_content = "";
//create init
let script_create_init_content = 'this.init()';
//method init
let script_method_init_params_content = "";
let script_method_init_function_internal_content = "";
//method reset
let script_method_reset_content = "";



for(let i = 0; i < el_form_type.length; i++){
    if(el_form_type[i] === 'date-range'){
        script_method_init_params_content += `${el_form_value[i]}StartTime,${el_form_value[i]}EndTime,`;
        script_method_init_function_internal_content +=
        `if(${el_form_value[i]}StartTime != undefined){
           this.queryForm.${el_form_value[i]}StartTime = ${el_form_value[i]}StartTime;
           this.row.${el_form_value[i]}StartTime = ${el_form_value[i]}StartTime;
        }
        if(${el_form_value[i]}EndTime != undefined){
           this.queryForm.${el_form_value[i]}EndTime = ${el_form_value[i]}EndTime;
           this.row.${el_form_value[i]}EndTime = ${el_form_value[i]}EndTime;
        }`
        script_method_reset_content += 
        `if(${el_form_value[i]}StartTime != undefined){
           this.queryForm.${el_form_value[i]}StartTime = ${el_form_value[i]}StartTime;
        }
        if(${el_form_value[i]}EndTime != undefined){
           this.queryForm.${el_form_value[i]}EndTime = ${el_form_value[i]}EndTime;
        }`
    }
    if(el_form_type[i] === 'area' || el_form_type[i] === 'xzqh'){
        script_method_init_params_content += `${el_form_value[i]},`;
        script_method_init_function_internal_content +=
        `if(${el_form_value[i]} != undefined){
           this.queryForm.${el_form_value[i]} = ${el_form_value[i]};
        }`;
         script_method_reset_content += 
        `if(${el_form_value[i]}StartTime != undefined){
           this.queryForm.${el_form_value[i]}StartTime = ${el_form_value[i]}StartTime;
        }`;
    }
}
if(existDrawer){
    script_data_drawer_content = 
    `title:null,
    open:false,`,
    script_method_drawer_content = 
    `// 关闭按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    //初始化打开
    async init({${script_method_init_params_content}}){
        this.title = "";
        this.open = true;
        this.tableLoading = true;
        ${script_method_init_function_internal_content}
        await this.getZiDianList();
        await this.getList();
        this.tableLoading = false;
    },`
    script_create_init_content = "";
}else {
    script_method_drawer_content = 
    `//初始化打开
    async init(){
        this.tableLoading = true;
        await this.getZiDianList();
        await this.getList();
        this.tableLoading = false;
    }`
}
let script_options_get_dict_promise_array = [];
let return_promiseIndex = 0;
for(let i = 0; i < el_form_type.length; i++){
    if(el_form_type[i] === 'select' || el_form_type[i] === 'el-select'){
        //options设置
        script_options_content += 
        `//${el_form_place_holder[i]}数组
        ${el_form_value[i]}Options:[],`;
        //promise设置
        let script_options_get_dict_promiseTemp = 
        `let returnPromise${return_promiseIndex++} = new Promise((res${i},rej${i})=>{
            this.getZidianByWybh(\"${el_form_value[i]}\").then(response => {
                this.${el_form_value[i]}Options = response.data;
                res${i}(response);
            });
        })\n`;
        script_options_get_dict_promise_array.push(script_options_get_dict_promiseTemp);
    }
    if(el_form_type[i] === 'cascader' || el_form_type[i] === 'el-cascader'){
        //treeOptions设置
        script_options_content += 
        `//${el_form_place_holder[i]}树形数组
        ${el_form_value[i]}TreeOptions:[],`;
        //options设置
        script_options_content += 
        `//${el_form_place_holder[i]}数组
        ${el_form_value[i]}Options:[],`;
        //promise设置
        let script_options_get_dict_promiseTemp = 
        `let returnPromise${return_promiseIndex++} = new Promise((res${i},rej${i})=>{
            this.getZidianTreeByWybh(\"${el_form_value[i]}\").then(response => {
                this.${el_form_value[i]}Options = response.data;
                this.${el_form_value[i]}TreeOptions = this.handleTree(
                    JSON.parse(JSON.stringify(response.data)),
                    "eid",
                    "sjzd"
                );
                res${i}(response);
            });
        })\n`;
        script_options_get_dict_promise_array.push(script_options_get_dict_promiseTemp);
    }
    script_query_form_content += 
    `//${el_form_place_holder[i]}
    ${el_form_value[i]}:null,\n`
    if(el_form_type[i] === 'date-range'){
        script_query_form_content += 
        `//${el_form_place_holder[i]}开始时间
        ${el_form_value[i]}StartTime:null,
        //${el_form_place_holder[i]}结束时间
        ${el_form_value[i]}EndTime:null,\n`
    }
}
for(let i = 0; i < script_options_get_dict_promise_array.length; i++){
    script_options_get_dict_content += script_options_get_dict_promise_array[i];
}
if(script_options_get_dict_promise_array.length === 0){
    script_options_get_dict_content +=
    `let returnPromise0 = new Promise((resOptinos,rejOptions)=>{
        resOptinos("成功");
    })`
}
if(script_options_get_dict_promise_array.length > 1){
    let script_options_get_dict_promise_all = '';
    for(let i = 0; i < script_options_get_dict_promise_array.length; i++){
        script_options_get_dict_promise_all += 'returnPromise'+i +',\n'
    }
    script_options_get_dict_content += 
    `return Promise.allSettled([
        ${script_options_get_dict_promise_all}
    ])
    \n`;
}else {
    script_options_get_dict_content +=
    `return returnPromise0;`
}


let script = 
`<script>

export default {
    name:"${script_name_comtent}",
//import引入的组件需要注入到对象中才能使用
components: {},
props: [],
data() {
    //这里存放数据
    return {
        queryForm:{
          ${script_query_form_content}
        },
        //table加载状态
        tableLoading: true,
        ${script_data_drawer_content}
        //pagination总数
        total: 0,
        //table查询
        queryList:[],
        //传递标识
        flag: null,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 列信息
        columns: [],
        //行政区划数组
        xzqhOptions:[],
        ${script_options_content}
        //传递保存行
        row:{},
    };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
    //方法集合
    methods: {
        //获取字典
        getZiDianList() {
            ${script_options_get_dict_content}
        },
        //处理改变
        handleSelectionChange(){

        },
        //处理查看
        handleView(){

        },
        //处理修改
        handleForm(){

        },
        //处理删除
        handleDelete(){

        },
        ${script_method_drawer_content}
        ${script_options_formatter_function_content}
        // 重置
        async reset() {
            await this.resetForm("queryForm");
            ${script_method_reset_content}
        },
        //获取List
        getList() {
            return new Promise((res, rej) => {
                let(this.queryForm).then((response) => {
                    this.queryList = response.rows;
                    this.total = response.total;
                });
                res("getList成功");
            });
        },
        /** 搜索按钮操作 */
        handlerQuery() {
          this.queryForm.pageNum = 1;
          this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
          this.resetForm("queryForm");
          this.handlerQuery();
        },
        /** 提交 */
        submitForm() {
            this.open = false;
        }
    },
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    ${script_create_init_content}
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
`;
out_put += script;

/*********************              css              *********************/
let css = 
`<style lang='scss' scoped>

</style>
`;
out_put += css;

console.log(out_put)
