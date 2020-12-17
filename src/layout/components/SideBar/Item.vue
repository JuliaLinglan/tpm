<script>
// 渲染函数
export default {
    name: "MenuItem",
    functional: true,
    props: {
        icon: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        }
    },
    render(h, context) {
        const { icon, title } = context.props;
        const vnodes = [];

        if (icon) {
            vnodes.push(<div class="svgcs"><svg-icon icon-class={icon} style={'width:1.15em;height:1.15em'} /></div>);
        }

        if (title) {
            vnodes.push(<span slot="title" style='margin-left: 5px;'>{title}</span>);
        }
        return vnodes;
    }
};
</script>
<style lang="scss" scoped>

</style>