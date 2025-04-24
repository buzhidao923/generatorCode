const exportButton = {
    name: 'exportButton',
    props: ["hasPermi", "url", "queryForm", "fileName"],
    methods: {
        export() {
            this.download(this.url, { ...this.queryForm }, this.fileName)
        }
    },
    render() {
        return (
            <el-button type="warning" plain icon="el-icon-download" onclick={this.export} v-hasPermi={[this.hasPermi]}>导出</el-button>
        );
    },
};
export default exportButton;